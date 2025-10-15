● Describe the lifecycle of a React component and how you would use it to fetch data

  ○ The React component lifecycle is the sequence of stages a component goes through from its creation to its removal from
  the DOM. Understanding this cycle is crucial for knowing where to perform side effects like data fetching

    ■ There are three main phases in a component's life cycle: Mounting, Updating and Unmounting.

  ○ 1. Mounting phase

    ■ This is when the component is created and added to the DOM

      □ Class Components: The key lifecycle methods are
        . constructor()
        . render()
        . componentDidMount(): Called immediately after the component is rendered for the first time in the DOM. This is
        the traditional and primary location to initiate initial data fetching, as it ensures the component is ready to
        handle and display the data, and the call happens only once.
      
      □ Functional components (With Hooks): 
        . The equivalent for mounting and side effects (like data fetching) is the useEffect hook.
        . By using useEffect with an empty dependency array `[]`, the function inside will run only after the initial render
        (similar behavior) to `componentDidMount`

    ■ 2. Updating phase

      □ This occurs when the component's state or props change, resulting in a re-render

      □ Class Components:

        . render(): is called again to calculate thhe new output
        . `componentDidUpdate(prevProps, prevState)`: Called immediately after the update. It's useful for fetching dat
        when a specific prop change

      □ Functional components (with Hooks):

        . `useEffect`: The function passed to `useEffect` will run again if any value in its dependency array changes

      
    ■ 3. Unmountin Phase

      This is when the component is removed from the DOM

      □ Class Components:

        . `componentWillUnmount()`: Called just before the component is destroyed. It is used for cleanup, such as cancelling
        pending network requests (to prevent memory leaks) or removing event listeners.

      □ Functional Components (with Hooks):

        . useEffect (with a cleanup function): Returning a function from useEffect server as a cleanup function, equivalent
        to `componentWillUnmount()`

  ○ How to Use the Lifecycle for Data Fetching

    ■ The modern and recommended best practice is to use Functional Components with the useEffect Hook

    ■ Example in Functional Components (Modern)

      □ In functional components, you use useEffect to manage "side effects" (like data requests) that occur after rendering.
  ```js
        import React, { useState, useEffect} from 'react';

        function PostList() {
          const [posts, setPosts] = useState([])
          const [isLoading, setIsLoading] = useState(true)
          const [error, setError] = useState(null);

          // the empty dependency array ([]) ensures this effect runs ONLY ONCE.
          // after the first render (equivalent to componentDidMount)
          useEffect(() => {
            // Define an async function inside useEffect for proper async/await usage

            const fetchPosts = async () => {
              try {
                // 1. initiate the request (side effect)
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');

                if(!response.ok) {
                  throw new Error('Failed to fetch data');
                }

                const data = await response.json()

                // 2. Set the data in state
                setPosts(data.slice(0,5));
                setIsLoading(false);
              } catch (err) {
                // 3. Handle the error
                setError(err.message);
                setIsLoading(false);
              }
            }

            fetchPosts();

            //Cleanup function (runs on Unmounting - componentWillUnmount equivalent)
            return () => {
              // You would perform cleanup here, such as cancelling the request if it were cancellable
              console.log('PostList component unmounted. Cleanup performed.');
            }
          }, []); // Empty dependency array

          if(isLoading) {
            return <p>Loading posts...</p>
          }

          if(error) {
            return <p style={{color: 'red'}}> Error { error  }</p>
          }

          return (
            <div>
              <h1> Posts </h1>
              <ul>
                {posts.map(post => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            </div>
          )
        }
  ``` 

    ■ Example in a Class Component (Legacy)

      □ In class components, the appropriate lifecycle method for initial data fetching is `componentDidMount`.

        ```js

          import React, {Component} from 'react´

          class PostLstClass extends Component {
            
            // super(props) required because it calls the constructor of the Component class.
            constructor(props) {
              super(props);
              this.state = {
                super(props);
                this.state = {
                  posts: [],
                  isLoading: true,
                  error: null
                }
              }
            }

            //INITIAL DATA FETCHING LOCATION
            componentDidMount() {
              //This is called once, after the initial render
              fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                  if(!response.ok) {
                    throw new Error('Failed to fetch data')´
                  }
                  return response.json();
                })
                .then(data => {
                  posts: data.slice(0, 5),
                  isLoading: false
                })
            }

            //Cleanup (Unmounting)
            componentWillUnmount() {
              // Example cleanup: removing a listener or cacelling requests
              console.log('PostListClass component unmounted. Cleanup performed.');
            }

            render() {
              const { posts, isLoading, error } = this.state

              if (isLoading) {
                return <p>Loading posts...</p>;
              }

              if (error) {
                return <p style={{ color: 'red' }}>Error: {error}</p>;
              }

               return (
                <div>
                  <h1>Posts (Class)</h1>
                  <ul>
                    {posts.map(post => (
                      <li key={post.id}>{post.title}</li>
                    ))}
                  </ul>
                </div>
              );
            }
          }


        
        ```


