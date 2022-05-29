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
      // handle error
      console.log(error);
    })
}

function mapRoomList(userId, rooms, className){
  const myRoomListElm = document.getElementsByClassName(className)[0]
  rooms.map((room) => {
    const li = document.createElement('div')
    li.className = "room-li"
    li.appendChild(document.createTextNode(room['roomId'])) 
    myRoomListElm.appendChild(li)

    li.addEventListener('click', (e) => {
      // chat can only be entered when session.userId exists or not expired
      document.location.href = `http://localhost:3030/chat/${userId}/${room['roomId']}`
    })
  }) 
}
