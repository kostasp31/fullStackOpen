import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { useReducer } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return ''
    default:
      return state
  }
}


const App = () => {
  const [message, messageDispatch] = useReducer(notifReducer, '')
  
  const queryClient = useQueryClient()
  // let timeoutID = undefined

  const updAnMut = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updAnMut.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    messageDispatch({
      type: 'SET',
      payload: `VOTED FOR ${anecdote.content}!!`
    })
    clearTimeout()
    setTimeout(() => { messageDispatch({ type: 'RESET' }) }, 5000)
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (isPending) {
    return <div>loading data...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  // console.log(data)
  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notif={message} />
      <AnecdoteForm dispatch={messageDispatch} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App