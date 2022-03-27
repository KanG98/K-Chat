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



app.get('/', (req, res) =>{
  res.render('index')
})

io.on('connection', (socket) => {
  console.log('new socket io connection', socket.id)

  // emit to one user
  // socket.emit('message', "Welcome to K-Chat!") // send message to front end 

  // emit to everybody
  // io.emit()

  // emit to everybody except youself
  socket.broadcast.emit('message', 'a user has joined the chat')

  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat')
  })

})

const port = process.env.PORT || 3030;

server.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

