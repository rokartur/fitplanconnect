import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import trainers from '@/utils/slices/trainersSlice.ts'
import user from '@/utils/slices/userSlice.ts'

export const store = configureStore({
	reducer: {
		user: user,
		trainers: trainers,
	},
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
