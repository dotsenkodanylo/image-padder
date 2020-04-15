let fs = require('fs');
let input = process.argv.slice(2);


const checkIfSingleInput = (args) => new Promise((resolve, reject) => {
    if (args.length > 0) {
        if (args.length !== 1) {
            reject(`Multiple arguments detected; please enter a single image directory!`);
        } else {
            console.log('Thank you!; processing...');
            resolve(args[0]);
        }

    } else {
        reject('No input directory detected; Please enter a directory!');
    }
});

checkIfSingleInput(input).then(directory => {
    fs.readdir(directory, (err, files) => {
        console.log(files);
    });
})
    .catch(error => {
        console.log(error);
    });
