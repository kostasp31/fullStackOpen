const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'LIKE':
      const id = action.payload.id
      const anecdoteToLike = state.find(n => n.id === id)
      const likedAnecdote = { 
        ...anecdoteToLike, 
        votes: anecdoteToLike.votes+1
      }
      return state.map(an =>
        an.id !== id ? an : likedAnecdote 
      )

    case 'CREATE_ANECDOTE':
      return [...state, action.payload]

    case 'SORT':
      const sorted = state.sort((a,b) => b.votes - a.votes)
      return sorted

    default: return state
    }
  }
  
export const likeAnecdote = (id) => {
  return {
    type: 'LIKE',
    payload: {
      id
    }
  }
}

export const createAnecdote = (content) => {
  const newA = asObject(content)

  return {
    type: 'CREATE_ANECDOTE',
    payload: {
      content: newA.content,
      id: newA.id,
      votes: newA.votes 
    }
  }
}

export const sortAnecdotes = () => {
  return {
    type: 'SORT'
  }
}

export default reducer