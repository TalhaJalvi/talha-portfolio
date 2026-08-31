# Episode 016 — Python Fundamentals Capstone: Expense Tracker

## Packaging

**Primary title:** Build a Complete Expense Tracker with Python and JSON

**Thumbnail:** `PYTHON CAPSTONE`

**Target length:** 22–28 minutes

**Promise:** Design and build a portfolio-ready command-line application that validates money and dates, persists JSON, summarizes categories, and creates a foundation for OOP and databases.

## Script

### 0:00–0:35 — Final result and learning map

Show adding two expenses, listing them, viewing category totals, restarting, and recovering the same data.

> This capstone uses variables, types, input, operators, decisions, loops, functions, strings, collections, exceptions, files, modules, and debugging. More importantly, it shows how those concepts cooperate in one maintainable program.

### 0:35–2:10 — Scope the first version

Requirements:

```text
- Add a positive monetary amount
- Validate an ISO date or use today's date
- Store description and category
- Save and reload JSON
- List expenses
- Summarize totals by category
- Report storage errors honestly
```

> Authentication, multiple currencies, budgets, editing, and cloud synchronization are future features. A clear first version is a portfolio strength, not a weakness.

### 2:10–3:30 — Data model and money decision

One JSON record:

```json
{
  "date": "2026-08-12",
  "description": "Microphone stand",
  "category": "equipment",
  "amount": "29.99"
}
```

> Binary floating point is not ideal for money. This project parses values with `Decimal` and stores the normalized amount as a JSON string so it can be reconstructed without a binary floating-point round trip. This is educational software, not accounting or tax software.

### 3:30–6:20 — Load and save

```python
import json
from pathlib import Path


DATA_PATH = Path("data") / "expenses.json"


def load_expenses():
    if not DATA_PATH.exists():
        return []

    try:
        with DATA_PATH.open(encoding="utf-8") as file:
            data = json.load(file)
    except (OSError, json.JSONDecodeError) as error:
        print(f"Could not load expenses: {error}")
        return []

    if not isinstance(data, list):
        print("Expense data must be a JSON list.")
        return []

    return data


def save_expenses(expenses):
    DATA_PATH.parent.mkdir(exist_ok=True)
    with DATA_PATH.open("w", encoding="utf-8") as file:
        json.dump(expenses, file, indent=2)
```

Explain the recovery policy and note that a production version should back up or quarantine malformed data rather than silently replacing it.

### 6:20–9:40 — Validate money and dates

```python
from datetime import date
from decimal import Decimal, InvalidOperation


def read_amount():
    while True:
        raw_amount = input("Amount: $").strip()
        try:
            amount = Decimal(raw_amount).quantize(Decimal("0.01"))
        except InvalidOperation:
            print("Enter a monetary amount such as 12.50.")
            continue

        if amount <= 0:
            print("Amount must be greater than zero.")
            continue

        return amount


def read_expense_date():
    while True:
        raw_date = input("Date YYYY-MM-DD (blank for today): ").strip()

        if not raw_date:
            return date.today().isoformat()

        try:
            return date.fromisoformat(raw_date).isoformat()
        except ValueError:
            print("Use a valid date in YYYY-MM-DD format.")
```

> Parsing validates meaning—`2026-02-31` is rejected even though it resembles the requested shape. Converting monetary input directly from text avoids first introducing binary floating-point approximation.

### 9:40–12:00 — Add an expense

```python
def add_expense(expenses):
    description = input("Description: ").strip()
    if not description:
        print("Description cannot be empty.")
        return

    category = input("Category: ").strip().lower()
    if not category:
        category = "uncategorized"

    amount = read_amount()
    expense_date = read_expense_date()

    expenses.append(
        {
            "date": expense_date,
            "description": description,
            "category": category,
            "amount": str(amount),
        }
    )
    save_expenses(expenses)
    print("Expense saved.")
```

Explain normalization and saving immediately after a successful mutation.

### 12:00–14:10 — List expenses

```python
def list_expenses(expenses):
    if not expenses:
        print("No expenses recorded.")
        return

    print("\nDate       | Category        | Amount     | Description")
    print("-" * 70)

    for expense in expenses:
        amount = Decimal(expense["amount"])
        print(
            f"{expense['date']:<10} | "
            f"{expense['category']:<15} | "
            f"${amount:>9.2f} | "
            f"{expense['description']}"
        )
```

> Alignment improves terminal readability, but saved data remains independent from display formatting.

### 14:10–16:50 — Summarize by category

```python
def show_summary(expenses):
    if not expenses:
        print("No expenses to summarize.")
        return

    totals = {}

    for expense in expenses:
        category = expense["category"]
        amount = Decimal(expense["amount"])
        totals[category] = totals.get(category, Decimal("0.00")) + amount

    grand_total = sum(totals.values(), start=Decimal("0.00"))

    print("\nSpending by category")
    for category, total in sorted(totals.items()):
        print(f"{category:<15} ${total:>9.2f}")

    print("-" * 27)
    print(f"{'total':<15} ${grand_total:>9.2f}")
```

Trace how `dict.get` initializes a missing category and accumulates later expenses.

### 16:50–19:20 — Main menu

```python
def show_menu():
    print("\nExpense Tracker")
    print("1. Add expense")
    print("2. List expenses")
    print("3. Category summary")
    print("4. Exit")


def main():
    expenses = load_expenses()

    while True:
        show_menu()
        choice = input("Choose an option: ").strip()

        if choice == "1":
            add_expense(expenses)
        elif choice == "2":
            list_expenses(expenses)
        elif choice == "3":
            show_summary(expenses)
        elif choice == "4":
            print("Goodbye.")
            break
        else:
            print("Choose 1, 2, 3, or 4.")


if __name__ == "__main__":
    main()
```

Explain that imported names, constants, storage functions, domain functions, interface functions, and the entry point appear in a predictable order.

### 19:20–21:30 — Test plan and portfolio presentation

Manual cases:

- First run and restart
- Blank description and category
- Invalid, zero, negative, and decimal amounts
- Blank, valid, and impossible dates
- Multiple expenses in one category
- Several categories and exact totals
- Malformed JSON on a disposable copy

Repository checklist:

- Focused README with screenshot/GIF
- Setup and run commands
- Sample data, but no private financial information
- Tests for amount parsing and category totals after extracting pure functions
- Clear limitations and planned OOP/database versions
- `.gitignore` for `.venv`, caches, and personal data files

### 21:30–23:00 — Challenge and series transition

> Add filtering by category and date, then extract `calculate_category_totals(expenses)` into a pure function with automated tests. Tag this release `v1-fundamentals` so future versions demonstrate your growth.

**CTA:** In the next stage, rebuild the expense model with classes and objects, comparing OOP with the dictionary-based version rather than using OOP merely because it exists.

## Short ideas

1. **Why money should not casually use binary floating point.**
2. **Accumulate category totals with `dict.get`.**

## Sources

- [Python `decimal` module](https://docs.python.org/3/library/decimal.html)
- [Python `datetime.date.fromisoformat`](https://docs.python.org/3/library/datetime.html#datetime.date.fromisoformat)
- [Python `json` module](https://docs.python.org/3/library/json.html)
- [Python `pathlib`](https://docs.python.org/3/library/pathlib.html)
- [Python tutorial: errors and exceptions](https://docs.python.org/3/tutorial/errors.html)

