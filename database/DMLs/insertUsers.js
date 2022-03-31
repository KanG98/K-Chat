function insertUser(newUser){
  const Users = require("../users")
  Users.create({
    userId: newUser.userId,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    nickname: newUser.nickname,
    email: newUser.email,
    password: newUser.password,
    emailIsVerified: false,
  })
    .then((user) => {
      console.log(`User ${newUser.nickname} created successful`)
    })
    .catch((err) => {
      console.log(err ) // handle duplicate key error here 
      // console.log(err)
    });
}




module.exports = insertUser
