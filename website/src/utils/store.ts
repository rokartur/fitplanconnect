import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import user from '@/utils/slices/userSlice.ts'

export const store = configureStore({
	reducer: {
		user: user,
	},
})

// const dispatch = useAppDispatch()
export const useAppDispatch: () => typeof store.dispatch = useDispatch
// const user = useAppSelector(state => state.user)
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
