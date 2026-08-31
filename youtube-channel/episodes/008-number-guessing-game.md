# Episode 008 — Number Guessing Game Project

## Packaging

**Primary title:** Build a Number Guessing Game in Python (Beginner Project)

**Thumbnail:** `GUESS THE NUMBER`

**Target length:** 12–15 minutes

**Promise:** Combine imports, functions, loops, conditionals, and input validation into a playable project.

## Script

### 0:00–0:25 — Demo

Play one shortened round. Show invalid input, a “too high” hint, and a win.

> This project combines everything from the first seven lessons. We will plan the game, build one behavior at a time, and test more than just the happy path.

### 0:25–1:30 — Rules and state

```text
- Secret number from 1 through 100
- At most 7 valid guesses
- Higher/lower hints
- Invalid text does not consume an attempt
- Win or reveal the answer
```

Identify changing state: `secret_number`, `attempts_used`, and current `guess`.

### 1:30–3:10 — Generate a secret

```python
import random


secret_number = random.randint(1, 100)
```

> `randint(1, 100)` includes both endpoints. This randomness is appropriate for a game, not for passwords or security tokens.

### 3:10–5:20 — Validate beginner input

```python
guess_text = input("Enter a whole number from 1 to 100: ").strip()

if not guess_text.isdigit():
    print("Please enter digits only.")
```

> `isdigit()` is a deliberately narrow solution for positive whole numbers. It rejects negatives and decimals, which matches our game. Later, exception handling will give us a more general conversion pattern.

### 5:20–9:30 — Complete game

```python
import random


def play_game():
    secret_number = random.randint(1, 100)
    maximum_attempts = 7
    attempts_used = 0

    print("I selected a number from 1 through 100.")

    while attempts_used < maximum_attempts:
        guess_text = input("Your guess: ").strip()

        if not guess_text.isdigit():
            print("Enter a whole number using digits.")
            continue

        guess = int(guess_text)

        if guess < 1 or guess > 100:
            print("Your guess must be from 1 through 100.")
            continue

        attempts_used += 1

        if guess == secret_number:
            print(f"Correct! You used {attempts_used} attempts.")
            return
        if guess < secret_number:
            print("Too low.")
        else:
            print("Too high.")

        remaining = maximum_attempts - attempts_used
        print(f"Attempts remaining: {remaining}")

    print(f"Game over. The number was {secret_number}.")


play_game()
```

Trace one iteration visually. Explain why `continue` precedes `attempts_used += 1`, and why `return` ends the function immediately on a win.

### 9:30–11:20 — Test cases

- Letters such as `hello`
- Blank input
- `0`, `1`, `100`, and `101`
- A correct guess
- Seven incorrect valid guesses

For recording, temporarily set `secret_number = 42` to demonstrate predictable paths, then restore randomness.

### 11:20–12:30 — Challenge and CTA

> Add difficulty levels, a replay option, and a score based on attempts remaining. Keep each new behavior in a small function.

**CTA:** Learn strings deeply next; almost every user-facing Python program needs reliable text processing.

## Short ideas

1. **Why `randint(1, 100)` can return 100.**
2. **A useful `continue` pattern for invalid input.**

## Sources

- [Python `random.randint`](https://docs.python.org/3/library/random.html#random.randint)
- [Python string methods](https://docs.python.org/3/library/stdtypes.html#string-methods)
- [Python `while`, `break`, and `continue`](https://docs.python.org/3/reference/compound_stmts.html#the-while-statement)

