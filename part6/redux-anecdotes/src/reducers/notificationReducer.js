const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.message
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const changeMessage = message => {
  return {
    type: 'CHANGE',
    message
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR'
  }
}

export default reducer