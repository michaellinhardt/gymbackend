const moment = require('moment')

export const
	// Function to return the current timestamp in SQL format, with optional time increment
	timestampSql = (increaseValue = 0, increaseFormat = 'seconds') => {
		const newDate = moment()
		return increaseValue > 0
			? newDate.add(increaseValue, increaseFormat).format('YYYY-MM-DD HH:mm:ss')
			: newDate.format('YYYY-MM-DD HH:mm:ss')
	},

	// Function to convert an SQL date to a Unix timestamp (in seconds)
	sqlDateToTimestamp = date => parseInt(moment(date).format('X'), 10),

	// Function to return the current timestamp in a short format (MM.DD HH:mm:ss)
	nowShort = () => moment().format('MM.DD HH:mm:ss'),
	// Function to format a given date in a short format (MM.DD HH:mm:ss)
	dateShort = date => moment(date).format('MM.DD HH:mm:ss'),

	// Function to return the current Unix timestamp (in seconds)
	timestamp = () => parseInt(moment().format('X'), 10),
	// Function to return the current Unix timestamp in milliseconds
	timestampMs = () => Date.now()
