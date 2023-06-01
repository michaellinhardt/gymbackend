/* eslint-disable max-len */
export const

	port = 4242,
	printHTTPResponse = false,
	jwtSecret = '3ccbc8d574b24740b3d14e068a60062a9b16d49ee12320e8ff07eef035f7628bf6016ac0d29fd935000e044af24d2753eb19b0188e6c4535db21066de510eb81',

	mysql = {
		host: '127.0.0.1',
		user: 'root',
		password: '23455678',
		database: 'bridge_posdata',
		multipleStatements: true,
		charset: 'utf8mb4',
		collate: 'utf8mb4_unicode_ci',
	},

	knex = {
		client: 'mysql',
		connection: {
			host: mysql.host,
			user: mysql.user,
			password: mysql.password,
			database: mysql.database,
			multipleStatements: mysql.multipleStatements,
			charset: mysql.charset,
		},
		pool: { min: 0, max: 7 },
		migrations: {
			directory: `${__dirname}/../../knex/migrations`,
		},
	}
