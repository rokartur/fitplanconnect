import styles from '@/styles/trainers.module.scss'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/utils/store.ts'
import moment from 'moment'
import { SEO } from '@/components/seo'
import { Overlay } from '@/components/overlay/overlay'
import { AnimateWrapper } from '@/components/animateWrapper/animateWrapper'
import { Container } from '@/components/container/container'
import { Image } from '@/components/image'
import wretch from 'wretch'
import Swal from 'sweetalert2'

const metaData = {
	title: 'Trainers',
	path: '/app/trainers',
}

export default function Trainers() {
	const navigate = useNavigate()
	const user = useAppSelector(state => state.user.data)
	const trainers = useAppSelector(state => state.trainers.data)

	useEffect(() => {
		if (!user) navigate('/')

		if (isNaN(moment(user?.subscription_expiration_date).unix())) {
			navigate('/app/billing')
		} else if (moment().unix() > moment(user?.subscription_expiration_date).unix()) {
			navigate('/app/billing')
		}
	}, [user])

	return (
		<>
			<SEO title={metaData.title} path={metaData.path} />

			<Overlay>
				<AnimateWrapper>
					<Container>
						<div className={styles.content}>

							{trainers?.map(({ id, name, username, profile_picture_url }) => (
								<div key={id} className={styles.trainerCard} onClick={async () => {
									if (user?.selected_trainer_id === id) {
										Swal.fire({
											title: 'Trainer already selected',
											icon: 'warning',
										})
										return
									} else {
										await wretch(`/api/trainer/${id}`)
											.patch()
											.res(res => {
												if (res.status === 200) {
													Swal.fire({
														title: 'Trainer selected successfully',
														icon: 'success',
													}).then(() => location.reload())
												}
											})
											.catch(() => {
												Swal.fire({
													title: 'An error occurred',
													icon: 'error',
												}).then(() => location.reload())
											})
									}
								}}>
									<Image source={profile_picture_url} />

									<div className={styles.trainerShadow}/>

									{user?.selected_trainer_id === id && <div className={styles.selectedTrainer}>
										<svg width='24' height='24' viewBox='0 0 24 24' fill='none'
												 xmlns='http://www.w3.org/2000/svg'>
											<path fillRule='evenodd' clipRule='evenodd'
														d='M15.5837 10.5577L11.5107 14.6327C11.3697 14.7737 11.1787 14.8527 10.9797 14.8527C10.7807 14.8527 10.5897 14.7737 10.4497 14.6327L8.47274 12.6527C8.18075 12.3587 8.18075 11.8837 8.47375 11.5907C8.76775 11.2987 9.24174 11.2997 9.53475 11.5917L10.9807 13.0407L14.5227 9.49667C14.8157 9.20367 15.2907 9.20367 15.5837 9.49667C15.8767 9.78967 15.8767 10.2647 15.5837 10.5577ZM20.7037 10.0857L20.0047 9.38667C19.6857 9.06667 19.5107 8.64067 19.5107 8.18967V7.18967C19.5107 5.70067 18.2987 4.48967 16.8107 4.48967H15.8087C15.3557 4.48967 14.9307 4.31467 14.6127 3.99667L13.9017 3.28667C12.8447 2.23867 11.1327 2.24367 10.0837 3.29767L9.38674 3.99667C9.06574 4.31567 8.64075 4.49067 8.18875 4.49067H7.18775C5.71675 4.49167 4.51675 5.67567 4.48975 7.14167C4.48874 7.15767 4.48775 7.17367 4.48775 7.19067V8.18767C4.48775 8.63967 4.31275 9.06467 3.99375 9.38367L3.28575 10.0927C3.28475 10.0957 3.28175 10.0967 3.27975 10.0987C2.23475 11.1567 2.24375 12.8687 3.29675 13.9117L3.99575 14.6127C4.31375 14.9317 4.48975 15.3557 4.48975 15.8077V16.8127C4.48975 18.3007 5.69975 19.5117 7.18775 19.5117H8.18675C8.63975 19.5127 9.06475 19.6877 9.38275 20.0047L10.0957 20.7157C10.6037 21.2207 11.2777 21.4987 11.9947 21.4987H12.0067C12.7277 21.4957 13.4037 21.2117 13.9097 20.7027L14.6107 20.0027C14.9257 19.6887 15.3617 19.5087 15.8067 19.5087H16.8127C18.2977 19.5087 19.5087 18.2997 19.5117 16.8127V15.8097C19.5117 15.3587 19.6867 14.9337 20.0037 14.6147L20.7147 13.9037C21.7647 12.8477 21.7587 11.1347 20.7037 10.0857Z'
														fill='white' />
										</svg>
									</div>}

									<div className={styles.trainerInfo}>
										<button>
											<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
												<path fillRule='evenodd' clipRule='evenodd'
															d='M7.8401 2.5C4.9238 2.5 2.5601 4.96219 2.5601 8C2.5601 11.0372 4.92384 13.5 7.8401 13.5C10.7564 13.5 13.1201 11.0372 13.1201 8C13.1201 4.96219 10.7564 2.5 7.8401 2.5ZM1.6001 8C1.6001 4.40991 4.39361 1.5 7.8401 1.5C11.2866 1.5 14.0801 4.40991 14.0801 8C14.0801 11.5894 11.2866 14.5 7.8401 14.5C4.39358 14.5 1.6001 11.5894 1.6001 8Z'
															fill='white' />
												<path fillRule='evenodd' clipRule='evenodd'
															d='M7.83986 5.02734C8.10495 5.02734 8.31986 5.2512 8.31986 5.52734V5.5695C8.31986 5.84564 8.10495 6.0695 7.83986 6.0695C7.57478 6.0695 7.35986 5.84564 7.35986 5.5695V5.52734C7.35986 5.2512 7.57478 5.02734 7.83986 5.02734ZM7.84351 7.09573C8.1086 7.09573 8.32351 7.3196 8.32351 7.59573V10.4621C8.32351 10.7383 8.1086 10.9621 7.84351 10.9621C7.57842 10.9621 7.36351 10.7383 7.36351 10.4621V7.59573C7.36351 7.3196 7.57842 7.09573 7.84351 7.09573Z'
															fill='white' />
											</svg>

											<p>{name ? `${name} (${username})` : username}</p>
										</button>

										<button
											className={user?.selected_trainer_id === id ? styles.trainerSelectedButton : styles.trainerSelectButton}>
											<p>{user?.selected_trainer_id === id ? 'Selected' : 'Select'}</p>
											<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
												<path fillRule='evenodd' clipRule='evenodd'
															d="M7.8332 3C7.77253 3 7.6232 3.01667 7.54386 3.17533L6.32653 5.60933C6.13386 5.994 5.76253 6.26133 5.3332 6.32267L2.60786 6.71533C2.42786 6.74133 2.36653 6.87467 2.34786 6.93067C2.3312 6.98467 2.30453 7.122 2.42853 7.24067L4.3992 9.134C4.7132 9.436 4.85586 9.87133 4.7812 10.2973L4.3172 12.9707C4.28853 13.138 4.3932 13.2353 4.43986 13.2687C4.4892 13.306 4.6212 13.38 4.78453 13.2947L7.2212 12.0313C7.6052 11.8333 8.06253 11.8333 8.4452 12.0313L10.8812 13.294C11.0452 13.3787 11.1772 13.3047 11.2272 13.2687C11.2739 13.2353 11.3785 13.138 11.3499 12.9707L10.8845 10.2973C10.8099 9.87133 10.9525 9.436 11.2665 9.134L13.2372 7.24067C13.3619 7.122 13.3352 6.984 13.3179 6.93067C13.2999 6.87467 13.2385 6.74133 13.0585 6.71533L10.3332 6.32267C9.90453 6.26133 9.5332 5.994 9.34053 5.60867L8.12186 3.17533C8.0432 3.01667 7.89386 3 7.8332 3ZM4.6312 14.3333C4.35586 14.3333 4.08253 14.2467 3.84853 14.076C3.44453 13.78 3.24653 13.2913 3.33253 12.7993L3.79653 10.126C3.81386 10.0267 3.77986 9.926 3.70653 9.85533L1.73586 7.962C1.3732 7.61467 1.2432 7.10133 1.39653 6.62467C1.5512 6.14267 1.96053 5.798 2.4652 5.726L5.19053 5.33333C5.29586 5.31867 5.38653 5.254 5.43186 5.162L6.64986 2.72733C6.87453 2.27867 7.32786 2 7.8332 2C8.33853 2 8.79186 2.27867 9.01653 2.72733L10.2352 5.16133C10.2812 5.254 10.3712 5.31867 10.4759 5.33333L13.2012 5.726C13.7059 5.798 14.1152 6.14267 14.2699 6.62467C14.4232 7.10133 14.2925 7.61467 13.9299 7.962L11.9592 9.85533C11.8859 9.926 11.8525 10.0267 11.8699 10.1253L12.3345 12.7993C12.4199 13.292 12.2219 13.7807 11.8172 14.076C11.4072 14.3767 10.8732 14.4173 10.4205 14.1813L7.9852 12.9193C7.88986 12.87 7.77586 12.87 7.68053 12.9193L5.2452 14.182C5.05053 14.2833 4.84053 14.3333 4.6312 14.3333Z" fill="#FBBF24" />
											</svg>
										</button>
									</div>
								</div>
							))}

						</div>
					</Container>
				</AnimateWrapper>
			</Overlay>
		</>
	)
}
