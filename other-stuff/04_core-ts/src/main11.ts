// TypeScript Casting


// Casting with as

let someValue: unknown = "This is a string";
let strLength: number = (someValue as string).length;
console.log(`String length: ${strLength}`); // String length: 16


// Casting with < >
let anotherValue: unknown = "Another string here";
let anotherStrLength: number = (<string>anotherValue).length;
console.log(`Another string length: ${anotherStrLength}`); // Another string length: 20


//Force Casting
let x = 'hello';
// console.log(((x as unknown) as number).length); // x is not actually a number so this will return undefined


