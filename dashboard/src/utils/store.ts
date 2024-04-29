import { configureStore } from '@reduxjs/toolkit'
import exampleSlice from './slices/exampleSlice.ts'

export const store = configureStore({
	reducer: {
		example: exampleSlice,
	},
})
