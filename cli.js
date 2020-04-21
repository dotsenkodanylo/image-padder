let fs = require('fs');
let gm = require('gm');
let input = process.argv.slice(2);
let isSingleImage = false;

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

const checkIfValidInput = (input) => new Promise((resolve, reject) => {
    let imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

    if (imageReg.test(input)) {
        if (fs.existsSync(input)) {
            isSingleImage = true;
            resolve('image');
        } else {
            reject('Image does not exist; please try again!');
        }
    } else {
        try {
            fs.statSync(input);
            resolve('directory');
        } catch (e) {
            reject('Directory does not exist; please try again!');
        }
    }
});

checkIfSingleInput(input).then(path => {
    checkIfValidInput(path.toString()).then(type => {
        // Check the returned parameter from the promise as to whether the
        // processed input is an image, or directory. If the preceeding,
        // perform the required edit. If the latter, scoop through the
        // entire directory, take all the files, and output them; we want to
        // show all the files first, as well as prompt the user for
        // confirmation as to whether all the caught files require editing.
        if (isSingleImage) {
            let backdropDim = {
                width: null,
                height: null
            }

            let imageDimensions = new Promise(resolve => {
                gm(path)
                    .size(function (err, size) {
                        if (!err) {
                            backdropDim.width = Math.ceil(size.width * 0.05);
                            backdropDim.height = Math.ceil(size.height * 0.05);
                        }
                        resolve(backdropDim);
                    })
            })

            imageDimensions.then(dimensions => {
                gm(path)
                    .borderColor('black')
                    .border(8, 8)
                    .borderColor('white')
                    .border(dimensions.width, dimensions.height)
                    .write(`${path}`, function (err) {
                        if (!err) {
                            console.log('done')
                        } else {
                            console.log(err);
                        }
                    });
            })


        } else {
            console.log(type + ' has resolved to an directory.');
        }
    }).catch(e => {
        console.log(e);
    });
})
    .catch(error => {
        console.log(error);
    });
