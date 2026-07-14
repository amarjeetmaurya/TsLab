
---

# Configuring the TypeScript Compiler (`tsconfig.json`)

## What is `tsconfig.json`?

`tsconfig.json` is the **configuration file** for the TypeScript compiler (`tsc`).

Instead of passing compiler options every time you run `tsc`, you define them once in this file.

Think of it as the **instruction manual** for the TypeScript compiler.

Without it, `tsc` uses its default settings (or compiles only the files you explicitly specify).

---

## Creating a `tsconfig.json`

You can create it manually:

```text
tsconfig.json
```

Or let TypeScript generate a template:

```bash
tsc --init
```

This creates a `tsconfig.json` containing many commented configuration options.

---

# Basic Example

```json
{
  "compilerOptions": {
    "target": "es6",
    "removeComments": true,
    "noEmitOnError": true,
    "pretty": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

Every option inside `compilerOptions` changes how TypeScript compiles your project.

---

# Understanding `compilerOptions`

`compilerOptions` is the main section where you configure the TypeScript compiler.

```json
{
  "compilerOptions": {
    // compiler settings go here
  }
}
```

---

# `target`

```json
{
  "target": "es6"
}
```

Specifies the JavaScript version that TypeScript should generate.

Example:

```ts
const square = (x: number) => x * x;
```

If:

```json
"target": "es5"
```

TypeScript converts modern JavaScript into older syntax for compatibility.

If:

```json
"target": "es2023"
```

Very little transformation occurs because modern JavaScript engines already support most features.

### Common Targets

| Target           | Description                           |
| ---------------- | ------------------------------------- |
| `es5`            | Older browsers                        |
| `es6` / `es2015` | Modern browsers                       |
| `es2017`         | Async/Await support                   |
| `es2020`         | Optional chaining, nullish coalescing |
| `es2023`         | Very modern JavaScript                |
| `esnext`         | Latest available JavaScript features  |

> **Recommendation:** Use `es2022`, `es2023`, or `esnext` unless you need to support older environments.

---

# `removeComments`

```json
{
  "removeComments": true
}
```

Removes comments from the generated JavaScript.

TypeScript:

```ts
// Calculate age
const age = 20;
```

Generated JavaScript:

```js
const age = 20;
```

If set to `false`, comments remain.

Useful for producing cleaner production builds.

---

# `noEmitOnError`

```json
{
  "noEmitOnError": true
}
```

Normally, TypeScript still generates JavaScript even if errors exist.

Example:

```ts
let age: number = "20";
```

Running:

```bash
tsc
```

Without this option:

```
Error shown
↓
app.js still created
```

With:

```json
"noEmitOnError": true
```

```
Error shown
↓
No JavaScript generated
```

This prevents accidentally running outdated or incorrect code.

---

# `pretty`

```json
{
  "pretty": true
}
```

Makes compiler messages easier to read by using colors and better formatting.

Without `pretty`:

```
error TS2322...
```

With `pretty`:

* Colored output
* Better formatting
* Easier to locate errors

This option doesn't affect your compiled code.

---

# `outDir`

```json
{
  "outDir": "./dist"
}
```

Specifies where the compiled JavaScript files should be placed.

Project:

```text
project/
│
├── src/
│   ├── app.ts
│   └── utils.ts
│
└── tsconfig.json
```

After compilation:

```text
project/
│
├── src/
│   ├── app.ts
│   └── utils.ts
│
├── dist/
│   ├── app.js
│   └── utils.js
│
└── tsconfig.json
```

Keeping compiled files separate from source files makes projects cleaner and easier to maintain.

---

# `rootDir`

```json
{
  "rootDir": "./src"
}
```

Tells TypeScript where your source code is located.

Everything inside `src` is treated as input.

Combined with `outDir`:

```
src/
   │
   ▼
TypeScript Compiler
   │
   ▼
dist/
```

This creates a clear separation between source files and generated files.

---

# How `rootDir` and `outDir` Work Together

```text
project/
│
├── src/
│   ├── app.ts
│   └── helper.ts
│
├── dist/
│   ├── app.js
│   └── helper.js
│
└── tsconfig.json
```

```
src/
   │
   ▼
TypeScript Compiler
   │
   ▼
dist/
```

Think of:

* `rootDir` → **Where TypeScript reads from**
* `outDir` → **Where TypeScript writes to**

---

# Other Common Compiler Options

## `strict`

```json
{
  "strict": true
}
```

Enables all strict type-checking options.

This is one of the most important settings in TypeScript because it catches many bugs at compile time.

> **Recommendation:** Always enable `strict` for new projects.

---

## `sourceMap`

```json
{
  "sourceMap": true
}
```

Generates `.map` files.

These allow browsers and debuggers to map compiled JavaScript back to the original TypeScript source.

```
app.ts
   │
Compile
   │
   ▼
app.js
app.js.map
```

This makes debugging much easier because breakpoints and error locations point to your `.ts` files instead of the generated `.js`.

---

## `module`

```json
{
  "module": "NodeNext"
}
```

Controls how JavaScript modules are generated.

Common values:

| Module     | Used For                                |
| ---------- | --------------------------------------- |
| `CommonJS` | Older Node.js projects                  |
| `ESNext`   | Modern bundlers (Vite, Webpack, Rollup) |
| `NodeNext` | Modern Node.js applications             |

---

## `moduleResolution`

```json
{
  "moduleResolution": "NodeNext"
}
```

Controls how TypeScript resolves imported files.

For modern Node.js projects, `NodeNext` is typically the correct choice and should match the `module` setting.

---

## `allowJs`

```json
{
  "allowJs": true
}
```

Allows JavaScript files to be included in the project.

Useful when migrating an existing JavaScript project to TypeScript incrementally.

---

## `checkJs`

```json
{
  "checkJs": true
}
```

Type-checks JavaScript files.

Useful when you want type checking without converting files to `.ts` immediately.

---

## `declaration`

```json
{
  "declaration": true
}
```

Generates `.d.ts` declaration files alongside compiled JavaScript.

This is especially useful when building libraries that other TypeScript projects will consume.

---

# A Typical `tsconfig.json` for Modern Node.js Projects

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",

    "strict": true,

    "sourceMap": true,

    "removeComments": false,

    "noEmitOnError": true,

    "pretty": true
  }
}
```

---

# Key Takeaways

* `tsconfig.json` is the configuration file for the TypeScript compiler.
* `compilerOptions` controls how TypeScript checks and compiles your code.
* `target` determines the JavaScript version that is generated.
* `rootDir` specifies where TypeScript reads source files from.
* `outDir` specifies where compiled JavaScript files are written.
* `strict` enables stronger type checking and is recommended for almost every project.
* `sourceMap` makes debugging TypeScript much easier.
* `module` and `moduleResolution` should be configured appropriately for your runtime (e.g., `NodeNext` for modern Node.js).
* `noEmitOnError` prevents generating JavaScript when compilation fails.

---

`strict` is one of the **most important compiler options** in TypeScript.

When enabled, it tells TypeScript:

> **"Be as strict as possible while checking my code."**

Instead of allowing potentially unsafe code, the compiler reports errors so you can fix them before running your program.

---

# Syntax

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

or

```json
{
  "compilerOptions": {
    "strict": false
  }
}
```

---

# What happens when `strict` is `false`?

TypeScript becomes much more permissive.

Example:

```ts
let username;

username = "Alice";
username = 100;
username = true;
```

✅ No errors.

Why?

Since no type was specified, TypeScript treats `username` as `any`.

---

Another example:

```ts
function greet(name) {
    console.log(name.toUpperCase());
}
```

No error, even though `name` has no type.

---

# What happens when `strict` is `true`?

Now TypeScript requires you to be explicit.

```ts
function greet(name) {
    console.log(name.toUpperCase());
}
```

❌ Error:

```
Parameter 'name' implicitly has an 'any' type.
```

Fix:

```ts
function greet(name: string) {
    console.log(name.toUpperCase());
}
```

---

Another example:

```ts
let age: number = "20";
```

❌ Error

```
Type 'string' is not assignable to type 'number'.
```

---

# Why does `strict` exist?

JavaScript allows many things that can lead to runtime bugs.

Example:

```ts
function printLength(text) {
    console.log(text.length);
}

printLength(undefined);
```

JavaScript:

```
Runtime Error
Cannot read properties of undefined
```

With strict mode enabled:

```ts
function printLength(text) {
```

❌ TypeScript immediately warns you that `text` has an implicit `any` type and encourages you to define it properly.

---

# `strict` is actually a group of compiler options

Setting

```json
{
    "strict": true
}
```

is equivalent to enabling several strict checks at once.

Some of the most important ones are:

| Option                         | Purpose                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `noImplicitAny`                | Prevents variables or parameters from silently becoming `any`.                   |
| `strictNullChecks`             | Treats `null` and `undefined` as separate types that must be handled explicitly. |
| `strictFunctionTypes`          | Performs stricter checking of function parameter compatibility.                  |
| `strictBindCallApply`          | Type-checks the use of `bind()`, `call()`, and `apply()`.                        |
| `strictPropertyInitialization` | Ensures class properties are initialized before use.                             |
| `noImplicitThis`               | Prevents `this` from implicitly having the `any` type.                           |
| `alwaysStrict`                 | Emits JavaScript in strict mode (`"use strict"`).                                |

You can also enable or disable these options individually.

Example:

```json
{
    "compilerOptions": {
        "strict": false,
        "noImplicitAny": true
    }
}
```

Here, only `noImplicitAny` is enforced while the other strict checks remain disabled.

---

# Should you use `strict`?

### ✅ New Projects

Always use:

```json
{
    "strict": true
}
```

It helps catch bugs early and encourages better coding practices.

---

### ⚠️ Existing JavaScript Projects

When migrating a large JavaScript codebase to TypeScript, developers often start with:

```json
{
    "strict": false
}
```

This reduces the number of initial errors, making the migration more manageable. Once the codebase is stable, they gradually enable `strict` or individual strict options.

---

# Summary

| `strict: true`               | `strict: false`                        |
| ---------------------------- | -------------------------------------- |
| Maximum type safety          | Relaxed type checking                  |
| More compiler errors         | Fewer compiler errors                  |
| Helps catch bugs early       | Easier migration from JavaScript       |
| Recommended for new projects | Useful temporarily for legacy projects |

> **Recommendation:** For almost all new TypeScript projects, set `"strict": true`. It encourages safer code and helps detect many common mistakes during development instead of at runtime.
