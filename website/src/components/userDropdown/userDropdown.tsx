import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useWindowDimensions } from '@/hooks/useWindowDimensions.ts'
import styles from './userDropdown.module.scss'
import { setUser } from '@/utils/slices/userSlice'
import { useAppDispatch, useAppSelector } from '@/utils/store'
import wretch from 'wretch'

export default function UserDropdown() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user.data)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const select = useRef<HTMLButtonElement | null>(null)
	const { pathname: url } = useLocation()
	const { width } = useWindowDimensions()

	const dropdownHandlerClick = useCallback(
		async (event: any) => {
			if (event.target.value === 'logout') {
				await wretch('/api/oauth/logout').get().res();
				dispatch(setUser(null));
				navigate('/');
			} else {
				navigate(event.target.value);
			}
		},
		[dispatch, navigate]
	)

	const memoizedOnClick = useCallback(dropdownHandlerClick, [dropdownHandlerClick])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node
			if (select.current && !select.current.contains(target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const options = useMemo(
		() => [
			{
				id: 'calendar',
				name: 'Calendar',
				value: '/app/calendar',
				showOnDesktop: false,
			},
			{
				id: 'trainers',
				name: 'Trainers',
				value: '/app/trainers',
				showOnDesktop: false,
			},
			{
				id: 'billing',
				name: 'Billing',
				value: '/app/billing',
				showOnDesktop: false,
			},
			{
				id: 'settings',
				name: 'Settings',
				value: '/app/settings',
				showOnDesktop: false,
			},
			{
				id: 'logout',
				name: 'Logout',
				value: 'logout',
				showOnDesktop: true,
			},
		],
		[]
	)

	return (
		<div className={styles.selectWrapper}>
			<div className={styles.selectContainer}>
				<button
					className={`${styles.selectContent}${isOpen ? ` ${styles.selectContentFocus}` : ''}`}
					onClick={() => setIsOpen(isOpen => !isOpen)}
					ref={select}
				>
					<img src={user?.profile_picture_url} className={styles.selectImage} alt={''} />
					<span className="sr-only">Profile</span>
				</button>

				<div className={isOpen ? styles.selectOptionsActive : styles.selectOptions}>
					{options.map(
						({ id, name, value, showOnDesktop = true }) =>
							[showOnDesktop && width > 530, width <= 530].some(x => x) && (
								<label
									key={id}
									className={`${styles.selectOption}${url === value ? ` ${styles.selectOptionActive}` : ''}${
										url.split('/')[2]
											? url.split('/')[2] === value.split('/')[2]
												? ` ${styles.selectOptionActive}`
												: ''
											: ''
									}`}
									htmlFor={id}
									onClick={() => setIsOpen(false)}
								>
									{name}
									<input type={'radio'} className={styles.selectContentRadio} id={id} name={name} value={value} onClick={memoizedOnClick} />
								</label>
							),
					)}
				</div>
			</div>
		</div>
	)
}
