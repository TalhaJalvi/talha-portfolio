# Episode 004 — Beginner Calculator Project

## Packaging

**Primary title:** Build Your First Python Project: Beginner Calculator

**Thumbnail:** `FIRST PROJECT`

**Target length:** 10–12 minutes

**Promise:** Plan, implement, test, and improve a complete two-number calculator using only the first three lessons.

## Script

### 0:00–0:20 — Result first

Run the finished calculator with `12` and `5`, showing addition, subtraction, multiplication, division, floor division, remainder, and exponentiation.

> This is our first complete project. More importantly, I will show you how to turn an idea into steps before writing code.

### 0:20–1:30 — Define the smallest useful version

Show requirements:

```text
1. Ask for two numbers
2. Calculate common operations
3. Display readable results
4. Test expected and awkward inputs
```

> We are deliberately not adding menus or error handling yet. A focused version that works is better than ten unfinished features.

### 1:30–3:00 — Capture the data

```python
print("Two-Number Calculator")

first_number = float(input("First number: "))
second_number = float(input("Second number: "))
```

Explain why `float` accepts both `5` and `5.5`, and why readable names beat `a` and `b` in beginner code.

### 3:00–5:50 — Calculate

```python
addition = first_number + second_number
subtraction = first_number - second_number
multiplication = first_number * second_number
division = first_number / second_number
floor_division = first_number // second_number
remainder = first_number % second_number
power = first_number ** second_number
```

> Separating calculation from display makes the program easier to inspect and change. The second number cannot be zero for division, floor division, or remainder; for this version, tell viewers to use a nonzero second number. Episode 5 will let the program enforce that rule.

### 5:50–7:20 — Present the results

```python
print(f"{first_number} + {second_number} = {addition}")
print(f"{first_number} - {second_number} = {subtraction}")
print(f"{first_number} × {second_number} = {multiplication}")
print(f"{first_number} / {second_number} = {division}")
print(f"{first_number} // {second_number} = {floor_division}")
print(f"{first_number} % {second_number} = {remainder}")
print(f"{first_number} ** {second_number} = {power}")
```

If terminal/font compatibility is uncertain, use `*` rather than the multiplication symbol in the displayed text.

### 7:20–9:20 — Test systematically

Run these cases:

| Inputs | Reason |
|---|---|
| `12`, `5` | Normal positive values |
| `-8`, `2` | Negative value |
| `2.5`, `4` | Decimal value |
| `5`, `0` | Reveals division-by-zero weakness |

> Testing is not randomly running a program. Choose inputs that exercise normal behavior, boundaries, and known weaknesses. Record the zero failure; do not hide it. It becomes the reason to learn conditionals.

### 9:20–10:20 — Challenge and CTA

> Add percentage, average, and a formatted two-decimal result. Put the project in a GitHub repository with a README explaining how to run it and documenting the zero limitation.

**CTA:** Learn `if`, `elif`, and `else` so the calculator can respond safely when the second number is zero.

## Short ideas

1. **Seven calculations from two Python inputs.**
2. **Why good projects reveal their weaknesses:** show the zero test leading into conditionals.

## Sources

- [Python tutorial: numbers](https://docs.python.org/3/tutorial/introduction.html#numbers)
- [Python numeric operations](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)
- [Python input and output](https://docs.python.org/3/tutorial/inputoutput.html)

