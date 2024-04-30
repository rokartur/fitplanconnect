import { Link } from 'react-router-dom';
import styles from './headerLink.module.scss';


type HeaderLinkTypes = {
	label: string;
	href: string;
	icon: JSX.Element;
	inNewCard?: boolean;
}

export const HeaderLink = ({ label, href, icon, inNewCard = false }: HeaderLinkTypes) => {
	if (inNewCard) {
		return (
			<a className={styles.headerLink} href={href} target={'_blank'}>
				{icon}
				{label}
			</a>
		)
	} else {
		return (
			<Link className={styles.headerLink} to={href}>
				{icon}
				{label}
			</Link>
		)
	}
}
