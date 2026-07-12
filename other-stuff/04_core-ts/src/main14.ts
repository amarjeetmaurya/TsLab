// TypeScript Utility Types


// partial
interface Person {
  name: string;
  age: number;
  address: string;
}

function updatePerson(person: Person, updates: Partial<Person>): Person {
  return { ...person, ...updates };
}   


const personn: Person = {
  name: "Alice",
  age: 30,
  address: "123 Main St",
};



// Required
function ensurePerson(person: Partial<Person>): Person {
  if (!person.name || !person.age || !person.address) {
    throw new Error("Missing properties");
  }

    return person as Person;    
}

const updatedPerson = updatePerson(personn, { age: 31 });
console.log(updatedPerson); // { name: 'Alice', age: 31, address: '123 Main St' }

const completePerson = ensurePerson({
  name: "Bob",
  age: 25,
    address: "456 Elm St",
});
console.log(completePerson); // { name: 'Bob', age: 25, address: '456 Elm St' }



// Record 
type PhoneBook = Record<string, string>;

const phoneBook: PhoneBook = {
  "Alice": "123-456-7890",
  "Bob": "987-654-3210",
};
console.log(phoneBook); // { Alice: '123-456-7890', Bob: '987-654-3210' }
// Pick
type PersonNameAndAge = Pick<Person, "name" | "age">;
const personInfo: PersonNameAndAge = {
  name: "Charlie",
  age: 28,
};
console.log(personInfo); // { name: 'Charlie', age: 28 }



// Omit
type PersonWithoutAddress = Omit<Person, "address">;
const personWithoutAddress: PersonWithoutAddress = {    
    name: "Dave",
    age: 35,
};
console.log(personWithoutAddress); // { name: 'Dave', age: 35 } 



// Pick
type PersonNameAndAddress = Pick<Person, "name" | "address">;
const personNameAndAddress: PersonNameAndAddress = {
  name: "Eve",
    address: "789 Oak St",  
};
console.log(personNameAndAddress); // { name: 'Eve', address: '789 Oak St' }


// Exclude
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
const ex1: T1 = "c";
console.log(ex1); // c


// Extract
type T2 = Extract<"a" | "b" | "c", "a" | "b">;
const ex2: T2 = "a";
console.log(ex2); // a


// ReturnType
function getPerson(): Person {
  return {
    name: "Frank",
    age: 40,
    address: "101 Pine St",
  };
}   

type PersonReturnType = ReturnType<typeof getPerson>;
const personReturn: PersonReturnType = getPerson();
console.log(personReturn); // { name: 'Frank', age: 40, address: '101 Pine St' }


// Parameters
type GetPersonParams = Parameters<typeof getPerson>;
const params: GetPersonParams = [];
console.log(params); // []