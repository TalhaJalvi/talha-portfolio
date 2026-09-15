# Episode 013 — Modules, Packages, Pip, and Virtual Environments

## Packaging

**Primary title:** Python Modules, Pip, and Virtual Environments—The Practical Guide

**Thumbnail:** `STRUCTURE REAL PROJECTS`

**Target length:** 15–18 minutes

**Promise:** Split code into modules, import deliberately, isolate dependencies, install packages into the intended interpreter, and record reproducible requirements.

## Script

### 0:00–0:25 — Hook

> A single file works for a tiny exercise. Real projects need separated responsibilities and isolated dependencies. Today we will turn one script into a small project another developer can understand and run.

### 0:25–3:20 — Create and import a module

Show:

```text
course_tracker/
├── main.py
└── calculations.py
```

`calculations.py`:

```python
def completion_percentage(completed, total):
    if total <= 0:
        raise ValueError("total must be greater than zero")
    return completed / total
```

`main.py`:

```python
from calculations import completion_percentage


progress = completion_percentage(7, 16)
print(f"Progress: {progress:.0%}")
```

> A module is a Python file. Importing makes its definitions available. Keep imports at the top, and avoid wildcard imports because they hide where names originated.

### 3:20–4:40 — Module execution and `__name__`

```python
def main():
    print("Course tracker started")


if __name__ == "__main__":
    main()
```

> When a file runs directly, Python sets its `__name__` to `"__main__"`. When imported, its module name is used. This guard keeps startup behavior from running merely because tests or another module import the file.

### 4:40–6:00 — Modules versus packages

```text
course_tracker/
├── main.py
└── tracker/
    ├── __init__.py
    ├── calculations.py
    └── storage.py
```

> A package organizes modules under a dotted namespace. An `__init__.py` file is useful for a regular package and makes beginner project intent explicit, although Python also supports namespace packages without it.

### 6:00–9:20 — Create a virtual environment

Linux/macOS:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Windows PowerShell:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
```

Verify:

```bash
python -c "import sys; print(sys.executable)"
python -m pip --version
```

> The environment gives the project its own interpreter context and installed packages. Activation adjusts the shell path for convenience; you can also invoke the environment's interpreter directly. Do not commit `.venv` to Git.

### 9:20–12:20 — Install deliberately

```bash
python -m pip install requests
python -m pip show requests
python -m pip list
```

> `python -m pip` ties pip to the interpreter named by `python`, reducing “installed successfully but import fails” confusion. Install only packages you have identified and reviewed; package names can be impersonated.

Record dependencies:

```bash
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
```

Explain that `freeze` captures the full environment and is convenient for this beginner project; modern packaging can instead declare direct dependencies in `pyproject.toml`.

### 12:20–14:30 — Standard library versus third party

> `json`, `pathlib`, `random`, and `unittest` ship with Python and do not need pip. `requests` is third-party and must be installed. Check documentation before installing something merely because an import failed.

Show `.gitignore`:

```text
.venv/
__pycache__/
*.pyc
```

### 14:30–16:00 — Challenge and CTA

> Split an existing calculator into `main.py` and `calculations.py`, add the main guard, create `.venv`, and write a README containing the exact setup commands. No third-party package is necessary.

**CTA:** Build the command-line to-do application using modules and JSON storage.

## Short ideas

1. **Why use `python -m pip` instead of guessing which pip runs.**
2. **What a virtual environment isolates.**

## Sources

- [Python tutorial: modules](https://docs.python.org/3/tutorial/modules.html)
- [Python tutorial: packages](https://docs.python.org/3/tutorial/modules.html#packages)
- [Python tutorial: virtual environments and packages](https://docs.python.org/3/tutorial/venv.html)
- [Python Packaging User Guide: installing packages](https://packaging.python.org/en/latest/tutorials/installing-packages/)

