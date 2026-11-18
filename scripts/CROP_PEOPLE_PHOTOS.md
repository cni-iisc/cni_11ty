# HOWTO: crop people photos to the card

`scripts/crop_people_photos.py` crops the photos on the **Faculty, Postdocs, PhD Fellows,
MTech Fellows, Interns, Staff and Former Staff** (`/staff/alumni/`) pages so that every card shows the person the same way as
the visitor cards do:

- the photo is **4:5** (width 4 : height 5), so the card shows it 230 × 288 px;
- it is **centred on the face**;
- the face fills **20%** of it when there is room around the face in the original, and
  up to **25%** when there isn't;
- when even a 25% crop can't be centred on the face (a face near an edge of the photo,
  such as a forehead close to the top), the face fills **30%** and the crop slides to stay
  inside the photo, so the face is as close to the centre as it can be. A photo that is
  already tight around the face gets the largest 4:5 cut, so its face fills more than 30%;
- it is scaled down to at most 600 px wide.

Visitor photos are **not** handled here: the internal editor crops them by the same rule
when they are uploaded.

## When to run it

After adding or replacing a photo for one of those seven pages, and before committing.
The script only looks at photos that are **recently added**: added or replaced in git
within the last 30 days, or new or changed and not committed yet. Of those, it crops only
the ones that **don't meet the rule** already. A photo already cropped, by this script or
by hand to the same rule, is left alone, so running it again is safe.

## What you need

- [`uv`](https://docs.astral.sh/uv/). The script lists its own Python packages (Pillow,
  NumPy, OpenCV, PyYAML); `uv run` installs them in a cache the first time. Nothing is
  installed into the repo.
- The face-detection model in `scripts/models/` (YuNet from the OpenCV model zoo, MIT
  licence, `face_detection_yunet_LICENSE`). It is committed with the script.

Run every command from the repo root (`cni_11ty/`).

## Steps

1. **Add the photo and point the page at it as usual**: the `img:` field of the person's
   `.md` file in `_people/` (faculty, postdocs, PhD and MTech fellows, staff; former staff have `past: true`), or `profile_pic:`
   in `_data/interns.yml` (interns).

2. **See what it would do.** Without `--apply` the script makes a **dummy run**: it lists
   the changes it would make and changes nothing. That's the default, so these two are
   the same:

   ```sh
   uv run scripts/crop_people_photos.py
   uv run scripts/crop_people_photos.py --dummy
   ```

   Each photo gets one line:

   | Status    | Meaning                                                          |
   |-----------|------------------------------------------------------------------|
   | `would crop` | doesn't meet the rule; shows the new size and the face's share (`cropped` with `--apply`) |
   | `ok`      | already meets the rule: the crop would keep almost all of it, or it is already 4:5 with the face at about 20% or more (17% counts, for the detector's wobble on small photos); left alone |
   | `no-face` | no face found (a logo, a group photo, a profile in shadow); left alone |
   | `missing` | the page points at a file that isn't there                      |

3. **Look at the crops** before applying them:

   ```sh
   uv run scripts/crop_people_photos.py --preview /tmp/crops
   ```

   This writes `people-crops-N.png` sheets to `/tmp/crops`. Each row shows the original
   with the crop in red, the card as it looks now, and the card after cropping.

4. **Crop**:

   ```sh
   uv run scripts/crop_people_photos.py --apply
   ```

   Each photo is overwritten in place, with the same file name and format, so the pages
   need no change. A copy of each original is saved first in
   `scripts/.crop-backups/<date-time>/` (ignored by git). Delete that folder once you're
   happy with the result.

5. **Check and commit**: `git status` shows the cropped photos as changed. Preview the
   site (`npx @11ty/eleventy --serve`) if you like, then commit and push as usual.

## Options

| Option | Use |
|---|---|
| `--since-days N` | what counts as recently added: added or replaced in the last `N` days (default: 30), e.g. `--since-days 90` |
| `--since-days all` | check every photo the seven pages show, whatever its age |
| `PATH ...` | check just these photos, whatever their age, e.g. `uv run scripts/crop_people_photos.py assets/images/people/interns/AkhilT.jpg` |
| `--dummy` | change nothing, only list what would change (the default) |
| `--apply` | crop the photos (can't be combined with `--dummy`) |
| `--preview DIR` | write before/after sheets to `DIR` (with either mode) |

New or changed photos that aren't committed yet always count as recent.

**`--since-days all` changes almost every older photo.** Most older photos are 3:4 or
square, so they don't meet the rule. Look at the `--preview` sheets before running
`--since-days all --apply`.

## Undoing a crop

- **Before committing**: copy the original back from `scripts/.crop-backups/<date-time>/`,
  or for a photo that was already committed, `git checkout -- <path>`.
- **After committing**: `git show <commit>^:<path> > <path>` restores the photo as it was
  before that commit.

## Notes

- The script works from what the seven pages show, not from the folders: a photo in
  `assets/images/people/` that no page shows is not touched. Postdoc photos live in
  `assets/images/people/staff/` too. If a photo is ever shown on two pages, cropping it
  changes both.
- The rule's numbers are at the top of the script (`ASPECT`, `MIN_SHARE`, `MAX_SHARE`, `EDGE_SHARE`,
  `MAX_WIDTH`). They match the visitor crop in the internal editor
  (`outreach_automations/internal_webapp/src/internal_editor/visitors/profile_crop.py`);
  change both together.
