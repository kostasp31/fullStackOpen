import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, vote}) => { 
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
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

  const vote = (id) => {
    console.log('vote', id)
    dispatch(likeAnecdote(id))
  }

  dispatch(sortAnecdotes())

  return (
    anecdotes.map(anecdote => <Anecdote anecdote={anecdote} key={anecdote.id} vote={vote} />)
  )
}

export default AnecdoteList