//revised function
// function mySelf(){
//     var name = 'Nifemi';
//     var track = 'backend';
//     console.log(name);// printing out name
// }

// mySelf();  //invoke the function
// // another way
// function mySelf(name,track){
//   console.log(name);// printing out name
//    console.log(track);
// }

// mySelf('IFE','backend')
//arrow function
 // the => is called the fat arrow
// use const for arrow function instead of function itself
const sub = (a,b) => {
    console.log(a-b);
}
sub(17,5)
//IIFE function;the function immmediately fires itself
// self invoking function
// (function () {
//   var blackBunnies = 10;
//   var whiteBunnies = 20;
//   var totalBunnies = blackBunnies + whiteBunnies;
//   console.log(totalBunnies);
// })();
// type casting: one data type to another

//ARRAY METHODS
//const bunnies = ['Lucy', 'Tom', 'Molly'];
// pop removes the last element
// shift removes the first element
// unshift adds new element to the start of the array
//push appends element to the end of the array
// indexof... checks index
/// splice(2,1)
// array. length ;gives us number of arrays
//bunnies.length;
//arrays can be nested too
const nestedArrays = [
  ['Lucy', 'Tom'],
  ['Molly', 'Bella'],
];

// Access the first item in the first array
nestedArrays[0][0]; // 'Lucy'
//loops(counter,condition,increment)
const bunnies = ['Lucy', 'Tom', 'Molly'];

for (let i = 0; i < bunnies.length; i++) {
  console.log(`Bunny ${bunnies[i]} is scheduled for a checkup today.`);
}

//CRUD ; CREATE,READ,UPLOAD,DELETE