import styles from '@/styles/app.settings.module.scss'
import { useState } from 'react'
import wretch from 'wretch'
import { AlertDialog } from '@/components/alertDialog/alertDialog.tsx'
import { AnimateWrapper } from '@/components/animateWrapper/animateWrapper.tsx'
import { Button } from '@/components/button/button.tsx'
import { Container } from '@/components/container/container.tsx'
import { Overlay } from '@/components/overlay/overlay.tsx'
import { SEO } from '@/components/seo.tsx'
import { useAppDispatch, useAppSelector } from '@/utils/store.ts'
import { useNavigate } from 'react-router-dom'
import { setUser } from '@/utils/slices/userSlice.ts'

const metaData = {
	title: 'Settings',
	description: '',
	path: '/app/settings',
}

const AppSettings = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user.data)
	const [isOpenConfirmDeleteAccountAlertDialog, setIsOpenConfirmDeleteAccountAlertDialog] = useState(false)
	const navigate = useNavigate()

	return (
		<>
			<SEO title={metaData.title} description={metaData.description} path={metaData.path} />

			<Overlay>
				<AnimateWrapper>
					<Container>
						<div className={styles.content}>
							<div className={styles.dataColumn}>
								<h1>Account details</h1>
								<p className={styles.supportingText}>
									To edit your details go to your{' '}
									<a href='https://github.com/settings/profile' target={'_blank'}>
										GitHub account settings
									</a>
									.
								</p>
								{user ? (
									<>
										<label>
											Name
											<p>{user.name ? `${user.name} (${user.username})` : user.username}</p>
										</label>
										<label>
											Email address
											<p>{user.email || <a href='https://github.com/settings/profile' target={'_blank'}>Not selected public email</a>}</p>
										</label>
									</>
								) : null}
							</div>

							<div className={styles.dataColumn}>
								<h2>Danger zone</h2>
								<p className={styles.supportingText}>Clicking this button will delete your account on our site.</p>
								<Button
									type={'secondary'}
									size={'medium'}
									label={'Delete account'}
									isDestructive
									onClick={() => setIsOpenConfirmDeleteAccountAlertDialog(true)}
								/>
							</div>

							<svg
								className={styles.backgroundIcon}
								xmlns='http://www.w3.org/2000/svg'
								width='806'
								height='570'
								viewBox='0 0 806 570'
								fill='none'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M75.8104 209.41C34.1541 209.41 0.286621 243.39 0.286621 285.097C0.286621 326.687 34.1541 360.511 75.8104 360.511H127.005C131.764 360.511 135.395 356.251 134.739 351.525C131.76 330.066 130.06 307.865 130.06 284.98C130.06 262.088 131.76 239.883 134.741 218.389C135.396 213.667 131.766 209.41 127.007 209.41H75.8104Z'
									fill='#F3F4F6'
								/>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M615.826 428.105C591.84 480.491 555.453 511.519 519.454 511.596C519.454 511.596 519.338 511.558 519.222 511.558H518.912C471.792 511.208 426.261 459.715 405.413 382.67C396.888 351.991 392.626 319.371 392.626 284.81C392.626 250.248 396.888 217.628 405.413 186.948C426.338 110.058 472.063 58.4099 519.338 58.4099C556.151 58.4099 592.576 89.4766 616.213 141.125C625.63 164.075 632.643 186.871 637.565 209.628H564.714C523.252 209.628 489.501 243.452 489.501 285.004C489.501 326.556 523.252 360.379 564.714 360.379H637.138C632.178 382.825 625.203 405.387 615.826 428.105ZM730.293 209.628H696.309C690.652 178.987 681.894 148.387 669.301 117.825C635.201 42.9154 580.253 0.198758 519.416 0.159924L519.222 0.121094H363.408C259.713 0.121094 178.493 125.242 178.493 285.004C178.493 444.687 259.713 569.808 363.408 569.808H518.641C518.873 569.808 519.106 569.846 519.338 569.846C579.788 569.846 634.426 527.13 668.913 452.181C669.301 451.793 669.301 451.405 669.301 451.016C681.778 420.882 690.536 390.669 696.193 360.379H730.293C771.872 360.379 805.701 326.478 805.701 284.81C805.701 243.375 771.872 209.628 730.293 209.628Z'
									fill='#F3F4F6'
								/>
							</svg>
						</div>

						<AlertDialog
							isOpen={isOpenConfirmDeleteAccountAlertDialog}
							onClose={() => setIsOpenConfirmDeleteAccountAlertDialog(false)}
							onCancel={() => setIsOpenConfirmDeleteAccountAlertDialog(false)}
							onConfirm={async () => {
								const response: { status: number } = await wretch('/api/user/delete').get().json()
								if (response.status === 200) {
									dispatch(setUser(null))
									navigate('/')
								}

								setIsOpenConfirmDeleteAccountAlertDialog(false)
							}}
							closeWhenClickEscape
							title={'Do you want to delete your account?'}
							description={'Make sure you definitely want to do this — your account cannot be restored.'}
						/>
					</Container>
				</AnimateWrapper>
			</Overlay>
		</>
	)
}

export default AppSettings
