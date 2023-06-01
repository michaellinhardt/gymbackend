export const
	// Print the current test file and folder names in the console
	printCurrentTestFile = filename => {
		// Split the file path and extract the file name
		const fileArray = filename.split('/')
		const fileName = fileArray[fileArray.length - 1]

		// Split the folder path and extract the folder name
		const folderArray = filename.split('/tests')
		const folderName = folderArray[1].replace(`/${fileName}`, '')

		// Describe block to print the folder name in magenta
		describe(`\x1b[35m### Folder: ${folderName}\x1b[0m`, () => {
			// Test block to print the file name in yellow
			it(`File: \x1b[33m${fileName}\x1b[0m`, () => true)
		})
	}
