const loginForm = document.querySelector('.login-form')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const userId = 'sampleId'
    const roomId = 'sampleRoomId'
    redirectToChatRoom(userId, roomId);
})

function redirectToChatRoom (userId, roomId) {
    location.href = `kchat/${userId}/${roomId}`
}