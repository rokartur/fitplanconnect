import styles from './overlay.module.scss'
import { FC, ReactNode } from 'react'

type OverlayProps = {
	children: ReactNode
}

export const Overlay: FC<OverlayProps> = ({ children }) => <main className={styles.overlay}>{children}</main>
