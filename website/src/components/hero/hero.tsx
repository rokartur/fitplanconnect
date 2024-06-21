import styles from './hero.module.scss'
import { Image } from '@/components/image'
import photoLanding from '@/assets/images/landing_hero.jpg'
import wretch from 'wretch'
import { OAuthResponse } from '@/components/header/header.tsx'
import { useState } from 'react'
import { useAppSelector } from '@/utils/store.ts'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const navigate = useNavigate()
	const user = useAppSelector(state => state.user.data)

	return (
		<div className={styles.hero}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.text}>
						<p className={styles.overline}>
							Fitness and training never connected better!
						</p>

						<h1 className={styles.heading}>
							Transform Your Fitness Journey with <span>FitPlan Connect</span>!
						</h1>

						<p className={styles.supportingText}>
							Are you ready to take control of your health and fitness? FitPlanConnect is the ultimate personal trainer
							app that brings expert guidance, personalized workout plans, and a supportive community right to your
							fingertips.
						</p>

            <div className={styles.actions}>
              <button
                disabled={isLoading}
                onClick={async () => {
									if (user) {
										navigate('/app/calendar')
									}

                  setIsLoading(true)
                  const response: OAuthResponse = await wretch('/api/oauth').get().json()
                  if (response.error) {
                    console.error(response.error)
                  } else {
                    window.location.href = response.url as string
                  }
                }}
              >
                Join us

                <span>
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                    <path fillRule='evenodd' clipRule='evenodd' d='M6.71291 5.04622C7.60786 4.15126 9.05886 4.15126 9.95377 5.04622L13.2871 8.37959C14.1821 9.2745 14.1821 10.7255 13.2871 11.6204L9.95377 14.9538C9.05886 15.8488 7.60786 15.8488 6.71291 14.9538C5.81795 14.0588 5.81795 12.6078 6.71291 11.7129L8.42577 10L6.71291 8.28712C5.81795 7.39217 5.81795 5.94117 6.71291 5.04622ZM9.06994 5.9301C8.66311 5.5233 8.00358 5.5233 7.59679 5.9301C7.18999 6.33689 7.18999 6.99644 7.59679 7.40324L9.75161 9.55809C9.99569 9.80217 9.99569 10.1978 9.75161 10.4419L7.59679 12.5968C7.18999 13.0036 7.18999 13.6631 7.59679 14.0699C8.00358 14.4767 8.66311 14.4767 9.06994 14.0699L12.4033 10.7366C12.81 10.3298 12.81 9.67025 12.4033 9.26342L9.06994 5.9301Z' fill='white' />
                  </svg>
                </span>
              </button>

              <div className={styles.stars}>
                <span>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path d="M10.9255 4.73601C11.2637 3.69509 12.7363 3.69509 13.0745 4.73601L14.2829 8.45516C14.4342 8.92067 14.868 9.23584 15.3574 9.23584H19.268C20.3625 9.23584 20.8175 10.6364 19.9321 11.2797L16.7684 13.5783C16.3724 13.866 16.2067 14.3759 16.358 14.8414L17.5664 18.5606C17.9046 19.6015 16.7132 20.4671 15.8278 19.8238L12.6641 17.5252C12.2681 17.2375 11.7319 17.2375 11.3359 17.5252L8.17219 19.8238C7.28673 20.4671 6.09536 19.6015 6.43357 18.5606L7.642 14.8414C7.79325 14.3759 7.62755 13.866 7.23156 13.5783L4.06787 11.2797C3.18241 10.6364 3.63748 9.23584 4.73196 9.23584H8.6425C9.13197 9.23584 9.56577 8.92067 9.71703 8.45516L10.9255 4.73601Z" fill="#F59E0B" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.9255 4.73601C11.2637 3.69509 12.7363 3.69509 13.0745 4.73601L14.2829 8.45516C14.4342 8.92067 14.868 9.23584 15.3574 9.23584H19.268C20.3625 9.23584 20.8175 10.6364 19.9321 11.2797L16.7684 13.5783C16.3724 13.866 16.2067 14.3759 16.358 14.8414L17.5664 18.5606C17.9046 19.6015 16.7132 20.4671 15.8278 19.8238L12.6641 17.5252C12.2681 17.2375 11.7319 17.2375 11.3359 17.5252L8.17219 19.8238C7.28673 20.4671 6.09536 19.6015 6.43357 18.5606L7.642 14.8414C7.79325 14.3759 7.62755 13.866 7.23156 13.5783L4.06787 11.2797C3.18241 10.6364 3.63748 9.23584 4.73196 9.23584H8.6425C9.13197 9.23584 9.56577 8.92067 9.71703 8.45516L10.9255 4.73601Z" fill="#F59E0B" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.9255 4.73601C11.2637 3.69509 12.7363 3.69509 13.0745 4.73601L14.2829 8.45516C14.4342 8.92067 14.868 9.23584 15.3574 9.23584H19.268C20.3625 9.23584 20.8175 10.6364 19.9321 11.2797L16.7684 13.5783C16.3724 13.866 16.2067 14.3759 16.358 14.8414L17.5664 18.5606C17.9046 19.6015 16.7132 20.4671 15.8278 19.8238L12.6641 17.5252C12.2681 17.2375 11.7319 17.2375 11.3359 17.5252L8.17219 19.8238C7.28673 20.4671 6.09536 19.6015 6.43357 18.5606L7.642 14.8414C7.79325 14.3759 7.62755 13.866 7.23156 13.5783L4.06787 11.2797C3.18241 10.6364 3.63748 9.23584 4.73196 9.23584H8.6425C9.13197 9.23584 9.56577 8.92067 9.71703 8.45516L10.9255 4.73601Z" fill="#F59E0B" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.9255 4.73601C11.2637 3.69509 12.7363 3.69509 13.0745 4.73601L14.2829 8.45516C14.4342 8.92067 14.868 9.23584 15.3574 9.23584H19.268C20.3625 9.23584 20.8175 10.6364 19.9321 11.2797L16.7684 13.5783C16.3724 13.866 16.2067 14.3759 16.358 14.8414L17.5664 18.5606C17.9046 19.6015 16.7132 20.4671 15.8278 19.8238L12.6641 17.5252C12.2681 17.2375 11.7319 17.2375 11.3359 17.5252L8.17219 19.8238C7.28673 20.4671 6.09536 19.6015 6.43357 18.5606L7.642 14.8414C7.79325 14.3759 7.62755 13.866 7.23156 13.5783L4.06787 11.2797C3.18241 10.6364 3.63748 9.23584 4.73196 9.23584H8.6425C9.13197 9.23584 9.56577 8.92067 9.71703 8.45516L10.9255 4.73601Z" fill="#F59E0B" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.9255 4.73601C11.2637 3.69509 12.7363 3.69509 13.0745 4.73601L14.2829 8.45516C14.4342 8.92067 14.868 9.23584 15.3574 9.23584H19.268C20.3625 9.23584 20.8175 10.6364 19.9321 11.2797L16.7684 13.5783C16.3724 13.866 16.2067 14.3759 16.358 14.8414L17.5664 18.5606C17.9046 19.6015 16.7132 20.4671 15.8278 19.8238L12.6641 17.5252C12.2681 17.2375 11.7319 17.2375 11.3359 17.5252L8.17219 19.8238C7.28673 20.4671 6.09536 19.6015 6.43357 18.5606L7.642 14.8414C7.79325 14.3759 7.62755 13.866 7.23156 13.5783L4.06787 11.2797C3.18241 10.6364 3.63748 9.23584 4.73196 9.23584H8.6425C9.13197 9.23584 9.56577 8.92067 9.71703 8.45516L10.9255 4.73601Z" fill="#F59E0B" />
                  </svg>
                </span>
                <p>from 100+ reviews</p>
              </div>
            </div>
          </div>
          <Image source={photoLanding} />
        </div>
      </div>
    </div>
  )
}
