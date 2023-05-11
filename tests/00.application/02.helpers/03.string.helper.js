import * as appHelpers from '../../../application/helpers'
import * as h from '../../../application/mocha/helpers'

h.tools.printCurrentTestFile(__filename)

const { string } = appHelpers

describe('Testing string helper', () => {

	it('Lower first char', () => {
		const initialString = 'First Char is Upper'
		const formatedString = string.lowerFirstChar(initialString)
		h.expect(formatedString).to.be.equal('first Char is Upper')
	})

	it('Upper first char', () => {
		const initialString = 'first char is Lowwer'
		const formatedString = string.upperFirstChar(initialString)
		h.expect(formatedString).to.be.equal('First char is Lowwer')
	})
})
