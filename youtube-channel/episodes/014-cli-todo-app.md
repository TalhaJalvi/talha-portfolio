# Episode 014 — Command-Line To-Do Application

## Packaging

**Primary title:** Build a Python To-Do App That Saves Your Tasks

**Thumbnail:** `REAL PYTHON APP`

**Target length:** 18–22 minutes

**Promise:** Build a persistent command-line application with a menu, functions, validation, JSON storage, and a clean entry point.

## Script

### 0:00–0:30 — Demo and architecture

Show adding, listing, completing, quitting, and reopening the app with data intact.

> This is no longer an isolated exercise. It has state, storage, user commands, validation, and several cooperating functions.

Show the flow:

```text
main loop → command function → tasks list → JSON storage
```

### 0:30–2:00 — Define the data

Each task is a dictionary:

```python
{
    "title": "Record Python video",
    "completed": False,
}
```

All tasks live in a list, which JSON can represent directly.

### 2:00–5:20 — Storage functions

```python
import json
from pathlib import Path


DATA_PATH = Path("data") / "tasks.json"


def load_tasks():
    if not DATA_PATH.exists():
        return []

    try:
        with DATA_PATH.open(encoding="utf-8") as file:
            data = json.load(file)
    except (OSError, json.JSONDecodeError) as error:
        print(f"Could not load tasks: {error}")
        return []

    if not isinstance(data, list):
        print("Task file has an unexpected format.")
        return []

    return data


def save_tasks(tasks):
    DATA_PATH.parent.mkdir(exist_ok=True)
    with DATA_PATH.open("w", encoding="utf-8") as file:
        json.dump(tasks, file, indent=2)
```

> A missing file means a new user, not an error. Malformed JSON and operating-system failures are reported separately from normal absence. Returning an empty list is a simple recovery policy; a production application might preserve and repair the damaged file instead.

### 5:20–8:30 — List and add

```python
def list_tasks(tasks):
    if not tasks:
        print("No tasks yet.")
        return

    for index, task in enumerate(tasks, start=1):
        marker = "x" if task.get("completed", False) else " "
        title = task.get("title", "Untitled task")
        print(f"{index}. [{marker}] {title}")


def add_task(tasks):
    title = input("Task title: ").strip()
    if not title:
        print("A task title cannot be empty.")
        return

    tasks.append({"title": title, "completed": False})
    save_tasks(tasks)
    print("Task added.")
```

Explain why persistence occurs immediately after a successful change.

### 8:30–11:30 — Complete by visible number

```python
def read_task_index(tasks):
    try:
        visible_number = int(input("Task number: "))
    except ValueError:
        print("Enter a whole-number task position.")
        return None

    index = visible_number - 1
    if index < 0 or index >= len(tasks):
        print("That task does not exist.")
        return None

    return index


def complete_task(tasks):
    list_tasks(tasks)
    if not tasks:
        return

    index = read_task_index(tasks)
    if index is None:
        return

    tasks[index]["completed"] = True
    save_tasks(tasks)
    print("Task completed.")
```

> Viewers see positions starting at one, while list indexes start at zero. Convert once, validate, and then use the internal index.

### 11:30–15:20 — Application loop

```python
def show_menu():
    print("\nTo-Do App")
    print("1. List tasks")
    print("2. Add task")
    print("3. Complete task")
    print("4. Exit")


def main():
    tasks = load_tasks()

    while True:
        show_menu()
        choice = input("Choose an option: ").strip()

        if choice == "1":
            list_tasks(tasks)
        elif choice == "2":
            add_task(tasks)
        elif choice == "3":
            complete_task(tasks)
        elif choice == "4":
            print("Goodbye.")
            break
        else:
            print("Choose 1, 2, 3, or 4.")


if __name__ == "__main__":
    main()
```

Explain that `main` owns the app state and passes the list into focused functions.

### 15:20–17:30 — Test and README

Test:

- First run with no data directory
- Blank task title
- Several tasks and correct numbering
- Text, zero, negative, and too-large positions
- Exit and restart
- Intentionally malformed JSON on a disposable copy

README sections: purpose, requirements, run command, features, data format, limitations, and future improvements.

### 17:30–19:00 — Challenge and CTA

> Add delete, edit, and “show incomplete only.” Then split storage into `storage.py` and application behavior into `main.py`.

**CTA:** Next, debug this application systematically and protect its calculation functions with automated tests.

## Short ideas

1. **How JSON makes a Python app remember tasks.**
2. **Convert a user-visible number into a validated list index.**

## Sources

- [Python tutorial: JSON](https://docs.python.org/3/tutorial/inputoutput.html#saving-structured-data-with-json)
- [Python `json` module](https://docs.python.org/3/library/json.html)
- [Python `pathlib`](https://docs.python.org/3/library/pathlib.html)
- [Python main-module behavior](https://docs.python.org/3/library/__main__.html)

