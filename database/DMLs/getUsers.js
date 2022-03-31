async function getUsers(request){
  // request should be {userId: xxxx, email: xxx}
  const Users = require('../users')
  const res = await Users.findAll({where: request})
  return res.length == 0 ? null : res[0]['dataValues']
}

module.exports = getUsers