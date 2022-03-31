const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')
const uuid = require('uuid')

const insertUser = require('./../database/DMLs/users')

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

router.use(cors(corsOptions))

// json parse used to handle post request 

router.post('/user/signup', jsonParser, (req, res) => {
  userId = uuid.v4()
  firstName = req.body.firstName
  lastName = req.body.lastName
  nickname = req.body.nickName
  email = req.body.email
  password = req.body.password
  insertUser(userId, firstName, lastName, nickname, email, password)
  res.send(`${email} signed up!`)
  // need to handle if primary key repeated
})

router.post('/user/updateInfo',jsonParser, (req, res) => {

})

module.exports = router;

