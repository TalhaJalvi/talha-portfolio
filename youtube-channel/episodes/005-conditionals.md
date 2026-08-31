# Episode 005 — If, Elif, and Else

## Packaging

**Primary title:** Python If, Elif, and Else—Make Programs Decide

**Thumbnail:** `MAKE A DECISION`

**Target length:** 10–12 minutes

**Promise:** Build correct decision branches using comparisons, Boolean operators, and readable condition order.

## Script

### 0:00–0:20 — Hook

> Our calculator crashes when the second number is zero. Humans see the danger before dividing; now we will teach the program to see it too.

Show the failure, then show a friendly zero message.

### 0:20–2:10 — The basic branch

```python
temperature = 82

if temperature > 80:
    print("It is warm.")
else:
    print("It is not warm.")
```

> Python evaluates the condition. If it is `True`, the indented block runs. Otherwise, the `else` block runs. The colon opens the block, and consistent indentation defines which instructions belong to it.

### 2:10–3:30 — Multiple exclusive branches

```python
score = 84

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "Needs improvement"

print(grade)
```

> Python checks from top to bottom and executes only the first matching branch. Order therefore matters. If `score >= 70` appeared first, a score of 95 would never reach the A branch.

### 3:30–5:20 — Comparisons and Boolean operators

```python
age = 23
has_ticket = True

can_enter = age >= 18 and has_ticket
needs_help = age < 18 or not has_ticket

print(can_enter)
print(needs_help)
```

Cover `==`, `!=`, `<`, `<=`, `>`, `>=`, `and`, `or`, `not`, and membership:

```python
role = "editor"
if role in {"editor", "admin"}:
    print("Editing allowed")
```

Use `value is None` for a missing sentinel; do not teach `is` as a replacement for `==`.

### 5:20–6:30 — Truthiness

```python
username = ""

if username:
    print(f"Welcome, {username}")
else:
    print("Username is required")
```

> Empty strings and collections, numeric zero, `False`, and `None` are false in a Boolean context. Other values are generally true. Explicit comparisons are sometimes clearer, so choose readability over cleverness.

### 6:30–8:40 — Repair the calculator

```python
first_number = float(input("First number: "))
second_number = float(input("Second number: "))

print(f"Sum: {first_number + second_number}")
print(f"Product: {first_number * second_number}")

if second_number == 0:
    print("Division and remainder are unavailable when the second number is zero.")
else:
    print(f"Division: {first_number / second_number}")
    print(f"Remainder: {first_number % second_number}")
```

Point out that only the unsafe operations need the branch.

### 8:40–10:00 — Challenge and CTA

> Build a shipping-price decision: free shipping at $50 or above, $5 shipping otherwise, but reject negative order values. Arrange the branches from exceptional to general and test `-1`, `0`, `49.99`, and `50`.

**CTA:** Continue to loops, where one decision can be repeated across many values.

## Short ideas

1. **Why condition order changes the result.**
2. **`==` versus `is` in beginner terms:** equality versus identity; use `is None` for the sentinel.

## Sources

- [Python tutorial: `if` statements](https://docs.python.org/3/tutorial/controlflow.html#if-statements)
- [Python truth-value testing](https://docs.python.org/3/library/stdtypes.html#truth-value-testing)
- [Python comparisons](https://docs.python.org/3/library/stdtypes.html#comparisons)

