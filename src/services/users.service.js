import { ServiceSuperclass } from '../../backendapplication/superclass/service.superclass.js'

export class UsersService extends ServiceSuperclass {

	getByUsername (username) {
		const { m } = this
		return m.users.getFirstWhere({ username })
	}

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
