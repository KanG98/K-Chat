const uuid = require('uuid')

function insertMessage(newMessage){
  const Messages = require("../messages")
  newMessage['messageId'] = uuid.v4()
  Messages.create(newMessage)
    .then((user) => {
      console.log(`new message record ${newMessage.senderId} created successful`)
    })
    .catch((err) => {
      console.log(err) // handle duplicate key error here // userid
    });
}

module.exports = insertMessage
