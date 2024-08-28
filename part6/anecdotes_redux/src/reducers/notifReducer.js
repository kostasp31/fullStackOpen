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

export const { changeNotif, removeNotfi } = notSlice.actions
export default notSlice.reducer