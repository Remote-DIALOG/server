require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan')
const users = require('./routes/user')
const clinician = require('./routes/clinician')
const session = require('./routes/session');
const client = require('./routes/clinet');
const actionitem = require('./routes/actionitems');
const app = express()
const jwt = require('jsonwebtoken');



// add middlewares
app.use(express.static(path.join(__dirname, '/dialogplus/build/')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/dialogplus/build/', 'index.html'))
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
app.use(cors())
app.use(bodyParser.json());
app.use(morgan('combined'))
//routes
app.use('/users', users);
app.use('/clinician', clinician);
app.use('/session', session);
app.use('/client', client);
app.use('/actionitem', actionitem);

// creating server for rtc
const server = http.createServer(app)
const port = process.env.PORT
const io = require("socket.io")(server, {
    cors: {
      methods: ["GET", "POST"],
      credentials: true
    }
  });
io.use(async (socket, next) => {
    // fetch token from handshake auth sent by FE
    const token = socket.handshake.auth.token;
    try {
      // verify jwt token and get user data
      const user = await jwt.verify(token, process.env.TOKEN_KEY);
      console.log('user', user);
      // save the user data into socket object, to be used further
      socket.user = user;
      next();
    } catch (e) {
      // if token is invalid, close connection
      console.log('error', e.message);
      return next(new Error(e.message));
    }
});


io.on('connection', (socket)=> {
    console.log('new client connected with id = ', socket.id);
    // socket.on('join_room', (data) => {
    //     console.log("join room")
    //     console.log("data====>", data)
    //     // socket.join(room); // Join the user to a socket room
    //   });

    socket.on("join_room", (arg, callback) => {
        console.log(arg); // "world"
        callback("got it");
      });
});

server.listen(port, ()=>{
    //console.log(networkInterfaces["en0"][1].address+":"+port)
    console.log(`server starting at port ${port}`)
})
