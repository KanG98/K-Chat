function getHostRoom(userId, hasButton){
  fetch(`http://localhost:3030/room/byHostId/${userId}`)
    .then(res => res.json())
    .then(res => {
      mapRoomList(userId, res, "my-room-list", hasButton) 
    })
    .catch(function (error) {
      console.log(error);
    })
}

function getOtherRoom(userId, hasButton){
  fetch(`http://localhost:3030/joinRoom/get/byUserId/${userId}`)
    .then(res => res.json())
    .then(res => {
      mapRoomList(userId, res, "other-room-list", hasButton)
    })
    .catch(function (error) {
      console.log(error);
    })
}

function submitSearchRoom(){
  document.getElementsByClassName("search-room-list")[0].style.display = 'block';
  document.getElementsByClassName("other-room-list")[0].style.display = 'none';

  const roomId = document.getElementById("search-room-name-input").value
  fetch(`/room/byRoomId/${roomId}`)
    .then(res => res.json())
    .then(res => {
      const mySearchRoomListElm = document.getElementsByClassName('search-room-list')[0]
      // clear previous search
      while(mySearchRoomListElm.firstChild){
        mySearchRoomListElm.removeChild(mySearchRoomListElm.firstChild)
      }

      res.map((room) => {
        const liDiv = document.createElement('div')
        liDiv.className = "room-li-container"
        const li = document.createElement('div')
        li.className = "room-li"
        const roomName =  room['roomName']
        li.appendChild(document.createTextNode(roomName)) 
        li.appendChild(document.createElement('span')) 
        li.appendChild(document.createTextNode(room['roomId']))
    
        const joinLi = document.createElement('div')
        joinLi.className = `join-room-btn_${room['roomId']}`
        // joinLi.appendChild(document.createTextNode('join'))
    
        liDiv.appendChild(li)
        liDiv.appendChild(joinLi)
        mySearchRoomListElm.appendChild(liDiv)
    
        joinLi.addEventListener('click', (e) => {
          const userId = window.location.href.split('/')[window.location.href.split('/').length-1]
          const roomId = e.target.className.split('_')[1]
          fetch('/joinRoom/join',
            {
              method: 'POST',
              headers: { 'Content-Type' : 'application/json'},
              body: JSON.stringify(
                {
                  userId: userId,
                  roomId: roomId
                }
              )
            }
          )
          .then(document.location.reload())
          .catch(e => console.log(e))

        })

      }) 
    }

    )

}

function mapRoomList(userId, rooms, className, hasButton){
  // for entering the chat room only
  const myRoomListElm = document.getElementsByClassName(className)[0]
  rooms.map((room) => {
    const liDiv = document.createElement('div')
    liDiv.className = "room-li-container"
    const li = document.createElement('div')
    li.className = "room-li"
    const roomName = className == 'my-room-list' ? room['roomName'] : room['room']['roomName']
    li.appendChild(document.createTextNode(roomName)) 
    const roomIdSpan = document.createElement('span')
    roomIdSpan.textContent = "Room ID: " + room['roomId']
    li.appendChild(roomIdSpan)
    // li.appendChild(document.createElement('span')) 
    // li.appendChild(document.createTextNode(room['roomId']))

    console.log(li)

    const deleteLi = document.createElement('div')
    if (hasButton) {
      deleteLi.className = `delete-room-btn_${room['roomId']}`
      // const deleteTextNode = className == "my-room-list" ? "delete" : 'quit'
      // deleteLi.appendChild(document.createTextNode(deleteTextNode))
    }

    liDiv.appendChild(li)
    liDiv.appendChild(deleteLi)
    myRoomListElm.appendChild(liDiv)

    li.addEventListener('click', (e) => {
      // chat can only be entered when session.userId exists or not expired
      document.location.href = `http://localhost:3030/chat/${userId}/${room['roomId']}`
    })

        
    if(hasButton && className == 'my-room-list'){
      deleteLi.addEventListener('click', (e) => {
        const roomId = e.target.className.split('_')[1]
        fetch(`/room/delete/${roomId}`, { method: 'DELETE' }).then(() => {document.location.reload()})
      })
    }else if (hasButton && className == 'other-room-list'){
      deleteLi.addEventListener('click', (e) => {
        const roomId = e.target.className.split('_')[1]
        fetch(`/joinRoom/delete/${userId}/${roomId}`, { method: 'DELETE' }).then(() => {document.location.reload()})
      })
    }
  }) 
}
