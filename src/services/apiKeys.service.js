// A class that extends ServiceSuperclass and provides a method for retrieving
// API keys by environment and service.
import { ServiceSuperclass } from '../../application/superclass/service.superclass.js'

export class ApiKeysService extends ServiceSuperclass {

	// Returns first API key that match the specified environment and service.
	getByEnvironmentAndService (environment, service) {
		return this.m.keys.getFirstWhere({
			environment,
			service,
		})
	}

}
