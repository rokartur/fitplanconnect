import styles from './tooltip.module.scss'
import { FC, ReactNode } from 'react'

interface TooltipProps {
	title: string
	children: ReactNode
	place?: 'bottom' | 'left'
}

export const Tooltip: FC<TooltipProps> = ({ title, children, place = 'bottom' }) => (
	<div className={styles.tooltipWrapper}>
		{children}

		{place === 'bottom' && title && <p className={styles.tooltipContent}>{title}</p>}
		{place === 'left' && title && <p className={styles.tooltipContentLeft}>{title}</p>}
	</div>
)
