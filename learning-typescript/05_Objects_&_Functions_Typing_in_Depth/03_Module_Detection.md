# Module Detection in TypeScript

> **Goal:** By the end of this note, you'll understand what **Module Detection** is, why TypeScript cares about it, how `"auto"` and `"force"` behave, and how to experiment with it yourself.

---

# What is Module Detection?

Before TypeScript compiles your code, it first asks a simple question:

> **"Is this file a Script or a Module?"**

This process is called **Module Detection**.

Every `.ts` file belongs to one of these two categories.

| Script                                  | Module                                         |
| --------------------------------------- | ---------------------------------------------- |
| Shares the global scope                 | Has its own private scope                      |
| Variables can affect other script files | Variables stay inside the file unless exported |
| Doesn't use `import` or `export`        | Uses `import` or `export`                      |
| Older JavaScript style                  | Modern JavaScript style                        |

Understanding this difference explains many mysterious TypeScript errors.

---

# Experiment 1 — TypeScript without a tsconfig.json

Create a new project.

```bash
mkdir module-detection-demo
cd module-detection-demo
```

Create two files.

```bash
touch app.ts tsconfig.json
```

Your project should look like

```
.
├── app.ts
└── tsconfig.json
```

---

## app.ts

```ts
console.log("hello");
```

Leave **tsconfig.json completely empty**.

```json
```

Now compile.

```bash
tsc
```

You'll get

```
app.js
```

Open it.

```js
"use strict";
console.log("hello");
```

Nothing surprising happened.

---

# Why did TypeScript generate `"use strict"`?

TypeScript emits JavaScript in **Strict Mode** by default.

Strict Mode is a JavaScript feature that catches many common mistakes.

Example:

Without strict mode:

```js
name = "John";
```

JavaScript creates a global variable.

With strict mode:

```js
"use strict";

name = "John";
```

Error:

```
ReferenceError
```

So TypeScript automatically protects you by adding

```js
"use strict";
```

---

# Experiment 2 — Generate a default tsconfig

Delete the empty file.

```bash
rm tsconfig.json
```

Generate a new one.

```bash
tsc --init
```

TypeScript creates a large configuration file with many default compiler options.

Compile again.

```bash
tsc
```

Now your project becomes

```
.
├── app.ts
├── app.js
├── app.js.map
├── app.d.ts
├── app.d.ts.map
└── tsconfig.json
```

---

# Why were more files generated?

By default, the generated `tsconfig.json` enables more compiler features than an empty configuration.

You'll now see

* JavaScript output
* Source maps
* Declaration files
* Declaration maps

Each file has a purpose.

| File         | Purpose                          |
| ------------ | -------------------------------- |
| app.js       | Compiled JavaScript              |
| app.js.map   | Maps JS back to TS for debugging |
| app.d.ts     | Type declaration file            |
| app.d.ts.map | Maps declarations back to TS     |

---

# Open app.js

You'll probably see something similar to

```js
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

console.log("hello");
```

A new line appeared.

```js
Object.defineProperty(exports, "__esModule", {
    value: true
});
```

Where did this come from?

---

# Why is __esModule added?

By default, TypeScript may compile files as **CommonJS modules** depending on your configuration.

When compiling to CommonJS, TypeScript adds

```js
Object.defineProperty(exports, "__esModule", {
    value: true
});
```

This helps JavaScript tools understand that this file originally came from an ES Module.

Think of it as metadata for compatibility.

---

# Change the target

Inside `tsconfig.json`

find

```json
"target": "esnext"
```

(If it's something else, change it to `esnext`.)

Compile again.

```bash
tsc
```

Now `app.js` becomes

```js
console.log("hello");

export {};
```

Interesting...

Instead of

```js
Object.defineProperty(...)
```

we now have

```js
export {};
```

Why?

---

# Why did export {} appear?

TypeScript now emits modern JavaScript (ES Modules).

A file must remain a **module** after compilation.

Since your file has no imports or exports,

TypeScript inserts

```ts
export {};
```

This export does nothing.

It simply tells JavaScript

> "This file is a module."

---

# The important setting

Open your generated `tsconfig.json`.

You'll find

```json
"moduleDetection": "force"
```

This setting controls how TypeScript decides whether a file is a module.

---

# Is the default really "auto"?

Yes.

When **no `moduleDetection` option is specified**, the default value is

```json
"moduleDetection": "auto"
```

So:

Empty `tsconfig.json`

```json
{}
```

behaves like

```json
{
  "compilerOptions": {
    "moduleDetection": "auto"
  }
}
```

However, **`tsc --init` currently generates**

```json
"moduleDetection": "force"
```

explicitly in the config (depending on the TypeScript version). This means every file is treated as a module without needing imports or exports.

So your observation is correct for current TypeScript versions: an empty config uses the default (`auto`), while the generated config may explicitly set `"force"`.

---

# Understanding the three moduleDetection modes

There are three possible values.

```json
"moduleDetection": "auto"
```

```json
"moduleDetection": "force"
```

```json
"moduleDetection": "legacy"
```

We'll focus on the first two.

---

# auto

TypeScript checks whether your file contains

```ts
import
```

or

```ts
export
```

If yes

↓

It's a Module.

Otherwise

↓

It's a Script.

---

# force

Every `.ts` file is automatically considered a Module.

No imports are needed.

No exports are needed.

Every file has its own scope.

---

# Let's prove it

Delete everything except

```
app.ts
tsconfig.json
```

Now keep only

```json
{
  "compilerOptions": {
    "moduleDetection": "auto"
  }
}
```

Now we can see how `"auto"` behaves.

---

# Experiment 3 — Top-level await

Write

```ts
await fetch("");
```

You'll get

```
'await' expressions are only allowed at the top level of a file when that file is a module, but this file has no imports or exports. Consider adding an empty 'export {}' to make this file a module.
```

Let's understand every part.

---

## Why is top-level await not allowed?

Normally

```ts
async function load() {
    await fetch("");
}
```

is valid because `await` is inside an async function.

But here

```ts
await fetch("");
```

is outside every function.

This is called **Top-Level Await**.

JavaScript only allows Top-Level Await inside **ES Modules**.

Since `"auto"` treats this file as a **Script**, TypeScript reports an error.

---

## Fix

Add

```ts
export {};
```

```ts
export {};

await fetch("");
```

The error disappears.

Why?

Because

```ts
export {}
```

changes the file from

Script

↓

to

Module.

Now Top-Level Await is allowed.

---

# Experiment 4 — Import statement

Suppose you write

```ts
import * from "";
```

You'll get errors such as

```
'as' expected.
```

```
'from' expected.
```

```
Cannot find module '' or its corresponding type declarations.
```

These errors are **not caused by `moduleDetection`**. They occur because the `import` syntax itself is invalid.

The `*` form must always specify a namespace name.

Correct syntax:

```ts
import * as utils from "./utils";
```

Or import everything as a namespace:

```ts
import * as math from "./math";
```

You can also import specific exports:

```ts
import { add } from "./math";
```

Or a default export:

```ts
import app from "./app";
```

Your example

```ts
import * from "";
```

is incomplete, so the parser doesn't know what you're trying to import, which is why it reports syntax errors (`'as' expected`, `'from' expected`) and then also reports that the module path (`""`) cannot be found.

---

# Experiment 5 — Importing a JavaScript file

Create

```
test.js
```

Leave it empty.

Now

```ts
import a from "./test";

console.log(a);
```

You'll get

```
File 'test.js' is not a module.
```

Why?

Because

```
test.js
```

contains

```js
// nothing
```

There are no

```js
export
```

statements.

No

```js
module.exports
```

No

```js
exports
```

Nothing is exported.

So TypeScript says

> "You're trying to import something from a file that exports nothing."

---

## How to fix it

Export something.

Example

```js
export default "Hello";
```

Now

```ts
import a from "./test";

console.log(a);
```

works correctly.

---

# Experiment 6 — Change moduleDetection to force

Now change

```json
{
  "compilerOptions": {
    "moduleDetection": "force"
  }
}
```

Compile again.

Notice what happens.

Many of the "this file is not a module" style issues disappear because TypeScript **already assumes every file is a module**. For example, the top-level `await` example no longer requires adding `export {}`—the file is treated as a module automatically.

However, **`moduleDetection: "force"` does not magically fix every module-related error**. If you import from a file that truly exports nothing (like an empty `test.js`), you'll still get an error because the problem is the imported file, not how `app.ts` is classified.

---

# auto vs force

| moduleDetection | Behavior                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| auto            | A file becomes a module only if it contains an `import` or `export` (or meets other module-detection rules). Otherwise it's treated as a script. |
| force           | Every file is treated as a module, even without `import` or `export`.                                                                            |

---

# Real-world recommendation

For modern TypeScript projects (React, Node.js, Next.js, Vite, Express, etc.), **`"moduleDetection": "force"` is generally recommended** because:

* Every file gets its own module scope.
* Top-level `await` works without adding `export {}` just to satisfy the compiler.
* It avoids accidental global variables from script files.
* It matches how modern JavaScript projects are structured.

`"auto"` is mainly useful for older projects or when working with legacy script-based code.

---

# Key Takeaways

* **Module Detection** decides whether a file is treated as a **Script** or a **Module**.
* With **`"moduleDetection": "auto"`**, a file becomes a module only when it contains an `import` or `export` (or other module indicators).
* With **`"moduleDetection": "force"`**, every file is treated as a module automatically.
* `export {}` exports nothing—it simply marks a file as a module.
* Top-level `await` is only allowed in modules, which is why adding `export {}` (or using `"force"`) fixes the error.
* Invalid `import` syntax (like `import * from ""`) causes parser errors regardless of `moduleDetection`.
* Importing from an empty file fails because the imported file is **not exporting anything**, not because of the `moduleDetection` setting.

---

Here's the complete comparison between the three module detection modes.

| Feature                                     | `auto`                                     | `legacy`                     | `force`                                                                     |
| ------------------------------------------- | ------------------------------------------ | ---------------------------- | --------------------------------------------------------------------------- |
| **Default?**                                | ✅ Yes (when not specified)                 | ❌ No                         | ❌ No (though `tsc --init` in recent TS versions may generate it explicitly) |
| **How is a file detected as a module?**     | Uses modern detection rules                | Uses old TypeScript behavior | Every file is always a module                                               |
| **Needs `import`/`export`?**                | Usually yes (or other modern indicators)   | Yes                          | No                                                                          |
| **File without imports/exports**            | Script                                     | Script                       | Module                                                                      |
| **Top-level `await` works?**                | ❌ No (unless file is detected as a module) | ❌ No                         | ✅ Yes                                                                       |
| **Need `export {}` just to make a module?** | Sometimes                                  | Yes                          | Never                                                                       |
| **Suitable for modern projects?**           | ✅ Yes                                      | ❌ No                         | ✅ Best                                                                      |
| **Matches old TypeScript versions?**        | No                                         | ✅ Yes                        | No                                                                          |

---

# 1. `moduleDetection: "legacy"`

This is the **old behavior** that TypeScript used before introducing newer module detection logic.

A file becomes a module **only if it contains**

```ts
import ...
```

or

```ts
export ...
```

Otherwise it's a script.

Example

```ts
console.log("Hello");
```

↓

Script

---

```ts
import fs from "fs";
```

↓

Module

---

Even

```ts
export {};
```

↓

Module

---

Think of it as

> "If I don't literally see an `import` or `export`, I'm calling this a script."

---

## When would you use Legacy?

Almost never.

It's only useful when maintaining very old TypeScript projects that depend on the old compiler behavior.

---

# 2. `moduleDetection: "auto"`

This is the **current default** if you don't specify `moduleDetection`.

It starts with the same rule as `legacy`:

* `import`
* `export`

↓

Module

But it also understands **modern JavaScript environments** and can use additional context (such as your module settings and file format) to decide whether a file should be treated as a module.

That's why it's called **auto**.

It tries to detect automatically.

Example

```ts
console.log("Hello");
```

↓

Usually Script

---

```ts
import fs from "fs";
```

↓

Module

---

```ts
export {};
```

↓

Module

---

Top-level await

```ts
await fetch("");
```

↓

❌ Error

because the file is still a script.

Adding

```ts
export {};
```

changes it into a module.

---

# 3. `moduleDetection: "force"`

This one is the easiest to understand.

TypeScript doesn't inspect the file.

It simply says

> **Every `.ts` file is a module.**

Even this file

```ts
console.log("Hello");
```

is already considered a module.

No import needed.

No export needed.

---

Top-level await

```ts
await fetch("");
```

↓

Works immediately.

No need for

```ts
export {};
```

---

# Example

Suppose `app.ts` contains only

```ts
await fetch("");
```

| Mode     | Result  |
| -------- | ------- |
| `legacy` | ❌ Error |
| `auto`   | ❌ Error |
| `force`  | ✅ Works |

---

Now add

```ts
export {};
await fetch("");
```

| Mode     | Result  |
| -------- | ------- |
| `legacy` | ✅ Works |
| `auto`   | ✅ Works |
| `force`  | ✅ Works |

---

# Which one should you use?

| Project Type                                                      | Recommended                                        |
| ----------------------------------------------------------------- | -------------------------------------------------- |
| Old TypeScript project                                            | `legacy` (only if you need backward compatibility) |
| General TypeScript project                                        | `auto` (default behavior)                          |
| Modern React, Vite, Next.js, Node.js, Express, Bun, Deno projects | **`force`** ✅                                      |

For new projects, **`force`** is usually the most convenient choice because every file is treated as a module from the start. It eliminates the need to add `export {}` just to satisfy the compiler and aligns well with how modern JavaScript applications are structured.
