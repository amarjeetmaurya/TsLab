Template literal types build on top of string literal types. They allow you to manipulate, combine, and dynamically generate new string literal types using the exact same backtick syntax (`) as JavaScript template strings. 

------------------------------
## How They Work
When you insert a union of literal types inside a template literal, TypeScript automatically multiplies the options out to generate every single possible combination of those strings. 

// Union of dice numbers
type DiceNumber = 1 | 2 | 3 | 4 | 5 | 6;
let b: `My dice number is ${DiceNumber}` = "My dice number is 3"; // Valid ✅
let b: `My dice number is ${DiceNumber}` = "My dice number is 30"; // Error ❌

// Strictly typed API endpoints
type Endpoints = `/api/${"user" | "posts" | "comments"}`;
let a: Endpoints = "/api/posts"; // Valid ✅

type Size = "small" | "large";
type Color = "red" | "blue";
// TypeScript generates all 4 combinations automatically

type ShirtStyle = `${Size}-${Color}`;
// Equivalent to: "small-red" | "small-blue" | "large-red" | "large-blue"

let item: ShirtStyle = "small-red"; // Valid ✅
let wrongItem: ShirtStyle = "medium-blue"; // Error ❌


------------------------------
## Key Features & Capabilities

## 1. Dynamic Event and API Route Generation 
You can use template literals to strictly type pattern-based strings, like web events or database queries.

type BaseEntity = "User" | "Post" | "Comment";
// Automatically creates: "onUserChange" | "onPostChange" | "onCommentChange"type ChangeEvent = `on${BaseEntity}Change`;

## 2. Built-in String Manipulation Utilities 
TypeScript provides four global generic types to transform the casing of strings inside your template types:

* Uppercase<Type>: Converts string to uppercase.
* Lowercase<Type>: Converts string to lowercase.
* Capitalize<Type>: Capitalizes the first letter.
* Uncapitalize<Type>: Lowercases the first letter.

type Direction = "north" | "south";
// Results in: "NORTH" | "SOUTH"type LoudDirection = Uppercase<Direction>; 
// Results in: "North" | "South"type ProperDirection = Capitalize<Direction>; 

## 3. Mapping Object Keys
You can combine template literal types with mapped types to completely rewrite object keys on the fly. This is incredibly useful for turning plain properties into getter or setter methods. 

interface User {
  id: number;
  name: string;
}
// Automatically turns { name: string } into { getName: () => string }type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};
type UserGetters = Getters<User>;/* 
Resulting Type:
{
  getId: () => number;
  getName: () => string;
}
*/

------------------------------
## Why Use Them?

* No Duplication: You define your base terms once and reuse them to build complex systems.
* Safer Refactoring: If you change "User" to "Account" in your base type, your entire event system and API routes update automatically.
* Strong CSS/UI Typing: Perfect for enforcing strict design system patterns like padding sizes (padding-top, padding-left) or Tailwind-style classes. [17, 18] 

Would you like to try writing a custom type for a Tailwind class utility, or do you want to see how template types can extract and match values using the infer keyword?
