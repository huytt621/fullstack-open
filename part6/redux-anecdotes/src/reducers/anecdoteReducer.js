const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newState = state.map(a => a.id !== action.id ? a : {...a, votes: a.votes + 1})
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
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default reducer