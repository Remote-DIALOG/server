require('dotenv').config()
require('./config/database').connect();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan')
const port = process.env.PORT || 8081
const users = require('./routes/user')
const app = express()


// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'))


// routes
app.use('/users', users);


app.listen(port, ()=>{
    console.log(`server starting at port ${port}`)
});
