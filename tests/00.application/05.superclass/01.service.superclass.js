import { expect } from 'chai'
import { ServiceSuperclass } from '../../../application/superclass/service.superclass'
import * as helpers from '../../../application/helpers'
import * as config from '../../../application/config'
import * as models from '../../../src/models'

describe('ServiceSuperclass', () => {
	let service

	beforeEach(() => {
		service = new ServiceSuperclass()
	})

	it('should link helpers, models, and config to the service instance', () => {
		expect(service.c).to.equal(config)
		expect(service.h).to.equal(helpers)
		expect(service.m).to.equal(models)
	})

	it('should allow subclasses to inherit the linked helpers, models, and config', () => {
		class CustomService extends ServiceSuperclass {}

		const customService = new CustomService()

		expect(customService.c).to.equal(config)
		expect(customService.h).to.equal(helpers)
		expect(customService.m).to.equal(models)
	})
})
