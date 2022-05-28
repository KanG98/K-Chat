const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')

const getUsers = require('../database/DMLs/getUsers');

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

router.use(cors(corsOptions))

router.get("/user/getById/:userId", async (req, res) => {
  const user = await getUsers ( {userId: req.params.userId})
  res.send(user)
})

module.exports = router;