import _ from 'lodash'
import * as helpers from '../../application/helpers'
import * as config from '../config'

// Superclass model for handling database operations
export class ModelSuperclass {
	// Constructor that takes a table name and links helpers and config
	constructor (table) {
		this.table = table
		this.linkHelpersAndConfig()
	}

	// Function to link helpers and config to the model
	linkHelpersAndConfig () {
		this.config = config
		this.helpers = helpers
	}

	// Function to get a Knex instance for the table
	knex () {
		return this.helpers.knex.getInstance()(this.table)
	}

	// Function to get the last row in the table
	getLast () {
		return this.knex()
			.select('*')
			.where({ is_deleted: false })
			.orderBy('id', 'desc')
			.first()
	}

	// Function to get the last row in the table that matches the provided conditions
	getLastWhere (where) {
		where.is_deleted = false
		return this.knex()
			.select('*')
			.where(where)
			.orderBy('id', 'desc')
			.first()
	}

	// Function to get the last row in the table that matches any of the provided conditions
	getLastWhereOr (...args) {
		const request = this.knex()

		_.forEach(args, (where, index) => {
			const method = index > 0 ? 'orWhere' : 'where'
			where.is_deleted = false
			request[method](where)
		})

		return request
			.select('*')
			.orderBy('id', 'desc')
			.first()
	}

	// Function to get the first row in the table
	getFirst () {
		return this.knex()
			.select('*')
			.where({ is_deleted: false })
			.first()
	}

	// Function to get the first row in the table that matches the provided conditions
	getFirstWhere (where) {
		where.is_deleted = false
		return this.knex()
			.select('*')
			.where(where)
			.first()
	}

	// Function to get the first row in the table that matches any of the provided conditions
	getFirstWhereOr (...args) {
		const request = this.knex()

		_.forEach(args, (where, index) => {
			const method = index > 0 ? 'orWhere' : 'where'
			where.is_deleted = false
			request[method](where)
		})

		return request
			.select('*')
			.first()
	}

	// Function to get all rows in the table
	getAll () {
		return this.knex()
			.select('*')
			.where({ is_deleted: false })
	}

	// Function to get all rows in the table that match the provided conditions
	getAllFirstWhere (where) {
		where.is_deleted = false
		return this.knex()
			.select('*')
			.where(where)
	}

	// Function to get all rows in the table that match the provided conditions,
	// ordered by ID descending
	getAllLastWhere (where) {
		where.is_deleted = false
		return this.knex()
			.select('*')
			.where(where)
			.orderBy('id', 'desc')
	}

	// Get all rows that match any provided condition, ordered by ID descending
	getAllLastWhereOr (...args) {
		const request = this.knex()

		_.forEach(args, (where, index) => {
			const method = index > 0 ? 'orWhere' : 'where'
			where.is_deleted = false
			request[method](where)
		})

		return request
			.select('*')
			.orderBy('id', 'desc')
	}

	// Get all rows that match any provided condition
	getAllWhereOr (...args) {
		const request = this.knex()

		_.forEach(args, (where, index) => {
			const method = index > 0 ? 'orWhere' : 'where'
			where.is_deleted = false
			request[method](where)
		})

		return request
			.select('*')
	}

	// Get the last row where a specified field's value is in the provided array
	getLastWhereIn (field, arrayValue) {
		return this.knex()
			.select('*')
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
			.orderBy('id', 'desc')
			.first()
	}

	// Get the first row where a specified field's value is in the provided array
	getFirstWhereIn (field, arrayValue) {
		return this.knex()
			.select('*')
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
			.first()
	}

	// Get all rows where a specified field's value is in the provided array
	getAllFirstWhereIn (field, arrayValue) {
		return this.knex()
			.select('*')
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
	}

	// Get all rows where a specified field's value is in the provided array,
	// ordered by ID descending
	getAllLastWhereIn (field, arrayValue) {
		return this.knex()
			.select('*')
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
			.orderBy('id', 'desc')
	}

	// Decrement specified columns for all rows matching the provided conditions
	decrementAllWhere (where, decrements) {
		where.is_deleted = false
		return this.knex()
			.decrement(decrements)
			.where(where)
	}

	// Decrement specified columns for all rows where a field's value is in the provided array
	decrementAllWhereIn (field, arrayValue, decrements) {
		return this.knex()
			.decrement(decrements)
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
	}

	// Increment specified columns for all rows matching the provided conditions
	incrementAllWhere (where, increments) {
		where.is_deleted = false
		return this.knex()
			.increment(increments)
			.where(where)
	}

	// Increment specified columns for all rows where a field's value is in the provided array
	incrementAllWhereIn (field, arrayValue, increments) {
		return this.knex()
			.increment(increments)
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
	}

	// Update all rows matching the provided conditions with the specified update data
	updAllWhere (where, update) {
		where.is_deleted = false
		return this.knex()
			.update(update)
			.where(where)
	}

	// Update all rows where a field's value is in the provided array with the specified update data
	updAllWhereIn (field, arrayValue, update) {
		return this.knex()
			.update(update)
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
	}

	// Soft delete all rows matching the provided conditions by updating the is_deleted flag
	delAllWhere (where) {
		where.is_deleted = false
		return this.knex()
			.update({
				is_deleted: true,
				deleted_at: this.helpers.date.timestampSql(),
			})
			.where(where)
	}

	// Soft delete all rows where a field's value is in the provided array
	// by updating the is_deleted flag
	delAllWhereIn (field, arrayValue) {
		return this.knex()
			.update({
				is_deleted: true,
				deleted_at: this.helpers.date.timestampSql(),
			})
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
	}

	// Add a new entry to the table, returning the added entry
	async add (entry = {}) {
		await this.knex().insert(entry)
		return entry
	}

	// Add an array of entries to the table, returning the added entries
	async addArray (entries) {
		if (!entries.length) { return entries }
		await this.knex().insert(entries)
		return entries
	}

}
