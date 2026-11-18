# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "pillow>=11.0",
#   "numpy>=1.26",
#   "opencv-python-headless>=4.10",
#   "pyyaml>=6.0",
# ]
# ///
"""Crop recently added people photos to the card: 4:5, centred on the face.

Covers the photos on /faculty, /postdocs, /phd-fellows, /mtech-fellows and /interns
(visitor photos are cropped by the internal editor instead). See CROP_PEOPLE_PHOTOS.md.

    uv run scripts/crop_people_photos.py                     # dummy run: list, change nothing
    uv run scripts/crop_people_photos.py --since-days 90     # ... photos from the last 90 days
    uv run scripts/crop_people_photos.py --preview /tmp/x    # + before/after sheets
    uv run scripts/crop_people_photos.py --apply             # crop the photos in place

The rule (the same as for visitor photos):

- every crop is 4:5 (width 4 : height 5), centred on the face, as large as the room
  around the face allows: the face fills 20% of it with room all round, up to 25%
  without;
- a face near an edge stays at 25% and the crop slides to stay inside the photo; a face
  too big for that gets the largest 4:5 cut (the face then fills more than 25%);
- the crop is scaled down to at most 600 px wide.

"The face" is the box of the YuNet face detector (forehead to chin, cheek to cheek), and
its share is that box's area over the crop's. A photo meets the rule when the crop the
rule asks for is (nearly) the whole photo; such photos, and photos without a face, are
left alone.

Which photos: the ones the five pages show (their ``img:`` / ``profile_pic:`` fields)
that were added or replaced in git within ``--since-days`` days (default: 30), or are new
or changed and not committed yet. ``--since-days all`` checks every photo the pages show;
paths given on the command line are checked whatever their age.

``--dummy`` (the default) changes nothing: it lists the changes that would be made. With
``--apply``, each photo is overwritten in place (same file name and format, so the pages
need no change), after a copy of it is saved under ``scripts/.crop-backups/``.
"""

from __future__ import annotations

import argparse
import math
import shutil
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

import yaml
from PIL import Image, ImageDraw, ImageFont, ImageOps

REPO = Path(__file__).resolve().parents[1]
MODEL = Path(__file__).resolve().parent / "models" / "face_detection_yunet_2023mar.onnx"
BACKUPS = Path(__file__).resolve().parent / ".crop-backups"

ASPECT = 4 / 5        # width / height of every crop (the card is 230 px wide: 230 x 288)
MIN_SHARE = 0.20      # the face's share of the crop's area when there's room around it
MAX_SHARE = 0.25      # ... and when there isn't (more only if the face is too big)
MAX_WIDTH = 600       # px; the pages build 230 and 460 px wide copies
TOLERANCE = 0.03      # a photo meets the rule if its crop keeps >= 97% of each side, or it is
                      # already 4:5 (within 3%) with the face >= 20% (within 3%); see meets_rule
DETECT_SIZE = 640     # longest side the face detector sees
MIN_SCORE = 0.7       # detector confidence
JPEG_QUALITY = 90

Face = tuple[float, float, float, float]   # x, y, w, h
Box = tuple[int, int, int, int]            # left, top, right, bottom


# ── which photos the pages show ──────────────────────────────────────────────


def _front_matter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8", errors="replace")
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end < 0:
        return {}
    try:
        data = yaml.safe_load(text[3:end])
    except yaml.YAMLError:
        return {}
    return data if isinstance(data, dict) else {}


def people_photos() -> dict[str, str]:
    """{web path of a photo: the page that shows it} for the five pages."""
    photos: dict[str, str] = {}

    def add(web: object, page: str) -> None:
        if isinstance(web, str) and web.strip().startswith("/assets/"):
            photos.setdefault(web.strip(), page)

    # .eleventy.js: Faculty and Postdocs by folder and category, Fellows by glob + category
    for md in sorted((REPO / "_people" / "faculty").glob("*.md")):
        fm = _front_matter(md)
        if str(fm.get("category", "")).strip() == "Faculty":
            add(fm.get("img"), "faculty")
    for md in sorted((REPO / "_people" / "postdoc").glob("*.md")):
        fm = _front_matter(md)
        if str(fm.get("category", "")).strip() == "Postdoc":
            add(fm.get("img"), "postdocs")
    fellows = {"Ph.D. Fellows/Scholars": "phd-fellows", "M.Tech. Fellows/Scholars": "mtech-fellows"}
    for pattern in ("*.md", "phd_fellows/*.md", "mtech_fellows/*.md"):
        for md in sorted((REPO / "_people").glob(pattern)):
            fm = _front_matter(md)
            page = fellows.get(str(fm.get("category", "")).strip())
            if page:
                add(fm.get("img"), page)
    interns = REPO / "_data" / "interns.yml"
    if interns.is_file():
        for row in yaml.safe_load(interns.read_text(encoding="utf-8")) or []:
            if isinstance(row, dict):
                add(row.get("profile_pic"), "interns")
    return photos


def _git(*args: str) -> str:
    return subprocess.run(["git", "-C", str(REPO), *args], check=True,
                          capture_output=True, text=True).stdout


def recent_files(days: int) -> set[str]:
    """Repo-relative paths under assets/images/people added or changed in the last *days*
    days, or new or changed and not committed yet."""
    where = "assets/images/people"
    out = _git("log", f"--since={days} days ago", "--diff-filter=AMR", "--name-only", "--format=", "-z",
               "--", where)
    paths = {p for p in out.split("\0") if p}
    status = _git("status", "--porcelain", "-z", "--untracked-files=all", "--", where)
    for entry in status.split("\0"):
        if len(entry) > 3 and entry[:2] != " D":
            paths.add(entry[3:])
    return paths


# ── the crop ─────────────────────────────────────────────────────────────────


_detector_warned = False


def find_face(img: Image.Image) -> Face | None:
    """The largest face in *img* as (x, y, w, h) in its pixels, or None."""
    global _detector_warned
    import cv2
    import numpy as np

    if not MODEL.is_file():
        sys.exit(f"face model missing: {MODEL}")
    logging_ = getattr(getattr(cv2, "utils", None), "logging", None)
    if logging_ is not None:   # errors only: the DNN backend warns on every model load
        logging_.setLogLevel(logging_.LOG_LEVEL_ERROR)
    k = min(1.0, DETECT_SIZE / max(img.size))
    small = img.convert("RGB").resize((max(1, round(img.width * k)), max(1, round(img.height * k))))
    bgr = np.asarray(small)[:, :, ::-1].copy()
    detector = cv2.FaceDetectorYN.create(str(MODEL), "", small.size, MIN_SCORE)
    _, faces = detector.detect(bgr)
    if faces is None or not len(faces):
        return None
    x, y, w, h = max(faces, key=lambda f: f[2] * f[3])[:4]
    return (float(x) / k, float(y) / k, float(w) / k, float(h) / k)


def cut_box(size: tuple[int, int], face: Face) -> Box:
    """The 4:5 cut centred on the face, the face 20-25% of it as the room allows."""
    width, height = size
    x, y, w, h = face
    cx, cy = x + w / 2, y + h / 2
    tight = math.sqrt(w * h / (MAX_SHARE * ASPECT))   # crop height with the face at 25%
    loose = math.sqrt(w * h / (MIN_SHARE * ASPECT))   # ... and at 20%
    centred = min(2 * min(cy, height - cy), 2 * min(cx, width - cx) / ASPECT)
    ch = min(max(centred, tight), loose, height, width / ASPECT)
    cw, ch = max(1, round(ch * ASPECT)), max(1, round(ch))
    left = min(max(round(cx - cw / 2), 0), width - cw)
    top = min(max(round(cy - ch / 2), 0), height - ch)
    return (left, top, left + cw, top + ch)


def face_share(box: Box, face: Face) -> float:
    return face[2] * face[3] / ((box[2] - box[0]) * (box[3] - box[1]))


def meets_rule(size: tuple[int, int], box: Box, face: Face) -> bool:
    """Whether the photo already meets the rule, so it is left alone.

    Either the crop would keep (nearly) the whole photo, or the photo is already 4:5 with
    the face filling at least 20% of it (more is fine: the photo is tight around the
    face). The second test keeps a crop stable: on a small photo, the face found again in
    the cropped copy can be a few pixels off, and the crop would otherwise shrink a
    little on every run.
    """
    width, height = size
    if (box[2] - box[0]) >= (1 - TOLERANCE) * width and (box[3] - box[1]) >= (1 - TOLERANCE) * height:
        return True
    is_4_5 = abs(width / height - ASPECT) <= TOLERANCE * ASPECT
    return is_4_5 and face_share((0, 0, width, height), face) >= MIN_SHARE * (1 - TOLERANCE)


def load(path: Path) -> Image.Image:
    """The photo upright (EXIF rotation applied), fully loaded."""
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        im.load()
    return im


def cropped(im: Image.Image, box: Box) -> Image.Image:
    out = im.crop(box)
    if out.width > MAX_WIDTH:
        out = out.resize((MAX_WIDTH, round(MAX_WIDTH / ASPECT)), Image.LANCZOS)
    return out


def save(im: Image.Image, path: Path) -> None:
    """Save in the format the file name says, so the pages' paths stay right."""
    ext = path.suffix.lower()
    if ext in (".jpg", ".jpeg"):
        if im.mode not in ("RGB", "L"):
            bg = Image.new("RGB", im.size, "white")
            rgba = im.convert("RGBA")
            bg.paste(rgba, mask=rgba.getchannel("A"))
            im = bg
        im.save(path, "JPEG", quality=JPEG_QUALITY, optimize=True)
    elif ext == ".png":
        im.save(path, "PNG", optimize=True)
    elif ext == ".webp":
        im.save(path, "WEBP", quality=JPEG_QUALITY)
    else:
        im.save(path)


# ── before/after sheets ──────────────────────────────────────────────────────

CARD = 230
TILE_H = 300
LABEL = 16


def _row(title: str, im: Image.Image, box: Box, after: Image.Image, note: str) -> Image.Image:
    k = TILE_H / im.height
    orig = im.convert("RGB").resize((max(1, round(im.width * k)), TILE_H), Image.LANCZOS)
    ImageDraw.Draw(orig).rectangle([round(v * k) for v in box], outline=(255, 60, 60), width=3)
    now = im.convert("RGB").resize((CARD, min(TILE_H, round(CARD * im.height / im.width))), Image.LANCZOS)
    new = after.convert("RGB").resize((CARD, round(CARD / ASPECT)), Image.LANCZOS)
    tiles = [("original (red: the crop)", orig), ("card now", now), (f"card after: {note}", new)]
    gap = 12
    row = Image.new("RGB", (sum(t.width for _, t in tiles) + gap * 4, TILE_H + 2 * LABEL + gap), "white")
    draw = ImageDraw.Draw(row)
    font = ImageFont.load_default()
    draw.text((gap, 1), title, fill="black", font=font)
    x = gap
    for label, tile in tiles:
        row.paste(tile, (x, LABEL + 2))
        draw.text((x, LABEL + TILE_H + 4), label, fill=(80, 80, 80), font=font)
        x += tile.width + gap
    return row


def _write_sheets(rows: list[Image.Image], directory: Path, per_sheet: int = 6) -> list[Path]:
    directory.mkdir(parents=True, exist_ok=True)
    written = []
    for i in range(0, len(rows), per_sheet):
        chunk = rows[i:i + per_sheet]
        sheet = Image.new("RGB", (max(r.width for r in chunk), sum(r.height for r in chunk)), "white")
        y = 0
        for r in chunk:
            sheet.paste(r, (0, y))
            y += r.height
        out = directory / f"people-crops-{i // per_sheet + 1}.png"
        sheet.save(out)
        written.append(out)
    return written


# ── main ─────────────────────────────────────────────────────────────────────


@dataclass
class Result:
    rel: str
    page: str
    status: str      # crop, ok, no-face, missing, unreadable
    detail: str = ""


def since_days(value: str) -> int | None:
    """--since-days: a number of days (0 or more), or "all" (None)."""
    if value.strip().lower() == "all":
        return None
    try:
        days = int(value)
    except ValueError:
        raise argparse.ArgumentTypeError(f"{value!r} is not a number of days or 'all'") from None
    if days < 0:
        raise argparse.ArgumentTypeError("the number of days can't be negative")
    return days


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__.split("\n")[0],
                                epilog="See scripts/CROP_PEOPLE_PHOTOS.md.")
    p.add_argument("paths", nargs="*", help="only these photos (repo paths or /assets/... web paths), any age")
    p.add_argument("--since-days", type=since_days, default=30, metavar="N|all",
                   help='photos added or changed in the last N days (default: 30), or "all" for every photo')
    mode = p.add_mutually_exclusive_group()
    mode.add_argument("--dummy", action="store_true",
                      help="change nothing: list the changes that would be made (the default)")
    mode.add_argument("--apply", action="store_true", help="crop the photos in place")
    p.add_argument("--preview", type=Path, metavar="DIR", help="write before/after sheets to DIR")
    args = p.parse_args(argv)

    shown = people_photos()                                  # web path -> page
    by_rel = {web.lstrip("/"): page for web, page in shown.items()}
    if args.paths:
        wanted = {a.lstrip("/") for a in args.paths}
        unknown = sorted(w for w in wanted if w not in by_rel)
        for w in unknown:
            print(f"skip       {w}: not shown on the five pages (faculty, postdocs, PhD/MTech fellows, interns)")
        candidates = sorted(wanted & by_rel.keys())
    elif args.since_days is None:
        candidates = sorted(by_rel)
        print(f"checking all {len(by_rel)} photos on the five pages.")
    else:
        recent = recent_files(args.since_days)
        candidates = sorted(rel for rel in by_rel if rel in recent)
        print(f"{len(candidates)} of {len(by_rel)} photos on the five pages were added or changed "
              f"in the last {args.since_days} days (or are not committed yet).")
    if not args.apply:
        print("dummy run: nothing is changed.")

    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    results: list[Result] = []
    rows: list[Image.Image] = []
    for rel in candidates:
        page = by_rel[rel]
        path = REPO / rel
        if not path.is_file():
            results.append(Result(rel, page, "missing", "file not found"))
            continue
        try:
            im = load(path)
        except (OSError, SyntaxError, ValueError) as exc:
            results.append(Result(rel, page, "unreadable", str(exc)))
            continue
        face = find_face(im)
        if face is None:
            results.append(Result(rel, page, "no-face", "no face found: left as is"))
            continue
        box = cut_box(im.size, face)
        share = face_share(box, face)
        whole = (0, 0, im.width, im.height)
        if meets_rule(im.size, box, face):
            results.append(Result(rel, page, "ok", f"{im.width}x{im.height}, face {face_share(whole, face):.0%}"))
            continue
        after = cropped(im, box)
        note = f"{after.width}x{after.height}, face {share:.0%}"
        results.append(Result(rel, page, "crop", f"{im.width}x{im.height} -> {note}"))
        if args.preview:
            rows.append(_row(f"{rel}  ({page})", im, box, after, note))
        if args.apply:
            backup = BACKUPS / stamp / rel
            backup.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, backup)
            try:
                save(after, path)
            except OSError as exc:
                shutil.copy2(backup, path)
                results[-1] = Result(rel, page, "failed", f"could not write ({exc}); the photo is unchanged")

    width = max((len(r.rel) for r in results), default=0)
    verb = "cropped" if args.apply else "would crop"
    for r in results:
        label = {"crop": verb}.get(r.status, r.status)
        print(f"{label:<10} {r.rel:<{width}}  [{r.page}]  {r.detail}")
    counts = {s: sum(r.status == s for r in results) for s in ("crop", "ok", "no-face", "missing", "unreadable", "failed")}
    print(", ".join(f"{n} {verb if s == 'crop' else s}" for s, n in counts.items() if n) or "nothing to check")
    if args.preview:
        for sheet in _write_sheets(rows, args.preview) if rows else []:
            print(f"sheet      {sheet}")
    if args.apply and counts["crop"]:
        print(f"originals  {BACKUPS / stamp}  (not committed; delete once you're happy)")
    elif counts["crop"] and not args.apply:
        print("dummy run, nothing was changed: run again with --apply to crop")
    return 1 if counts["failed"] or counts["unreadable"] else 0


if __name__ == "__main__":
    sys.exit(main())
