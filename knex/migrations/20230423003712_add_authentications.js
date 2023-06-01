import { createTableDefaultSetup } from '../../application/helpers/knex.helper'

const tableName = 'authentications'

export const
	up = (knex) => {
		return knex.schema.createTable(tableName, table => {
			createTableDefaultSetup(knex, table)

			table.string('user_uuid', 36).notNullable()
			table.unique('uuid_uuid')

			table.string('service').notNullable()
			table.string('token_auth').notNullable()
			table.string('token_refresh').notNullable()

		})
	},

	down = (knex) => {
		return knex.schema.dropTableIfExists(tableName)
	}
