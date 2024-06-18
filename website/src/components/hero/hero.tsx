import styles from './hero.module.scss';
import { Image } from '@/components/image'
import photoLanding from '@/assets/images/landing_hero.jpg'

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <h2 className={styles.overline}>
              FITNESS AND TRAINING NEVER CONNECTED BETTER
            </h2>
          <h1 className={styles.heading}>
            Transform Your Fitness Journey with <span>FitPlan Connect</span>!
          </h1>
          <h2 className={styles.supportingText}>
          Are you ready to take control of your health and fitness? Fitplanconnect is the ultimate personal trainer app that brings expert guidance, personalized workout plans, and a supportive community right to your fingertips.
          </h2>
          <button>Join us</button>
          </div>
          <Image source={photoLanding}/>
        </div>
      </div>
    </div>
  );
}
