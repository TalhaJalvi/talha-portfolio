# Episode 015 — Debugging and Beginner Testing

## Packaging

**Primary title:** How to Debug Python Code and Write Your First Unit Tests

**Thumbnail:** `FIND THE BUG`

**Target length:** 16–19 minutes

**Promise:** Reproduce defects, form hypotheses, inspect state with a debugger, separate pure logic, and write automated tests using `unittest`.

## Script

### 0:00–0:25 — Hook

> Debugging is not staring at code until the answer appears. It is a repeatable process: reproduce, isolate, inspect, change one cause, and verify. Tests make that verification repeatable.

Show a wrong total turning green after a fix and test run.

### 0:25–2:30 — Create a reproducible failure

```python
def completion_percentage(completed, total):
    return completed / 100


print(completion_percentage(4, 10))  # expected 0.4, receives 0.04
```

> Write down the input, expected result, and actual result. “It does not work” is not yet a useful bug report.

Use the smallest failing case and confirm the function receives `4` and `10`.

### 2:30–4:20 — Read evidence before editing

Debugging checklist:

1. Read the complete error or unexpected output.
2. Reproduce consistently.
3. Reduce unrelated code.
4. Inspect values and types near the first incorrect state.
5. State a hypothesis.
6. Change one thing.
7. rerun both failing and previously working cases.

> A later wrong value is often a symptom. Find the earliest point at which reality differs from your expectation.

### 4:20–6:00 — Temporary diagnostic output

```python
def completion_percentage(completed, total):
    print(f"DEBUG completed={completed!r}, total={total!r}")
    result = completed / 100
    print(f"DEBUG result={result!r}")
    return result
```

Explain `!r` as a representation useful for distinguishing strings from numbers. Remove temporary output after the investigation; use proper logging in larger applications.

### 6:00–9:00 — Use `breakpoint()` and `pdb`

```python
def completion_percentage(completed, total):
    breakpoint()
    return completed / 100
```

Demonstrate debugger commands:

```text
p completed     print a value
p total         print another value
n               execute the next line
s               step into a function call
c               continue execution
l               list nearby source
q               quit the debugger
```

> A breakpoint pauses inside the actual runtime state. Never leave an accidental breakpoint in code other people will run.

Fix:

```python
def completion_percentage(completed, total):
    if total <= 0:
        raise ValueError("total must be greater than zero")
    return completed / total
```

### 9:00–12:40 — First unit tests

`calculations.py` contains the corrected function. Create `test_calculations.py`:

```python
import unittest

from calculations import completion_percentage


class CompletionPercentageTests(unittest.TestCase):
    def test_partial_completion(self):
        result = completion_percentage(4, 10)
        self.assertAlmostEqual(result, 0.4)

    def test_complete(self):
        self.assertEqual(completion_percentage(10, 10), 1.0)

    def test_zero_total_is_rejected(self):
        with self.assertRaises(ValueError):
            completion_percentage(0, 0)


if __name__ == "__main__":
    unittest.main()
```

Run:

```bash
python -m unittest -v
```

> Each test arranges an input, acts by calling the function, and asserts an observable result. `assertAlmostEqual` is useful for floating-point results. Test behavior, not internal implementation details.

### 12:40–14:30 — Red, green, refactor

1. **Red:** write a test that demonstrates missing or incorrect behavior.
2. **Green:** make the smallest clear change that passes.
3. **Refactor:** improve structure while tests continue to pass.

> Passing tests do not prove the program has no defects. They confirm only the cases represented. Select normal, boundary, and invalid cases.

### 14:30–16:20 — Make the to-do app testable

Extract logic that does not call `input` or write files:

```python
def mark_completed(tasks, index):
    if index < 0 or index >= len(tasks):
        raise IndexError("task index is outside the list")
    tasks[index]["completed"] = True
```

> Separating pure decisions from input/output makes tests fast and deterministic. Thin interface functions can translate user choices into calls to tested logic.

### 16:20–17:20 — Challenge and CTA

> Add tests for an empty task title, valid completion, negative index, and too-large index. Intentionally break one condition and confirm the test fails for the reason you expected.

**CTA:** Use the complete workflow in the fundamentals capstone: an expense tracker designed for future OOP and database upgrades.

## Short ideas

1. **The seven-step debugging loop.**
2. **A first Python unit test in 30 seconds.**

## Sources

- [Python debugger documentation](https://docs.python.org/3/library/pdb.html)
- [Python `breakpoint()`](https://docs.python.org/3/library/functions.html#breakpoint)
- [Python `unittest` framework](https://docs.python.org/3/library/unittest.html)
- [Python `unittest` command-line interface](https://docs.python.org/3/library/unittest.html#command-line-interface)

