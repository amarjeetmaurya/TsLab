# Interface in TypeScript

An **interface** in TypeScript is a powerful way to define an object type. It acts as a strict structural blueprint or contract that an object, class, or function must follow at compile time.

Unlike type aliases (`type`), interfaces are specifically designed for defining the shapes of objects and are heavily optimized for object-oriented programming.

---

# Basic Syntax of an Interface

To create an interface, use the `interface` keyword followed by the interface name (traditionally capitalized) and curly braces (`{}`). Notice that **no assignment operator (`=`)** is used.

### 1. Defining the Contract

```ts
interface User {
  id: number;
  username: string;
  role?: string; // 💡 Optional property works here too!
}
```

### 2. Fulfilling the Contract with an Object Literal

```ts
const admin: User = {
  id: 1,
  username: "Dev_Alice"
};
```

---

Yes, I got it. And I think the best way to teach this is **not by listing differences**, but by **building curiosity step by step**, exactly like your learning journey.

The order should be:

1. What are `type` and `interface`?
2. First surprising fact: **A type can alias an interface**
3. Then the question: **Can an interface alias a type?**
4. Why not?
5. Then explain `extends`
6. Then explain `&`
7. Then declaration merging
8. Finally a complete comparison table.

That way, a beginner can experiment after every concept.

---

# Understanding `interface` vs `type` in TypeScript

Most beginners think **`interface`** and **`type`** are exactly the same because both can describe the shape of an object.

```ts
interface User {
  name: string;
  age: number;
}

type UserType = {
  name: string;
  age: number;
}
```

Both allow this:

```ts
const user1: User = {
  name: "Rahul",
  age: 20
};

const user2: UserType = {
  name: "Amit",
  age: 22
};
```

So naturally, the question becomes:

> **If both do the same thing, why does TypeScript have two different keywords?**

Let's discover the differences one by one.

---

# Difference 1 — A `type` can alias an `interface`

This is usually the first surprising thing people discover.

Suppose we already have an interface.

```ts
interface User {
  name: string;
  age: number;
}
```

Instead of writing the same structure again, a type can simply become another name for it.

```ts
type UserType = User;
```

Now both names represent exactly the same thing.

```ts
const u1: User = {
  name: "Rahul",
  age: 20
};

const u2: UserType = {
  name: "Amit",
  age: 25
};
```

Both variables have exactly the same structure.

Think of it like this:

```
interface User
        │
        │
        ▼
type UserType = User
```

`UserType` is simply another name (alias) for `User`.

Nothing new is created.

---

## Experiment 1

Hover over `UserType` in VS Code.

```ts
interface User {
  name: string;
  age: number;
}

type UserType = User;
```

You'll notice that `UserType` has exactly the same properties as `User`.

---

# Difference 2 — Can an `interface` alias a `type`?

After learning the previous example, most people ask:

> If a type can alias an interface, can an interface also alias a type?

Many expect this to work:

```ts
type User = {
  name: string;
  age: number;
};

interface IUser = User;
```

❌ This produces a syntax error.

```
An interface cannot be assigned using =
```

---

## Why?

Because **`interface` simply doesn't have an assignment syntax.**

A type alias is literally an assignment.

```ts
type NewName = ExistingType;
```

Notice the `=`.

That assignment operator tells TypeScript:

> "Don't create anything new. Just give this existing type another name."

Interfaces don't work that way.

Their job is different.

An interface always **declares** a new object blueprint.

```ts
interface User {
    ...
}
```

There is no assignment mechanism.

That's why this syntax doesn't exist.

```ts
interface NewInterface = User;
```

---

## Think of it like this

A **type** is an alias machine.

It can point to another type.

```
type A = B
```

An **interface** is a blueprint.

It only describes an object.

```
interface A {
    ...
}
```

It never says

```
interface A = B
```

because interfaces don't rename things.

---

# So how can an interface use a type?

Instead of aliasing, an interface can **inherit** from a type using `extends`.

Example:

```ts
type User = {
  name: string;
  age: number;
};

interface Student extends User {
  school: string;
}
```

Now `Student` automatically gets everything from `User`.

```ts
const s: Student = {
  name: "Rahul",
  age: 20,
  school: "ABC School"
};
```

Notice what happened.

We did **not** rename `User`.

Instead, we created a **new interface** that contains everything from `User` plus something extra.

```
User
 │
 │ extends
 ▼
Student
```

This is inheritance, **not aliasing**.

---

## Experiment 2

Try removing `name`.

```ts
const s: Student = {
  age: 20,
  school: "ABC"
};
```

TypeScript immediately complains because `Student` inherited `name`.

---

# The Philosophy Behind Both

This is the biggest conceptual difference.

## `type`

Think of a type as an **assignment engine**.

It can alias almost anything.

```ts
type A = string;

type B = number;

type C = User;

type D = string | number;

type E = [number, string];
```

A type can alias

* primitives
* objects
* interfaces
* unions
* tuples
* intersections
* function types

Almost anything.

---

## `interface`

An interface is an **object blueprint**.

Its purpose is to describe object structures.

It builds objects.

It extends objects.

It merges object declarations.

It is **not** a general-purpose aliasing tool.

---

# Difference 3 — Extending Interfaces

Interfaces use `extends` to inherit properties.

```ts
interface User {
  age: number;
  DOB: string;
}

interface Student extends User {
  schoolName: string;
  class: string;
}
```

The resulting structure is

```ts
{
    age: number;
    DOB: string;
    schoolName: string;
    class: string;
}
```

Creating an object

```ts
const alex: Student = {
  age: 16,
  DOB: "2010-05-12",
  schoolName: "West HS",
  class: "10th Grade"
};
```

Everything from `User` automatically becomes part of `Student`.

---

# Difference 4 — How Types Do the Same Thing

Types don't use `extends`.

Instead, they use the **intersection operator (`&`)**.

```ts
type User = {
  age: number;
  DOB: string;
};

type Student = User & {
  schoolName: string;
  class: string;
};
```

Result

```ts
{
    age: number;
    DOB: string;
    schoolName: string;
    class: string;
}
```

Exactly the same object shape.

---

## Visual Comparison

### Interface

```
User
 │
 │ extends
 ▼
Student
```

---

### Type

```
User
   &
New Properties
      │
      ▼
 Student
```

---

# Difference 5 — Declaration Merging (Interface Only)

This is probably the most unique feature of interfaces.

Suppose you write

```ts
interface User {
  name: string;
}
```

Later, somewhere else in the project,

```ts
interface User {
  age: number;
}
```

Instead of throwing an error, TypeScript combines them.

It behaves as if you had written

```ts
interface User {
  name: string;
  age: number;
}
```

This is called **Declaration Merging**.

---

## Experiment 3

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

const u: User = {
  name: "Rahul",
  age: 20
};
```

Works perfectly.

---

## Can types do this?

No.

```ts
type User = {
  name: string;
};

type User = {
  age: number;
};
```

Error:

```
Duplicate identifier 'User'
```

Types cannot merge automatically.

---

# Difference 6 — How Types Combine Instead

Types combine using `&`.

```ts
type User = {
  name: string;
};

type Age = {
  age: number;
};

type Person = User & Age;
```

Result

```ts
{
    name: string;
    age: number;
}
```

Notice the difference.

Interfaces merge automatically if the names match.

Types require you to explicitly combine them with `&`.

---

# Difference 7 — Property Conflicts

Suppose we have

```ts
interface User {
  age: number;
}
```

Now we extend it.

```ts
interface Student extends User {
  age: string;
}
```

❌ Error

```
Property 'age' is incompatible with inherited property.
```

Interfaces catch the conflict immediately.

---

Now look at types.

```ts
type User = {
  age: number;
};

type Student = User & {
  age: string;
};
```

TypeScript computes the intersection:

```ts
number & string
```

Since no value can be both a `number` and a `string` at the same time, the result becomes:

```ts
age: never
```

That means the property can never have a valid value.

```ts
const s: Student = {
  age: ??? // Impossible
};
```

So the code becomes unusable because `age` has type `never`.

---

# Quick Comparison Table

| Feature                               | `interface`                                          | `type`                                       |
| ------------------------------------- | ---------------------------------------------------- | -------------------------------------------- |
| Describe object shapes                | ✅                                                    | ✅                                            |
| Alias another interface               | ❌                                                    | ✅ (`type A = User`)                          |
| Alias primitives (`string`, `number`) | ❌                                                    | ✅                                            |
| Alias unions (`A \| B`)               | ❌                                                    | ✅                                            |
| Alias tuples (`[number, string]`)     | ❌                                                    | ✅                                            |
| Extend object shapes                  | ✅ (`extends`)                                        | ✅ (`&`)                                      |
| Declaration merging                   | ✅                                                    | ❌                                            |
| Can rename existing types             | ❌                                                    | ✅                                            |
| Best for                              | Object-oriented design, public APIs, class contracts | General-purpose type composition and aliases |

---

# Mental Model to Remember

* **`interface` = Blueprint** 🏗️
  It defines the structure of objects, supports inheritance (`extends`), and can merge with other declarations of the same name.

* **`type` = Alias + Type Composer** 🏷️
  It can rename existing types, represent primitives, unions, tuples, function types, and combine types using intersections (`&`).

A helpful rule of thumb is:

* If you're primarily describing the shape of objects—especially for classes or extensible APIs—`interface` is a natural fit.
* If you need the full flexibility of the type system (aliases, unions, tuples, mapped types, intersections, primitives, etc.), use `type`.
