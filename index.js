const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const server = require('http').createServer(app)
const path = require('path');
const socketio = require('socket.io')
const db = require('./database/db')
const uuid = require('uuid')

const signupRoute = require('./routes/signupRoute')
const joinRoomRoute = require('./routes/joinRoomRoute')

function testMessages(){
  const Messages = require("./database/messages")
  Messages.create({
    messageId: 'testMessagesId',
    senderId: 'testSEnderId',
    roomId: 'testRoomId',
    message: 'hello this is sample'
  })
    .then((message) => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err)
    });
}

function testRoom(){
  const Rooms = require("./database/rooms")
  Rooms.create({
    roomId: 'sample id',
    roomName: 'sampleRoom name',
    hostUserId: 'sample host user id'
  })
    .then((room) => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err)
    });
}

function testJoinRoom(){
  const JoinRoom = require("./database/joinRoom")
  JoinRoom.create({
    userId: 'sample id',
    roomId: 'sampleRoom i'
  })
    .then((room) => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err)
    });
}

function testUserLogin(){
  const UserLogin = require("./database/userLogin")
  UserLogin.create({
    userId: 'sampleId2',
    deviceId: 'sampleDevice id'
  })
    .then((room) => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err)
    });
}


// testUserLogin()
// testRoom()
// testUsers()
// testJoinRoom()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client')))

app.use('/', signupRoute)
app.use('/', joinRoomRoute)

const io = socketio(server)
// need auth
var userId = ""
var roomId = ""

app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, '/client'));


app.get('/:userId/:roomId', (req, res) =>{
  res.render('chatRoom.html')
  userId = req.params.userId
  roomId = req.params.roomId
})

function formatMessage(senderId, text){
  return (
    {
      senderId: senderId,
      text: text,
      time: new Date()
    }
  )
}

io.on('connection', (socket) => {
  socket.on('join-room', ({userId, roomId}) => {
    socket.join(roomId)
    console.log('new socket io connection', socket.id)

    socket.broadcast.to(roomId).emit('message', formatMessage('Chat bot: ', `${userId} has joined the chat`))
  
    socket.on('message', (message) => {
      io.in(roomId).emit('message', message)
    })
  
    socket.on('disconnect', () => {
      socket.to(roomId).emit('message', formatMessage('Chat bot: ', `${userId} user has left the chat`))
    })
  })
})

const port = process.env.PORT || 3030;

db.sync().then(() => {
  server.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);})


