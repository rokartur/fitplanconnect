import styles from './blog.module.scss'
import { Image } from '../image'

export default function Blog() {
    return (
        <section aria-label='blog section' className={styles.blog}>
            <div className={styles.row}>
                <div className={styles.card}>
                    {/* Image here*/}
                    <div className={styles.content}>
                        <div className={styles.text}>
                            <h2 className={styles.title}>How to Start a Fitness Journey</h2>
                            <p className={styles.description}>Learn how to kickstart your fitness journey with our expert tips and advice.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    {/* Image here*/}
                    <div className={styles.content}>
                        <div className={styles.text}>
                            <h2 className={styles.title}>How to Start a Fitness Journey</h2>
                            <p className={styles.description}>Learn how to kickstart your fitness journey with our expert tips and advice.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    {/* Image here*/}
                    <div className={styles.content}>
                         <div className={styles.text}>
                            <h2 className={styles.title}>How to Start a Fitness Journey</h2>
                            <p className={styles.description}>Learn how to kickstart your fitness journey with our expert tips and advice.</p>
                        </div>
                    </div> 
                </div>
            </div>
        </section>
    )
}