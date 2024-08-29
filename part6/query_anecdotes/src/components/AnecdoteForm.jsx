import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = ({ dispatch, timeoutID }) => {

  const queryClient = useQueryClient()

  const newAnMut = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

      dispatch({
        type: 'SET',
        payload: `ADDED ${data.content}!!`
      })
      clearTimeout()
      setTimeout(() => {dispatch( {type: 'RESET'} )}, 5000)
    },
    onError: (error) => {
      dispatch({
        type: 'SET',
        payload: error.response.data.error
      })
      clearTimeout()
      setTimeout(() => {dispatch( {type: 'RESET'} )}, 5000)
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnMut.mutate({ content, votes: 0 })


  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
