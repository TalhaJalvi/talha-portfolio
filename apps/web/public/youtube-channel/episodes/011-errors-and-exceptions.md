# Episode 011 — Errors and Exception Handling

## Packaging

**Primary title:** Python Errors and Exceptions—Read, Fix, and Handle Them

**Thumbnail:** `ERRORS ARE CLUES`

**Target length:** 13–15 minutes

**Promise:** Distinguish syntax errors from exceptions, read tracebacks, catch specific failures, clean up reliably, and raise meaningful errors.

## Script

### 0:00–0:20 — Hook

> Errors are not proof that you cannot program. They are structured reports about what Python expected, what happened, and where to investigate. Today we will learn to read them before learning to catch them.

### 0:20–2:10 — Syntax errors versus exceptions

Create a syntax error, then run valid syntax that raises `ValueError` with `int("hello")`.

> A `SyntaxError` means Python could not parse the program. An exception happens while valid syntax is executing.

### 2:10–3:30 — Read the traceback from the bottom

> Begin with the final line: exception type and message. Then move upward through your own file names and line numbers to reconstruct the calls. The indicated position can be just after the actual syntax mistake.

### 3:30–6:10 — Catch expected exceptions

```python
try:
    age = int(input("Age: "))
except ValueError:
    print("Enter age as a whole number.")
else:
    print(f"Next year you will be {age + 1}.")
```

> Put only the operation expected to fail inside `try`. Catch the specific exception you understand. `else` runs only when no exception occurred in `try`. A broad `except Exception` can hide unrelated defects.

### 6:10–8:20 — Retry pattern

```python
def read_positive_number(prompt):
    while True:
        try:
            value = float(input(prompt))
        except ValueError:
            print("Enter a valid number.")
            continue

        if value <= 0:
            print("The number must be greater than zero.")
            continue

        return value
```

Differentiate invalid representation (`ValueError`) from a valid number that violates the application's rule (`value <= 0`).

### 8:20–9:40 — Cleanup with `finally`

> A `finally` block runs whether protected work succeeds or fails. Context managers such as `with open(...)` are usually clearer for files, which we will use next.

### 9:40–11:20 — Raise meaningful errors

```python
def calculate_average(scores):
    if not scores:
        raise ValueError("scores must contain at least one value")
    return sum(scores) / len(scores)
```

> Raise an exception when a function cannot fulfill its contract. Say what was invalid and what the caller must provide.

### 11:20–13:00 — Repair the calculator

```python
try:
    first = float(input("First number: "))
    second = float(input("Second number: "))
    result = first / second
except ValueError:
    print("Both inputs must be numbers.")
except ZeroDivisionError:
    print("The second number cannot be zero.")
else:
    print(f"Result: {result}")
```

### 13:00–14:00 — Challenge and CTA

> Create `read_age()` that keeps asking until it receives a whole number from 0 through 120. Handle conversion errors separately from range validation.

**CTA:** Next, persist data in text and JSON files using context managers.

## Short ideas

1. **How to read a Python traceback from the bottom.**
2. **Why broad exception handling hides useful information.**

## Sources

- [Python tutorial: syntax errors and exceptions](https://docs.python.org/3/tutorial/errors.html)
- [Python tutorial: handling exceptions](https://docs.python.org/3/tutorial/errors.html#handling-exceptions)
- [Python tutorial: raising exceptions and cleanup](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)

