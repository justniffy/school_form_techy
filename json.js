//JSON is often used when data is sent from a server to a web page.
// example of json
/*{
  "name": "Lucy",
  "age": 3,
  "isHappy": true
}*/
// JSON keys must be wwrapped in double quotes

// const { json } = require("express");

// // convert javascript to JSON
// let bunny = {
//   name: 'Lucy',
//   age: 3,
//   isHappy: true,
// };

// let bunnyJSON = JSON.stringify(bunny); // the syntax
// console.log(bunnyJSON);
// // {"name":"Lucy","age":3,"isHappy":true}

// // convert JSON to javascript
// let bunnyJSON = '{"name":"Lucy","age":3,"isHappy":true}';
// let bunny = JSON.parse(bunnyJSON); // syntax

// console.log(bunny.name); // Lucy

let bunny = {
  name:'lily',
  age : 7,
  isHappy:true
}
let bunnyJS = JSON.stringify(bunny);
console.log(bunnyJS);
