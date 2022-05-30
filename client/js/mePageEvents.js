function dropdownEvent(){
  document.getElementsByClassName('dropdown-content')[0].classList.toggle("show")
}

function createRoom(){
  console.log("create room")
  // generate field for info 
  // the form submit will ping backend create room api

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

