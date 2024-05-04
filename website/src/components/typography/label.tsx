import styles from './label.module.scss'
import { ComponentChildren } from 'preact'

type Size = 'overline-small' | 'overline-large' | 'xsmall' | 'small' | 'medium' | 'large'
type Weight = 'regular-weight' | 'medium-weight' | 'semibold-weight'
type Transform = 'underline' | 'strikethrough' | 'italics'

type LabelTypes = {
	className?: string
	size: Size
	weight: Weight
	transform?: Transform
	children?: ComponentChildren
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
