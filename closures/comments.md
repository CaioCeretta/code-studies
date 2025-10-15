## Closure Comments

  ● What is a closure? 

    ○ A closure is a function that "remembers" the scope where it was created, even after that environment ceased to exist.

      ■ In other words: A closure allows an internal function to access variables of the external function even after that
      external function finished executing

    ○ Basic Structure:

      ```js
        function esterna() {
          const messagio = "Ciao, dallo scope esterno";

          function interna() {
            console.log(messaggio);
          }

          return interna;
        }

        const fn = esterna();
        fn();

      ```

    ■ What happens here is:

      1. outer is executed and assigned to fn
      2. inside of it, we have defined a message and the function inner()
      3. outer() returns inner without executing it
      4. Even after outer() finishew it keeps a reference to the outer scope

  ○ Practical Example 1: counter with closure

    ■ Closures are often used to encapsulate state, as it was "private" variable

    ■ Example number: 1
  ```js
      function creaContatore() {
      
        let conteggio = 0

        return function() {
          conteggio++
          console.log(conteggio)
        }
      }
      

      const contatore = creaContattore();

      contatore(); // 1
      contatore(); // 2
      }
  ```

    ■ What is happening here?

      □ The variable conteggio is not accessible outside the function `creaConteggio`
      □ But the function returned REMEMBERS this variable — this is the cloure
      □ Each time we call `contare()` we are calling the returned function, and it updates the value that was "kept" in
      the closed context 
  
    ■ If we create other counter, he will have its own independent scope

      □  Example number 2: altroContatore 

        ```ts
          // contare code

          const altroContatore = creaContatore();

          altroContatore() // 1
          altroContattore() // 2
          contare() // 4 (Continues from where it stopped)

        ```

  ○ Pratical Example 2: Controlling data access

    ```ts
      function creaUtente(nome)
        const password = "1234" //privato

        return {
          getNome() {
            return nome;
          }

          verificaPassword(tentativo) {
            return tentativo === password
          }

          cambiaPassword(nuovaPassword) {
            password = nuovaPassword;
        
        }
        }

            const utente = creaUtente()

            console.log(utente.getNome()); // Caio
            console.log(utente.verificaPassword("1234")) // true
            utente.cambiaPassword("abcd")
            console.log(utente.verificaPassword("1234")) // false
    ```

    ■ Here the password is controlled by 
    
  ○ Practical Example 3: Function that uses an outer variable as the parameter for the inner one

```js
  function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
      console.log("Outer variable: " + outerVariable);
      console.log("Inner variable: " + innerVariable);
    };
  }

  const newFunction = outerFunction("outside");
  newFunction("inner");
```

  ○ Concept Summary

    Concept                               Explanation
    Closure                               Function that remembers the scope where it was created
    Allows                                Access to external variables even after the outer function finishes
    Common Uses                           Encapsulate state, create private functions, avoid global variables

    ■ Therefore, we can think of closures as a function + the environment it was born

  ○ Do closures appear in hooks inside React? 

    ■ Closures are everywhere in React hooks, even if we don't always notice them. Here are some examples

      1.

      ```js
      
        function Counter() {
          const [count, setCount] = useState(0)

          function handleClick() {
            console.log("Count is: ", count);
            setCount(count + 1)
          }
        }

        return <button onClick={handleClick}>Click me</button>
      ```

      □ Here's what happens

        . When the component first renders, count is 0
        . The handleClick closes over count = 0
        . When we click, handleClick, it still remembers the old value it was created with

        If react re-renders and defines a new handleClick, that new one closes over the new value of count.
        That’s why it’s important to understand closures in hooks — they control what data each render’s functions remember.

    ■ Common closure trap in hooks

      □ Sometimes we see this issue

        ```js
          useEffect(() => {
            const interval = setInterval(() => {
              console.log(count);
              setCount(count + 1)
            }, 1000)

            return () => clearInterval(interval)
          }, [])
        ```
      
        . Here, the effect runs only once because of [], and the callback inside the interval closes over the initial count(0)
        So it keeps loggings 0 forever
        That's a state closure problem, the function remembers an old value

    ■ How to fix stale closures:

      □ We can fix it by: 

        1. including `count` in the dependency array. Now, every time count changes a new closure is created with the
        latest value 
        2. Or we can use functional update form, which doesn't rely in the old closure:
     
  ```js 
      useEffect(() => {
        const interval = setInterval(() => {
          setCount(c => c + 1) // uses the latest state automatically
        }, 1000)

        return () => clearInterval(interval);
      }, [])
  ```

      This works because React gives the latest value of c each time

  ■ Summary:

    □ React creates a new closure with current state/props on each render
    □ hooks capture variables from that specific render
    □ When a callback keeps an old version of state is called `Stale Closure`
    □ We fix stale mates by adding dependencies or use functional state updates, like setters




    



        
      