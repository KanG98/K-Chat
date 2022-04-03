const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')

const insertRoom = require('../database/DMLs/insertRoom');

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

router.use(cors(corsOptions))

router.post('/room/insert', jsonParser, (req, res) => {
  newRoom = { 
              roomName: req.body.roomName,
              hostUserId: req.body.hostUserId
            }
  insertRoom(newRoom)
  res.send(`${newRoom.roomId} Inserted!`)
})

// route for delete 

// route for update info 

module.exports = router;

