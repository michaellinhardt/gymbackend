/* eslint-disable max-len */
import { expect } from 'chai'
import sinon from 'sinon'
import { ModelSuperclass } from '../../../application/superclass/model.superclass'
import * as helpers from '../../../application/helpers'
import * as config from '../../../application/config'

class TestModel extends ModelSuperclass {
	constructor () {
		super('test_table')
	}
}

describe('ModelSuperclass', () => {
	let model
	let knexStub

	beforeEach(() => {
		model = new TestModel()
		knexStub = sinon.stub(model, 'knex')
	})

	afterEach(() => {
		sinon.restore()
	})

	describe('constructor', () => {
		it('should initialize the model with the provided table name', () => {
			expect(model.table).to.equal('test_table')
		})

		it('should link helpers and config to the model', () => {
			expect(model.helpers).to.deep.equal(helpers)
			expect(model.config).to.deep.equal(config)
		})
	})

	describe('knex', () => {
		it('should return a Knex instance for the table', () => {
			knexStub.restore()
			const knexInstance = model.knex()
			expect(knexInstance._single.table).to.equal('test_table')
		})
	})

	// Add tests for each method in ModelSuperclass, following the pattern above.
	// For example:
	describe('getLast', () => {
		it('should call knex.select with the proper arguments', () => {
			const selectStub = sinon.stub().returnsThis()
			const whereStub = sinon.stub().returnsThis()
			const orderByStub = sinon.stub().returnsThis()
			const firstStub = sinon.stub().returnsThis()

			knexStub.returns({
				select: selectStub,
				where: whereStub,
				orderBy: orderByStub,
				first: firstStub,
			})

			model.getLast()

			expect(selectStub.calledWith('*')).to.be.equal(true)
			expect(whereStub.calledWith({ is_deleted: false })).to.be.equal(true)
			expect(orderByStub.calledWith('id', 'desc')).to.be.equal(true)
			expect(firstStub.calledOnce).to.be.equal(true)
		})
	})

	describe('getLastWhere', () => {
		it('should call knex.select with the proper arguments', () => {
			const selectStub = sinon.stub().returnsThis()
			const whereStub = sinon.stub().returnsThis()
			const orderByStub = sinon.stub().returnsThis()
			const firstStub = sinon.stub().returnsThis()

			knexStub.returns({ select: selectStub, where: whereStub, orderBy: orderByStub, first: firstStub })

			const conditions = { some_condition: 'value' }
			model.getLastWhere(conditions)

			expect(selectStub.calledWith('*')).to.be.equal(true)
			expect(whereStub.calledWith({ ...conditions, is_deleted: false })).to.be.equal(true)
			expect(orderByStub.calledWith('id', 'desc')).to.be.equal(true)
			expect(firstStub.calledOnce).to.be.equal(true)
		})
	})

	describe('getLastWhereOr', () => {
		it('should call knex.select with the proper arguments', () => {
			const selectStub = sinon.stub().returnsThis()
			const whereStub = sinon.stub().returnsThis()
			const orWhereStub = sinon.stub().returnsThis()
			const orderByStub = sinon.stub().returnsThis()
			const firstStub = sinon.stub().returnsThis()

			knexStub.returns({ select: selectStub, where: whereStub, orWhere: orWhereStub, orderBy: orderByStub, first: firstStub })

			const conditions1 = { some_condition1: 'value1' }
			const conditions2 = { some_condition2: 'value2' }
			model.getLastWhereOr(conditions1, conditions2)

			expect(selectStub.calledWith('*')).to.be.equal(true)
			expect(whereStub.calledWith({ ...conditions1, is_deleted: false })).to.be.equal(true)
			expect(orWhereStub.calledWith({ ...conditions2, is_deleted: false })).to.be.equal(true)
			expect(orderByStub.calledWith('id', 'desc')).to.be.equal(true)
			expect(firstStub.calledOnce).to.be.equal(true)
		})
	})

	describe('getFirst', () => {
		it('should call knex.select with the proper arguments', () => {
			const selectStub = sinon.stub().returnsThis()
			const whereStub = sinon.stub().returnsThis()
			const firstStub = sinon.stub().returnsThis()

			knexStub.returns({ select: selectStub, where: whereStub, first: firstStub })

			model.getFirst()

			expect(selectStub.calledWith('*')).to.be.equal(true)
			expect(whereStub.calledWith({ is_deleted: false })).to.be.equal(true)
			expect(firstStub.calledOnce).to.be.equal(true)
		})
	})

	describe('getFirstWhere', () => {
		it('should call knex.select with the proper arguments', () => {
			const selectStub = sinon.stub().returnsThis()
			const whereStub = sinon.stub().returnsThis()
			const firstStub = sinon.stub().returnsThis()

			knexStub.returns({ select: selectStub, where: whereStub, first: firstStub })

			const conditions = { some_condition: 'value' }
			model.getFirstWhere(conditions)

			expect(selectStub.calledWith('*')).to.be.equal(true)
			expect(whereStub.calledWith({ ...conditions, is_deleted: false })).to.be.equal(true)
			expect(firstStub.calledOnce).to.be.equal(true)
		})
	})

	describe('getFirstWhereOr', () => {
		it('should call knex.select with the proper arguments', () => {
			const selectStub = sinon.stub().returnsThis()
			const whereStub = sinon.stub().returnsThis()
			const orWhereStub = sinon.stub().returnsThis()
			const firstStub = sinon.stub().returnsThis()

			knexStub.returns({ select: selectStub, where: whereStub, orWhere: orWhereStub, first: firstStub })

			const conditions1 = { some_condition1: 'value1' }
			const conditions2 = { some_condition2: 'value2' }
			model.getFirstWhereOr(conditions1, conditions2)

			expect(selectStub.calledWith('*')).to.be.equal(true)
			expect(whereStub.calledWith({ ...conditions1, is_deleted: false })).to.be.equal(true)
			expect(orWhereStub.calledWith({ ...conditions2, is_deleted: false })).to.be.equal(true)
			expect(firstStub.calledOnce).to.be.equal(true)
		})
	})

	describe('getAll', () => {
		it('should call knex.select with the proper arguments', () => {
			const selectStub = sinon.stub().returnsThis()
			const whereStub = sinon.stub().returnsThis()

			knexStub.returns({ select: selectStub, where: whereStub })

			model.getAll()

			expect(selectStub.calledWith('*')).to.be.equal(true)
			expect(whereStub.calledWith({ is_deleted: false })).to.be.equal(true)
		})
	})

	describe('getAllFirstWhere', () => {
		it('should call knex.select with the proper arguments', () => {
			const selectStub = sinon.stub().returnsThis()
			const whereStub = sinon.stub().returnsThis()

			knexStub.returns({ select: selectStub, where: whereStub })

			const conditions = { some_condition: 'value' }
			model.getAllFirstWhere(conditions)

			expect(selectStub.calledWith('*')).to.be.equal(true)
			expect(whereStub.calledWith({ ...conditions, is_deleted: false })).to.be.equal(true)
		})
	})

	// Continue adding tests for each method in ModelSuperclass
})
