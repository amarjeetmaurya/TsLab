
Literal types allow you to specify the exact value that a variable, property, or function parameter must hold, rather than just a broad category like string or number. 
By default, a type like string allows an infinite combination of characters. A string literal type like "north", however, limits the allowed value to only that exact string. 

## The Core Types of Literals
TypeScript supports four main categories of literal types: 
* String Literals: Restricts value to a specific text string 
(e.g., type Direction = "Left" | "Right").
* Numeric Literals: Restricts value to a precise number 
(e.g., type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6).
* Boolean Literals: Constrains the value to exactly true or false.
* Template Literal Types: Built using template string syntax to create new string combinations dynamically (e.g., type Event = `on${"Click" | "Hover"}` results in "onClick" | "onHover"). 

------------------------------
## Combining with Union Types
Literal types are rarely used alone because a variable that can only hold a single value is not very useful. Instead, they are commonly combined with Union Types (|) to define a strict, finite set of permitted values. 

// Declaring a union of string literal types
type Status = "idle" | "loading" | "success" | "error";
let currentStatus: Status;

currentStatus = "loading"; // Valid ✅
currentStatus = "finished"; // Error: Type '"finished"' is not assignable to type 'Status' ❌

------------------------------
## Key Benefits

* Compile-Time Safety: Catches spelling mistakes and illegal values immediately during development.
* Excellent Autocompletion: Your IDE will proactively suggest the exact strings or numbers allowed as soon as you start typing.
* Lightweight Alternative to Enums: Unlike enum, literal types vanish completely when compiled to JavaScript, resulting in zero runtime overhead.

------------------------------
## Literal Narrowing & The as const Assertion
When you declare a variable with let, TypeScript automatically widens it to a broad type because its value can change. 
When you use const, TypeScript narrows it to a literal type. 

let broadString = "Hello"; // Inferred as type: string
const literalString = "Hello"; // Inferred as type: "Hello"

However, if you put literal values inside an object or array, TypeScript will still widen the properties to general types because object properties can normally be mutated. You can fix this using the as const assertion: 

// Without as const: property is inferred as 'string'
const config = {
  theme: "dark" 
}; 

// With as const: property is locked down to the literal type '"dark"'const strictConfig = {
  theme: "dark"
} as const; 


