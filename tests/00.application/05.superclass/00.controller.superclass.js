import { expect } from 'chai'
import http from 'http'
import express from 'express'
import { ControllerSuperclass } from '../../../application/superclass/controller.superclass'
import * as helpers from '../../../application/helpers'
import * as services from '../../../src/services'
import * as config from '../../../application/config'

describe('ControllerSuperclass', () => {
	let app, server, request, response, controller

	beforeEach(() => {
		app = express()
		server = http.createServer(app)
		request = http.IncomingMessage.prototype
		response = http.ServerResponse.prototype
	})

	afterEach(() => {
		server.close()
	})

	it('should initialize data, link helpers, services, and config, and set up renders', () => {
		request.body = { key: 'value' }
		request.params = { id: 1 }
		controller = new ControllerSuperclass({ req: request, res: response })

		expect(controller.data).to.be.an('object')
		expect(controller.payload).to.be.an('object')
		expect(controller.body).to.deep.equal(request.body)
		expect(controller.params).to.deep.equal(request.params)
		expect(controller.req).to.equal(request)
		expect(controller.res).to.equal(response)

		expect(controller.config).to.equal(config)
		expect(controller.helpers).to.equal(helpers)
		expect(controller.services).to.equal(services)

		expect(controller.renders).to.equal(helpers.renders)
	})

	it('should have a default validator function that always returns true', () => {
		controller = new ControllerSuperclass({ req: request, res: response })
		expect(controller.validator()).to.be.equal(true)
	})

	it('should allow subclasses to override the default validator function', () => {
		class CustomController extends ControllerSuperclass {
			validator () {
				return false
			}
		}

		const customController = new CustomController({ req: request, res: response })
		expect(customController.validator()).to.be.equal(false)
	})
})
