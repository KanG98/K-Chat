const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')

const insertMessage = require('../database/DMLs/insertMessage')
const getMessage = require('../database/DMLs/getMessage');

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

router.use(cors(corsOptions))

// json parse used to handle post request 

router.post('/messages/insert', jsonParser, (req, res) => {
  newMessage = {
              senderId: req.body.senderId,
              roomId: req.body.roomId,
              message: req.body.message,
            }
  insertMessage(newMessage)
  res.send(`${newMessage.senderId + " " + newMessage.roomId} Inserted!`)
})

router.get('/messages/get/:roomId', async (req, res) => {
  const messageRecord = {
    roomId: req.params.roomId,
  }
  const records = await getMessage(messageRecord)
  res.send(records)
})



module.exports = router;

