import { Link } from 'react-router-dom'
import styles from './primaryButton.module.scss'

interface PrimaryButtonTypes {
	asLink?: boolean
	asButton?: boolean
	href?: string
	inNewCard?: boolean
	onClick?: (event: any) => void
	label?: string
	icon?: JSX.Element
	isReverse?: boolean
	style?: any
	disabled?: boolean
}

export const PrimaryButton = ({
	asLink = false,
	asButton = false,
	href = '',
	inNewCard = false,
	onClick,
	label = '',
	icon,
	isReverse,
	style,
	disabled,
}: PrimaryButtonTypes) => {
	return (
		<>
			{asLink && (
				<Link
					className={styles.primaryButton}
					to={href}
					target={inNewCard ? '_blank' : '_self'}
					onClick={onClick}
					style={isReverse ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' } || style}
				>
					{icon && icon}
					{label}
				</Link>
			)}
			{asButton && (
				<button
					className={styles.primaryButton}
					onClick={onClick}
					disabled={disabled}
					style={isReverse ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' } || style}
				>
					{icon && icon}
					{label}
				</button>
			)}
		</>
	)
}
