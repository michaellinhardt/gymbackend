import { expect } from 'chai'

export const
	// Function to assert that a variable is an object but not an array
	isObject_isntArray = (oVar) => {
		// Determine if the variable is an object only (not an array, null, or a date)
		const isObjectOnly = typeof oVar === 'object'
			&& !Array.isArray(oVar)
			&& oVar !== null
			&& !(oVar instanceof Date)

		// Expect the isObjectOnly variable to be true,
		// meaning the variable is an object but not an array
		expect(isObjectOnly).to.be.equal(true)
	}
