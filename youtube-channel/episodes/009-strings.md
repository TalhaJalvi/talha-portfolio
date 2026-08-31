# Episode 009 — Strings and Text Processing

## Packaging

**Primary title:** Python Strings: The Methods Beginners Actually Need

**Thumbnail:** `MASTER TEXT`

**Target length:** 12–14 minutes

**Promise:** Create, index, slice, normalize, search, split, join, and format text while understanding string immutability.

## Script

### 0:00–0:20 — Hook

> Usernames, messages, file contents, and API responses all contain text. Today we will turn a messy sentence into clean, searchable data using Python strings.

### 0:20–2:00 — Creating strings and escaping

```python
single = 'Python'
double = "Python"
quote = "She said, \"Keep learning.\""
multiline = """Line one
Line two"""
```

Explain `\n`, `\t`, escaped quotes, and raw strings for many literal backslashes:

```python
windows_path = r"C:\Users\Maya\project"
```

### 2:00–3:30 — Indexing and slicing

```python
language = "Python"

print(language[0])    # P
print(language[-1])   # n
print(language[0:3])  # Pyt
print(language[:3])
print(language[3:])
print(language[::-1])
```

> Indexing begins at zero. Slices include the start and exclude the stop, matching `range`.

### 3:30–4:30 — Strings are immutable

Show that `language[0] = "J"` fails.

```python
language = "J" + language[1:]
print(language)
```

> String methods return new strings; they do not alter the original object.

### 4:30–7:20 — Methods for real input

```python
raw_name = "   Maya JOHNSON   "
clean_name = raw_name.strip().title()
print(clean_name)

email = "  MAYA@example.com "
normalized_email = email.strip().lower()
print(normalized_email)
```

Demonstrate `startswith`, `endswith`, `find`, `replace`, and membership with `in`. Explain that `.find()` returns `-1` when absent, while `in` is clearer for a yes/no question.

### 7:20–9:20 — Split and join

```python
tags_text = "python, beginner, programming"
tags = tags_text.split(",")
clean_tags = [tag.strip() for tag in tags]

print(clean_tags)
print(" | ".join(clean_tags))
```

Introduce the comprehension only as a compact loop and show the expanded equivalent if viewers have not seen it.

### 9:20–10:30 — Formatting

```python
course = "Python Fundamentals"
completed = 7
total = 16
progress = completed / total

print(f"{course}: {completed}/{total} ({progress:.0%})")
```

Explain expression insertion and format specifications without cataloging every option.

### 10:30–12:00 — Mini text analyzer

```python
sentence = input("Enter a sentence: ").strip()
words = sentence.split()

print(f"Characters: {len(sentence)}")
print(f"Words: {len(words)}")
print(f"Contains 'python': {'python' in sentence.lower()}")
```

### 12:00–13:00 — Challenge and CTA

> Ask for a full name and comma-separated skills. Normalize the name, clean every skill, and display a one-line profile.

**CTA:** Collections are next: lists, tuples, sets, and dictionaries give those cleaned values useful structure.

## Short ideas

1. **Five string-cleaning methods in 30 seconds.**
2. **Why slices exclude the stop position.**

## Sources

- [Python tutorial: text](https://docs.python.org/3/tutorial/introduction.html#text)
- [Python string methods](https://docs.python.org/3/library/stdtypes.html#string-methods)
- [Python formatted output](https://docs.python.org/3/tutorial/inputoutput.html#fancier-output-formatting)

