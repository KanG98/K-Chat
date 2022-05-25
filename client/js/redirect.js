const loginForm = document.querySelector('.login-form')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // check the username and password here

    // if correct, redirect to chatRoom page
    const userId = 'sampleId'
    const roomId = 'sampleRoomId'
    redirectToChatRoom(userId, roomId);
})

function redirectToChatRoom (userId, roomId) {
    location.href = `${userId}/${roomId}`
}