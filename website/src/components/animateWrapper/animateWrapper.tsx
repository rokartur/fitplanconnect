import styles from './animateWrapper.module.scss';
import { FC, ReactNode } from 'react'

interface AnimateWrapperProps {
	children: ReactNode
}

export const AnimateWrapper: FC<AnimateWrapperProps> = ({ children }) => <div className={styles.animateWrapper}>{children}</div>
