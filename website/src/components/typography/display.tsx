import styles from './display.module.scss'
import { ReactNode } from 'react'

type Weight = 'medium' | 'semibold' | 'bold' | 'extrabold'
type Size = 'small' | 'large'

type DisplayTypes = {
	className?: string
	weight: Weight
	size: Size
	children?: ReactNode
	style?: any
}

export const Display = ({ className, weight, size, children, style }: DisplayTypes) => (
	<p className={`${styles[weight]} ${styles[size]}${className ? ` ${className}` : ''}`} style={style}>
		{children}
	</p>
)
