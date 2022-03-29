function formatMessage(senderId, text){
  return (
    {
      senderId: senderId,
      text: text,
      time: new Date()
    }
  )
}

