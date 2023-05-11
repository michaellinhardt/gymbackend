// Import necessary helper functions, Bluebird Promise, and the apiKeys service
import * as h from '../../application/mocha/helpers'
import { Promise } from 'bluebird'
import { apiKeys } from '../../src/services'

// Reset the test database and print the current test file name
h.knex.resetTestDatabase()
h.tools.printCurrentTestFile(__filename)

// Import the keys data from the seeds.js file
const { keys: keysFromSeed } = require('../../knex/seeds')

describe('apiKeys.service.js , GET', () => {

	// Define a test case that checks if the keys retrieved from
	// the database match the keys inserted from the `seeds.js` file
	it('Get the key inserted from seeds.js', async () => {

		// Iterate through each key in `keysFromSeed`
		await Promise.map(keysFromSeed, async (keyFromSeed) => {
		// Destructure the properties of the key object from the seed
			const { environment, service, key } = keyFromSeed

			// Call the `getByEnvironmentAndService` method from the `apiKeys` service
			// to retrieve the key from the database
			const { key: keyFromSql } = await apiKeys
				.getByEnvironmentAndService(environment, service)

			// Check if the retrieved key from the database matches the key from the seed
			h.expect(keyFromSql).equal(key)

		}, { concurrency: 3 }) // Set concurrency for Bluebird Promise.map

	})

})
