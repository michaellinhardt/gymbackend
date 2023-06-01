import Knex from 'knex'
import * as config from '../config'

// Initialize the knexInstance variable
let knexInstance = null
const { knex: knexConfig, mysql } = config[process.env.NODE_ENV]

export const
	// Function to get an instance of Knex, creating one if it does not exist
	getInstance = () => {
		if (!knexInstance)
			knexInstance = Knex(knexConfig)

		return knexInstance
	},

	// Function to set up the default columns and settings for a new table
	createTableDefaultSetup = (knex, table) => {
		// Set the character set and collation for the table
		table.charset(mysql.charset)
		table.collate(mysql.collate)
		// Set up the primary key as an auto-incrementing 'id' column
		table.increments('id').primary()

		// Add a 'created_at' column with a default value of the current timestamp
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
		// Add an 'updated_at' column with a default value and automatic update on change
		table.timestamp('updated_at')
			.defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

		// Add a nullable 'deleted_at' column for soft deletes
		table.timestamp('deleted_at')
		// Add a 'is_deleted' column with a default value of false
		table.boolean('is_deleted').notNullable().defaultTo(false)
	}
