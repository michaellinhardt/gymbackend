import {
	username, password, passwordPattern, usernamePattern,
} from './_sharedPropertiesSchema'

export const

	PostUserSignUpSchema = {
		type: 'object',
		properties: { username, password },
		required: ['username', 'password'],
	},

	PostUserSignInSchema = {
		type: 'object',
		properties: { username, password },
		required: ['username', 'password'],
	},

	PasswordPattern = passwordPattern,

	UsernamePattern = usernamePattern
