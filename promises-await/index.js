const myPromise = new Promise((resolve, reject) => {
	const success = true;

	if (success) {
		resolve("Promise fulfilled sucessfully");
	} else {
		reject("Something whent wrong");
	}
});

myPromise
	.then((result) => console.log(result)) // trigger if resolved
	.catch((error) => console.log(error)); // trigger if rejected

function fetchData() {
	// Returns a Promise
	return new Promise((resolve) => {
		setTimeout(() => resolve("Data fetched"), 1000);
	});
}

fetchData()
	.then((data) => {
		console.log(data); // Data fetched
		return "Processing Data";
	})
	.then((message) => {
		console.log(message); // Processing data
		return "Done!";
	})
	.then((final) => {
		console.log(final); // Done!
	})
	.catch((error) => {
		console.log("Error: ", error);
	})
	.finally(() => {
		console.log("Cleanup or fiunal actions can go here!");
	});

async function processData() {
	try {
		// 'await'pauses execution until the fetchData() promise resolves
		const data = await fetchData();
		console.log(data); // Data fetched

		const message = "Processing Complete";
		console.log(message); // Processing complete
	} catch (error) {
		// standard try...catch handles erros just like synchronous code
		console.error("An error occurred:", error);
	}
}

processData();
