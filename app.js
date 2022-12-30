require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const os = require('os')
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
var STATIC_CHANNELS = [{
  name: 'session',
  participants: 0,
  id: 2,
  sockets: []
}];


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
      origin:"*",
      methods: ["GET", "POST"],
    }
  });
io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const user = await jwt.verify(token, process.env.TOKEN_KEY);
      // console.log('user', user);


      next();
    } catch (e) {
      // if token is invalid, close connection
      console.log('error', e.message);
      return next(new Error(e.message));
    }
});


io.on('connection', async (socket)=> {
  let room = []  
    const token = socket.handshake.auth.token;
    const user = await jwt.verify(token, process.env.TOKEN_KEY);
    console.log('user', user);
    
    socket.on("join_room", (data)=>{
      socket.join(data)
      console.log(`User with id: ${socket.id} joined room: ${data}`)
    });

    socket.on("send_message", (data) => {
      socket.to(data.id).emit("recevice_message", data)
      console.log(data)
    });
    
    socket.on('disconnet', ()=>{
      console.log('a user disconnected', socket.id)
    });
});

server.listen(port, ()=>{
    console.log(os.networkInterfaces().en0)
    // console.log(`server starting at port ${port}`)
})
