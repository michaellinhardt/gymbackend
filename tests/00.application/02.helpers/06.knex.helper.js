import { expect } from 'chai'
import * as appHelpers from '../../../application/helpers'
import * as h from '../../../application/mocha/helpers'

h.tools.printCurrentTestFile(__filename)

const { getInstance, createTableDefaultSetup }
    = appHelpers.knex

describe('Testing knex helper', () => {
	it('getInstance should return a Knex instance', () => {
		const knexInstance = getInstance()
		expect(typeof knexInstance.whereJsonObject).to.be.equal('function')
	})

	it('getInstance should return the same Knex instance on multiple calls', () => {
		const knexInstance1 = getInstance()
		const knexInstance2 = getInstance()

		expect(knexInstance1).to.equal(knexInstance2)
	})

	// eslint-disable-next-line max-len
	it('createTableDefaultSetup should set up default columns and settings for a new table', async () => {
		const knexInstance = getInstance()
		const tableName = 'test_table_default_setup'

		await knexInstance.schema.dropTableIfExists(tableName)

		await knexInstance.schema.createTable(tableName, table => {
			createTableDefaultSetup(knexInstance, table)
		})

		const tableInfo = await knexInstance(tableName).columnInfo()

		expect(tableInfo).to.have.property('id')
		expect(tableInfo.id).to.include({ type: 'int', nullable: false })

		expect(tableInfo).to.have.property('created_at')
		expect(tableInfo.created_at).to.include({ type: 'timestamp', nullable: false })

		expect(tableInfo).to.have.property('updated_at')
		expect(tableInfo.updated_at).to.include({ type: 'timestamp', nullable: true })

		expect(tableInfo).to.have.property('deleted_at')
		expect(tableInfo.deleted_at).to.include({ type: 'timestamp', nullable: true })

		expect(tableInfo).to.have.property('is_deleted')
		expect(tableInfo.is_deleted).to.include({ type: 'tinyint', nullable: false })

		await knexInstance.schema.dropTableIfExists(tableName)
	})
})
