import jwt from 'jsonwebtoken'
import * as config from '../config'

// Decrypt a JWT and verify its authenticity
export const verifyToken = (token) => {
	try {
		const decoded
            = jwt.verify(token, config[process.env.NODE_ENV].jwtSecret)

		return { isValid: true, decoded }

	} catch (error) {
		return { isValid: false, error }
	}
}

// Function to generate a new JWT with a given payload
export const generateToken = (payload, expiresIn = '1h') => {
	const token
        = jwt.sign(payload, config[process.env.NODE_ENV].jwtSecret, { expiresIn })

	return token
}
