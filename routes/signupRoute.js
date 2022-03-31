const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')
const uuid = require('uuid')

const insertUser = require('../database/DMLs/insertUsers');
const updateUser = require('../database/DMLs/updateUsers');
// const updateUser = require('../database/DMLs/updateUsers');

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

router.use(cors(corsOptions))

// json parse used to handle post request 

router.post('/user/signup', jsonParser, (req, res) => {
  userId = uuid.v4()
  newUser = {
              userId: userId,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              nickname: req.body.nickName,
              email: req.body.email,
              password: req.body.password,
            }

  insertUser(newUser)
  res.send(`${newUser.email} signed up!`)// this should be returned differently
  // need to handle if primary key repeated
})

router.post('/user/updateInfo',jsonParser, (req, res) => {
  const newInfo = req.body
  console.log(newInfo)
  updateUser(req.body.email, newInfo)
  res.send(newInfo) // neeed try catch here 
})

module.exports = router;

