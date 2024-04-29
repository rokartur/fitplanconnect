import styles from '@/styles/notFound.module.scss'
import { Link } from 'react-router-dom'
import { useScrollToTop } from '@/hooks/useScrollToTop.ts'

const NotFound = () => {
	useScrollToTop()

	return (
		<main className={styles.container}>
			<h1 className={styles.code}>404</h1>
			<p className={styles.content}>Opps! Nie znaleziono strony</p>
			<Link className={styles.backButton} to={'/'}>
				Wróć do strony głównej
			</Link>
		</main>
	)
}

export default NotFound
