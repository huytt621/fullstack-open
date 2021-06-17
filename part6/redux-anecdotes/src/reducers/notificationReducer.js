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

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch(changeMessage(content))
    await setTimeout(() => dispatch(clearMessage()), duration * 1000)
  }
}


export default reducer