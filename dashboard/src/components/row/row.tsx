import styles from './row.module.scss'
import { ReactNode } from 'react'

type RowTypes = {
	children: ReactNode
	className?: string
	gap?: number
	isBetween?: boolean
	isReverse?: boolean
	style?: any
}

const Row = ({ children, gap, isReverse = false, isBetween = false, className, style }: RowTypes) => (
	<div
		className={`${styles.row}${isReverse ? ` ${styles.reverse}` : ''}${isBetween ? ` ${styles.between}` : ''}${
			className ? ` ${className}` : ''
		}`}
		style={{ gap: `${gap}px`, ...style }}
	>
		{children}
	</div>
)

export default Row
