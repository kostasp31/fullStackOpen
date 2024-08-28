const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'CHANGE':
      return action.payload

    default: return state
  }
}

export const changeFilter = newFilter => {
  return {
    type: 'CHANGE',
    payload: newFilter
  }
}
  
export default filterReducer