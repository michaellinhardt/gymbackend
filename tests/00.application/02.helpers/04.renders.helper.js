import { expect } from 'chai'
import httpMocks from 'node-mocks-http'
import * as appHelpers from '../../../application/helpers'
import * as h from '../../../application/mocha/helpers'

h.tools.printCurrentTestFile(__filename)

const {
	AppError,
	AppRender,
	ok,
	created,
	accepted,
	noContent,
	badRequest,
	unauthorized,
	forbidden,
	notFound,
	conflict,
	serviceUnavailable,
} = appHelpers.renders

describe('Testing renders class', () => {
	const createResponse = () => httpMocks.createResponse()

	it('AppError should have correct properties', () => {
		const error_key = 'test.error'
		const status = 400
		const error = new AppError(error_key, status)

		expect(error).to.have.property('name', 'AppError')
		expect(error).to.have.property('status', status)
		expect(error.payload).to.have.property('error_key', error_key)
	})

	it('AppRender should have correct properties', () => {
		const status = 200
		const render = new AppRender(status)

		expect(render).to.have.property('name', 'AppRender')
		expect(render).to.have.property('status', status)
	})

	it('AppError render should send correct response', () => {
		const error_key = 'test.error'
		const status = 400
		const error = new AppError(error_key, status)
		const res = createResponse()

		error.render(res)

		expect(res._getStatusCode()).to.equal(status)
		expect(res._isJSON()).to.be.equal(true)
		expect(res._getJSONData()).to.deep.equal({ error_key })
	})

	it('AppRender render should send correct response', () => {
		const status = 200
		const payload = { key: 'value' }
		const render = new AppRender(status)
		const res = createResponse()

		render.render(res, payload)

		expect(res._getStatusCode()).to.equal(status)
		expect(res._isJSON()).to.be.equal(true)
		expect(res._getJSONData()).to.deep.equal(payload)
	})
})

const testHelperFunction = (func, status, error_key) => {
	try {
		func(error_key)
	} catch (error) {
		expect(error).to.be.instanceOf(status < 302 ? AppRender : AppError)
		expect(error).to.have.property('status', status)
		if (error_key) {
			expect(error.payload).to.have.property('error_key', error_key)
		}
	}
}
describe('Testing renders helper', () => {

	it('ok should throw AppRender with status 200', () => {
		testHelperFunction(ok, 200)
	})

	it('created should throw AppRender with status 201', () => {
		testHelperFunction(created, 201)
	})

	it('accepted should throw AppRender with status 202', () => {
		testHelperFunction(accepted, 202)
	})

	it('noContent should throw AppRender with status 204', () => {
		testHelperFunction(noContent, 204)
	})

	it('badRequest should throw AppError with status 400', () => {
		const error_key = 'test.badRequest'
		testHelperFunction(badRequest, 400, error_key)
	})

	it('unauthorized should throw AppError with status 401', () => {
		const error_key = 'test.unauthorized'
		testHelperFunction(unauthorized, 401, error_key)
	})

	it('forbidden should throw AppError with status 403', () => {
		const error_key = 'test.forbidden'
		testHelperFunction(forbidden, 403, error_key)
	})

	it('notFound should throw AppError with status 404', () => {
		const error_key = 'test.notFound'
		testHelperFunction(notFound, 404, error_key)
	})

	it('conflict should throw AppError with status 409', () => {
		const error_key = 'test.conflict'
		testHelperFunction(conflict, 409, error_key)
	})

	it('serviceUnavailable should throw AppError with status 503', () => {
		const error_key = 'test.serviceUnavailable'
		testHelperFunction(serviceUnavailable, 503, error_key)
	})
})
