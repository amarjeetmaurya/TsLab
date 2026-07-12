import { add, subtract, multiply, divide } from "./math"; // in ts we not use .ts while importing

const sumResult = add(5, 3);
const subResult = subtract(5, 3);
const mulResult = multiply(8, 2);
const divResult = divide(6, 2);

console.log("Sum is:", sumResult);
console.log("Subtraction is:", subResult);
console.log("Multiplication is:", mulResult);
console.log("Division is:", divResult);
