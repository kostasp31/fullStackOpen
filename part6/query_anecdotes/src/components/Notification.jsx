const Notification = ({notif}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notif) {
    return (
      <div style={style}>
        {notif}
      </div>
    )
  }
}

export default Notification
