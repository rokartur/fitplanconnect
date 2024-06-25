import styles from './features.module.scss'

export default function Features() {
    return (
        <section aria-label='features section' className={styles.features}>
            <div className={styles.container}>
                <div className={styles.text}>
                    <p className={styles.overline}>
					    WHAT FITPLAN CONNECT OFFERS:
				    </p>

				    <h1 className={styles.heading}>
					    Unlock your full potential with FitPlan Connect
				    </h1>
                </div>
                <div className={styles.content}>
                    <div className={styles.feature}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.text}>

                        </div>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.text}>

                        </div>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.text}>

                        </div>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.text}>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
