const socket = io();

//html tags
const messageContainer =document.querySelector('.message-container')
const chatForm = document.querySelector('.chat-message-form')
const chatInput = document.querySelector('.chat-input')

//socket waiting for 'message' emitts
socket.on('message', message => {
  // add message to message form
  const newMessageBox = document.createElement("p")
  const newMessage = document.createTextNode(message)
  newMessageBox.appendChild(newMessage)
  //append newMessageBox to messageContainer
  messageContainer.append(newMessageBox)
  //keep newsest messages at the bottom 
  messageContainer.scrollTop = messageContainer.scrollHeight
}); 

//chat form event listener

chatForm.addEventListener('submit', (e) => {
    //prevent page to refresh
    e.preventDefault() 

    // emit to other socket 

    const message = chatInput.value
    socket.emit('message', message)

    // reset chatinput

    chatInput.value = ""
    chatInput.focus()
})
