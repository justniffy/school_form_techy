// == (equal to)
// === (strict equal to)
// != (not equal to)
// !== (strict not equal to)
// > (greater than)
// < (less than)
// >= (greater than or equal to)
// <= (less than or equal to)

// Use a comparison operator to check (less than or equal to)
// if the number of bunnies in the bunnies array is less than or equal to the number of dogs in the dogs array.
// If it is, print There are more dogs than bunnies to the console. 
// If it is not, print There are more bunnies than dogs to the console.

let bunnies = ['luly','line','rose','gins'];
let dogs = ['white','tyler','snoopy'];

if (bunnies.length <= dogs.length) {
    console.log('There are more dogs than bunnies');
    
}
if (dogs.length <= bunnies.length){
    console.log('There are more bunnies than dogs')
}

if (dogs.length == bunnies.length){
    console.log('We have same numbers of dogs and bunnies')
}

//Using a ternary operator , write a function that takes in a number and returns a string that says whether the number is even or odd.