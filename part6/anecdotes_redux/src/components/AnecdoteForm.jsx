import { useDispatch } from 'react-redux'
import { createAn } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    // get the value from the uncontrolled form
    const content = event.target.anecdote.value
    // make the input field blank 
    event.target.anecdote.value = ''

    dispatch(setNotification(`You added: ${content}`, 5))

    dispatch(createAn(content))
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm