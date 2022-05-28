async function getUserHostRoom(userId){
  const Rooms = require("../rooms")
  const res = await Rooms.findAll({ where: { hostUserId: userId }})
  return res.length == 0 ? null : res
}

module.exports = getUserHostRoom
