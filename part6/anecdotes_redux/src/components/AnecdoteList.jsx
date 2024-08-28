import { useSelector, useDispatch } from 'react-redux'
import { likeAn, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const Anecdote = ({anecdote, vote}) => { 
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    // console.log(state.anecdotes)
    const filtered = state.anecdotes.filter(ane => ane.content.includes(state.filter))
    return filtered
  })

  const vote = (id, content, votes) => {
    // console.log('vote', id)

    dispatch(setNotification(`You voted ${content}!`, 5))

    dispatch(likeAn(id, content, votes))
  }

  dispatch(sortAnecdotes())

  return (
    anecdotes.map(anecdote => <Anecdote anecdote={anecdote} key={anecdote.id} vote={vote} />)
  )
}

export default AnecdoteList