const fs = require('fs');

// Validation function that ensures that the input passed in is a single
// argument, otherwise reject the script.
const checkIfSingleInput = (input) => new Promise((resolve, reject) => {
    if (input.length > 0) {
        if (input.length !== 1) {
            reject(`Multiple arguments detected; please enter a single image directory!`);
        } else {
            resolve(input[0]);
        }
    } else {
        reject('No input directory detected; Please enter a directory!');
    }
});

// Validation function that checks whether the input passed is a valid image
// file, or if it is a directory; otherwise, reject the script. Also setting
// the global fileType boolean to track whether the input is a single image.
const checkIfValidInput = (input) => new Promise((resolve, reject) => {
    // Regex expression to validate image extension(s).
    let imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

    if (imageReg.test(input)) {
        if (fs.existsSync(input)) {
            resolve('image');
        } else {
            reject('Image does not exist; please try again!');
        }
    } else {
        try {
            // FileSystem to check if the input passed in is an existing
            // directory.
            fs.statSync(input);
            resolve('directory');
        } catch (e) {
            reject('Directory does not exist; please try again!');
        }
    }
});

module.exports = {
    checkIfSingleInput: checkIfSingleInput,
    checkIfValidInput: checkIfValidInput
};