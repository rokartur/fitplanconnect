import styles from './paragraph.module.scss'
import { ReactNode } from 'react'

interface ParagraphTypes {
	className?: string
	size: 'overline-small' | 'overline-large' | 'xsmall' | 'small' | 'medium' | 'large'
	weight: 'regular-weight' | 'medium-weight' | 'semibold-weight'
	transform?: 'underline' | 'strikethrough' | 'italics'
	children?: ReactNode
	style?: any
}

export const Paragraph = ({ className, size, weight, transform, children, style }: ParagraphTypes) => (
	<p
		className={`${styles[size]} ${styles[weight]}${transform ? ` ${styles[transform]}` : ''}${
			className ? ` ${className}` : ''
		}`}
		style={style}
	>
		{children}
	</p>
)
