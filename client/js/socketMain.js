const socket = io();

//html tags
const messageContainer =document.querySelector('.message-container')
const chatForm = document.querySelector('.chat-message-form')
const chatInput = document.querySelector('.chat-input')

function getFormatSenderName(){
  const url = new URL(location.href)
  const pathes = url.pathname.split('/')
  var userId = pathes[2]
  var roomId = pathes[3]
  return {userId: userId, roomId: roomId}
}

function renderMessage(message){
      // console.log(message)
      // parse message
      const senderNickname = message.senderNickname
      const text = message.text
      // const timestamp = message.time.substring(11,19)
      const timestamp = new Date(message.time).toString().substring(4,24)
  
  
      // add message to message form
      const newMessageBox = document.createElement("div")
      const newSenderInfoContainer = document.createElement("p")
      const newSenderInfo = document.createTextNode(`${senderNickname} ${timestamp}`)
      const newMessageContainer = document.createElement("p")
      const newMessage = document.createTextNode(`${text}`)
  
      newSenderInfoContainer.appendChild(newSenderInfo)
      newMessageContainer.appendChild(newMessage)
      
      newMessageBox.appendChild(newSenderInfoContainer)
      newMessageBox.appendChild(document.createElement("div"))
      newMessageBox.appendChild(newMessageContainer)
  
      newMessageBox.className = 'message-field'
      newSenderInfoContainer.className = 'message-field-sender'
      newMessageContainer.className = 'message-field-message'
  
      //append newMessageBox to messageContainer
      messageContainer.append(newMessageBox)
  
      //keep newsest messages at the bottom 
      messageContainer.scrollTop = messageContainer.scrollHeight
  
      // change message box css if the message is sent by the user
      if(senderInfo.userId === message.senderId){
        newSenderInfoContainer.style.textAlign = 'right'
        newSenderInfoContainer.style.width = '50%'
        newSenderInfoContainer.style.marginLeft = 'auto'
        newMessageContainer.style.width = '50%'
        newMessageContainer.style.marginLeft = 'auto'
        newMessageContainer.style.backgroundColor = '#f3f3f3'
        newMessageContainer.style.borderTopLeftRadius = '14px'
        newMessageContainer.style.borderTopRightRadius = '0'
      }
}

function renderChatHistory(){
  const roomId = getFormatSenderName()['roomId']
  const nicknameLookup = {}
  let messageList = []
  fetch(`/messages/get/${roomId}`)
    .then(res => res.json())
    .then(messages => {
      messages.sort((a,b) => {return new Date(a['sentTime']) - new Date(b['sentTime'])})
      messageList = [...messages]
      // get all user id, nickname map that appears in the messages
      const senderIdSet = new Set(messages.map( m => m['senderId'] ))
      const senderId = [...senderIdSet]
      senderId.map( id => {
                            fetch(`/user/getById/${id}`).then(res => res.json())
                              .then(res => nicknameLookup[id] = res.nickname)
                              .then(res => {
                                messageList.map((message) => {  
                                const messageForRender = {senderId: message['senderId'], 
                                                          time: message['sentTime'],
                                                          senderNickname: nicknameLookup[message['senderId']],
                                                          text: message['message']}
                                renderMessage(messageForRender)
                              })}).then(e => console.log(e))
      })})
    .catch(e => console.log(e))
}


renderChatHistory()

const senderInfo = getFormatSenderName()
// need to be placed at the begining of this script run
// also at the begining check the auth, if not loged in, log in
// if disconnect, set db isLogged in to false

//join socket room
socket.emit('join-room', senderInfo)

//socket waiting for 'message' emitts
socket.on('message', message => {
  if(message){
    renderMessage(message)
  }
}); 

//chat form event listener

chatForm.addEventListener('submit', (e) => {
  //prevent page to refresh
  e.preventDefault() 

  // emit to other socket 
  fetch(`/user/getById/${senderInfo.userId}`)
    .then(res => res.json())
    .then(res => {
      // call socket
      const message = formatMessage(senderInfo.userId, res.nickname, chatInput.value)
      socket.emit('message', message)
    })
    .then(res => {
      // store message to database
      return   fetch('/messages/insert',
       {method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({
            senderId: senderInfo.userId,
            roomId: senderInfo.roomId,
            message: chatInput.value
          })}).catch(e => console.log(e))})
    .then(
      res => {
        // clean chat input
        chatInput.value = ""
        chatInput.focus()
      }
    )
    .catch(e => console.log(e))
  })
  
