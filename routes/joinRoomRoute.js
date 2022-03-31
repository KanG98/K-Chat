const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')
const uuid = require('uuid');
const insertJoinRoom = require('../database/DMLs/insertJoinroom');

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
  insertJoinRoom(newJoin)
  res.send(newJoin) // so something else if insertjoin fails
})

module.exports = router;

