export const
	// Function to create a string schema with optional minimum and maximum length
	string = (minLength = null, maxLength = null) => {
		const schemaString = { type: 'string' }
		if (minLength !== null) { schemaString.minLength = minLength }
		if (maxLength !== null) { schemaString.maxLength = maxLength }
		return schemaString
	},

	// Function to create a pattern-based schema for a specific label
	pattern = (label, pattern, error) => ({
		type: 'object',
		properties: { [label]: { type: 'string', pattern } },
		errorMessage: error,
	}),

	// Function to create an array schema with specified item schema
	array = (items) => ({
		type: 'array',
		items,
	}),

	// Function to create a number schema with optional minimum and maximum value
	number = (minimum = null, maximum = null) => {
		const schemaNumber = { type: 'number' }
		if (minimum !== null) { schemaNumber.minimum = minimum }
		if (maximum !== null) { schemaNumber.maximum = maximum }
		return schemaNumber
	},

	// Function to create a nested object schema for a specific label
	nested = (label, schema) => ({
		type: 'object',
		properties: {
			[label]: schema,
		},
		required: [label],
	})
