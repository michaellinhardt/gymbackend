// Import the ControllerSuperclass
import { ControllerSuperclass } from '../../backendapplication/superclass/controller.superclass'

// Define and export the E404Controller, which is used when no other controller
// matches the HTTP request endpoint
export const E404Controller = [
	[
		// Declare the route as public and handle all GET requests
		{ PUBLIC: true, GET: '*' },

		// Extend the ControllerSuperclass to handle the request
		class extends ControllerSuperclass {
			// Define the handler method for the controller
			handler () {
				// Return a 'notFound' response
				return this.renders.notFound('notFound')
			}
		},
	],
]
