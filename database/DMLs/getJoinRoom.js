async function getJoinRoom(request){
  const JoinRoom = require('../joinRoom')
  return  await JoinRoom.findAll({where: request})
              .then(r => {return r})
              .catch(err => console.log(err))
}

module.exports = getJoinRoom