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

console.log(uuid.v4())


function testUsers(){
  const Users = require("./database/users")
  Users.create({
    userId: 'sampleId',
    firstName: 'yankang',
    lastName: 'xue',
    nickname: 'KanG98',
    email: 'test@yankang198.com',
    password: 'password',
    emailIsVerified: false,
  })
    .then((user) => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err)
    });
}

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
    roomId: 'sampleRoom id'
  })
    .then((room) => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err)
    });
}

testJoinRoom()
// testRoom()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client')))

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
      // io.emit works
    })
  })
})

const port = process.env.PORT || 3030;

db.sync().then(() => {
  server.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);})


