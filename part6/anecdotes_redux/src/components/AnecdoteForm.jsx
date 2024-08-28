import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotif, removeNotfi } from '../reducers/notifReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    // get the value from the uncontrolled form
    const content = event.target.anecdote.value
    // make the input field blank 
    event.target.anecdote.value = ''

    dispatch(changeNotif(`You added: ${content}`))
    clearTimeout()
    setTimeout(() => {dispatch(removeNotfi())}, 5000)

    dispatch(createAnecdote(content))
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