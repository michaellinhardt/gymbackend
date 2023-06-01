// Custom error class for handling application-specific errors
export class AppError extends Error {
	constructor (error_key = 'server.error', status = 500) {
		super(error_key)
		this.constructor = AppError
		// Set the prototype explicitly to ensure correct inheritance
		// eslint-disable-next-line no-proto
		this.__proto__ = AppError.prototype
		this.name = this.constructor.name
		Error.captureStackTrace(this, this.constructor)
		this.status = status
		this.payload = { error_key }
	}

	// Render method sends an HTTP response with the error status and payload
	render (res) { return res.status(this.status).json(this.payload) }
}

// Custom error class for handling successful HTTP responses
export class AppRender extends Error {
	constructor (status = 200) {
		super('Rendering HTTP Response')
		this.name = 'AppRender'
		this.status = status
	}

	// Render method sends an HTTP response with the provided payload
	render (res, payload) { return res.status(this.status).json(payload) }
}

export const

	// Helper functions for throwing successful HTTP responses
	ok = () => { throw new AppRender(200) },
	created = () => { throw new AppRender(201) },
	accepted = () => { throw new AppRender(202) },
	noContent = () => { throw new AppRender(204) },

	// Helper functions for throwing specific error responses
	badRequest = error_key => { throw new AppError(error_key, 400) },
	unauthorized = error_key => { throw new AppError(error_key, 401) },
	forbidden = error_key => { throw new AppError(error_key, 403) },
	notFound = error_key => { throw new AppError(error_key, 404) },
	conflict = error_key => { throw new AppError(error_key, 409) },
	serviceUnavailable = error_key => { throw new AppError(error_key, 503) },

	// Utility function to catch and handle errors or render responses
	catchErrorsOrRenders = (res, errorInstance, payload = {}) => {
		// If the error is an instance of AppError or AppRender, call the render method
		if (errorInstance instanceof AppError
		|| errorInstance instanceof AppRender) {
			return errorInstance.render(res, payload)
		}

		// Otherwise, log the error and send a generic 500 response
		const errorMessage
			= (errorInstance && errorInstance.stack)
			|| (errorInstance && errorInstance.message)
			|| errorInstance
		process.stdout.write('Uncaught Server Error\r\n')
		process.stdout.write(`${errorMessage}\r\n`)

		if (!res.headersSent)
			res.status(500).json({ error_key: 'server.error' })
	}
