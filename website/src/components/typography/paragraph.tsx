import styles from './paragraph.module.scss'
import { ReactNode } from 'react'

type Size = 'overline-small' | 'overline-large' | 'xsmall' | 'small' | 'medium' | 'large'
type Weight = 'regular-weight' | 'medium-weight' | 'semibold-weight'
type Transform = 'underline' | 'strikethrough' | 'italics'

type ParagraphTypes = {
	className?: string
	size: Size
	weight: Weight
	transform?: Transform
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
