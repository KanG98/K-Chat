function getHostRoom(userId){
  fetch(`http://localhost:3030/room/${userId}`)
    .then(function (response) {
      console.log(response.json());
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

function getOtherRoom(userId){
  fetch(`http://localhost:3030/joinRoom/get/byUserId/${userId}`)
    .then(function (response) {
      // handle success
      console.log(response.json());
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}
