// TypeScript Basic Generics


// Generics allow creating 'type variables' which can be used to create classes, functions & type aliases that don't need to explicitly define the types that they use.
// Generics make it easier to write reusable code.


// Functions
function identity<T>(arg: T): T {
  return arg;
}
console.log(identity<string>("Hello")); // specifying the type argument explicitly
console.log(identity<number>(42)); // specifying the type argument explicitly
console.log(identity("TypeScript"));; // type argument is inferred
console.log(identity(100)); // type argument is inferred



// Generic Classes
class NamedValue<T> {
  private _value: T | undefined;

  constructor(private name: string) {}

  public setValue(value: T) {
    this._value = value;
  }

  public getValue(): T | undefined {
    return this._value;
  }

  public toString(): string {
    return `${this.name}: ${this._value}`;
  }
}

let value = new NamedValue<number>('myNumber');
value.setValue(10);
console.log(value.toString()); //\ myNumber: 10


// Type Aliases
type Pair<T, U> = {
  first: T;
  second: U;
};
const pair: Pair<string, number> = { first: "age", second: 30 };
console.log(pair); // { first: 'age', second: 30 }


// Default Value
function createArray<T = string>(length: number, value: T): T[] {
  return new Array(length).fill(value);
}
// Using the default type argument (string) 

const stringArray = createArray(3, "hello");
console.log(stringArray); // [ 'hello', 'hello', 'hello' ]



// extends
function loggingIdentity<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
    return arg;
}
loggingIdentity("Hello, TypeScript!");
