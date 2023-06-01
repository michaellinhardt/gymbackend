import crypto from 'crypto'

const generateSecret = (length = 64) => {
	return crypto.randomBytes(length).toString('hex')
}

const jwtSecret = generateSecret()
console.log('Generated JWT Secret:', jwtSecret)
