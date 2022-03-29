function getFormatSenderName(){
    const url = new URL(location.href)
    const pathes = url.pathname.split('/')
    var userId = pathes[1]
    var roomId = pathes[2]
    return {userId: userId, roomId: roomId}
}


