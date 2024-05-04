import styles from './heading.module.scss'
import { ComponentChildren } from 'preact'

type Weight = 'medium' | 'semibold' | 'bold' | 'extrabold'

type HeadingTypes = {
	className?: string
	h: number
	weight: Weight
	children?: ComponentChildren
	style?: any
}

export const Heading = ({ className, h, weight, children, style }: HeadingTypes) => (
	<>
		{h === 1 ? (
			<h1 className={`${styles.one} ${styles[weight]}${className ? ` ${className}` : ''}`} style={style}>
				{children}
			</h1>
		) : null}

		{h === 2 ? (
			<h2 className={`${styles.two} ${styles[weight]}${className ? ` ${className}` : ''}`} style={style}>
				{children}
			</h2>
		) : null}

		{h === 3 ? (
			<h3 className={`${styles.three} ${styles[weight]}${className ? ` ${className}` : ''}`} style={style}>
				{children}
			</h3>
		) : null}

		{h === 4 ? (
			<h4 className={`${styles.four} ${styles[weight]}${className ? ` ${className}` : ''}`} style={style}>
				{children}
			</h4>
		) : null}

		{h === 5 ? (
			<h5 className={`${styles.five} ${styles[weight]}${className ? ` ${className}` : ''}`} style={style}>
				{children}
			</h5>
		) : null}

		{h === 6 ? (
			<h6 className={`${styles.six} ${styles[weight]}${className ? ` ${className}` : ''}`} style={style}>
				{children}
			</h6>
		) : null}
	</>
)
