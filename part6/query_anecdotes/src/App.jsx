import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()

  const updAnMut = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const handleVote = (anecdote) => {
    updAnMut.mutate({...anecdote, votes: anecdote.votes+1 })
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

      <Notification />
      <AnecdoteForm />

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