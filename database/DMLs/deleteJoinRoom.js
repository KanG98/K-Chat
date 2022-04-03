function deleteJoinRoom(record){
  const JoinRoom = require("../joinRoom")
  JoinRoom.destroy({where:record})
    .then((user) => {
      console.log(`join record ${record} deleted successful`)
    })
    .catch((err) => {
      console.log(err) // handle duplicate key error here // userid
    });
}

module.exports = deleteJoinRoom
