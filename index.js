const express = require('express'); // Import the Express library
const morgan = require('morgan'); //import morgan library for logginhg
const app = express(); // Create an instance of the Express application
// middle ware
const sum = require('./sum'); // Import the add function from the add.js file

app.use(morgan('dev')); // Use Morgan middleware for logging HTTP requests
app.use(express.json()); // Use Express middleware to parse JSON request bodies

app.get('/home', (req, res)=> { //home route
    res.send("Welcome to the Home Page!!!!"); // what is showing on the server
});

app.post('/post', (req, res) => { 
    res.send("This is a post request"); // what is showing on the server
});


app.put('/put', (req, res) => { 
    res.send("This is a put request"); // what is showing on the server
});

app.delete('/delete', (req, res) => { 
    res.send("This is a delete request,"); // what is showing on the server
});


app.get('/add', (req, res)=> {
    const {a, b} = req.body;
    const result = sum.add(a, b);
    res.json({ result });
})

app.get('/subtract', (req, res)=> {
    const {a, b} = req.body;
    const result = sum.subtract(a, b);
    res.json({ result });
});
app.get('/multiply', (req, res)=> {
    const {a, b} = req.body;
    const result = sum.multiply(a, b);
    res.json({ result });
});

app.get('/divide', (req, res)=> {
    const {a, b} = req.body;
    const result = sum.divide(a, b);
    res.json({ result });
});

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");

})

// create route for modules in sum.js
// browser can only get



app.listen(3000, ()=> { //port number :plot in my laptop
    console.log("Server is running on port 3000");

})
//dependencies:package we use and install when writin codes and production,during testing
//dev dependencies : package used alone in development
// nodemon is dev dependency
// -g globally installed
//cros middle ware