// fs is the Node.js file system module
const fs = require("fs");
const path = require("path");

const sections = {
  "Section 10: Type Narrowing & Control Flow Analysis": [
    "Introduction to Control Flow Analysis",
    "Type Widening and Type Narrowing in TypeScript",
    "Type Narrowing Techniques and Purpose",
    "Narrowing with typeof Type Guard",
    "Narrowing with instanceof Type Guard",
    "Narrowing with the in Operator Type Guard",
    "Equality Narrowing in TypeScript",
    "Truthiness Narrowing in TypeScript",
    "Assignment-Based Narrowing in TypeScript",
    "Discriminated Union Narrowing in TypeScript",
    "What is a Predicate in Logic and Mathematics?",
    "User-Defined Type Guards with Type Predicates",
    "Assertion Functions and Type Narrowing with asserts Keyword",
    "Exhaustiveness Checking in TypeScript",
    "Type Narrowing in Generic Functions",
    "Narrowing Across Function Boundaries",
    "Control Flow Analysis of Aliased Conditions and Discriminants",
    "The satisfies Operator in TypeScript"
  ],
  "Section 11: Understanding Modules in TypeScript": [
    "Why Do We Need Modules?",
    "ES Modules vs CommonJS: The Real Difference",
    "Importing and Exporting Values",
    "Mastering Import and Export Patterns",
    "When to Use Default vs Named Exports",
    "Re-Exporting Modules Efficiently",
    "Understanding Type-Only Imports and Exports",
    "How Module Resolution Works in TypeScript",
    "Understanding File Extensions in TypeScript Imports",
    "Configuring Modules with module Compiler Option",
    "Configuring Module Resolution with moduleResolution Compiler Option",
    "Understanding Package Entry Points",
    "Working with Package Exports and Imports",
    "Import Attributes and the with Keyword",
    "Importing JavaScript Files into TypeScript",
    "How Node.js Resolves Modules",
    "Understanding Bare, Relative, and Absolute Imports",
    "Debugging Module Resolution Problems"
  ],
  "Section 12: Ambient Declarations and Declaration Files": [
    "What Are Ambient Declarations?",
    "Understanding the declare Keyword",
    "Declaring Global Variables",
    "Declaring Global Functions and Objects",
    "Global vs Module Scope in TypeScript",
    "Declaring Modules Using declare module",
    "Understanding Ambient Modules",
    "Wildcard Module Declarations",
    "What Are Declaration Files (.d.ts)?",
    "Why TypeScript Needs Declaration Files",
    "Understanding How TypeScript Finds Types",
    "Exploring Built-in Declaration Files Like lib.es6.d.ts",
    "Writing Declaration Files for JavaScript Libraries",
    "Understanding @types and DefinitelyTyped",
    "Module Augmentation Explained",
    "Global Augmentation Explained",
    "Extending Existing Types Safely",
    "Common Mistakes in Declaration Files",
    "Mental Model of Ambient Declarations and Declaration Files",
    "@ Directives in TypeScript"
  ]
};




// Utility to sanitize folder names
function sanitizeName(name) {
  return name.replace(/\s+/g, "_");
}

// Create folders
function createFolders(baseDir, sections) {
  Object.entries(sections).forEach(([sectionName, children]) => {
    const sectionFolder = path.join(baseDir, sanitizeName(sectionName));
    fs.mkdirSync(sectionFolder, { recursive: true });

    children.forEach((child, index) => {
      const num = String(index + 1).padStart(2, "0"); // 01, 02, etc.
      const childFolder = path.join(
        sectionFolder,
        `${num}_${sanitizeName(child)}`
      );
      fs.mkdirSync(childFolder, { recursive: true });
    });
  });
}

// Run the script
const baseDir = path.join(__dirname, "Course_Content");
createFolders(baseDir, sections);

console.log("Folders created successfully!");
