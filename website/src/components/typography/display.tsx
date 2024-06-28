import styles from './display.module.scss'
import { ReactNode } from 'react'

interface DisplayTypes {
	className?: string
	weight: 'medium' | 'semibold' | 'bold' | 'extrabold'
	size: 'small' | 'large'
	children?: ReactNode
	style?: any
}

export const Display = ({ className, weight, size, children, style }: DisplayTypes) => (
	<p className={`${styles[weight]} ${styles[size]}${className ? ` ${className}` : ''}`} style={style}>
		{children}
	</p>
)
