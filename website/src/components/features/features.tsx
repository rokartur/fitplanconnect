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
					    Unlock Your Full Potential with FitPlan Connect
				    </h1>
                </div>
                
                <div className={styles.content}>
                    <div className={styles.feature}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.text}>
                            <h2 className={styles.title}>Custom workouts</h2>
                            <p className={styles.description}>Create personalized workout plans tailored to your goals, whether it's building muscle, losing weight, or enhancing flexibility.</p>
                        </div>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.text}>
                            <h2 className={styles.title}>Expert Trainers</h2>
                            <p className={styles.description}>Access top trainers with experience in various fitness disciplines, from bodybuilding to yoga.</p>
                        </div>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.text}>
                            <h2 className={styles.title}>Tracking and Progress</h2>
                            <p className={styles.description}>Monitor your workouts, set goals, and track your progress with intuitive charts and data.</p>
                        </div>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.text}>
                            <h2 className={styles.title}>Community Support</h2>
                            <p className={styles.description}>Connect with like-minded individuals and share your fitness journey.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
