const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')

const getUserHostRoom = require('../database/DMLs/getUserHostRoom')
const deleteRoom = require('../database/DMLs/deleteRoom');
const insertRoom = require('../database/DMLs/insertRoom')

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

router.use(cors(corsOptions))

router.get('/chat/:userId/:roomId', (req, res) =>{
  const userId = req.session.userId
  if(userId && new Date(req.session.cookie._expires) > new Date()){
    res.render('chatRoom.html')
  }
  else {
    res.redirect('/')
  }
})

router.get('/room/:userId', async (req, res) =>{
  const hostRooms = await getUserHostRoom(req.params.userId)
  res.send(hostRooms)
})

router.post('/room/insert', jsonParser, (req, res) => {
  newRoom = { 
              roomName: req.body.roomName,
              hostUserId: req.body.hostUserId
            }
  console.log(newRoom)
  insertRoom(newRoom)
  res.send(`${newRoom.roomId} Inserted!`)
})

// route for delete 

router.delete('/room/delete/:roomId', jsonParser, (req, res) => {
  // delete roomId, if searchJoinRoom has no user in roomId
  // if has user, pick a user to be new host
  const room = {
    roomId: req.params.roomId
  }
  deleteRoom(room)
  res.send(`${req.params.roomId} deleted!`)
})

// route for update info 



module.exports = router;

