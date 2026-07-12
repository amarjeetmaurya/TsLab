// Basic Types and Variables
let message: string = "Hello, TypeScript!";
let number: number = 42;
let isActive: boolean = true;

// Function with type annotations
function greet(name: string): string {
    return `Welcome, ${name}!`;
}

// Interface definition
interface User {
    id: number;
    name: string;
    email: string;
}

// Class example
class Person {
    constructor(
        private name: string,
        private age: number
    ) {}

    public introduce(): string {
        return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
    }
}

// Using the code
console.log(message);
console.log(greet("Developer"));

const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};

const person = new Person("Alice", 25);
console.log(person.introduce());