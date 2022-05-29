const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')
const uuid = require('uuid');
const UserLogin = require('../database/userLogin');
const getUsers = require('../database/DMLs/getUsers');
const getUserHostRoom = require('../database/DMLs/getUserHostRoom');
const getJoinRoom = require('../database/DMLs/getJoinRoom');

// const updateUser = require('../database/DMLs/updateUsers');

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

const {
  // SESS_LIFETIME = 1000 * 60 * 10, // 10 min session 
  SESS_NAME = 'sid',
  // SESS_SECRET = 'my secret'
} = process.env


router.use(cors(corsOptions))

const redirectLogin = (req, res, next) => {
  console.log(req.session)
  const userId = req.session.userId
  
  if(userId && new Date(req.session.cookie._expires) > new Date()){
    console.log(new Date(req.session.cookie._expires) )
    console.log(new Date())
    console.log(new Date(req.session.cookie._expires) > new Date())
    res.redirect(`/me/${userId}`)
  }else{
    res.redirect('/user/login')
  }
} 

router.get('/', jsonParser, redirectLogin, (req, res) => {
})

router.get('/me/:userId', jsonParser, async (req, res) => {

  const userId = req.session.userId
  if(userId == req.params.userId){
    res.render('me.html')
  }else{
    res.redirect('http://localhost:3030/')
  }
})

router.post('/user/login', jsonParser, async (req, res) => {
  await getUsers({email: req.body.email}).then(
    (user) => {
      if(user && user.password == req.body.password){
        req.session.userId = user.userId
        return res.redirect(`http://localhost:3030/me/${user.userId}`)
      } 
      else{
        res.status(406).send()
      }})
})

router.get('/user/login', jsonParser, (req, res) => {
  res.render('signin.html')
})


router.post('/user/logout', jsonParser, (req, res) => {
  req.session.destroy(err => {
    if(err) {
      res.redirect("/")
      return 
    }
  })
  res.clearCookie(SESS_NAME)
  res.redirect('/user/login')
})

module.exports = router;
