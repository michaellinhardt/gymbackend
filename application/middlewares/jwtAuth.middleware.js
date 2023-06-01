import _ from 'lodash'
import * as config from '../../application/config'
import { AppError } from '../helpers/renders.helper'
import { verifyToken } from '../helpers/jwtoken.helper'

export const

	jwtAuth = (req, res, next) => {
	// Get the JWT from the request header
		const token = _.get(req, 'header.Authorization', '').replace('Bearer ', '')

		if (token === '')
			throw new AppError('jwtoken.missing', 401)

		// Verify and decode the JWT using jwtoken.helper
		try {
			const { isValid, decoded } = verifyToken(token, config[process.env.NODE_ENV].jwtSecret)

			if (!isValid)
				throw new AppError('jwtoken.invalid', 401)

			req.jwtoken = decoded
			return next()

		} catch (error) {
			throw new AppError('jwtoken.invalid', 401)
		}
	}
