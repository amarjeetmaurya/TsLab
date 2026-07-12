Type Alias is a custom name given to an existing type. It lets you create a new, semantic name for primitive values, object structures, union types, or function signatures, making your code easier to read and maintain.
You define a type alias using the *type* keyword.

Here are a few common ways to use them: 
1. Simple Primitives

Instead of using generic types like string all over your code, you can use aliases to give them context:
type UserID = string; 
type Username = string;
function greet(name: Username, id: UserID) {
  console.log(`Welcome, ${name}! Your ID is ${id}`);
}

2. Object Types
They are very common for defining the shape of an object:

type Employee = {
  name: string;
  startDate: string;
  role: "admin" | "manager" | "employee";
};
const john: Employee = {
  name: "John Doe",
  startDate: "2026-06-01",
  role: "manager"
};

3. Union Types
Aliases really shine when you need to bundle multiple types together. For example, when a variable or function argument can be either a number or string: [1, 5, 6, 7] 

type ID = string | number;
function processTransaction(transactionId: ID) {
  // Logic here
}

let users: ID[] = [23213, "35343", 33433];

Function Signatures
You can enforce strict rules on function parameters and return types: 
type MathOperation = (a: number, b: number) => number;
const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (x, y) => x * y;

Why use Type Aliases?
* DRY (Don't Repeat Yourself): Define a complex type once and reuse it across multiple variables, functions, and classes.
* Readability: Replaces long, messy inline types with self-describing, semantic names.
* Maintainability: If the structure of your data changes, you only need to update the type definition in one place.