async function getJoinRoom(request){
  const JoinRoom = require('../joinRoom')
  const res = await JoinRoom.findAll({ where: request})
  const resRooms = res.map( (room) => room['dataValues'])
  return res.length == 0 ? null : resRooms
}

module.exports = getJoinRoom