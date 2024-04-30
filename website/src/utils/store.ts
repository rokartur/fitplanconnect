import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user.ts'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
	reducer: {
		user: user,
	},
})

// const dispatch = useAppDispatch()
export const useAppDispatch: () => typeof store.dispatch = useDispatch
// const user = useAppSelector(state => state.user)
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
