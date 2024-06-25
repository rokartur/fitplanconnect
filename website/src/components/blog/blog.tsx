import styles from './blog.module.scss'
import { Image } from '../image'
import photoBlog1 from '../../assets/images/blog-1.png'
import photoBlog2 from '../../assets/images/blog-2.png'
import photoBlog3 from '../../assets/images/blog-3.png'

export default function Blog() {
    return (
        <section aria-label='blog section' className={styles.blog}>
            <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.card}>
                    <Image source={photoBlog1}/>
                    <div className={styles.content}>
                        <div className={styles.text}>
                            <h2 className={styles.title}>Introducing <span>Live Workout</span> Sessions on FitPlan Connect</h2>
                            <p className={styles.description}>Get ready to experience fitness like never before! FitPlan Connect is thrilled to announce the launch of live workout sessions. Join our expert trainers in real-time as they guide you through various workouts, from high-intensity interval training to calming yoga. Don't miss our first live session this weekend—check the app for details and schedule!</p>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                <Image source={photoBlog2}/>
                    <div className={styles.content}>
                        <div className={styles.text}>
                            <h2 className={styles.title}>Get a FitPlan Connect <span>Branded Gym Bag</span> with Annual Membership</h2>
                            <p className={styles.description}>Sign up for an annual membership on FitPlan Connect, and you'll receive a complimentary FitPlan Connect branded gym bag. Don't miss this limited-time offer - subscribe to an annual plan today and claim your gym bag!</p>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                <Image source={photoBlog3}/>
                    <div className={styles.content}>
                         <div className={styles.text}>
                            <h2 className={styles.title}><span>Advanced Tracking</span> and Custom Nutrition Plans</h2>
                            <p className={styles.description}>With advanced tracking, you can now monitor your progress in more detail, including personalized stats, performance graphs, and goal achievement milestones. Additionally, our custom nutrition plans provide meal suggestions and dietary advice tailored to your fitness goals. Upgrade to a premium membership today to access these new features and take your fitness journey to the next level.</p>
                        </div>
                    </div> 
                </div>
            </div>
            </div>
        </section>
    )
}