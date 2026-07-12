// TypeScript offers two ways to work with types:

// Explicit Typing: You explicitly declare the type of a variable
// Type Inference: TypeScript automatically determines the type based on the assigned value

// When to Use Each Approach

// Use explicit types for:
// Function parameters and return types
// Object literals
// When the initial value might not be the final type

// Use type inference for:
// Simple variable declarations with immediate assignment
// When the type is obvious from the context


// String
let greeting: string = "Hello, TypeScript!";
// Number
let userCount: number = 42;
// Boolean
let isLoading: boolean = true;
// Array of numbers
let scores: number[] = [100, 95, 98];

// Output the values
console.log(greeting);
console.log(userCount);
console.log(isLoading);
console.log(scores);


// Function with explicit parameter and return types
function greet(name: string): string {
  return `Hello, ${name}!`;
}
// TypeScript will ensure you pass the correct argument type
greet("Alice"); // OK

// -------------------------------------------------------------------------------
// Type Inference
// TypeScript can automatically determine (infer) the type of a variable based on its initial value:
let username = "alice";
let score = 100;
let flags = [true, false, true];
function add(a: number, b: number) {
  return a + b;
}
console.log(username);
console.log(score);
console.log(flags);
console.log(add(5, 3));

// Object Type Inference Example

// TypeScript infers the shape of the object
const user = {
  name: "Alice",
  age: 30,
  isAdmin: true
};

// TypeScript knows these properties exist
console.log(user.name);   // OK
// console.log(user.email); //errror


// explicit Type Mismatch
// let username: string = "alice";
// username = 42; // Error: Type 'number' is not assignable to type 'string'
// Implicit Type Mismatch
// let score = 100;  // TypeScript infers 'number'
// score = "high";  // Error: Type 'string' is not assignable to type 'number'

// function add(a: number, b: number): number {
// return a + b;
// }
// console.log(add("5", 3)); // Error:  Argument of type 'string' is not assignable to parameter of type 'number'
