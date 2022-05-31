async function getJoinRoom(request){
  console.log(request)
  const JoinRoom = require('../joinRoom')
  const Rooms = require('../rooms')

  Rooms.hasMany(JoinRoom, { foreignKey: 'roomId'})
  JoinRoom.belongsTo(Rooms, { foreignKey: 'roomId'})

  const res = await JoinRoom.findAll({ where: request, include: [{model: Rooms, required: true}]})
  const resRooms = res.map( (room) => {
    return {...room['dataValues'], room: room['room']['dataValues']}
  })
  return res.length == 0 ? null : resRooms
}

module.exports = getJoinRoom