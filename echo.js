const express = require("express"); // import the library
const morgan = require('morgan'); //log morgan
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT; // hiding port number

app.use(express.json());
app.use(morgan('dev'));
const db_url = process.env.MONGODB_URL;
const db_con = async () => {
    //console.log(db_url)
    await mongoose.connect(db_url)
    console.log('connected to database')
}

app.get('/', (req,res)=>{

    res.send('Hello world!!! ')
})



app.listen(port, () =>{
    db_con(db_url);
console.log(`server is running on port ${port}`); // notice the `

})