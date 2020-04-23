/**
 * Image-Padder Node Script
 *
 * This project is a basic image editing script, utilizing the GraphiksMagik
 * image editing library as well as native NodeJS File System
 * functionality, to validate passed in image files/corresponding
 * directory, and writing out basic image edits to those images.
 */

// Parsing out the command line arguments and assigning to variable, and
// importing inputHandler file for input validation/imageEdit for editing
// images.
let
    input = process.argv.slice(2),
    inputHandler = require('./inputHandlers.js'),
    imageEditor = require('./imageEditor');

// Running main editing script by executing both validation promises
// sequentially, where currently the script only accepts a single image.
inputHandler.checkIfSingleInput(input).then(path => {
    inputHandler.checkIfValidInput(path.toString()).then(images => {
        // Configure as a promise
        imageEditor.editImages(images);
    }).catch(e => {
        console.log(e);
    });
})
    .catch(error => {
        console.log(error);
    });
