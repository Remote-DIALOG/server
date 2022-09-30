require('dotenv').config()
require('./models/createdatabase')
require('./models/createtable')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan')
const port = 443
const users = require('./routes/user')
const clinician = require('./routes/clinician')
const app = express()
app.use(express.static(path.join(__dirname, '/dialogplus/build/')));

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '/dialogplus/build/', 'index.html'));
// });

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/dialogplus/build/', 'index.html'));
// });

// middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(morgan('combined'))


// routes
app.use('/users', users);
app.use('/clinician', clinician)

app.listen(port, ()=>{
    console.log(`server starting at port ${port}`)
})