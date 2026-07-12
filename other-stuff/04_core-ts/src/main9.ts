// Union types are used when a value can be more than a single type.
// Such as when a property would be string or number.


// Union | (OR)
// Using the | we are saying our parameter is a string or number:
type StringOrNumber = string | number;

const example1: StringOrNumber = "Hello";
const example2: StringOrNumber = 42;
// const example3: StringOrNumber = true; // Error: Type 'boolean' is not assignable to type 'StringOrNumber'



function displayValue(value: StringOrNumber): void {
  if (typeof value === "string") {
    console.log("String value: " + value);
  } else {
    console.log("Number value: " + value);
  }
}
console.log(car3); // { year: 2015, type: 'Ford', model: 'Focus' }



// Union Type Errors
// Note: you need to know what your type is when union types are being used to avoid type errors:
function printStatusCode(code: string | number) {
//   console.log(`My status code is ${code.toUpperCase()}.`); // Error: Property 'toUpperCase' does not exist on type 'string | number'.
}
