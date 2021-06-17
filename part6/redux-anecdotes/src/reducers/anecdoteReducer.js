import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newAnecdote = {...state.find(a => a.id === action.id)}
      newAnecdote.votes += 1
      anecdoteService.update(action.id, newAnecdote)
      const newState = state.map(a => a.id !== action.id ? a : newAnecdote)
      newState.sort(compareVotes)
      return newState
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

const compareVotes = (first, second) => second.votes - first.votes

export const addVote = id => {
  return {
    type: 'VOTE',
    id
  }
}

export const addAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer