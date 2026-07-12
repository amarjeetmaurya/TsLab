// Array

const names: string[] = [];
names.push("Dylan"); // no error
// names.push(3); // Error



// readonly keyword can prevent arrays from being changed.
const students: readonly string[] = ["Dylan"];
// students.push("Jack"); // Error

const numbers = [1, 2, 3]; // inferred to type number[]
numbers.push(4); 
// numbers.push("6"); // Error

