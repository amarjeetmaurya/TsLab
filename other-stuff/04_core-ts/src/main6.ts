// TypeScript Object Types

// ExampleGet your own TypeScript Server
const car: { type: string, model: string, year: number } = {
  type: "Toyota",
  model: "Corolla",
  year: 2009
};

console.log(car); // { type: 'Toyota', model: 'Corolla', year: 2009 }
car.type = "Ford"; // no error
// car.type = 2; // Error:


// -------------------------------------------------------

// You can also use optional properties with ?
const dog: { name: string, breed?: string } = {
  name: "Buddy"
};

console.log(dog); // { name: 'Buddy' }

// You can also use index signatures to define objects with dynamic keys
const fruitColors: { [key: string]: string } = {
  apple: "red",
  banana: "yellow",
  grape: "purple"
};
console.log(fruitColors); // { apple: 'red', banana: 'yellow', grape: 'purple' }


//Index Signatures
const coords: { [index: number]: string } = {
  0: "Zero",
  1: "One",
  2: "Two"
//   3: 3, // Error: Type 'number' is not assignable to type 'string'
};

console.log(coords); // { '0': 'Zero', '1': 'One', '2': 'Two' }
