const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

router.use(cors(corsOptions))

// json parse used to handle post request 

router.post('/user/signup', jsonParser, (req, res) => {

})

router.post('/user/updateInfo',jsonParser, (req, res) => {

})

module.exports = router;

