// TypeScript Enums

// What is enum?
// An enum (short for "enumeration") is a special data type in TypeScript that allows you to define a set of named constants.
// Enums are useful when you want to represent a collection of related values in a more readable and maintainable way.

// Numeric Enums -Default
enum Direction {
  Up=9,
  Down,
  Left,
  Right,
}

console.log(Direction.Up); // 0
console.log(Direction.Down); // 1
console.log(Direction.Left); // 2
console.log(Direction.Right); // 3


// enum Direction {
//   Up = 1, // Assigning 1 to Up
//   Down, // Automatically assigned 2
//   Left, // Automatically assigned 3
//   Right, // Automatically assigned 4
// }

console.log(Direction.Up); // 9
console.log(Direction.Down); // 10
console.log(Direction.Left); // 11
console.log(Direction.Right); // 12


// Numeric Enums - Fully Initialized

enum StatusCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}
console.log(StatusCodes.OK); // 200
console.log(StatusCodes.BadRequest); // 400
console.log(StatusCodes.Unauthorized); // 401
console.log(StatusCodes.NotFound); // 404


// String Enums
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}       
console.log(Color.Red); // "RED"
console.log(Color.Green); // "GREEN"        
// and so on 





