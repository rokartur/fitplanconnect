import styles from './footer.module.scss'

export default function Footer() {

    return (
        <section aria-label='footer section' className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.leadingContent}>
                        <div className={styles.media}>
                            <img src="/src/assets/icons/logomark.svg" alt="logomark" />
                            <img src="/src/assets/icons/logotype.svg" alt="logotype" />
                        </div>
                        <div className={styles.links}>
                            <a href="/overview">Overview</a>
                            <a href="/teams">Teams</a>
                            <a href="/jobs">Jobs</a>
                            <a href="/help">Help</a>
                            <a href="privacy">Privacy</a>
                        </div>
                    </div>
                    <div className={styles.icons}>
                        <a href="https://www.facebook.com/?locale=pl_PL"><img src="/src/assets/icons/fb-icon.svg" alt="Facebook" /></a>
                        <a href="https://x.com/?lang=pl"><img src="/src/assets/icons/x-icon.svg" alt="X" /></a>
                        <a href="https://www.instagram.com/"><img src="/src/assets/icons/ig-icon.svg" alt="Instagram" /></a>
                        <a href="https://pl.linkedin.com/"><img src="/src/assets/icons/lnkd-icon.svg" alt="LinkedIn" /></a>      
                    </div>
                </div>
            </div>
        </section>
    )
}