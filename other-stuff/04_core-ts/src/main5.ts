// Typed Arrays
// A tuple is a typed array with a pre-defined length and types for each index.


// define our tuple
let ourTuple: [number, boolean, string];

// initialize correctly
ourTuple = [5, false, 'Coding God was here'];
// it should be in order of number, boolean, string

// We have no type safety in our tuple for indexes 3+
ourTuple.push('Something new and wrong');
console.log(ourTuple); // [ 5, false, 'Coding God was here', 'Something new and wrong' ]


// define our readonly tuple
const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding God'];
// ourReadonlyTuple.push('Coding God took a day off'); //errror


// Destructuring Tuples
// Since tuples are arrays we can also destructure them.
const graph: [number, number] = [55.2, 41.3];
const [m, n] = graph;
console.log(m); // 55.2
console.log(n); // 41.3