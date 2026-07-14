
---
## What is a Type?

A **type** defines what kind of value a variable can store and what operations can be performed on that value.

It helps both the developer and TypeScript detect mistakes before the code runs.

```ts
let age: number = 20;
let name: string = "John";
let isStudent: boolean = true;
```

---

## JavaScript Data Types

JavaScript has **8 data types**, and TypeScript builds upon these same types.

### Primitive Types

Primitive values are immutable and are stored directly as values.

| Type        | Example         |
| ----------- | --------------- |
| `number`    | `10`, `3.14`    |
| `string`    | `"Hello"`       |
| `boolean`   | `true`, `false` |
| `bigint`    | `123n`          |
| `undefined` | `undefined`     |
| `null`      | `null`          |
| `symbol`    | `Symbol("id")`  |

---

### Non-Primitive Type

Objects are collections of properties.

| Type     | Example                                     |
| -------- | ------------------------------------------- |
| `object` | `{ name: "John" }`, `[1,2,3]`, `new Date()` |

> Arrays, functions, classes, maps, sets, etc. are all objects in JavaScript.

---
