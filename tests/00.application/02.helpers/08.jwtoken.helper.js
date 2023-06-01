import { expect } from 'chai'
import jwt from 'jsonwebtoken'
import * as appHelpers from '../../../application/helpers'
import * as h from '../../../application/mocha/helpers'
import * as config from '../../../application/config'

h.tools.printCurrentTestFile(__filename)

const { verifyToken, generateToken } = appHelpers.jwtoken

describe('JWToken Helper', () => {
	let testToken
	const testPayload = { id: 1, email: 'test@example.com' }

	before(() => {
		testToken = generateToken(testPayload)
	})

	describe('generateToken', () => {
		it('should generate a valid JWT', () => {
			const decoded = jwt.verify(testToken, config[process.env.NODE_ENV].jwtSecret)
			expect(decoded).to.have.property('id', testPayload.id)
			expect(decoded).to.have.property('email', testPayload.email)
		})
	})

	describe('verifyToken', () => {
		it('should verify a valid JWT', () => {
			const { isValid, decoded } = verifyToken(testToken)
			expect(isValid).to.be.equal(true)
			expect(decoded).to.have.property('id', testPayload.id)
			expect(decoded).to.have.property('email', testPayload.email)
		})

		it('should fail verification for an invalid JWT', () => {
			const invalidToken = testToken.slice(0, -1)
			const { isValid, error } = verifyToken(invalidToken)
			expect(isValid).to.be.equal(false)
			expect(error).to.be.instanceOf(jwt.JsonWebTokenError)
		})
	})
})
