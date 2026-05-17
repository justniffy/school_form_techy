//Using a ternary operator , write a function that takes in a number and 
//returns a string that says whether the number is even or odd.

// function number () {
//     var a = 9;
//     if (a % 2 === 0 ){
//         console.log(a + " is an even number");
        
//     } else{
//         console.log(a + ' is an odd number');
//     }
// }
// number()

// function number (a) {
//     //var a = 9;
//     if (a % 2 === 0 ){
//         console.log(a + " is an even number");
        
//     } else{
//         console.log(a + ' is an odd number');
//     }
// }
// number(9)

// const numb = (a) => {
    
//     var a = 9;
//     if (a % 2 === 0 ){
//         console.log(a + " is an even number");
        
//     } else{
//         console.log(a + ' is an odd number');
//     }

// }
// numb()
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function checkEvenOdd(num) {
  return num % 2 === 0 ? "Even" : "Odd";
}

rl.question("Enter a number: ", (input) => {
  const number = Number(input);

  const result = isNaN(number)
    ? "Please enter a valid number"
    : checkEvenOdd(number);

  console.log(result);
  rl.close();
});

console.log();