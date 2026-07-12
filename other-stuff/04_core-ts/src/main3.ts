// 1. Variables declared without initialization
let something;  // Type is 'any'
something = 'hello';
something = 42;  // No error


// The any type is the most flexible type in TypeScript.
// It essentially tells the compiler to skip type checking for a particular variable.
// While this can be useful in certain situations, it should be used sparingly as it bypasses TypeScript's type safety features.
// When to use any:
// When migrating JavaScript code to TypeScript
// When working with dynamic content where the type is unknown
// When you need to opt out of type checking for a specific case
// Example with any
let v: any = true;
v = "string"; // no error as it can be "any" type
Math.round(v); // no error as it can be "any" type

// Type: unknown
// The unknown type is a type-safe counterpart of any.
// It's the type-safe way to say "this could be anything, so you must perform some type of checking before you use it".

// Key differences between unknown and any:
// unknown must be type-checked before use
// You can't access properties on an unknown type without type assertion
// You can't call or construct values of type unknown

let w: unknown = 1;
w = "string"; // no error
w = {
  runANonExistentMethod: () => {
    console.log("I think therefore I am");
  }
} as { runANonExistentMethod: () => void}
// How can we avoid the error for the code commented out below when we don't know the type?
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if(typeof w === 'object' && w !== null) {
  (w as { runANonExistentMethod: Function }).runANonExistentMethod();
}


// When to use unknown:
// When working with data from external sources (APIs, user input, etc.)
// When you want to ensure type safety while still allowing flexibility
// When migrating from JavaScript to TypeScript in a type-safe way



// Type: never
// The never type represents the type of values that never occur.

// It's used to indicate that something never happens or should never happen.
// Common use cases for never:
// Functions that never return (always throw an error or enter an infinite loop)
// Type guards that never pass type checking
// Exhaustiveness checking in discriminated unions

// Function that never returns
function throwError(message: string): never {
  throw new Error(message);
}
// Basic never type (throws error when assigned)
// let x: never = true; // Error: Type 'boolean' is not assignable to type 'never'.

// When to use never:
// For functions that will never return a value
// In type guards that should never match
// For exhaustive type checking in switch statements
// In generic types to indicate certain cases are impossible


// Type: undefined & null
// In TypeScript, both undefined and null have their own types, just like string or number.

// By default, these types can be assigned to any other type, but this can be changed with TypeScript's strict null checks.
// Key points about undefined and null:

// undefined means a variable has been declared but not assigned a value
// null is an explicit assignment that represents no value or no object
// In TypeScript, both have their own types: undefined and null respectively
// With strictNullChecks enabled, you must explicitly handle these types

let y: undefined = undefined;
let z: null = null;