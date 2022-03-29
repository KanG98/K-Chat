const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const server = require('http').createServer(app)
const path = require('path');
const socketio = require('socket.io')

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

server.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

