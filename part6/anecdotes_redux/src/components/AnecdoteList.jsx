import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { changeNotif, removeNotfi } from '../reducers/notifReducer'

const Anecdote = ({anecdote, vote}) => { 
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    console.log(state.anecdotes)
    const filtered = state.anecdotes.filter(ane => ane.content.includes(state.filter))
    return filtered
  })

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(changeNotif(`You voted ${content}!`))

    clearTimeout()
    setTimeout(() => {dispatch(removeNotfi())}, 5000)

    dispatch(likeAnecdote(id))
  }

  dispatch(sortAnecdotes())

  return (
    anecdotes.map(anecdote => <Anecdote anecdote={anecdote} key={anecdote.id} vote={vote} />)
  )
}

export default AnecdoteList