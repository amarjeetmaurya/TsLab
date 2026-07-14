
---
## Running TypeScript Directly with Node.js

Earlier, TypeScript files had to be compiled first.

```text
app.ts
   │
   ▼
tsc app.ts
   │
   ▼
app.js
   │
   ▼
node app.js
```

---

## Modern Node.js Support

Node.js can now execute `.ts` files directly.

```bash
node app.ts
```

### Timeline

| Version                   | Feature                                                |
| ------------------------- | ------------------------------------------------------ |
| **Node.js 22.6.0**        | Experimental support with `--experimental-strip-types` |
| **Node.js 22.7.0**        | Added `--experimental-transform-types`                 |
| **Node.js 23.6.0**        | Direct `.ts` execution enabled by default              |
| **Node.js 22.18.0 (LTS)** | Feature backported to the LTS release                  |

---

## How Does Node Run TypeScript?

Node **does not compile TypeScript** like `tsc`.

Instead, it simply removes the type annotations before executing the JavaScript.

Example:

```ts
let age: number = 20;
```

Node internally treats it like:

```js
let age = 20;
```

This process is called **type stripping**.

---

## Important Limitation

Node is **not** a replacement for the TypeScript compiler.

It only removes types that don't affect runtime.

Some TypeScript features still require the TypeScript compiler (`tsc`).

---

## TypeScript Compiler (`tsc`) vs Node.js

| Feature                          | `tsc`                 | Node.js |
| -------------------------------- | --------------------- | ------- |
| Removes types                    | ✅                     | ✅       |
| Type checking                    | ✅                     | ❌       |
| Generates JavaScript files       | ✅                     | ❌       |
| Reports TypeScript errors        | ✅                     | ❌       |
| Supports all TypeScript features | ✅                     | ❌       |
| Executes code                    | ❌ (after compilation) | ✅       |

---

## Example

```ts
interface User {
    name: string;
}

const user: User = {
    name: "Alice"
};

console.log(user.name);
```

### Using `tsc`

```bash
tsc app.ts
node app.js
```

* Checks for type errors
* Produces `app.js`
* Runs the generated JavaScript

### Using Node

```bash
node app.ts
```

* Removes the types
* Executes the JavaScript immediately
* Does **not** perform full TypeScript type checking

---

## Key Takeaways

* A **type** describes the kind of value a variable can hold.
* JavaScript has **7 primitive types** and **1 non-primitive type (`object`)**.
* TypeScript adds a static type system on top of JavaScript.
* Modern Node.js can execute `.ts` files directly.
* Node only **strips type annotations**; it does **not** perform full TypeScript compilation.
* For complete type checking and support for all TypeScript features, use the TypeScript compiler (`tsc`).

---

