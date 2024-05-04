import { Label } from '../typography/label.tsx'
import styles from './button.module.scss'

type ButtonTypes = {
	label?: string
	size?: 'small' | 'medium' | 'large'
	type?: 'primary' | 'secondary' | 'tertiary' | 'outlined' | 'link'
	iconLeft?: JSX.Element
	iconRight?: JSX.Element
	isDisabled?: boolean
	isDestructive?: boolean
	onClick?: () => void
	style?: any
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
	return (
		<button
			className={`${styles.button} ${styles[type]} ${isDestructive ? styles.isDestructive : styles.isNotDestructive} ${
				styles[size]
			}`}
			disabled={isDisabled}
			onClick={onClick}
			style={style}
		>
			{iconLeft ? <span className={styles.buttonIcon}>{iconLeft}</span> : null}
			<Label size={size} weight={'medium-weight'} children={label}></Label>
			{iconRight ? <span className={styles.buttonIcon}>{iconRight}</span> : null}
		</button>
	)
}
