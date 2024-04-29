import styles from './column.module.scss'
import { ReactNode } from 'react'

type ColumnTypes = {
	children: ReactNode
	gap?: number
	isReverse?: boolean
	className?: string
	style?: any
}

const Column = ({ children, gap, isReverse = false, className, style }: ColumnTypes) => (
	<div
		className={`${styles.column}${isReverse ? ` ${styles.reverse}` : ''}${className ? ` ${className}` : ''}`}
		style={{ gap: `${gap}px`, ...style }}
	>
		{children}
	</div>
)

export default Column
