// TypeScript Functions

// Return Type
// The type of the value returned by the function can be explicitly defined.

function add(a: number, b: number): number {
  return a + b;
}
console.log(add(5, 10)); // 15

// Void Type
// If a function does not return a value, its return type is void.  
function logMessage(message: string): void {
  console.log("Log: " + message);
}
logMessage("Hello, TypeScript!"); // Log: Hello, TypeScript!


// If no parameter type is defined, TypeScript will default to using any, 
// unless additional type information is available as shown in the Default Parameters and Type Alias sections below.
function multiply(a: number, b: number) {
  return a * b;
}
console.log(multiply(4, 5)); // 20


// Optional Parameters
// Parameters can be marked as optional by appending a ? to the parameter name.
function greet(name: string, greeting?: string): string {   
    if (greeting) {
        return `${greeting}, ${name}!`;
    } else {
        return `Hello, ${name}!`;
    }   
}
console.log(greet("Alice")); // Hello, Alice!
console.log(greet("Bob", "Good morning")); // Good morning, Bob!


// Named Parameters
// Named parameters can be simulated using an object as a parameter.
function createUser({ name, age }: { name: string; age: number }): string {
  return `User ${name} is ${age} years old.`;
}
console.log(createUser({ name: "Charlie", age: 30 })); // User Charlie is 30 years old.


// Rest Parameters
// Rest parameters allow a function to accept an indefinite number of arguments as an array.
function sumAll(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15


// Type Aliases
// Type aliases allow you to create a new name for a type. 
// This is especially useful for complex types or unions.
type Bike = {
    brand: string;
    model: string;
    year: number;
};  
const myBike: Bike = {
    brand: "Trek",
    model: "Domane", 
    year: 2021
};
console.log(myBike); // { brand: 'Trek', model: 'Domane', year: 2021 }