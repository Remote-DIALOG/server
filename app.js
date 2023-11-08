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
const notes = require('./routes/notes');
const ping = require('./routes/ping')
const app = express()
const jwt = require('jsonwebtoken');
const {addUser, getUsersInRoom} = require('./user')

// add middlewares
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
app.use(cors())
app.use(bodyParser.json());
app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, '/dialogplus/build/')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/dialogplus/build/', 'index.html'))
})

//routes
app.use('/users', users);
app.use('/clinician', clinician);
app.use('/session', session);
app.use('/client', client);
app.use('/notes', notes);
app.use('/ping', ping)

// creating server for rtc
const server = http.createServer(app)
const port = process.env.PORT
const io = require("socket.io")(server, {
    cors: {
      origin:"*",
      methods: ["GET", "POST"],
    }
  });
io.on('connection', async (socket)=> {
    
    socket.on("join_room", async(data)=>{
      socket.join(data)
      // console.log(`User with id: ${socket.id} joined room: ${data}`)
      const token = socket.handshake.auth.token;
      const user = await jwt.verify(token, process.env.TOKEN_KEY);
      // console.log("-----?", {id:socket.id, user, data})
      const {error, users} = addUser({id:socket.id, name:user, room:data});
      // console.log(users)
    });


    socket.on("send_message", async(data) => {
      const userInRoom = getUsersInRoom(data.id)
      for(var i=0;i<userInRoom.length;i++) {
        if(userInRoom[i].name.userinfo.category=='clinician') {
          data.current_session[13].clinicianID = userInRoom[i].name.userinfo.id
        }
      }
      socket.to(data.id).emit("recevice_message", data)
     
    });

    socket.on("sendNotes", (data)=> {
      console.log("data------------->", data)
      socket.to(data.id).emit("get_notes", data)
    });
    
    socket.on('forceDisconnect', ()=>{
      console.log("disconnecting the socket")
      socket.disconnect();
    })
});

server.listen(port, ()=>{
    console.log(`server starting at port ${port}`)
})
