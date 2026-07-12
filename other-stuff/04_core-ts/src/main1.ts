
// Boolen values
let isActive: boolean = true;
let hasPermission = false;
console.log(isActive);


// Number values
let decimal: number = 6;
let hex: number = 0xf00d;       // Hexadecimal
let binary: number = 0b1010;     // Binary
let octal: number = 0o744;      // Octal
let float: number = 3.14;      // Floating point
console.log(decimal);
console.log(float);


// String values
let color: string = "blue";
let fullName: string = 'John Doe';
let age: number = 30;
let sentence: string = `Hello, my name is ${fullName} and I'll be ${age + 1} next year.`;
console.log(sentence);


// BIgint (ES2020+)
// const bigNumber: bigint = 9007199254740991n;
// const hugeNumber = BigInt(9007199254740991); // Alternative syntax


// Symbol
const uniqueKey: symbol = Symbol('description');
const obj = {
  [uniqueKey]: 'This is a unique property'
};
console.log(obj[uniqueKey]); // "This is a unique property"

// what is sybbol in ts ?
// A Symbol is a unique and immutable primitive value that can be used as a key for object properties. 
// Each time you create a Symbol, even with the same description, it is guaranteed to be unique.
