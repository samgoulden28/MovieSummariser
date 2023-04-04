Todo List
 Remove the promise from the mysql connection:

 Refactor your getMovies function to use callbacks instead of promises.
 Replace mysql2/promise with mysql2 in your package.json file.
 Implement user auth:

 Choose an authentication method (e.g. username/password, OAuth, JWT, etc.).
 Add authentication middleware to your Express app.
 Create routes for user signup, login, and logout.
 Store user credentials securely in a database or other storage medium.
 Move files into a better structure:

 Create a src directory in your project root.
 Move your TypeScript files (including your App.tsx file) into the src directory.
 Create a dist directory in your project root.
 Configure your TypeScript compiler to output the compiled JavaScript files to the dist directory.
 Update your package.json file to reflect the new file structure.
 Other improvements:

 Add error handling to your Express app.
 Use environment variables for sensitive information (e.g. database credentials).
 Add tests to your app.
 Use a linter and formatter to ensure code consistency.