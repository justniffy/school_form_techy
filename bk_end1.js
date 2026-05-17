console.log(7);
// javascript is for interactions,your apps come to life
// mkdir command in the cmd will create a folder
// cls to clear
// rmdir will remove the folder
// to know if node is installed use node -v
// variables: containers for storing data values
var bunny = 'lucy';
var dog = 'tyler';
var cat = 'lily';
console.log(bunny, dog, cat);// print statement
var number = 2;
var string = "Hello, World!"; // "double quotes" or 'single quotes' or backticks can be used for string
// variables can begin with $ or _
// variable declaration: var,let,const
// let: local scope varaible
 //const cat = 'hin';
//const cat = 'hin';
// local scope: varaibles defined within a javascript function
// global scope:outside the function 
// naming convention
//camelCase,snake_case
// data types:number,boolean,undefined,string,null(primitive)
//non primitive:object,array,functions
let phon_numb =  8118576623;
//code. in cmd to open vscode
// objects ,arrays  
const nigeriasEconomy = {
    gdp: 448.12,
    population: 206.14,
    currency: 'Naira',
    sapaRate: "100%",
    unemploymentRate: "33%",
    povertyRate: "90%",
    presidency: false
}
console.log(nigeriasEconomy.povertyRate);
console.log("Nigerias poverty rate is " + nigeriasEconomy.povertyRate);
console.log("Nigerias presidency is " + nigeriasEconomy.presidency);
// function
function addn(){   // function nameOfFunction
    var a = 5;
    var b= 4;
    var sum = a+b;
    console.log(sum);
}

addn() // invoke a function


// To know if nodejs is in your machine - do 'node -v' - inside cmd

// 1. windows button + r 
// 2. type cmd into the widget 
// 3. You should see cmd opened 
// 4. cd into any folder of your choice - e.g desktop
// 5. make a directory - mkdir 'name of the folder' - note dont put space in your folder names
// 6. cd into that folder - by typing ' cd name of the folder'
// 7. type - code .    
// 8. vscode should open nowP