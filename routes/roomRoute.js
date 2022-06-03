const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')
const axios = require('axios')

const getUserHostRoom = require('../database/DMLs/getUserHostRoom')
const deleteRoom = require('../database/DMLs/deleteRoom');
const insertRoom = require('../database/DMLs/insertRoom');
const req = require('express/lib/request');
const getRoom = require('../database/DMLs/getRoom');

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

router.use(cors(corsOptions))

router.get('/chat/:userId/:roomId', (req, res) =>{
  const userId = req.session.userId
  if(userId==req.params.userId && new Date(req.session.cookie._expires) > new Date()){
    res.render('chatRoom.html')
  }
  else {
    res.redirect('/')
  }
})

router.get('/room/byHostId/:userId', async (req, res) =>{
  const hostRooms = await getUserHostRoom(req.params.userId)
  res.send(hostRooms)
})

router.get('/room/byRoomId/:roomId', async (req, res) =>{
  const rooms = await getRoom(req.params.roomId)
  res.send(rooms)
})

router.get('/room/create/:userId', (req, res) => {
  if(req.session.userId && req.session.userId == req.params.userId)
    res.render('createRoom.html')
  else
    res.render('signin.html')
})

router.post('/room/insert', jsonParser, (req, res) => {
  if(!req.session) res.render('signin.html')
  newRoom = { 
              roomName: req.body.roomName,
              hostUserId: req.session.userId
            }
  insertRoom(newRoom).then(x => {
    res.redirect('/')
  }).catch(e => {
    res.send(e)
  })
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

