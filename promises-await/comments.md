● What is the difference between .then() and async/await in handling async operations in javascript

  ○ First, what are syntactic sugars? 

    ■ Syntactic Sugar refers to language features thart are designed to make
    code easier to read and write for humans. It provides a more convenient, concise, or expressive syntax for operations
    that could already be achieved with the language's core features in a more verbose or explicit form

  ○ Both `.then()` and `async/await` are used in JavaScript to handle asynchronous operations, but they represent different
  approaches to writing the code.

    ■ Syntax

      □ `.then()` uses callbacks (.then(), .catch(), .finally()) chained to a `Promise`
      □ `async/await (Syntatic Sugar over Promises). 
    
    ■ Readability: 

      □ `.then()` can lead to "callback hell" or deep nesting, making it harder to read and maintain for complex sequences
      □ `async/await` allows asynchronous code to be written and read like synchronous code, which is generally cleaner

    ■ Error handling: 

      □ with `.then()` they are handled with the separate .catch() method at the end of the chain
      □ with `async/await` they are handled using standard JavaScript try...catch blocks, similar to synchronous code

    ■ Flow Control: 

      □ `.then()` uses a declarative, chaining style
      □ `async/await` uses an imperative style, which is more intuitive for sequential logic
  
  ○ 1. `then()` (Promises)

    ■ The "heart" of Promises in JS, lie on the resolve()
      □ The function `resolve` in promises is one of the main parameters (the other is `reject`) that JS passes to the
      function that "resolves" what we see inside of `new Promise(resolve => {...})`.
      □ The `resolve` function is used to mark the Promise as fulfilled and send a value back to whoever is waiting for
      it.
      □ When `resolve` is called, the Promise changes its internal state from "pending" to "fulfilled", and any .then()
      method chained to that Promise will be triggered with the resolved value
      □ Conversely, if `reject` is called, the Promise becomes "rejected", and the "catch()" method will handle that error

      ```js
        const myPromise = new Promise((resolve, reject) => {
          const success = true;

          if(success) {
            resolve("Promise fulfilled sucessfully")
          } else {
            reject("Something whent wrong")
          }
        });

        myPromise
          .then(result => console.log(result)) // trigger if resolved
          .catch(error => console.log(error)) // trigger if rejected
        
      ```

      □ The promise object itself doesn't immediately execute asynchronous code — instead, it REPRESENTS a value that may
      become available in the future
      □ The executor function `(resolve, reject) => { ...}` runs immediately when the Promise is created, but the calls to
      `.then()` or `catch()` determine what to do once the Promise settles either resolved or rejected

    ■ This is the standard, underlying mechanism for handling Promises in JavaScript. We can chain methods to a promise
    object

      ```js
        function fetchData() {
          // Returns a Promise
          return new Promise(resolve => {
            setTimeout(() => resolve("Data fetched"), 1000)
          })
        }

        fetchData()
          .then(data => {
            console.log(data) // Data fetched
            return "Processing Data"
          })
          .then(message => {
            console.log(message) // Processing data
            return "Done!"
          })
          .then(final => {
            console.log(final) // Done!
          })
          .catch(error => {
            console.log("Error: ", error)
          })
          .finally(() => {
            console.log("Cleanup or fiunal actions can go here!")
          })
      ```

      □ Here every `.then()` method returns a new Promise, which allows chaining multiple asynchronous operations in sequence
      □ Each `.then()` receives the resolved value from the previous one and can either:
        - Return a regular value (which becomes the resolved value for the next ` .then()`), or
        - Return another promise (in which case, the cain waits for that Promise to resolve before continuing)
      □ The `.catch()` method is used to handle any rejection that occurs in the chain, even if the error happens several steps before.
      □ The `.finally()` method is called regardless of the Promise’s outcome — it’s typically used for cleanup logic, such as closing a connection or hiding a loading indicator.  

    ■ Even though the complete signature of the function is `(resolve, reject) => {...}`, we can still use only the `resolve`
    if the code do not have explicit failure flows. However, including the `reject` is a good practice for all the predictable
    errors of our async operations
    
      □ Scenario 1:
        . Real async operations (ex: fetch, file reading), we should always use reject, because it allows us treating network
        errors, server errors, or data errors in a controlled and explicit way
      
      □ Scenario 2:
        . Simple promises/mocks (such as setTimeouts), we can omit, because if it fails is impossible or unnecessary for
        the mock, simplify.

  ○ 2. `async/await`
    
    ■ The async keyword transforms a function into one that returns a Promiuse, and await pauses the execution of that
    function until the Promise is resolved

    ■ The async/await structure is simply syntactic sugr built on top of Promises; it doesn't replace them

    ```js
      // The 'async' keyword allows you to use 'await' inside the function

      async function processData() {
        try {
          // 'await'pauses execution until the fetchData() promise resolves
          const data = await fetchData();
          console.log(data); // Data fetched

          const message = 'Processing Complete'
          console.log(message) // Processing complete


        } catch(error) {
          // standard try...catch handles erros just like synchronous code
          console.error('An error occurred:', error);
        }

      }

      processData();
    ```

  ○ Key difference summary:

    `async/await` is essentially a cleaner way to write the same logic you would write using `.then()`. It avoids the need
    for nested callbacks and allows you to use familiar try...catch blocks for error handling, resulting in code that is
    often easier to debug and maintain.

    


  

