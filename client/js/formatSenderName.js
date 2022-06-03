function getFormatSenderName(){
    const url = new URL(location.href)
    const pathes = url.pathname.split('/')
    var userId = pathes[2]
    var roomId = pathes[3]
    return {userId: userId, roomId: roomId}
}


