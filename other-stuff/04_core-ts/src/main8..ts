// Type Aliases

// Type Aliases allow defining types with a custom name (an Alias).
// Type Aliases can be used for primitives like string or more complex types such as objects and arrays:


type CarYear = number
type CarType = string
type CarModel = string
type Car = {
  year: CarYear,
  type: CarType,
  model: CarModel
}

const carYear: CarYear = 2001
const carType: CarType = "Toyota"
const carModel: CarModel = "Corolla"

const car1: Car = {
  year: carYear,
  type: carType,
  model: carModel
};

console.log(car1); // { year: 2001, type: 'Toyota', model: 'Corolla' }

const car2: Car = { 
    year: 2020,
    type: "Honda",
    model: "Civic"
};
console.log(car2); // { year: 2020, type: 'Honda', model: 'Civic' }



// Type Aliases can also be used with Unions and Intersections
type Animal = { name: string };
type Bear = Animal & { honey: boolean };
const bear: Bear = { name: "Winnie", honey: true };
console.log(bear); // { name: 'Winnie', honey: true }

// Example of Union Type Alias
type Status = "success" | "error";
let response: Status = "success";
console.log(response); // "success"
response = "error";
console.log(response); // "error"
// response = "loading"; // Error: Type '"loading"' is not assignable to type 'Status'



// Interfaces
// Interfaces are similar to type aliases, except they only apply to object types.

interface CarInterface {
  year: number;
  type: string;
  model: string;
}
const car3: CarInterface = {
  year: 2015,
  type: "Ford",
  model: "Focus"
};
console.log(car3); // { year: 2015, type: 'Ford', model: 'Focus' }


// Example: Interface Merging
interface Person {
  name: string;
} 
interface Person {
  age: number;
}
const person: Person = {
  name: "Alice",
  age: 30
};
console.log(person); // { name: 'Alice', age: 30 }
// Note: Type Aliases cannot be merged like Interfaces can.


// Type vs Interface: Key Differences
// Extending: Both can be extended, but interfaces support declaration merging.
// Unions/Intersections: Only type aliases support union and intersection types.
// Implements: Classes can implement either.
// Recommendation: Use interface for objects, type for everything else.
// Best Practices:

// Use interface for defining object shapes and public APIs.
// Use type for unions, intersections, and primitives.
// Favor composition over inheritance for types.
// Document your types and interfaces for clarity.
// Common Pitfalls:

// Using type when you need declaration merging (use interface).
// Overcomplicating types—keep them simple and focused.
// Forgetting to update types/interfaces as code evolves.


// Extending Interfaces
// Interfaces can extend each other's definition.
// Extending an interface means you are creating a new interface with the same properties as the original, plus something new.

interface Rectangle {
  height: number,
  width: number
}

interface ColoredRectangle extends Rectangle {
  color: string
}

const coloredRectangle: ColoredRectangle = {
  height: 20,
  width: 10,
  color: "red"
};

console.log(coloredRectangle); // { height: 20, width: 10, color: 'red' }

