function getHostRoom(userId){
  fetch(`http://localhost:3030/room/${userId}`)
    .then(res => res.json())
    .then(res => {
      mapRoomList(res, "my-room-list") 
    })
    .catch(function (error) {
      console.log(error);
    })
}

function getOtherRoom(userId){
  fetch(`http://localhost:3030/joinRoom/get/byUserId/${userId}`)
    .then(res => res.json())
    .then(res => {
      mapRoomList(res, "other-room-list")
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

function mapRoomList(rooms, className){
  const myRoomListElm = document.getElementsByClassName(className)[0]
  rooms.map((room) => {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(room['roomId'])) 
    myRoomListElm.appendChild(li)
  }) 
}
