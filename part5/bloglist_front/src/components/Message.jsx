import PropTypes from 'prop-types'

const Message = ({ msg, usr }) => {
  Message.propTypes = {
    usr: PropTypes.object
  }

  if (!usr) {
    if (msg) {
      return (
        <>
          <p className='msg' style={{ color: 'red' }} >{msg}</p>
        </>
      )
    }
  }
  else {
    if (msg) {
      return (
        <>
          <p className='msg' style={{ color: 'green' }} >{msg}</p>
        </>
      )
    }
  }
}

export default Message