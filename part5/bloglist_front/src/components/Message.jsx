const Message = ({msg, usr}) => {
  if (!usr) {
    if (msg) {
      return (
        <>
        <p className='msg' style={{color: 'red'}} >{msg}</p>
        </>
      )
    }
  }
  else {
    if (msg) {
      return (
        <>
        <p className='msg' style={{color: 'green'}} >{msg}</p>
        </>
      )
    }    
  }
}

export default Message