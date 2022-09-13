require('dotenv').config()
require('./models/createdatabase')
require('./models/createtable')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan')
const port = process.env.PORT || 8081
const users = require('./routes/user')
const clinician = require('./routes/clinician')
const app = express()


// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'))


// routes
app.use('/users', users);
app.use('/clinician', clinician)

app.listen(port, ()=>{
    console.log(`server starting at port ${port}`)
});
