function formatMessage(senderNickname, text){
  return (
    {
      senderNickname: senderNickname,
      text: text,
      time: new Date()
    }
  )
}

