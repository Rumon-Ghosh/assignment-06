
#### 1) What is the difference between var, let, and const?

#### 2) What is the difference between map(), forEach(), and filter()? 

#### 3) What are arrow functions in ES6?

#### 4) How does destructuring assignment work in ES6?

#### 5) Explain template literals in ES6. How are they different from string concatenation?

# Answer to the question no-1:
In JavaScript we use (var), (let) and (const) to declare a variable. But they have some difference behavior, let's break-down in details:
(var): after declare a variable using (var) we can re-declare and re-assign the variable which may conflict and result unexpected. (var) don't follow the block-scope rule means we can use the value of (var) variable outside the scope. Before ES6 we used (var) to declare a variable.
(let): We use (let) when we know that the value of the variable is going to change. Using (let) we can re-assign the value of the variable but we can't re-declare the variable in same name again. (let) follow the rule of block-scope and function-scope.
(const): (const) is the short form of constant means we can't re-declare and re-assign the value of a variable after using (const), but in non-primitive type variable we can change the value even using (const). Like (let) (const) also follow the rule of block and function scope.

# Answer to the question no-2:
map(), forEach(), and filter() are array method in javascript.

map(): This method creates a new array by looping through each element of the original array. It is used for transforming each element into a new value, while the original array remains unchanged.
forEach(): This method iterates over each element in an array and executes a provided callback function for each element. It is primarily used for modifying external variables, interacting with the DOM. forEach() does not return a new array; its return value is always undefined.
filter(): This method creates a new array containing only the elements from the original array that satisfy a provided test condition. The callback function for filter() should return a boolean value (true to include the element, false to exclude it).

# Answer to the question no-3:
Arrow functions are a shorter way to write functions. They use => to define a function, making the code more concise. Like normal function we cannot use an arrow function before its initialization in JavaScript. A simple syntax of arrow function: const varName =  () => {};

# Answer to the question no-4:
Destructuring assignment is a concise way to extract values from arrays or objects and assign them to variables in a single line. We can Destructure array and object values and store them into variables using destructuring assignment. An example of array destructuring => const [first, second] = ArrayName; now first 2 value of the array is stored in the first and second variable. An example of Object destructure => const { name } = ObjectName;

# Answer to the question no-5:
Template literals, offer a more flexible and readable way to create strings compared to traditional string concatenation. We can use Expressions ${} in template literals to make code more dynamic. Also we can write multi-line string without using any character like \n. Template literals significantly improve readability, especially when dealing with multiple variables or complex expressions within a string.