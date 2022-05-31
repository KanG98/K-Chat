async function getRoom(roomId){
  const Rooms = require("../rooms")
  const res = await Rooms.findAll({ where: { roomId: roomId }})
  const resRooms = res.map( (room) => room['dataValues'])
  return res.length == 0 ? null : resRooms
}

module.exports = getRoom
