# Agent Instructions

## Python tooling

- **Always use `uv` instead of `pip`** for Python package management — in every project, everywhere.
  - Install packages: `uv pip install <pkg>` (or `uv add <pkg>` in a uv-managed project).
  - Run tools/scripts: `uv run <cmd>` or `uvx <tool>` instead of installing globally.
  - Never invoke `pip`, `pip install`, or `python -m pip` directly.
  - If `uv` is missing, install it first (e.g. `curl -LsSf https://astral.sh/uv/install.sh | sh`) rather than falling back to pip.
