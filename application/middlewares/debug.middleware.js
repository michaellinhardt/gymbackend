import prettyjson from 'prettyjson'

// Helper function to print a message to the terminal
const printTerminal = message => process.stdout.write(`${message}\n`)

export const
	// Middleware function to log HTTP responses in a readable format
	printHTTPResponse = (req, res, next) => {
		// Save the timestamp when the request was received
		req.timestampReceived = Date.now()
		// Store the original status and json methods of the response object
		const realResStatusMethod = res.status.bind(res)
		const realResJsonMethod = res.json.bind(res)

		// Replacement function for the status method of the response object
		function replaceResStatusMethod (status) {
			// Print the request method and path
			printTerminal(`\n=== [ ${req.method} ] ${req.path} ===`)

			// Print the request body, if present
			if (req.body)
				printTerminal(`- body:\n${prettyjson.render(req.body)}`)

			// Calculate the execution time and print the response status and execution time
			const execTime = Date.now() - req.timestampReceived
			printTerminal(`- status [${status}] in ${execTime} ms`)
			return realResStatusMethod(status)
		}

		// Replacement function for the json method of the response object
		function replaceResJsonMethod (obj, ...args) {
			// Print the response payload
			printTerminal(`- payload:\n${prettyjson.render(obj)}`)
			return realResJsonMethod(obj, ...args)
		}

		// Replace the original status and json methods with the new ones
		res.json = replaceResJsonMethod
		res.status = replaceResStatusMethod

		// Proceed to the next middleware or route handler
		return next()
	}
