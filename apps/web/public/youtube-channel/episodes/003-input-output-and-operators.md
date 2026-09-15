# Episode 003 — Input, Output, and Operators

## Packaging

**Primary title:** Python Input, Output, and Operators—Build an Interactive Program

**Thumbnail:** `MAKE IT INTERACTIVE`

**Target length:** 10–12 minutes

**Promise:** Read user input, convert it safely for the lesson, calculate results, and format useful output.

## Script

### 0:00–0:20 — Hook

> A program becomes useful when it accepts information, processes it, and returns a result. Today we will build a trip-cost estimator while learning input, output, arithmetic, and comparisons.

Show the finished calculation and result.

### 0:20–1:40 — Input always returns text

```python
distance_text = input("Trip distance in miles: ")
print(distance_text)
print(type(distance_text))
```

> Even if the user types digits, `input()` returns a string. Convert before doing arithmetic.

```python
distance = float(input("Trip distance in miles: "))
```

Mention that invalid input will raise `ValueError`; robust handling comes in Episode 11.

### 1:40–4:10 — Arithmetic operators

Show one operation at a time:

```python
print(10 + 3)   # addition
print(10 - 3)   # subtraction
print(10 * 3)   # multiplication
print(10 / 3)   # true division
print(10 // 3)  # floor division
print(10 % 3)   # remainder
print(10 ** 3)  # exponentiation
```

> `/` returns a floating-point result. `//` floors the result toward negative infinity; it is not simply “remove the decimal” for negative numbers. `%` gives the corresponding remainder.

Demonstrate precedence and readable parentheses:

```python
total = 10 + 2 * 5
clear_total = 10 + (2 * 5)
different_total = (10 + 2) * 5
```

### 4:10–5:20 — Assignment shortcuts

```python
score = 10
score += 5
score *= 2
print(score)
```

> `score += 5` means calculate the old score plus five, then assign the result back to `score`.

### 5:20–6:30 — Comparisons and logical results

```python
budget = 75
estimated_cost = 62.50

print(estimated_cost < budget)
print(estimated_cost == budget)
print(estimated_cost != budget)
```

Explain `==` versus assignment `=`. Briefly introduce `and`, `or`, and `not`; defer decisions to Episode 5.

### 6:30–9:20 — Build the estimator

```python
distance = float(input("Trip distance in miles: "))
miles_per_gallon = float(input("Vehicle miles per gallon: "))
fuel_price = float(input("Fuel price per gallon: $"))

gallons_needed = distance / miles_per_gallon
fuel_cost = gallons_needed * fuel_price

print(f"Fuel needed: {gallons_needed:.2f} gallons")
print(f"Estimated fuel cost: ${fuel_cost:.2f}")
```

Explain the data flow and `:.2f` as fixed-point formatting with two digits after the decimal. State that this is an estimate and not financial-grade decimal arithmetic.

### 9:20–10:20 — Challenge and next step

> Add the cost of tolls and divide the final cost among a number of travelers. Test with simple numbers whose result you can check manually.

**CTA:** Build the calculator project next, where the complete program becomes a portfolio artifact.

## Short ideas

1. **`/` versus `//` in 25 seconds.**
2. **Why `input()` plus 1 fails:** input is text until converted.

## Sources

- [Python built-in `input()` and `print()`](https://docs.python.org/3/library/functions.html)
- [Python numeric types and operators](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)
- [Python formatted string literals](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals)

