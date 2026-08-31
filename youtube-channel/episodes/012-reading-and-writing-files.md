# Episode 012 — Reading and Writing Files

## Packaging

**Primary title:** Python File Handling: Read, Write, Append, and Save JSON

**Thumbnail:** `SAVE YOUR DATA`

**Target length:** 14–17 minutes

**Promise:** Work with paths, safely read and write UTF-8 text, understand file modes, and persist structured data as JSON.

## Script

### 0:00–0:20 — Hook

> Variables disappear when a program ends. Files let tomorrow's run recover what today's run created. We will save plain text and structured JSON without leaving files accidentally open.

### 0:20–2:00 — Paths with `pathlib`

```python
from pathlib import Path


data_path = Path("data") / "notes.txt"
data_path.parent.mkdir(exist_ok=True)

print(data_path)
print(data_path.exists())
```

> A path identifies a location; it is not the file contents. `pathlib` composes paths in a platform-friendly way. Relative paths start from the process's current working directory, which may differ from the script's folder.

### 2:00–4:40 — Write and append text

```python
from pathlib import Path


notes_path = Path("data") / "notes.txt"
notes_path.parent.mkdir(exist_ok=True)

with notes_path.open("w", encoding="utf-8") as file:
    file.write("Variables store references to values.\n")
    file.write("Loops repeat work.\n")

with notes_path.open("a", encoding="utf-8") as file:
    file.write("Functions organize reusable behavior.\n")
```

> Mode `w` writes and replaces existing content. Mode `a` appends at the end. `with` closes the file even if an exception interrupts the block. Declaring UTF-8 avoids relying on a machine-specific default encoding.

Explicitly warn that `w` can overwrite a file.

### 4:40–6:40 — Read text

```python
with notes_path.open("r", encoding="utf-8") as file:
    contents = file.read()

print(contents)
```

For line-by-line processing:

```python
with notes_path.open(encoding="utf-8") as file:
    for line_number, line in enumerate(file, start=1):
        print(line_number, line.rstrip("\n"))
```

> Iterating avoids loading a very large file at once. `rstrip("\n")` removes the line ending without removing other meaningful surrounding whitespace.

### 6:40–8:30 — Expected file errors

```python
missing_path = Path("data") / "missing.txt"

try:
    text = missing_path.read_text(encoding="utf-8")
except FileNotFoundError:
    print(f"File not found: {missing_path}")
```

Explain that permission and decoding failures are different exceptions and should not all be mislabeled “file not found.”

### 8:30–12:20 — Save structured JSON

```python
import json
from pathlib import Path


progress = {
    "student": "Maya",
    "completed_lessons": ["variables", "loops", "functions"],
    "current_lesson": 12,
}

progress_path = Path("data") / "progress.json"
progress_path.parent.mkdir(exist_ok=True)

with progress_path.open("w", encoding="utf-8") as file:
    json.dump(progress, file, indent=2)

with progress_path.open(encoding="utf-8") as file:
    loaded_progress = json.load(file)

print(loaded_progress["completed_lessons"])
```

> JSON stores interoperable structures such as objects, arrays, strings, numbers, booleans, and null. A Python tuple returns as a JSON array/list, and custom objects are not automatically serializable.

### 12:20–14:00 — Challenge and CTA

> Build a learning journal. Append a dated plain-text note and maintain a JSON list of completed topics. Test the first run when the JSON file does not exist.

**CTA:** Learn modules, packages, pip, and virtual environments so the next projects have a professional structure.

## Short ideas

1. **`w` versus `a` file mode.**
2. **Why `with open` matters.**

## Sources

- [Python tutorial: reading and writing files](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)
- [Python tutorial: saving structured data with JSON](https://docs.python.org/3/tutorial/inputoutput.html#saving-structured-data-with-json)
- [Python `pathlib`](https://docs.python.org/3/library/pathlib.html)

