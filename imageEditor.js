// Importing the File System and GraphiksMagik libraries.
const gm = require('gm');

const editImages = (images) => {

    let backdropDim = {
        width: null,
        height: null
    };

    images.forEach(img => {
        let imageDimensions = new Promise(resolve => {
            gm(img)
                .size(function (err, size) {

                    if (!err) {
                        backdropDim.width = Math.ceil(size.width * 0.05);
                        backdropDim.height = Math.ceil(size.height * 0.05);
                    }

                    resolve(backdropDim);
                });
        });

        imageDimensions.then(dimensions => {

            gm(img)
                .borderColor('black')
                .border(8, 8)
                .borderColor('white')
                .border(dimensions.width, dimensions.height)
                .write(`${img}`, function (err) {

                    if (!err) {
                        console.log(img + ' successfully edited!')
                    } else {
                        console.log('Issue with ' + img);
                    }
                });
        })
    })
}

module.exports = {
    editImages: editImages
}