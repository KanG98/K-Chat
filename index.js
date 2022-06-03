const express = require('express');
const cors = require('cors');
const session = require('express-session')
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
const messagesRoute = require('./routes/messagesRoute')
const roomRoute = require('./routes/roomRoute')
const loginRoute = require('./routes/loginRoute')
const userInfoRoute = require('./routes/userInfoRoute')

require('dotenv').config()

const {
  SESS_LIFETIME = 1000 * 60 * 60 * 48, // 2 days session 
  SESS_NAME = 'sid',
  SESS_SECRET = 'my secret'
} = process.env

app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  // store: ... // eg. mongostore
  cookie:{
    maxAge: SESS_LIFETIME,
    sameSite: true,
  }
}))

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client')))

app.use('/kchat/', signupRoute)
app.use('/kchat/', joinRoomRoute)
app.use('/kchat/', messagesRoute)
app.use('/kchat/', roomRoute)
app.use('/kchat/', loginRoute)
app.use('/kchat/', userInfoRoute)

const io = socketio(server)
// need auth
var userId = ""
var roomId = ""

app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, '/client'));
app.set("view engine", "ejs")


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

    // socket.broadcast.to(roomId).emit('message', formatMessage('Chat bot: ', `${userId} has joined the chat`))
  
    socket.on('message', (message) => {
      io.in(roomId).emit('message', message)
    })
  
    socket.on('disconnect', () => {
      // socket.to(roomId).emit('message', formatMessage('Chat bot: ', `${userId} user has left the chat`))
    })
  })
})

console.log(process.env.PORT)
const port = process.env.PORT || 3030;

db.sync().then(() => {
  server.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);})


