import { FC, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useWindowDimensions } from '@/hooks/useWindowDimensions.ts'
import styles from './userDropdown.module.scss'

type UserDropdownTypes = {
	options: {
		id: string
		name: string
		value: string
		showOnDesktop?: boolean
	}[]
	image?: string
	onClick: (event: any) => void
}

export const UserDropdown: FC<UserDropdownTypes> = ({ options, image, onClick }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const select = useRef<HTMLButtonElement | null>(null)
	const { pathname: url } = useLocation()
	const { width } = useWindowDimensions()

	useEffect(() => {
		document.addEventListener('click', event => {
			const target = event.target as Node
			if (select.current) {
				if (!select.current.contains(target) || (target.contains(select.current) && target !== select.current)) {
					setIsOpen(false)
				} else {
					return select
				}
			}
		})
	}, [])

	return (
		<div className={styles.selectWrapper}>
			<div className={styles.selectContainer}>
				<button
					className={`${styles.selectContent}${isOpen ? ` ${styles.selectContentFocus}` : ''}`}
					onClick={() => setIsOpen(isOpen => !isOpen)}
					ref={select}
				>
					<img src={image} className={styles.selectImage} alt={''} />
				</button>

				<div className={isOpen ? styles.selectOptionsActive : styles.selectOptions}>
					{options.map(
						({ id, name, value, showOnDesktop = true }) =>
							[showOnDesktop && width > 850, width <= 850].some(x => x) && (
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

									<input
										type={'radio'}
										className={styles.selectContentRadio}
										id={id}
										name={name}
										value={value}
										onClick={onClick}
									/>
								</label>
							),
					)}
				</div>
			</div>
		</div>
	)
}
