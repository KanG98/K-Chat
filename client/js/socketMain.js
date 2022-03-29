const socket = io();

//html tags
const messageContainer =document.querySelector('.message-container')
const chatForm = document.querySelector('.chat-message-form')
const chatInput = document.querySelector('.chat-input')

//socket waiting for 'message' emitts
socket.on('message', message => {
  if(message){
    // parse message
    const senderId = message.senderId
    const text = message.text
    const timestamp = message.time.substring(11,19)

    // add message to message form
    const newMessageBox = document.createElement("p")
    const newSenderInfo = document.createTextNode(`${senderId} ${timestamp}`)
    const newMessage = document.createTextNode(`${text}`)
    newMessageBox.appendChild(newSenderInfo)
    newMessageBox.appendChild(document.createElement("div"))
    newMessageBox.appendChild(newMessage)

    //append newMessageBox to messageContainer
    messageContainer.append(newMessageBox)

    //keep newsest messages at the bottom 
    messageContainer.scrollTop = messageContainer.scrollHeight
  }
}); 

//chat form event listener

chatForm.addEventListener('submit', (e) => {
  //prevent page to refresh
  e.preventDefault() 

  // emit to other socket 
  const senderInfo = getFormatSenderName() // need to be placed at the begining of this script run
                                            // also at the begining check the auth, if not loged in, log in
                                            // if disconnect, set db isLogged in to false

  const message = formatMessage(senderInfo.userId, chatInput.value)
  socket.emit('message', message)

  // reset chatinput
  chatInput.value = ""
  chatInput.focus()
})