function formatMessage(senderId, senderNickname, text){
  return (
    {
      senderId: senderId,
      senderNickname: senderNickname,
      text: text,
      time: new Date()
    }
  )
}

