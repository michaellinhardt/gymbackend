import Chai from 'chai'
import chaiHttp from 'chai-http'
import chaiUuid from 'chai-uuid'
import deepEqualInAnyOrder from 'deep-equal-in-any-order'
import { expressInstance } from '../../index'

// Configure Chai with plugins
const chai = Chai.use(chaiHttp)
chai.use(chaiUuid)
chai.use(deepEqualInAnyOrder)

// Initialize chaiAgent with the expressInstance
let chaiAgent = chai.request.agent(expressInstance)

export const
	// Replace expressInstance in chaiAgent
	replaceExpressInstance = otherExpressInstance =>
		chaiAgent = chai.request.agent(otherExpressInstance),

	// Restore expressInstance in chaiAgent
	restoreExpressInstance = () => chaiAgent = chai.request.agent(expressInstance),

	// Define HTTP methods for testing with expected status, path, and optional jwtoken
	del = (status, path, jwtoken = null) => emitHttpRequest('delete', status, path, jwtoken),
	post = (status, path, jwtoken = null) => emitHttpRequest('post', status, path, jwtoken),
	put = (status, path, jwtoken = null) => emitHttpRequest('put', status, path, jwtoken),
	patch = (status, path, jwtoken = null) => emitHttpRequest('patch', status, path, jwtoken),
	get = (status, path, jwtoken = null) => emitHttpRequest('get', status, path, jwtoken)

// Function to emit an HTTP request with the specified method, status, path, and jwtoken
const emitHttpRequest = (method, status, path, jwtoken) => {
	global.response = null
	global.isPendingRequest = true

	const emitMethod = chaiAgent[method](path)
	const callbackAfterEmit = req => listenHttpResponseAfterEmit(req, status)

	return typeof (jwtoken) === 'string'
		? emitMethod.use(callbackAfterEmit)
			.set('x-access-token', `Bearer ${jwtoken}`)
		: emitMethod.use(callbackAfterEmit)
}

// Listen for the HTTP response after emitting the request
const listenHttpResponseAfterEmit = (req, status) =>
	req.on('response', res => onHttpResponse(res, status))

// Handle the HTTP response, checking the status and error_key properties
const onHttpResponse = (res, status) => {
	global.response = res
	const { body } = res

	Chai.expect(res).to.have.status(status)

	if (status < 300)
		Chai.expect(body.error_key).to.be.an('undefined')
	else
		Chai.expect(body.error_key).to.be.a('string')
}
