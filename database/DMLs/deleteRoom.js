function deleteRoom(room){
  const Room = require("../rooms")
  Room.destroy({where:room})
    .then((room) => {
      console.log(`room ${room.roomId} deleted successful`)
    })
    .catch((err) => {
      console.log(err)
    });
  const Messages = require('../messages')
  Messages.destroy({where: {roomId: room.roomId}})
    .then((message) => {message, "deleted successful"})
    .catch(err => {console.log(err)})
}

module.exports = deleteRoom
