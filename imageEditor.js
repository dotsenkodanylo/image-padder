// Importing the File System and GraphiksMagik libraries.
const gm = require('gm');

const editImage = (imagePath) => {

    let
        backdropDim = {
            width: null,
            height: null
        },

        imageDimensions = new Promise(resolve => {
            gm(imagePath)
                .size(function (err, size) {

                    if (!err) {
                        backdropDim.width = Math.ceil(size.width * 0.05);
                        backdropDim.height = Math.ceil(size.height * 0.05);
                    }

                    resolve(backdropDim);
                });
        });

    imageDimensions.then(dimensions => {

        gm(imagePath)
            .borderColor('black')
            .border(8, 8)
            .borderColor('white')
            .border(dimensions.width, dimensions.height)
            .write(`${imagePath}`, function (err) {

                if (!err) {
                    console.log('Image editing complete!')
                } else {
                    console.log(err);
                }
            });
    })
}

module.exports = {
    editImage: editImage
}