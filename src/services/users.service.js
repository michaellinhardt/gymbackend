// A class that extends ServiceSuperclass and provides methods for getting a
// user by username and saving a new user with an encrypted password.
import { ServiceSuperclass } from '../../application/superclass/service.superclass.js'

export class UsersService extends ServiceSuperclass {

	// Returns the first user that matches the specified username.
	getByUsername (username) {
		const { m } = this
		return m.users.getFirstWhere({ username })
	}

	// Saves a new user with the specified username and encrypted password.
	saveNewUser (username, encryptedPassword) {
		const { m } = this

		const newUser = {
			user_uuid: this.helpers.encryption.uuid(),
			username,
			password: encryptedPassword,
		}
		return m.users.add(newUser)
	}
}
