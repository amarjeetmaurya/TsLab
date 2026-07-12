// TypeScript Classes


// Members: Types
// The members of a class (properties & methods) are typed using type annotations, similar to variables.

class Person {
  name: string = "";
}
      
const person1 = new Person();
person1.name = "Jane";

console.log(person1);


// Members: Visibility

class Person2 {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

const person2 = new Person2("Jane");
console.log(person2.getName()); // person.name isn't accessible from outside the class since it's private


// Parameter Properties
// TypeScript provides a convenient way to define class members in the constructor, by adding a visibility modifier to the parameter.
class Person3 {
  // name is a private member variable
  public constructor(private name: string) {}

  public getName(): string {
    return this.name;
  }
}

const person3 = new Person3("Jane");
console.log(person3.getName());



// Readonly
// Similar to arrays, the readonly keyword can prevent class members from being changed.
class Person4 {
  private readonly name: string;

  public constructor(name: string) {
    // name cannot be changed after this initial definition, which has to be either at its declaration or in the constructor.
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

const person4 = new Person4("Jane");
console.log(person4.getName());



// Inheritance: Implements
// Interfacces can be used to define the structure that a class must follow

interface IPerson {
  name: string;
  getName(): string;
}
class Person5 implements IPerson {
  constructor(public name: string) {}
  public getName(): string {
    return this.name;
  }
}

const person5 = new Person5("Jane");
console.log(person5.getName());



// Inheritance: Extends
// Classes can inherit from other classes using the extends keyword.
class Employee extends Person5 {
  constructor(name: string, public jobTitle: string) {
    super(name); // Call the constructor of the base class
  } 
  public getJobTitle(): string {
    return this.jobTitle;
  }
}

const employee = new Employee("Jane", "Software Engineer");
console.log(employee.getName());
console.log(employee.getJobTitle());


// Override 
// A derived class can override methods of its base class using the same method name.
class Manager extends Employee {
  constructor(name: string, jobTitle: string, public department: string) {
    super(name, jobTitle);
  }
  public getJobTitle(): string {
    return `Manager of ${this.department}`;
  }
}

const manager = new Manager("Jane", "Software Engineer", "Development");
console.log(manager.getName());
console.log(manager.getJobTitle());
console.log(manager.department);


// Abstract Classes
// Abstract classes cannot be instantiated directly and may contain abstract methods that must be implemented by derived classes.
abstract class Animal1 {
  abstract makeSound(): void;
  move(): void {
    console.log("Moving...");
  }
}
class Dog extends Animal1 {
  makeSound(): void {
    console.log("Bark!");
  }
}

const dogg = new Dog();
dogg.makeSound();
dogg.move();


// Static Members
// Static members belong to the class itself rather than to instances of the class.
class MathUtil {
  static PI: number = 3.14159;
  static calculateCircumference(radius: number): number {
    return 2 * MathUtil.PI * radius;
  }
}

console.log(MathUtil.PI);
console.log(MathUtil.calculateCircumference(5));

