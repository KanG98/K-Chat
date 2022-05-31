function dropdownEvent(){
  document.getElementsByClassName('dropdown-content')[0].classList.toggle("show")
}

function createRoom(){
  document.getElementsByClassName("create-room-form")[0].style.display = 'block';
  document.getElementsByClassName("add-sign")[0].style.display = 'none';
}

function cancelCreateRoom(){
  document.getElementsByClassName("create-room-form")[0].style.display = 'none';
  document.getElementsByClassName("add-sign")[0].style.display = '';
}

function searchRoom(){
  document.getElementsByClassName("search-room-form")[0].style.display = 'block';
  document.getElementsByClassName("add-sign")[1].style.display = 'none';

}

function cancelSearchRoom(){
  document.getElementsByClassName("search-room-form")[0].style.display = 'none';
  document.getElementsByClassName("add-sign")[1].style.display = '';
  document.getElementsByClassName("other-room-list")[0].style.display = 'block';
  document.getElementsByClassName("search-room-list")[0].style.display = 'none';
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

