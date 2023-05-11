import { expect } from 'chai'
import * as appHelpers from '../../../application/helpers'
import * as h from '../../../application/mocha/helpers'

h.tools.printCurrentTestFile(__filename)

const { string, pattern, array, number, nested }
    = appHelpers.schema

describe('Testing schema helper', () => {
	it('string should create a string schema with optional minimum and maximum length', () => {
		const schema1 = string()
		expect(schema1).to.deep.equal({ type: 'string' })

		const schema2 = string(5)
		expect(schema2).to.deep.equal({ type: 'string', minLength: 5 })

		const schema3 = string(null, 10)
		expect(schema3).to.deep.equal({ type: 'string', maxLength: 10 })

		const schema4 = string(5, 10)
		expect(schema4).to.deep.equal({ type: 'string', minLength: 5, maxLength: 10 })
	})

	it('pattern should create a pattern-based schema for a specific label', () => {
		const label = 'email'
		const patternRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
		const error = 'Invalid email format'

		const schema = pattern(label, patternRegex, error)

		expect(schema).to.deep.equal({
			type: 'object',
			properties: { [label]: { type: 'string', pattern: patternRegex } },
			errorMessage: error,
		})
	})

	it('array should create an array schema with specified item schema', () => {
		const itemSchema = { type: 'string' }
		const schema = array(itemSchema)

		expect(schema).to.deep.equal({ type: 'array', items: itemSchema })
	})

	it('number should create a number schema with optional minimum and maximum value', () => {
		const schema1 = number()
		expect(schema1).to.deep.equal({ type: 'number' })

		const schema2 = number(0)
		expect(schema2).to.deep.equal({ type: 'number', minimum: 0 })

		const schema3 = number(null, 100)
		expect(schema3).to.deep.equal({ type: 'number', maximum: 100 })

		const schema4 = number(0, 100)
		expect(schema4).to.deep.equal({ type: 'number', minimum: 0, maximum: 100 })
	})

	it('nested should create a nested object schema for a specific label', () => {
		const label = 'address'
		const nestedSchema = { type: 'object', properties: { street: { type: 'string' } } }
		const schema = nested(label, nestedSchema)

		expect(schema).to.deep.equal({
			type: 'object',
			properties: { [label]: nestedSchema },
			required: [label],
		})
	})
})
