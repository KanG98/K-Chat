function getTime(date){
  let hours = date.getHours(),
  minutes = date.getMinutes(),
  seconds = date.getSeconds();
  return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
}