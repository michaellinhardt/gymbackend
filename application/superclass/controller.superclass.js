import * as helpers from '../helpers'
import * as services from '../../src/services'
import * as config from '../config'

// Superclass controller for handling incoming HTTPS requests
export class ControllerSuperclass {
	// Constructor that initializes data, links helpers, services, and config, and sets up renders
	constructor ({ req, res }) {
		this.initializeData(req, res)
		this.linkHelpersServicesAndConfig()
		this.linkHelperRenders()
	}

	// Function to initialize request data and response object
	initializeData (req, res) {
		this.data = {}
		this.payload = {}
		this.body = req.body || {}
		this.params = req.params || {}
		this.req = req
		this.res = res
	}

	// Function to link helpers, services, and config to the controller
	linkHelpersServicesAndConfig () {
		this.config = config
		this.helpers = helpers
		this.services = services
	}

	// Function to link helper renders to the controller
	linkHelperRenders () {
		this.renders = helpers.renders
	}

	// Default validator function that always returns true (can be overridden in subclasses)
	validator () {
		return true
	}
}
