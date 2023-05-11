// Imports the helper function to set up a default table structure
import { createTableDefaultSetup } from '../../application/helpers/knex.helper'

// Defines the table name
const tableName = 'users'

export const

	// Creates a "users" table in the database with required columns,
	// default constraints and then seeds initial data
	up = (knex) => {
		return knex.schema.createTable(tableName, table => {
			createTableDefaultSetup(knex, table)

			table.string('user_uuid', 36).notNullable()
			table.unique('user_uuid')

			table.string('username').notNullable()
			table.text('password').notNullable()

		}).then(() => {
			const { users } = require('../seeds')
			return knex(tableName).insert(users)
		})
	},

	// Drops the "users" table from the database
	down = (knex) => {
		return knex.schema.dropTableIfExists(tableName)
	}
