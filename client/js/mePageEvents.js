function dropdownEvent(){
  document.getElementsByClassName('dropdown-content')[0].classList.toggle("show")
}

function createRoom(){
  // const userId = window.location.href.split('/')[window.location.href.split('/').length-1]
  // window.location.href = `http://localhost:3030/room/create/${userId}`
  document.getElementsByClassName("create-room-form")[0].style.display = 'block';
  document.getElementsByClassName("add-sign")[0].style.display = 'none';
}

function cancelCreateRoom(){
  document.getElementsByClassName("create-room-form")[0].style.display = 'none';
  document.getElementsByClassName("add-sign")[0].style.display = '';
}

window.onclick = function(event) {
  if (!event.target.matches('.user-firstname')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

