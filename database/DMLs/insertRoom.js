const uuid = require('uuid')

function insertRoom(newRoom){
  const Rooms = require("../rooms")
  newRoom['roomId'] = uuid.v4() // can be done in module
  Rooms.create(newRoom)
    .then((room) => {
      console.log(`new room record ${newRoom.roomId} created successful`)
    })
    .catch((err) => {
      console.log(err) // handle duplicate key error here // userid
    });
}

module.exports = insertRoom
