import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotif(state, action) {
      return action.payload
    },
    removeNotfi (state, action) {
      return ''
    }
  }
})

export const { changeNotif, removeNotfi, toggleNotification } = notSlice.actions
export default notSlice.reducer

export const setNotification = (text, sec) => {
  return async dispatch => {
    dispatch(changeNotif(text))
    clearTimeout()
    setTimeout(() => {dispatch(removeNotfi())}, sec*1000)
  }
}