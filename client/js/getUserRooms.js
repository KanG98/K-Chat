function getHostRoom(userId){
  fetch(`http://localhost:3030/room/${userId}`)
    .then(res => res.json())
    .then(res => {
      mapRoomList(userId, res, "my-room-list") 
    })
    .catch(function (error) {
      console.log(error);
    })
}

function getOtherRoom(userId){
  fetch(`http://localhost:3030/joinRoom/get/byUserId/${userId}`)
    .then(res => res.json())
    .then(res => {
      mapRoomList(userId, res, "other-room-list")
    })
    .catch(function (error) {
      console.log(error);
    })
}

function mapRoomList(userId, rooms, className){
  const myRoomListElm = document.getElementsByClassName(className)[0]
  // rooms first item is the user info
  rooms.map((room) => {
    const liDiv = document.createElement('div')
    liDiv.className = "room-li-container"
    const li = document.createElement('div')
    li.className = "room-li"
    const roomName = className == 'my-room-list' ? room['roomName'] : room['room']['roomName']
    li.appendChild(document.createTextNode(roomName)) 
    li.appendChild(document.createElement('br')) 
    li.appendChild(document.createTextNode(room['roomId']))

    const deleteLi = document.createElement('div')
    deleteLi.className = `delete-room-btn_${room['roomId']}`
    deleteLi.appendChild(document.createTextNode('delete'))

    liDiv.appendChild(li)
    liDiv.appendChild(deleteLi)
    myRoomListElm.appendChild(liDiv)

    li.addEventListener('click', (e) => {
      // chat can only be entered when session.userId exists or not expired
      document.location.href = `http://localhost:3030/chat/${userId}/${room['roomId']}`
    })

        
    if(className == 'my-room-list'){
      deleteLi.addEventListener('click', (e) => {
        const roomId = e.target.className.split('_')[1]
        fetch(`/room/delete/${roomId}`, { method: 'DELETE' }).then(() => {document.location.reload()})
      })
    }else if (className == 'other-room-list'){
      deleteLi.addEventListener('click', (e) => {
        const roomId = e.target.className.split('_')[1]
        fetch(`/joinRoom/delete/${userId}/${roomId}`, { method: 'DELETE' }).then(() => {document.location.reload()})
      })
    }
  }) 
}
