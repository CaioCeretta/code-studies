// // Funcional

// import React, { Component, useEffect, useState } from "react";

// function PostList() {
// 	const [posts, setPosts] = useState([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [error, setError] = useState(null);

// 	// the empty dependency array ([]) ensures this effect runs ONLY ONCE.
// 	// after the first render (equivalent to componentDidMount)
// 	useEffect(() => {
// 		// Define an async function inside useEffect for proper async/await usage

// 		const fetchPosts = async () => {
// 			try {
// 				// 1. initiate the request (side effect)
// 				const response = await fetch(
// 					"https://jsonplaceholder.typicode.com/posts",
// 				);

// 				if (!response.ok) {
// 					throw new Error("Failed to fetch data");
// 				}

// 				const data = await response.json();

// 				// 2. Set the data in state
// 				setPosts(data.slice(0, 5));
// 				setIsLoading(false);
// 			} catch (err) {
// 				// 3. Handle the error
// 				setError(err.message);
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchPosts();

// 		//Cleanup function (runs on Unmounting - componentWillUnmount equivalent)
// 		return () => {
// 			// You would perform cleanup here, such as cancelling the request if it were cancellable
// 			console.log("PostList component unmounted. Cleanup performed.");
// 		};
// 	}, []); // Empty dependency array

// 	if (isLoading) {
// 		return <p>Loading posts...</p>;
// 	}

// 	if (error) {
// 		return <p style={{ color: "red" }}> Error {error}</p>;
// 	}

// 	return (
// 		<div>
// 			<h1>Posts</h1>
// 			<ul>
// 				{posts.map((post) => (
// 					<li key={post.id}>{post.title}</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }

// // classe (legacy)

//           class PostLstClass extends Component {

//             // super(props) required because it calls the constructor of the Component class.
//             constructor(props) {
//               super(props);
//               this.state = {
//                 super(props);
//                 this.state = {
//                   posts: [],
//                   isLoading: true,
//                   error: null
//                 }
//               }
//             }

//             //INITIAL DATA FETCHING LOCATION
//             componentDidMount() {
//               //This is called once, after the initial render
//               fetch('https://jsonplaceholder.typicode.com/posts')
//                 .then(response => {
//                   if(!response.ok) {
//                     throw new Error('Failed to fetch data')´
//                   }
//                   return response.json();
//                 })
//                 .then(data => {
//                   posts: data.slice(0, 5),
//                   isLoading: false
//                 })
//             }

//             //Cleanup (Unmounting)
//             componentWillUnmount() {
//               // Example cleanup: removing a listener or cacelling requests
//               console.log('PostListClass component unmounted. Cleanup performed.');
//             }

//             render() {
//               const { posts, isLoading, error } = this.state

//               if (isLoading) {
//                 return <p>Loading posts...</p>;
//               }

//               if (error) {
//                 return <p style={{ color: 'red' }}>Error: {error}</p>;
//               }

//                return (
//                 <div>
//                   <h1>Posts (Class)</h1>
//                   <ul>
//                     {posts.map(post => (
//                       <li key={post.id}>{post.title}</li>
//                     ))}
//                   </ul>
//                 </div>
//               );
//             }
//           }
