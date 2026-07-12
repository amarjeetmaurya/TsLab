// Basic Types and Variables
var message = "Hello, TypeScript!";
var number = 42;
var isActive = true;
// Function with type annotations
function greet(name) {
    return "Welcome, ".concat(name, "!");
}
// Class example
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.introduce = function () {
        return "Hi, I'm ".concat(this.name, " and I'm ").concat(this.age, " years old.");
    };
    return Person;
}());
// Using the code
console.log(message);
console.log(greet("Developer"));
var user = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};
var person = new Person("Alice", 25);
console.log(person.introduce());
