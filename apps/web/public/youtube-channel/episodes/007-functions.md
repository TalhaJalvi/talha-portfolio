# Episode 007 — Python Functions

## Packaging

**Primary title:** Python Functions Explained—Parameters, Return Values, and Scope

**Thumbnail:** `REUSE YOUR CODE`

**Target length:** 12–14 minutes

**Promise:** Extract logic into functions, pass arguments correctly, return values, and avoid common scope and default-argument mistakes.

## Script

### 0:00–0:20 — Hook

> Copying the same calculation three times creates three places for mistakes. A function gives that behavior one name, one definition, and as many uses as we need.

Show repeated discount code becoming `calculate_discount(...)`.

### 0:20–2:20 — Define and call

```python
def greet():
    print("Welcome to Python!")


greet()
greet()
```

> `def` creates the function definition. The body does not run until the function is called. The blank lines are style for readability, not a requirement for execution.

### 2:20–4:20 — Parameters and arguments

```python
def greet(name):
    print(f"Welcome, {name}!")


greet("Maya")
greet("Jordan")
```

> `name` is a parameter in the definition. `"Maya"` is the argument supplied during this call.

Add multiple and keyword arguments:

```python
def calculate_total(price, quantity, tax_rate=0.08):
    subtotal = price * quantity
    return subtotal * (1 + tax_rate)


print(calculate_total(20, 3))
print(calculate_total(price=20, quantity=3, tax_rate=0.10))
```

Explain that required parameters come before parameters with defaults.

### 4:20–6:20 — Return is different from print

```python
def square(number):
    return number * number


result = square(5)
print(result)
```

> `print` displays information. `return` sends a value back to the caller so it can be stored, tested, combined, or displayed later. When execution reaches `return`, that function call ends.

Show a function without explicit `return` producing `None`.

### 6:20–7:50 — Local scope

```python
def create_message(name):
    message = f"Hello, {name}"
    return message


greeting = create_message("Maya")
print(greeting)
```

> `message` is local to the function call. Prefer passing data in and returning data out instead of changing global values invisibly.

### 7:50–9:00 — The mutable-default trap

Show the safe form:

```python
def add_topic(topic, topics=None):
    if topics is None:
        topics = []
    topics.append(topic)
    return topics
```

> Default values are evaluated when the function is defined. Reusing a list as a default can accidentally share state between calls, so `None` is the usual sentinel when a fresh collection is needed.

### 9:00–11:20 — Refactor a real calculation

```python
def calculate_average(numbers):
    if not numbers:
        return None
    return sum(numbers) / len(numbers)


scores = [82, 91, 76, 95]
average = calculate_average(scores)

if average is None:
    print("No scores available")
else:
    print(f"Average: {average:.1f}")
```

Discuss one responsibility, descriptive verbs, and testing empty input.

### 11:20–12:20 — Challenge and CTA

> Write `convert_fahrenheit_to_celsius(temperature)` and `describe_temperature(celsius)`. One calculates; the other classifies. Return values instead of printing inside the calculation.

**CTA:** Use conditions, loops, and functions together in the number-guessing game.

## Short ideas

1. **`return` versus `print`.**
2. **Parameter versus argument.**

## Sources

- [Python tutorial: defining functions](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)
- [Python tutorial: default argument values](https://docs.python.org/3/tutorial/controlflow.html#default-argument-values)
- [Python tutorial: keyword arguments](https://docs.python.org/3/tutorial/controlflow.html#keyword-arguments)

