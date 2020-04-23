const fs = require('fs');

const checkIfImage = (image) => {
    let imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

    return imageReg.test(image);
};

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
        reject('No input directory detected; Please enter a directory or' +
            ' image path!');
    }
});

// Validation function that checks whether the input passed is a valid image
// file, or if it is a directory; otherwise, reject the script. Also setting
// the global fileType boolean to track whether the input is a single image.
const checkIfValidInput = (input) => new Promise((resolve, reject) => {
    let images = [];

    if (checkIfImage(input)) {
        if (fs.existsSync(input)) {
            images.push(input);
            resolve(images);
        } else {
            reject("Image not found!");
        }
    } else {
        if (fs.existsSync(input)) {
            fs.readdir(input, (err, files) => {
                files.forEach(file => {
                    if (checkIfImage(file)) {
                        images.push(input + file);
                    }
                });

                if (images.length === 0) {
                    reject('No images found in directory!');
                }

                resolve(images);
            });
        } else {
            reject('Directory does not exist; please try again!');
        }
    }
});

module.exports = {
    checkIfSingleInput: checkIfSingleInput,
    checkIfValidInput: checkIfValidInput
};