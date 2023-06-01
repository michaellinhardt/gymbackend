// Import helper functions, configuration data, and model definitions
import * as helpers from '../helpers'
import * as config from '../config'
import * as models from '../../src/models'

// Define the ServiceSuperclass to serve as a base class for service classes
export class ServiceSuperclass {
	constructor () {
		this.linkHelpersModelsAndConfig()
	}

	// Link helper functions, models, and config to the service instance
	linkHelpersModelsAndConfig () {
		this.c = config
		this.h = helpers
		this.m = models
	}
}
