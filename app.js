require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan')
const port = 443
const users = require('./routes/user')
const clinician = require('./routes/clinician')
const session = require('./routes/session');
const client = require('./routes/clinet');
const actionitem = require('./routes/actionitems');
const app = express()
const os = require('os');
const networkInterfaces = os.networkInterfaces();

app.use(express.static(path.join(__dirname, '/dialogplus/build/')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/dialogplus/build/', 'index.html'))
})
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'))
//routes
app.use('/users', users);
app.use('/clinician', clinician);
app.use('/session', session);
app.use('/client', client);
app.use('/actionitem', actionitem);
// add middlewares

app.listen(port, ()=>{
    //console.log(networkInterfaces["en0"][1].address+":"+port)
    console.log(`server starting at port ${port}`)
})
