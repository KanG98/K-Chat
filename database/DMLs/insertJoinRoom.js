function insertJoinRoom(newJoinRecord){
  const JoinRoom = require("../joinRoom")
  JoinRoom.create({
    userId: newJoinRecord.userId,
    roomId: newJoinRecord.roomId
  })
    .then((user) => {
      console.log(`new join record ${newJoinRecord.userId} created successful`)
    })
    .catch((err) => {
      console.log(err) // handle duplicate key error here // userid
    });
}

module.exports = insertJoinRoom
