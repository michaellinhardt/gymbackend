export const
	// Function to create a promise that resolves after a specified time (in milliseconds)
	// Useful for simulating delays or waiting for other asynchronous operations
	sleep = ms => new Promise(resolve => { setTimeout(resolve, ms) })
