// Read input arguments from the command line.
let input = process.argv.slice(2);

// Check if single input is given.
checkIfSingleInput = (args) => {
    if (args.length > 0) {
        return args.length === 1;

    } else {
        return null;
    }
};
// Log out test function above. 
console.log(checkIfSingleInput(input));


//console.log(`Hello World ${args}`);