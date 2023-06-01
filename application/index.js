// Set the environment variable if not defined and import required libraries
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import _ from 'lodash'
import * as config from './config'

// Import controllers, middlewares, and helper functions
import * as controllers from '../src/controllers'
import * as middlewares from './middlewares'
import * as h from './helpers'

// Define the ExpressServer class to set up and run the Express server
const ExpressServer = new (class {
	constructor () {
		this.setupInstance()
		this.setupMiddlewares()
		this.setupAllRoute()
		this.startListening()
	}

	// Set up the Express instance with JSON and URL-encoded support
	setupInstance () {
		this.expressInstance = express()
		this.expressInstance.use(express.json())
		this.expressInstance.use(express.urlencoded({ extended: false }))
	}

	// Set up middlewares for the server
	setupMiddlewares () {
		if (config[process.env.NODE_ENV].printHTTPResponse) {
			this.expressInstance.use('/', middlewares.debug.printHTTPResponse)
		}
	}

	// Set up all routes for the server
	setupAllRoute () {
		this.router = express.Router()

		const setupE404ControllerLast = controllers.E404Controller[0]

		_.forEach(controllers, (arrayOfRoutes, controllerName) => {
			if (controllerName !== 'E404Controller')
				_.forEach(arrayOfRoutes, this.setupOneRoute.bind(this))
		})

		this.setupOneRoute(setupE404ControllerLast)

		this.expressInstance.use('/', this.router)
	}

	// Set up a single route based on the route element from the controller
	setupOneRoute (routeElementFromController) {
		const [routeParam, RouteController] = routeElementFromController
		const [routeMethod, routePath] = this.extractRouteMethodAndPath(routeParam)

		this.router[routeMethod](routePath, async (req, res) => {
			const controller = new RouteController({ req, res })

			try {
				// later here, the middleware will add a boolean isAuthenticate
				// the if will be (!routeParam.PUBLIC && !req.isAuthenticate)
				if (!routeParam.PUBLIC)
					return h.renders.unauthorized('unauthorized')

				await controller.validator()
				await controller.handler()

			} catch (error) {
				h.renders.catchErrorsOrRenders(res, error, controller.payload)
			}
		})
	}

	// Extract the route method and path from the route parameter
	extractRouteMethodAndPath (routeParam) {
		if (routeParam.GET) return ['get', routeParam.GET]
		else if (routeParam.POST) return ['post', routeParam.POST]
		else if (routeParam.PUT) return ['put', routeParam.PUT]
		else if (routeParam.DEL) return ['delete', routeParam.DEL]
		else if (routeParam.PATCH) return ['patch', routeParam.PATCH]

		throw new Error('Route method should be GET, POST, PUT, PATCH or DEL')
	}

	// Start the server and listen for incoming connections
	startListening () {
		const { port } = config[process.env.NODE_ENV]
		this.expressInstance.listen(port, () =>
			process.stdout.write(`Server is running on port ${port}\r\n`))
	}

	// Return the Express instance
	getExpressInstance () {
		return this.expressInstance
	}

})()

export const expressInstance = ExpressServer.getExpressInstance()
