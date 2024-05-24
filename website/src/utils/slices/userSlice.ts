import { createSlice } from '@reduxjs/toolkit'

export type UserTypes = {
	data: {
		id: string
		name: string
		username: string
		email: string
		profile_picture_url: string
		selected_trainer_id: string
		subscription_expiration_date: string
	} | null
}

const initialState: UserTypes = {
	data: null
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
