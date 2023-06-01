import { expect } from 'chai'
import moment from 'moment'
import * as appHelpers from '../../../application/helpers'
import * as h from '../../../application/mocha/helpers'

h.tools.printCurrentTestFile(__filename)

const {
	timestampSql,
	sqlDateToTimestamp,
	nowShort,
	dateShort,
	timestamp,
	timestampMs,
} = appHelpers.date

describe('Testing date helper', () => {
	it('timestampSql should return a valid SQL timestamp', () => {
		const sqlTimestamp = timestampSql()
		expect(moment(sqlTimestamp, 'YYYY-MM-DD HH:mm:ss', true).isValid()).to.be.equal(true)
	})

	it('timestampSql should return an increased SQL timestamp', () => {
		const sqlTimestamp = timestampSql(10, 'seconds')
		const increasedMoment = moment().add(10, 'seconds')
		expect(moment(sqlTimestamp).isSame(increasedMoment, 'second')).to.be.equal(true)
	})

	it('sqlDateToTimestamp should convert SQL date to Unix timestamp', () => {
		const sqlDate = '2023-04-26 12:00:00'
		const unixTimestamp = sqlDateToTimestamp(sqlDate)
		expect(unixTimestamp).to.equal(moment(sqlDate).unix())
	})

	it('nowShort should return a valid short format', () => {
		const shortNow = nowShort()
		expect(moment(shortNow, 'MM.DD HH:mm:ss', true).isValid()).to.be.equal(true)
	})

	it('dateShort should return a valid short format for a given date', () => {
		const date = new Date()
		const shortDate = dateShort(date)
		const dateFormat = 'MM.DD HH:mm:ss'

		expect(moment(shortDate, dateFormat, true).isValid()).to.be.equal(true)

		const shortDateMoment = moment(shortDate, dateFormat)
		const dateMoment = moment(date)

		expect(shortDateMoment.isSame(dateMoment, 'second')
            || shortDateMoment.isSame(dateMoment.add(1, 'second'), 'second')).to.be.equal(true)
	})

	it('timestamp should return a valid Unix timestamp (in seconds)', () => {
		const unixTimestamp = timestamp()
		expect(moment.unix(unixTimestamp).isValid()).to.be.equal(true)
	})

	it('timestampMs should return a valid Unix timestamp in milliseconds', () => {
		const unixTimestampMs = timestampMs()
		expect(moment(unixTimestampMs).isValid()).to.be.equal(true)
	})
})
