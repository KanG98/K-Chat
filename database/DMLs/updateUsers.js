function updateUser(userId, newInfo){
  const Users = require('../users')

  // var info =  //get the db old info here using email 
  // for(var key in updatedItem){
  //   info[key] = updatedItem[key]
  // }
  Users.update(
    newInfo,
    {where:{
        userId: userId
      }}
  )
  .then(res => console.log('updated successful'))
  .catch(err => console.log(err))
}

// updateUser('se', {firstName: 'new first name', lastName: 'last name'})

module.exports = updateUser

