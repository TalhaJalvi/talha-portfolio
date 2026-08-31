# Episode 002 — Python Variables and Data Types

## Packaging

**Primary title:** Python Variables and Data Types Explained for Beginners

**Alternative:** Stop Guessing What Python Variables Mean

**Thumbnail:** `DATA HAS TYPES`

**Target length:** 9–11 minutes

**Promise:** Create meaningful variables, recognize Python's core beginner types, inspect values with `type()`, and avoid common conversion mistakes.

## Script

### 0:00–0:20 — Hook

> Why does Python add `5 + 5` to produce `10`, but combine `"5" + "5"` to produce `"55"`? The values look similar to us, but Python sees different data types. By the end of this lesson, you will know how programs remember values and why their types change what Python can do.

Show both expressions and outputs immediately.

### 0:20–1:20 — Names refer to values

Type:

```python
student_name = "Maya"
lessons_completed = 3
```

> The equals sign here is assignment, not a mathematical claim. Python evaluates the value on the right and binds the name on the left to it. People often describe a variable as a box, which is useful at first, but the more accurate idea is a label referring to a value.

Reassign and display:

```python
lessons_completed = 3
lessons_completed = lessons_completed + 1
print(lessons_completed)
```

### 1:20–2:10 — Naming rules

> A name may contain letters, digits, and underscores, but cannot begin with a digit. Names are case-sensitive, so `score` and `Score` are different. Python convention uses descriptive `snake_case` names.

Show good names: `user_age`, `total_price`, `is_logged_in`. Contrast them with `x1`, `thing`, and `a` outside a tiny formula.

### 2:10–5:00 — Core types

Build a profile:

```python
name = "Maya"            # str: text
age = 24                 # int: whole number
height = 1.68            # float: decimal number
is_learning = True       # bool: True or False
middle_name = None       # no value yet

print(type(name))
print(type(age))
print(type(height))
print(type(is_learning))
print(type(middle_name))
```

Explain that comments begin with `#`, strings use quotes, booleans use capitalized `True` and `False`, and `None` represents the absence of a value. Mention that floating-point values are approximations, so finance requires more care than this beginner example.

### 5:00–6:30 — Dynamic typing without mystery

```python
current_value = 10
print(type(current_value))

current_value = "ten"
print(type(current_value))
```

> Python is dynamically typed: the name can later refer to a value of another type. That flexibility does not mean types are absent—the values still have types, and invalid combinations still fail.

Demonstrate and then fix:

```python
age = 24
print("Next year you will be", age + 1)
```

### 6:30–8:00 — Explicit conversion

```python
text_number = "25"
number = int(text_number)
decimal = float("19.99")
message = str(404)

print(number + 5)
print(decimal)
print(message + " error")
```

> Conversion works only when the content has a valid representation. `int("hello")` raises an error. We will learn to handle that safely in the exceptions lesson.

Warn against this trap:

```python
print(bool("False"))  # True because the string is not empty
```

### 8:00–9:00 — Challenge and recap

> Create variables for a course name, number of lessons, price, whether enrollment is open, and an optional discount code. Print each value and its type. Then increase the lesson count by one.

Recap: names, assignment, `str`, `int`, `float`, `bool`, `None`, `type()`, and explicit conversions.

**CTA:** Continue to Input, Output, and Operators to make these values interactive.

## Short ideas

1. **Why `"5" + "5"` equals `"55"`:** contrast string concatenation with integer addition.
2. **The `bool("False")` trap:** explain that any non-empty string is truthy.

## Sources

- [Python tutorial: numbers and text](https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator)
- [Python built-in types](https://docs.python.org/3/library/stdtypes.html)
- [Python built-in functions: `type`, `int`, `float`, and `str`](https://docs.python.org/3/library/functions.html)

