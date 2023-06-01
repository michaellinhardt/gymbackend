import prettyjson from 'prettyjson'

// Define afterEach hook for Mocha tests
afterEach(function () {
	// Helper function to check if the test has passed
	const isTestPassed = () =>
		!this
        || !this.currentTest
        || !this.currentTest.state
        || this.currentTest.state === 'passed'

	// Helper function to check if the test has failed and the response body is available
	const isTestFailed_andGotResponseBody = () =>
		this.currentTest.state === 'failed'
        && global.isPendingRequest
        && global.response
        && global.response.body

	// If the test has passed, execute afterEachTestPassed
	if (isTestPassed())
		afterEachTestPassed()

	// If the test has failed and response body is available,
	else if (isTestFailed_andGotResponseBody())
		afterEachTestFailedWithResponseBody()

	// Reset the global.isPendingRequest flag
	global.isPendingRequest = false
})

// Placeholder function for when the test has passed
const afterEachTestPassed = () => true

// Function to print response details when the test has failed and response body is available
const afterEachTestFailedWithResponseBody = () => {
	const { body, status } = global.response
	// Print the response status with cyan color
	process.stdout.write(`\x1b[36mSTATUS ${status}\x1b[0m\n`)
	// Print the response body using prettyjson
	process.stdout.write(`${prettyjson.render(body)}\n`)
}
