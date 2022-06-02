const getRoom = require('./getRoom')
function generateRoomId(){
  // generate 4 digit [0-9A-Z]
  // current: generate 4 digit [0-9]
  var result = '';
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const characters = '0123456789'
  var charactersLength = characters.length;
  for ( var i = 0; i < 4; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

async function insertRoom(newRoom){
  const Rooms = require("../rooms")
  const randomRoomId = generateRoomId()

  const existingRoom = await getRoom(randomRoomId)
  while(existingRoom != null){
    //handle duplicate room id
    randomRoomId = generateRoomId()
    existingRoom = await getRoom(randomRoomId)
  }

  newRoom['roomId'] = randomRoomId

  Rooms.create(newRoom)
    .then((room) => {
      console.log(`new room record ${newRoom.roomId} created successful`)
    })
    .catch((err) => {
      console.log(err)
    });
}

module.exports = insertRoom
