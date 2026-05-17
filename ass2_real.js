// Create an array called bunnies that contains the names of six bunnies.
// Add a new bunny called Mario to the end of the array.
// Remove the bunny called Lucy from the array.
// Add a new bunny called Luigi to the beginning of the array.

// Create an array with six bunny names
let bunnies = ["Lola", "Bugs", "Thumper", "Lucy", "Coco", "Daisy"];

// Add "Mario" to the end
bunnies.push("Mario");
//console.log(bunnies);

// Remove "Lucy" from the array
bunnies.splice(3,1);// index first then number of elements
console.log(bunnies);
//bunnies = bunnies.filter(bunny => bunny !== "Lucy");



// Add "Luigi" to the beginning
bunnies.unshift("Luigi");

// Final result 
console.log(bunnies);
//console.log(bunnies.join(','));