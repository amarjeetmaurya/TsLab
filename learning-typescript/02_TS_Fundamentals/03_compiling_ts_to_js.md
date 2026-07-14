
---

# 02 - Compiling TypeScript to JavaScript

## What is Compilation?

Browsers and the JavaScript engine can only execute **JavaScript**.

The TypeScript compiler (`tsc`) converts `.ts` files into `.js` files.

```text
app.ts
   │
   ▼
 TypeScript Compiler (tsc)
   │
   ▼
app.js
```

---

# Installing the TypeScript Compiler

Install globally:

```bash
npm install -g typescript
```

Check the installed version:

```bash
tsc --version
```

---

# Compiling a Single File

Suppose we have:

```text
app.ts
```

Compile it:

```bash
tsc app.ts
```

Output:

```text
app.ts
app.js
```

The generated JavaScript file can now be executed.

```bash
node app.js
```

---

# Compiling Multiple Files

You can compile multiple TypeScript files at once.

```bash
tsc app.ts script.ts
```

Output:

```text
app.js
script.js
```

---

# Why Does "Cannot redeclare block-scoped variable" Occur?

Example:

```ts
// app.ts

let username = "John";
```

```ts
// script.ts

let username = "Alice";
```

Compiling both files:

```bash
tsc app.ts script.ts
```

Produces an error similar to:

```text
Cannot redeclare block-scoped variable 'username'.
```

---

## Why does this happen?

By default, a TypeScript file **without any `import` or `export` statements** is treated as a **script**, **not** a module.

Scripts share one global scope.

TypeScript behaves as if both files were combined:

```ts
let username = "John";
let username = "Alice"; // ❌ Error
```

So both variables exist in the same global scope.

---

# What is Module Scope?

A file becomes a **module** as soon as it contains at least one:

* `import`
* `export`

Modules have their **own private scope**.

Example:

```ts
// app.ts

export {};

let username = "John";
```

```ts
// script.ts

export {};

let username = "Alice";
```

Now each file has its own scope.

No conflict occurs.

---

## Why does `export {}` fix the problem?

```ts
export {};
```

doesn't export anything useful.

Its only purpose is to tell TypeScript:

> "Treat this file as a module."

Once the file becomes a module, its variables are no longer placed in the global scope.

---

# Using tsconfig.json

Instead of writing

```bash
tsc app.ts
```

every time, TypeScript projects usually have a configuration file.

```text
tsconfig.json
```

Example:

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "NodeNext"
  }
}
```

Now simply run:

```bash
tsc
```

TypeScript automatically compiles every `.ts` file included in the project.

---

## What happens if `tsconfig.json` doesn't exist?

Running

```bash
tsc
```

does **not** know which project to compile.

Instead, TypeScript shows its help page.

Example:

```text
Version 6.0.3

tsc: The TypeScript Compiler

COMMON COMMANDS

tsc
Compiles the current project (tsconfig.json in the working directory.)

tsc app.ts util.ts
Compiles the specified files using default compiler options.

...
```

This means:

> "I couldn't find a TypeScript project."

---

# Important Difference

```bash
tsc
```

Uses:

* `tsconfig.json`
* compiler options
* include/exclude settings

---

```bash
tsc app.ts
```

Ignores `tsconfig.json`.

Only compiles the specified file using default compiler settings.

This is one of the most common mistakes beginners make.

---

# The `--noEmit` Flag

Normally:

```bash
tsc
```

creates JavaScript files.

Sometimes you only want to check for errors.

```bash
tsc --noEmit
```

Result:

* Checks for type errors
* Generates **no JavaScript files**

Useful in CI/CD pipelines and during development.

---

# The `--noEmitOnError` Flag

Normally:

```ts
let age: number = "20";
```

Running

```bash
tsc
```

will:

* show the error
* **still generate** `app.js`

Sometimes this isn't desirable.

Use:

```bash
tsc --noEmitOnError
```

Now:

* if errors exist
* no JavaScript is produced

This prevents running outdated or incorrect builds.

---

# Watch Mode

Instead of recompiling manually:

```bash
tsc
tsc
tsc
tsc
```

Use Watch Mode:

```bash
tsc --watch
```

or

```bash
tsc -w
```

TypeScript keeps watching your files.

Whenever you save:

```
app.ts
      ↓
save
      ↓
Automatically compile
      ↓
app.js updated
```

This is the standard development workflow.

Stop watching with:

```
Ctrl + C
```

---

# Summary

| Command                | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `npm i -g typescript`  | Install TypeScript globally                                    |
| `tsc app.ts`           | Compile one file                                               |
| `tsc app.ts script.ts` | Compile multiple files                                         |
| `tsc`                  | Compile the current project using `tsconfig.json`              |
| `tsc --watch`          | Automatically recompile on file changes                        |
| `tsc --noEmit`         | Check types without generating JavaScript                      |
| `tsc --noEmitOnError`  | Don't generate JavaScript if errors exist                      |
| `export {}`            | Convert a script into a module to avoid global scope conflicts |

---
