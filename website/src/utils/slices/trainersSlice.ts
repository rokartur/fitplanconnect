import { createSlice } from '@reduxjs/toolkit'

export interface TrainersTypes {
	data: {
		id: string
		name: string
		username: string
		email: string
		profile_picture_url: string
	}[] | null
}

const initialState: TrainersTypes = {
	data: null,
}

export const trainersSlice = createSlice({
	name: 'trainers',
	initialState,
	reducers: {
		setTrainers: (state, action) => {
			state.data = action.payload
		},
	},
})

export const { setTrainers } = trainersSlice.actions

export default trainersSlice.reducer
