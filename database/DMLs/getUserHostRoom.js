async function getUserHostRoom(userId){
  const Rooms = require("../rooms")
  const res = await Rooms.findAll({ where: { hostUserId: userId }})
  const resRooms = res.map( (room) => room['dataValues'])
  return res.length == 0 ? null : resRooms
}

module.exports = getUserHostRoom
