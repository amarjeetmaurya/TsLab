
This project demonstrates a basic TypeScript setup using a configuration file (`tsconfig.json`). It compiles TypeScript from the `src/` folder into JavaScript in the `dist/` folder.

---

### ⚙️ `tsconfig.json` Explained

```json
{
  "compilerOptions": {
    "target": "es6",                  // Output modern JavaScript
    "module": "commonjs",             // Use Node.js module system
    "outDir": "./dist",               // Save compiled files in 'dist'
    "rootDir": "./src",               // Source files live in 'src'
    "strict": true,                   // Enable strict type checks
    "esModuleInterop": true           // Allow default imports from CommonJS
  },
  "include": ["src/**/*"]
}
```

#### 🔍 Key Options
- `target`: Sets the JavaScript version (ES6 is widely supported).
- `module`: Defines how modules are handled (CommonJS for Node.js).
- `outDir` / `rootDir`: Organize output and source files.
- `strict`: Enables all strict type-checking (recommended).
- `esModuleInterop`: Lets you import CommonJS modules with `import`.

---


### 📦 Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Compile TypeScript:
   ```bash
   npm run build
   ```

3. Run the output:
   ```bash
   npm start
   ```

---