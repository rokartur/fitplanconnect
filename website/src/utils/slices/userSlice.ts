import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	data: {
		username: null,
		email: null,
		profile_picture_url: null,
		selected_trainer_id: null,
		subscription_expiration_date: null,
	}
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.data = action.payload
		},
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
