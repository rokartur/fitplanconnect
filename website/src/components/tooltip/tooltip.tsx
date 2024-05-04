import styles from './tooltip.module.scss';
import { FC, ReactNode } from 'react'

type TooltipProps = {
	title: string
	children: ReactNode
	place?: 'bottom' | 'left'
}

export const Tooltip: FC<TooltipProps> = ({ title, children, place = 'bottom' }) => (
	<div className={styles.tooltipWrapper}>
		{children}

		{place === 'bottom' && <p className={styles.tooltipContent}>{title}</p>}
		{place === 'left' && <p className={styles.tooltipContentLeft}>{title}</p>}
	</div>
)
