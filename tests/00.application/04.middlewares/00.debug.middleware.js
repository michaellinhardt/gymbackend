import { expect } from 'chai'
import sinon from 'sinon'
import express from 'express'
import prettyjson from 'prettyjson'
import supertest from 'supertest'
import { printHTTPResponse } from '../../../application/middlewares/debug.middleware'

describe('Testing printHTTPResponse middleware', () => {
	let app, request, stub, reqBody

	beforeEach(() => {
		app = express()
		request = supertest(app)
		stub = sinon.stub(prettyjson, 'render')
		reqBody = { key: 'value' }
	})

	afterEach(() => {
		sinon.restore()
	})

	it('should log the request and response in a readable format', (done) => {
		// Set up a route to test the middleware
		app.get('/test', printHTTPResponse, (req, res, next) => {
			res.status(200).json({ message: 'Success' })
			next()
		})

		// Invoke the route handler
		request
			.get('/test')
			.send(reqBody)
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err)
				}

				// Assertions
				expect(res.body).to.deep.equal({ message: 'Success' })
				expect(stub.calledWith({ message: 'Success' })).to.be.equal(true)

				done()
			})
	})
})
