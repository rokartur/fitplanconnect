import styles from './label.module.scss'
import { ReactNode } from 'react'

interface LabelTypes {
	className?: string
	size: 'overline-small' | 'overline-large' | 'xsmall' | 'small' | 'medium' | 'large'
	weight: 'regular-weight' | 'medium-weight' | 'semibold-weight'
	transform?: 'underline' | 'strikethrough' | 'italics'
	children?: ReactNode
	style?: any
}

export const Label = ({ className, size, weight, transform, children, style }: LabelTypes) => (
	<p
		className={`${styles[size]} ${styles[weight]}${transform ? ` ${styles[transform]}` : ''}${
			className ? ` ${className}` : ''
		}`}
		style={style}
	>
		{children}
	</p>
)
