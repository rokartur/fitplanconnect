import { createSlice } from '@reduxjs/toolkit'

export const exampleSlice = createSlice({
	name: 'user',
	initialState: {
		data: false,
	},
	reducers: {
		setUser: (state, action) => {
			state.data = action.payload
		},
	},
})

export const { setUser } = exampleSlice.actions

export default exampleSlice.reducer
