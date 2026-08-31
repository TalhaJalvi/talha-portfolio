# Episode 010 — Lists, Tuples, Sets, and Dictionaries

## Packaging

**Primary title:** Python Lists, Tuples, Sets, and Dictionaries—When to Use Each

**Thumbnail:** `CHOOSE THE RIGHT ONE`

**Target length:** 15–18 minutes

**Promise:** Choose an appropriate collection, modify it safely, iterate through it, and model useful data.

## Script

### 0:00–0:25 — Hook

> These four structures all hold multiple values, but they solve different problems. Choosing one becomes easy when you ask: does order matter, can values change, must values be unique, or do I need key-value lookup?

Show the decision table:

| Type | Ordered | Mutable | Duplicates | Best beginner use |
|---|---|---|---|---|
| `list` | Yes | Yes | Yes | Sequence of items |
| `tuple` | Yes | No | Yes | Fixed record/coordinates |
| `set` | No positional indexing | Yes | No | Unique membership |
| `dict` | Insertion-ordered | Yes | Keys unique | Key-to-value lookup |

Clarify that set iteration order should not be used as positional meaning.

### 0:25–4:00 — Lists

```python
topics = ["variables", "loops", "functions"]
topics.append("strings")
topics.insert(1, "conditionals")
topics.remove("variables")

print(topics[0])
print(topics[-1])
print(topics[1:3])
```

Cover `append`, `extend`, `insert`, `remove`, `pop`, `sort`, `reverse`, `len`, membership, indexing, and slicing. Distinguish methods that mutate and return `None` from `sorted`, which returns a new list.

### 4:00–5:40 — Tuples

```python
screen_size = (1920, 1080)
width, height = screen_size
print(width, height)

single_item = (42,)
```

> Tuples are immutable sequences. They are useful when the grouped positions have stable meaning. The comma—not the parentheses alone—creates a tuple.

### 5:40–7:40 — Sets

```python
submitted_tags = {"python", "beginner", "python"}
required_tags = {"python", "programming"}

print(submitted_tags)
print("python" in submitted_tags)
print(submitted_tags | required_tags)  # union
print(submitted_tags & required_tags)  # intersection
print(required_tags - submitted_tags)  # difference
```

> Empty braces create a dictionary, so an empty set is `set()`.

### 7:40–10:40 — Dictionaries

```python
student = {
    "name": "Maya",
    "completed_lessons": 9,
    "is_active": True,
}

student["completed_lessons"] += 1
student["favorite_topic"] = "functions"

print(student["name"])
print(student.get("github_username", "Not provided"))
```

> Indexing a missing key raises `KeyError`. `get` is useful when absence is expected and a default makes sense.

Iterate clearly:

```python
for key, value in student.items():
    print(f"{key}: {value}")
```

### 10:40–12:10 — Mutability and copying

```python
original = ["Python", "SQL"]
alias = original
copy = original.copy()

alias.append("Git")
print(original)  # changed through the shared list
print(copy)      # independent shallow copy
```

> Assignment does not automatically copy a mutable object. Both names may refer to the same list. A shallow copy is enough for this flat example; nested data requires additional care.

### 12:10–14:10 — Course tracker model

```python
course = {
    "title": "Python Fundamentals",
    "lessons": ["variables", "loops", "functions"],
    "completed": {"variables", "loops"},
    "version": (1, 0),
}

for lesson in course["lessons"]:
    status = "done" if lesson in course["completed"] else "next"
    print(f"{lesson}: {status}")
```

Explain nesting and selecting structures based on meaning.

### 14:10–15:10 — Challenge and CTA

> Build a contact dictionary containing a name, email, tuple of coordinates, list of skills, and set of completed courses. Update it, iterate through it, and deliberately request a missing key with both indexing and `get`.

**CTA:** Next, learn to interpret and handle the errors real data inevitably creates.

## Short ideas

1. **List versus tuple versus set versus dictionary decision tree.**
2. **Why `alias = original` is not a copy.**

## Sources

- [Python tutorial: data structures](https://docs.python.org/3/tutorial/datastructures.html)
- [Python sequence types](https://docs.python.org/3/library/stdtypes.html#sequence-types-list-tuple-range)
- [Python set types](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset)
- [Python mapping types](https://docs.python.org/3/library/stdtypes.html#mapping-types-dict)

