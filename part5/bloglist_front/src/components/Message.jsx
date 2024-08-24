import PropTypes from 'prop-types'

const Message = ({ msg, usr }) => {
  Message.propTypes = {
    msg: PropTypes.string.isRequired,
    usr: PropTypes.object.isRequired
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