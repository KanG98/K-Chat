const db = require("../db");

function insertUser(userId, firstName, lastName, nickname, email, password){
  const Users = require("../users")
  Users.create({
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    nickname: nickname,
    email: email,
    password: password,
    emailIsVerified: false,
  })
    .then((user) => {
      console.log(`User ${nickname} created successful`)
    })
    .catch((err) => {
      console.log(err ) // handle duplicate key error here 
      // console.log(err)
    });
}

module.exports = insertUser
