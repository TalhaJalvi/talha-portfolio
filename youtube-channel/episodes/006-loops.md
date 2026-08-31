# Episode 006 — For and While Loops

## Packaging

**Primary title:** Python Loops Explained: For, While, Break, and Continue

**Thumbnail:** `STOP REPEATING CODE`

**Target length:** 11–13 minutes

**Promise:** Repeat work with `for` and `while`, avoid infinite loops, and control iteration with `break` and `continue`.

## Script

### 0:00–0:20 — Hook

Show five nearly identical `print` lines, replace them with a three-line loop, and run it.

> Computers are designed for repetition. The challenge is describing exactly what repeats, what changes, and when repetition stops.

### 0:20–2:10 — `for` iterates over values

```python
topics = ["variables", "conditions", "loops"]

for topic in topics:
    print(f"Learning {topic}")
```

> A Python `for` loop takes one item at a time from an iterable. The loop variable refers to the current item, and the indented block runs once for each item.

Use `enumerate` when the position is needed:

```python
for position, topic in enumerate(topics, start=1):
    print(f"{position}. {topic}")
```

### 2:10–3:40 — `range`

```python
for number in range(1, 6):
    print(number)
```

> The start is included and the stop is excluded, so this prints one through five. `range(5)` starts at zero. A third argument sets the step.

```python
for countdown in range(5, 0, -1):
    print(countdown)
print("Launch!")
```

### 3:40–5:40 — `while` repeats while a condition is true

```python
attempts_remaining = 3

while attempts_remaining > 0:
    print(f"Attempts remaining: {attempts_remaining}")
    attempts_remaining -= 1

print("Finished")
```

> Use `while` when repetition depends on a changing condition rather than a known collection. Every `while` loop needs a believable path toward `False`; otherwise it may run forever.

Demonstrate stopping a mistaken infinite loop with Ctrl+C, but do not intentionally let it flood the terminal.

### 5:40–7:20 — `break` and `continue`

```python
numbers = [3, -1, 8, 0, 12]

for number in numbers:
    if number < 0:
        continue
    if number == 0:
        break
    print(number)
```

> `continue` skips the rest of the current iteration. `break` exits the nearest loop completely. Use both sparingly; clear conditions are easier to maintain than several escape routes.

### 7:20–9:50 — Practical total and average

```python
scores = [88, 92, 75, 95]
total = 0

for score in scores:
    total += score

average = total / len(scores)
print(f"Average: {average:.1f}")
```

Then show the built-in alternative:

```python
average = sum(scores) / len(scores)
```

> Learning the loop reveals the algorithm; knowing `sum` makes production code clearer. Good Python uses built-ins when they express the intention directly.

Warn against changing a list while iterating over the same list. Build a new list or iterate over a copy.

### 9:50–11:00 — Challenge and CTA

> Print the numbers one through 30. Skip multiples of three, stop completely at 25, and calculate the total of the values that were actually printed.

**CTA:** Learn functions next so repeated logic can receive inputs and return reusable results.

## Short ideas

1. **`for` versus `while` in 30 seconds.**
2. **`break` versus `continue` with a visual path.**

## Sources

- [Python tutorial: `for` statements and `range`](https://docs.python.org/3/tutorial/controlflow.html#for-statements)
- [Python tutorial: `break` and `continue`](https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements)
- [Python built-ins: `enumerate`, `len`, and `sum`](https://docs.python.org/3/library/functions.html)

