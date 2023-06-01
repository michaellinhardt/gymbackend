import Knex from 'knex'

import * as config from '../../config'
import * as knexHelper from '../../helpers/knex.helper'

const { knex: knexConfig, mysql } = config.test
let knex

export const
	// Get a knex instance with the test database
	getInstance = () => {
		knexConfig.connection.database = mysql.database
		knex = Knex(knexConfig)
		return knex
	},

	// Reset the test database: drop, create, and run migrations
	resetTestDatabase = () => {

		describe('\x1b[36m### Reseting Database\x1b[0m', () => {

			// Drop the test database if it exists
			it('Drop database if exists', async () => {
				delete knexConfig.connection.database
				knex = Knex(knexConfig)
				await knex.raw(`DROP DATABASE IF EXISTS \`${mysql.database}\`;`)
			})

			// Create the test database if it doesn't exist
			it('Create database test if not exists', async () => {
				await knex.raw(`
					CREATE DATABASE IF NOT EXISTS \`${mysql.database}\`
					CHARACTER SET ${mysql.charset}
					COLLATE ${mysql.collate};`)
				knexConfig.connection.database = mysql.database
				knex = knexHelper.getInstance()
			})

			// Run the latest migrations on the test database
			it('Runing latest migrations', async () => {
				await knex.migrate.latest()
			})

		})

	}
