import { CSSProperties, useCallback } from 'react'
import { Label } from '../typography/label.tsx'
import styles from './button.module.scss'

interface ButtonTypes {
	label?: string
	size?: 'small' | 'medium' | 'large'
	type?: 'primary' | 'secondary' | 'tertiary' | 'outlined' | 'link'
	iconLeft?: JSX.Element
	iconRight?: JSX.Element
	isDisabled?: boolean
	isDestructive?: boolean
	onClick?: () => void
	style?: CSSProperties
}

export const Button = ({
	label = 'Button CTA',
	size = 'large',
	type = 'primary',
	iconLeft,
	iconRight,
	isDisabled = false,
	isDestructive = false,
	onClick,
	style,
}: ButtonTypes) => {
	const handleClick = useCallback(() => {
		if (onClick) {
			onClick()
		}
	}, [onClick])

	return (
		<button
			className={`${styles.button} ${styles[type]} ${isDestructive ? styles.isDestructive : styles.isNotDestructive} ${styles[size]}`}
			disabled={isDisabled}
			onClick={handleClick}
			style={style}
		>
			{iconLeft && <span className={styles.buttonIcon}>{iconLeft}</span>}
			<Label size={size} weight="medium-weight">{label}</Label>
			{iconRight && <span className={styles.buttonIcon}>{iconRight}</span>}
		</button>
	)
}
