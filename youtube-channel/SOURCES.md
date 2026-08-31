# Research Sources

These are the primary references used for the Python Fundamentals season. Each episode also links only the sources relevant to that lesson.

- [Python tutorial: an informal introduction](https://docs.python.org/3/tutorial/introduction.html)
- [Python tutorial: control flow](https://docs.python.org/3/tutorial/controlflow.html)
- [Python tutorial: data structures](https://docs.python.org/3/tutorial/datastructures.html)
- [Python tutorial: errors and exceptions](https://docs.python.org/3/tutorial/errors.html)
- [Python tutorial: input and output](https://docs.python.org/3/tutorial/inputoutput.html)
- [Python tutorial: modules](https://docs.python.org/3/tutorial/modules.html)
- [Python tutorial: virtual environments and packages](https://docs.python.org/3/tutorial/venv.html)
- [Python built-in functions](https://docs.python.org/3/library/functions.html)
- [Python built-in types](https://docs.python.org/3/library/stdtypes.html)
- [Python `pathlib`](https://docs.python.org/3/library/pathlib.html)
- [Python debugger](https://docs.python.org/3/library/pdb.html)
- [Python `unittest`](https://docs.python.org/3/library/unittest.html)
- [Python Packaging User Guide: installing packages](https://packaging.python.org/en/latest/tutorials/installing-packages/)

## Editorial rules derived from the research

- Say that a variable name refers to a value; avoid claiming it is literally a physical box in memory.
- State explicitly that `input()` returns a string.
- Use `==` for value equality and reserve `is` for identity checks such as `value is None`.
- Explain that `/` produces floating-point division, while `//` performs floor division.
- Demonstrate `for` loops as iteration over an iterable, not merely as counting loops.
- Avoid mutating a collection while iterating over it unless iterating over a copy.
- Use `with open(..., encoding="utf-8")` so files close even when an error occurs.
- Teach JSON for structured data and explain that JSON is not the same as arbitrary Python objects.
- Run package commands as `python -m pip` (or the platform-equivalent interpreter command) to make the target interpreter explicit.
- Teach tests as examples with inputs and expected outputs, not as a guarantee that no defects exist.

