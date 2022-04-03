// get messages in the room
async function getMessage(request){
  const Messages = require('../messages')
  return  await Messages.findAll({where: request})
              .then(r => {return r})
              .catch(err => console.log(err))
}

module.exports = getMessage