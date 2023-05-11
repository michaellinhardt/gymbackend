// Imports the helper function to set up a default table structure
import { createTableDefaultSetup } from '../../backendapplication/helpers/knex.helper'

// Defines the table name
const tableName = 'keys'

// Defines the functions to create and drop the table
export const
	up = (knex) => {
		// Creates the "keys" table with the specified structure
		return knex.schema.createTable(tableName, table => {
			createTableDefaultSetup(knex, table)

			// Adds columns for the key UUID, environment, and the key itself
			table.string('key_uuid', 36).notNullable()
			table.unique('key_uuid')

			table.string('environment').notNullable()
			table.string('service').notNullable()
			table.text('key').notNullable()

		}).then(() => {
			const { keys } = require('../seeds')
			return knex(tableName).insert(keys)
		})
	},

	// Drops the "keys" table from the database
	down = (knex) => {
		return knex.schema.dropTableIfExists(tableName)
	}
