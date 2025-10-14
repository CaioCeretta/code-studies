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

    ■ Here the password is controlled by closure - it cannot be accessed directly, only manipulated through internal functions

  ○ Concepot Summary

    Concept                               Explanation
    Closure                               Function that remembers the scope where it was created
    Allows                                Access to external variables even after the outer function finishes
    Common Uses                           Encapsulate state, create private functions, avoid global variables

    ■ Therefore, we can think of closures as a function + the environment it was born

  ○ Do closures appear in hooks inside React? 

    ■ 

    



        
      