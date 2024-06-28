import styles from './container.module.scss'
import { FC, ReactNode } from 'react'

interface ContainerProps {
	children: ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => <div className={styles.container}>{children}</div>
