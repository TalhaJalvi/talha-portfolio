# Episode 001 — How Programming Works and Your First Python Program

## Packaging

**Primary title:** Python for Absolute Beginners: Write Your First Program

**Alternative title:** How Programming Actually Works (Using Python)

**Thumbnail text:** START PYTHON

**Thumbnail concept:** Presenter on the left, a large `print("Hello!")` code card on the right, dark background, and one bright accent color. Avoid additional text and tiny interface screenshots.

**Target length:** 7–9 minutes

**Viewer promise:** By the end, the viewer can explain source code, an interpreter, and output, then run and modify a small Python program.

## Recording assets

- A clean editor with font size around 24–30 px
- A terminal with no private paths, usernames, tokens, or unrelated tabs visible
- Python 3 installed
- Three simple slides or diagrams: instruction flow, source code to interpreter to output, and the episode challenge

## Script

### 0:00–0:15 — Hook

> Every application you use is built from instructions. In the next few minutes, you will learn how those instructions become a running program and write your first program in Python—even if you have never coded before.

Show the completed program immediately:

```python
name = input("What is your name? ")
print(f"Welcome to programming, {name}!")
```

Run it once and show the output.

### 0:15–0:45 — Road map

> We only need three ideas today: what a program is, what Python does with our code, and how to run a program ourselves. At the end, I will give you a tiny challenge that turns this example into your own program.

### 0:45–1:45 — What is programming?

> A program is a sequence of instructions written for a computer. The computer is extremely fast, but it does not guess what we mean. Programming is the process of turning a problem into precise steps it can follow.

Use a simple analogy:

```text
Problem: greet the user
1. Ask for a name
2. Remember the name
3. Display a greeting containing that name
```

> This plan is already an algorithm: a sequence of steps used to solve a problem. Code is how we express those steps in a programming language.

### 1:45–2:45 — Why Python?

> Computers do not directly understand Python source code. We write readable Python, and the Python interpreter executes those instructions. Python is a good first language because the code is relatively close to the way we describe the solution.

Show this flow:

```text
Your idea → Python source code → Python interpreter → program output
```

Keep this explanation conceptual; bytecode and implementation details belong in a later video.

### 2:45–3:40 — First instruction

Create `first_program.py` and type:

```python
print("Hello, world!")
```

Explain:

> `print` asks Python to display something. The parentheses contain information we give to `print`, and the quotation marks identify text. Programmers usually call text like this a string.

Run:

```bash
python3 first_program.py
```

Mention that some installations use `python` instead of `python3`.

### 3:40–5:20 — Make the program interactive

Replace the program with:

```python
name = input("What is your name? ")
print(f"Welcome to programming, {name}!")
```

Explain one line at a time:

> `input` displays a question and waits for the user. The answer is stored under the name `name`. On the second line, the `f` before the text lets us insert the stored answer between braces.

Avoid fully teaching variables or formatted strings here. Create curiosity for the next lesson.

### 5:20–6:10 — Make and fix a mistake

Temporarily remove one quotation mark and run the program.

> This error does not mean you are bad at programming. It means Python could not understand the instruction. Error messages are clues. The message points us toward the line, and we compare the code with the structure Python expects.

Fix the quotation mark and run the program again.

### 6:10–7:00 — Viewer challenge

Show the challenge:

> Add a second question asking for the viewer's favorite technology, then print a sentence containing both answers.

Possible solution for the description, hidden below a clear spoiler label:

```python
name = input("What is your name? ")
technology = input("What technology do you want to learn? ")
print(f"Hi {name}! Let's learn {technology}.")
```

### 7:00–7:25 — Recap and next-video CTA

> You now know that a program is a sequence of precise instructions, Python executes our readable source code, and `print` and `input` let a program communicate with its user. Next, we will properly learn variables and data types—the ideas that let programs remember and understand different kinds of information.

Use one CTA only:

> Continue with the Variables and Data Types lesson on screen.

## Description template

```text
Learn how programming works and write your first interactive Python program.

In this lesson:
00:00 Your first Python program
00:15 What we will learn
00:45 What programming means
01:45 How Python runs code
02:45 Write the first instruction
03:40 Make the program interactive
05:20 Understanding errors
06:10 Beginner challenge
07:00 What to learn next

Code and challenge:
[ADD GITHUB LINK]

Next lesson — Python Variables and Data Types:
[ADD VIDEO LINK]

#python #programming #codingforbeginners
```

## Pinned comment

```text
Challenge: Ask the user for their name and favorite technology, then print both in one sentence. Share your output—or the error you encountered—below. Continue with Variables and Data Types here: [LINK]
```

## Short 1 — What is a program?

**Length:** 20–30 seconds

> A program is not magic. It is a sequence of precise instructions. Ask for a name. Remember it. Display a greeting. That solution becomes code, Python executes it, and the result becomes your program. Programming is simply learning to turn problems into steps a computer can follow.

On-screen CTA: `Full beginner lesson → channel`

## Short 2 — Your first interactive Python code

**Length:** 25–35 seconds

Show and run:

```python
name = input("What is your name? ")
print(f"Welcome to programming, {name}!")
```

Voice-over:

> This first line asks a question and remembers the answer. This second line inserts that answer into a greeting. Two lines are enough to make your first interactive Python program. Now change the question and make it yours.

On-screen CTA: `Learn Python from lesson 1`

## Pre-publish checklist

- [ ] The final result appears in the first 15 seconds.
- [ ] Editor and terminal text are readable on a phone.
- [ ] No personal information appears on screen.
- [ ] Long pauses and installation delays are removed.
- [ ] Audio is clear and consistent.
- [ ] Challenge solution is included in the description or repository.
- [ ] The next lesson is linked with an end screen and pinned comment.

## Sources

- [Python tutorial: using the interpreter](https://docs.python.org/3/tutorial/interpreter.html)
- [Python tutorial: first steps toward programming](https://docs.python.org/3/tutorial/introduction.html#first-steps-towards-programming)
- [Python built-in `input()` and `print()`](https://docs.python.org/3/library/functions.html)

