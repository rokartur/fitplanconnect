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

                        </div>
                    </div>
                    <div className={styles.icons}>
                        <img src="/src/assets/icons/fb-icon.svg" alt="Facebook" />
                        <img src="/src/assets/icons/x-icon.svg" alt="X" />
                        <img src="/src/assets/icons/ig-icon.svg" alt="Instagram" />
                        <img src="/src/assets/icons/lnkd-icon.svg" alt="LinkedIn" />
                    </div>
                </div>
            </div>
        </section>
    )
}