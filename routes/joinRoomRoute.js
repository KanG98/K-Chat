const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')
const uuid = require('uuid');
const path = require('path')
const insertJoinRoom = require(path.resolve(__dirname, '../database/DMLs/insertJoinroom'));
const deleteJoinRoom = require('../database/DMLs/deleteJoinRoom');
const getJoinRoom = require('../database/DMLs/getJoinRoom');

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

router.use(cors(corsOptions))

// json parse used to handle post request 

router.post('/joinRoom/join', jsonParser, (req, res) => {
  const newJoin = {
    userId: req.body.userId,
    roomId: req.body.roomId,
  }
  console.log(req.body)
  insertJoinRoom(newJoin)
  res.send(newJoin) // so something else if insertjoin fails
})

router.delete('/joinRoom/delete/:userId/:roomID', (req, res) => {
  const joinRecord = {
    userId: req.params.userId,
    roomId: req.params.roomID
  }
  deleteJoinRoom(joinRecord)
  res.send(joinRecord)
})

router.get('/joinRoom/get/byUserId/:userId', async (req, res) => {
  const joinRecord = {
    userId: req.params.userId,
  }
  const records = await getJoinRoom(joinRecord)
  res.send(records)
})

router.get('/joinRoom/get/byRoomId/:roomId', async (req, res) => {
  const joinRecord = {
    roomId: req.params.roomId,
  }
  const records = await getJoinRoom(joinRecord)
  res.send(records)
})


module.exports = router;

