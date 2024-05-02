import styles from './headerLink.module.scss'
import { FC } from 'react'
import { Link } from 'react-router-dom'

type HeaderLinkTypes = {
	label: string
	href: string
	icon: JSX.Element
}

export const HeaderLink: FC<HeaderLinkTypes> = ({ label, href, icon }) => (
	<Link className={styles.headerLink} to={href}>
		{icon}
		{label}
	</Link>
)
