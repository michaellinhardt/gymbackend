import chai from 'chai'
import sinon from 'sinon'
import request from 'supertest'
import { expressInstance } from '../../application'

const { expect } = chai

describe('ExpressServer', () => {
	let sandbox

	beforeEach(() => {
		sandbox = sinon.createSandbox()
	})

	afterEach(() => {
		sandbox.restore()
	})

	describe('GET /nonexistent-route', () => {
		it('should return 404 Not Found', async () => {
			const response = await request(expressInstance).get('/nonexistent-route')
			expect(response.status).to.equal(404)
			expect(response.body).to.deep.equal({ error_key: 'notFound' })
		})
	})

	// Add more tests for each controller route
})
