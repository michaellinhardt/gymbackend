import Ajv from 'ajv'
import _ from 'lodash'

import * as schemaFiles from '../../src/schemas'
import * as renders from './renders.helper'

// Initialize Ajv validator with options
const ajv = new Ajv({ allErrors: true })
require('ajv-errors')(ajv)

// Add each schema from schemaFiles to the Ajv instance
_.forEach(schemaFiles, schemaFile =>
	_.forEach(schemaFile, (schema, name) =>
		ajv.addSchema(schema, name)))

export const

	// Function to add a schema with a specific name
	addSchema = (schema, name) => ajv.addSchema(schema, name),

	// Function to validate data against a named schema
	validate = (schemaName, data) => {
		// If the data is valid, return true
		if (ajv.validate(schemaName, data))
			return true

		// Otherwise, handle the first Ajv error
		const ajvError = (ajv.errors && ajv.errors[0]) || null

		if (!ajvError) return renders.badRequest('invalid.data')

		const { keyword, params, message, schemaPath } = ajvError

		// Handle required property error
		if (keyword === 'required') {
			_.forEach(params, (errorData, errorLabel) => {
				return renders.badRequest(`${errorData}.${errorLabel}`)
			})

		// Handle minLength and maxLength errors
		} else if (['minLength', 'maxLength'].includes(keyword)) {
			const splitSchemaPath = schemaPath.split('/')
			const errorData = splitSchemaPath[(splitSchemaPath.length - 2)]
			return renders.badRequest(`${errorData}.${keyword}.${params.limit}`)

		// Handle enum errors
		} else if (keyword === 'enum') {
			const splitSchemaPath = schemaPath.split('/')
			const errorData = splitSchemaPath[(splitSchemaPath.length - 2)]
			return renders.badRequest(`invalid.${errorData}`)

		// Handle custom error messages
		} else if (keyword === 'errorMessage') {
			return renders.badRequest(message)
		}

		// For any other error, return a generic bad request response
		return renders.badRequest('invalid.data')
	},

	// Function to check if a value is not empty
	isNotEmpty = (label, value) => {
		if (value === null || value === undefined || value === '')
			return renders.badRequest(`${label}.missingProperty`)
	},

	// Function to check if a token has a valid Bearer prefix
	isJwtoken = (token) => {
		if (!token.startsWith('Bearer '))
			return renders.badRequest('jwtoken.invalid')
	}
