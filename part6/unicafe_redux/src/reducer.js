const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newState
  switch (action.type) {
    case 'GOOD':
      newState = Object.assign({}, state)
      newState.good = newState.good+1
      return newState
    case 'OK':
      newState = Object.assign({}, state)
      newState.ok = newState.ok+1
      return newState
    case 'BAD':
      newState = Object.assign({}, state)
      newState.bad = newState.bad+1
      return newState
      case 'ZERO':
      newState = Object.assign({}, state)
      newState.good = 0
      newState.ok = 0
      newState.bad = 0
      return newState
    default: return state
  }
  
}

export default counterReducer
