import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    likeAnecdote(state, action) {
      const id = action.payload
      // console.log(current(state))
      const anecdoteToLike = state.find(n => n.id === id)

      const likedAnecdote = {
        ...anecdoteToLike,
        votes: anecdoteToLike.votes + 1
      }
      return state.map(an =>
        an.id !== id ? an : likedAnecdote
      )
    },
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    sortAnecdotes(state, action) {
      const sorted = state.sort((a, b) => b.votes - a.votes)
      return sorted
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { likeAnecdote, createAnecdote, sortAnecdotes, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAn = (content) => {
  return async dispatch => {
    const _newAnecdote = await anecdoteService.newAnecdote(content)
    dispatch(appendAnecdote(_newAnecdote))
  }
}

export const likeAn = (id, content, votes) => {
  return async dispatch => {
    const editedAnecdote = await anecdoteService.postVotes(id, content, votes+1)
    dispatch(likeAnecdote(editedAnecdote.id))
  }
}