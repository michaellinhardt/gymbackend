import { ServiceSuperclass } from '../../backendapplication/superclass/service.superclass.js'

export class ApiKeysService extends ServiceSuperclass {

	getByEnvironmentAndService (environment, service) {
		return this.m.keys.getFirstWhere({
			environment,
			service,
		})
	}

}
