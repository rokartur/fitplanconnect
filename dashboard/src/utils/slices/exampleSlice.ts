import { createSlice } from '@reduxjs/toolkit'

export const exampleSlice = createSlice({
	name: 'example',
	initialState: {
		data: false,
	},

	reducers: {
		setData: (state, action) => {
			state.data = action.payload
		},
	},
})

export const { setData } = exampleSlice.actions

export default exampleSlice.reducer
