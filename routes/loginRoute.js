const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()
const cors = require('cors')
const uuid = require('uuid');
const { append } = require('express/lib/response');
const UserLogin = require('../database/userLogin');


// const updateUser = require('../database/DMLs/updateUsers');

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

const {
  SESS_LIFETIME = 1000 * 60 * 1, // 10 min session 
  SESS_NAME = 'sid',
  SESS_SECRET = 'my secret'
} = process.env

userId = null


router.use(cors(corsOptions))

const users = [
  {id: 1, name: 'me', email: 'me.com', password: 'me'}
]

const redirectLogin = (req, res, next) => {
  console.log(req.session)
  if(req.session.userId){
    res.redirect('/me')
  }else{
    res.redirect('/user/login')
  }
} 

router.get('/', jsonParser, redirectLogin, (req, res) => {
})

router.get('/me', jsonParser, (req, res) => {
  console.log(req.session)
  if(req.session.userId){
    res.render('me.html')
  }else{
    res.redirect('/')
  }
})

router.post('/user/login', jsonParser, (req, res) => {
  // if password is correct
  if(true){
    req.session.userId = users[0].id // this need to be changed to userEmail
    return res.redirect('http://localhost:3030/me')
  } 
  else{
    return res.redirect('http://localhost:3030')
  }
})

router.get('/user/login', jsonParser, (req, res) => {
  res.render('signin.html')
})


router.post('/user/logout', jsonParser, (req, res) => {
  console.log("worked")
  req.session.destroy(err => {
    if(err) {
      res.redirect("/me")
      return 
    }
  })
  res.clearCookie(SESS_NAME)
  res.redirect('/user/login')
})

module.exports = router;
