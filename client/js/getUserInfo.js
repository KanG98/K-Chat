function getUserInfoById(userId){
  fetch(`/user/getById/${userId}`)
    .then(res => res.json())
    .then(res => {
      mapUserInfo(res)
    })
    .catch(function (error) {
      console.log(error);
    })
}

function mapUserInfo(user){
  document.title = `K-Chat | ${user['firstName']}`
  const firstNameElm = document.getElementsByClassName('user-firstname')[0]
  const lastNameElm = document.getElementsByClassName('user-lastname')[0]
  const emailElm = document.getElementsByClassName('user-email')[0]
  const nickNameElm = document.getElementsByClassName('user-nickname')[0]
  const regisTimeElm = document.getElementsByClassName('user-registime')[0]

  firstNameElm.textContent = user['firstName']
  lastNameElm.textContent = user['lastName']
  emailElm.textContent = user['email']
  nickNameElm.textContent = user['nickname']
  // regisTimeElm.textContent = user['regisTime']
}