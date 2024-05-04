import styles from './header.module.scss';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import wretch from 'wretch';
import { UserDropdown } from '@/components/userDropdown/userDropdown.tsx';
import { setUser, UserTypes } from '@/utils/slices/userSlice.ts'
import { useAppDispatch, useAppSelector } from '@/utils/store.ts';
import { Tooltip } from '@/components/tooltip/tooltip.tsx'
import { useLocalStorage } from '@/hooks/useLocalStorage.ts'

type OAuthResponse = {
	error?: string
	url?: string
}

export const Header = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user.data)
	const navigate = useNavigate()
	const { pathname: url } = useLocation()
	const { setItem, removeItem } = useLocalStorage('isLogged')

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data: UserTypes = await wretch('/api/user').get().json()
				dispatch(setUser(data))
			} catch {}
		}

		fetchUser().then()
	}, [])

	return (
		<header className={styles.main}>
			<div className={styles.container}>
				<div className={styles.component} id={'component'}>
					<div className={styles.content}>
						<Link className={styles.homeLink} to={'/'}>
							<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44' fill='none'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M6.52007 18.4314C4.54923 18.4314 2.9469 20.0356 2.9469 22.0046C2.9469 23.9681 4.54923 25.5649 6.52007 25.5649H8.94216C9.16734 25.5649 9.33913 25.3638 9.30809 25.1407C9.16712 24.1276 9.08673 23.0795 9.08673 21.9991C9.08673 20.9183 9.16714 19.87 9.30818 18.8553C9.33918 18.6323 9.16742 18.4314 8.94227 18.4314H6.52007Z'
									fill='url(#paint0_linear_37_2)'
								/>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M32.0692 28.756C30.9343 31.2292 29.2128 32.694 27.5097 32.6977C27.5097 32.6977 27.5042 32.6959 27.4987 32.6959H27.484C25.2547 32.6794 23.1005 30.2484 22.1142 26.611C21.7108 25.1627 21.5092 23.6227 21.5092 21.991C21.5092 20.3594 21.7108 18.8194 22.1142 17.3709C23.1042 13.7409 25.2675 11.3026 27.5042 11.3026C29.2458 11.3026 30.9692 12.7693 32.0875 15.2076C32.533 16.2911 32.8648 17.3673 33.0977 18.4417H29.651C27.6893 18.4417 26.0925 20.0385 26.0925 22.0002C26.0925 23.9619 27.6893 25.5587 29.651 25.5587H33.0775C32.8428 26.6184 32.5128 27.6835 32.0692 28.756ZM37.4848 18.4417H35.877C35.6093 16.9951 35.195 15.5504 34.5992 14.1076C32.9858 10.5711 30.3862 8.55445 27.5078 8.55261L27.4987 8.55078H20.1268C15.2208 8.55078 11.3782 14.4578 11.3782 22.0002C11.3782 29.5389 15.2208 35.4459 20.1268 35.4459H27.4712C27.4822 35.4459 27.4932 35.4477 27.5042 35.4477C30.3642 35.4477 32.9492 33.431 34.5808 29.8927C34.5992 29.8744 34.5992 29.856 34.5992 29.8377C35.1895 28.415 35.6038 26.9887 35.8715 25.5587H37.4848C39.452 25.5587 41.0525 23.9582 41.0525 21.991C41.0525 20.0349 39.452 18.4417 37.4848 18.4417Z'
									fill='url(#paint1_linear_37_2)'
								/>
								<defs>
									<linearGradient
										id='paint0_linear_37_2'
										x1='4.50147'
										y1='23.8229'
										x2='8.12711'
										y2='20.5879'
										gradientUnits='userSpaceOnUse'
									>
										<stop stopColor='#CD66FF' />
										<stop offset='1' stopColor='#FFB3FF' />
									</linearGradient>
									<linearGradient
										id='paint1_linear_37_2'
										x1='18.6259'
										y1='28.8795'
										x2='32.3191'
										y2='13.7723'
										gradientUnits='userSpaceOnUse'
									>
										<stop stopColor='#CD66FF' />
										<stop offset='1' stopColor='#FFB3FF' />
									</linearGradient>
								</defs>
							</svg>
						</Link>

						<nav className={styles.navigation}>
							{user ? (
								<>
									<div className={styles.links}>
										<Link className={url === '/app/calendar' ? styles.linkActive : styles.link} to={'/app/calendar'}>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
												<path fillRule="evenodd" clipRule="evenodd" d="M13.2111 1.94498C13.5425 1.94498 13.8111 2.2248 13.8111 2.56998V4.18615C13.8111 4.53133 13.5425 4.81115 13.2111 4.81115C12.8798 4.81115 12.6111 4.53133 12.6111 4.18615V2.56998C12.6111 2.2248 12.8798 1.94498 13.2111 1.94498Z" fill="black" />
												<path fillRule="evenodd" clipRule="evenodd" d="M7.18771 1.94498C7.51908 1.94498 7.78771 2.2248 7.78771 2.56998V4.18615C7.78771 4.53133 7.51908 4.81115 7.18771 4.81115C6.85634 4.81115 6.58771 4.53133 6.58771 4.18615V2.56998C6.58771 2.2248 6.85634 1.94498 7.18771 1.94498Z" fill="black" />
												<path fillRule="evenodd" clipRule="evenodd" d="M6.75256 3.56355L13.6534 3.56284C14.7774 3.56284 15.7658 3.88909 16.4753 4.59348C17.1894 5.30241 17.5431 6.31688 17.5399 7.52618C17.5399 7.52636 17.5399 7.52599 17.5399 7.52618V14.0857C17.5399 15.2951 17.1845 16.3105 16.4704 17.0206C15.7606 17.7264 14.7725 18.0548 13.6475 18.0548L6.75262 18.0555C5.62746 18.0555 4.63847 17.72 3.92863 17.0033C3.21581 16.2837 2.86017 15.2561 2.86017 14.032V7.52565C2.86017 6.31565 3.21766 5.30178 3.93283 4.59363C4.64336 3.89009 5.63102 3.56356 6.75256 3.56355C6.75258 3.56355 6.75254 3.56355 6.75256 3.56355ZM13.6534 4.81284L6.75262 4.81355C5.84712 4.81355 5.18849 5.07494 4.75959 5.49962C4.33534 5.9197 4.06017 6.57439 4.06017 7.52565V14.032C4.06017 15.0033 4.33719 15.675 4.7638 16.1058C5.19338 16.5394 5.85063 16.8055 6.7525 16.8055C6.75253 16.8055 6.75249 16.8055 6.7525 16.8055L13.6474 16.8048C14.5555 16.8048 15.2137 16.5421 15.6418 16.1164C16.0656 15.6949 16.3399 15.0383 16.3399 14.0857V7.52494V7.52314C16.3425 6.57142 16.0696 5.91754 15.6474 5.49834C15.2204 5.0745 14.5624 4.81284 13.6534 4.81284Z" fill="black" />
												<path fillRule="evenodd" clipRule="evenodd" d="M8.25079 8.57908C8.25079 8.23393 8.51943 7.9541 8.85079 7.9541H11.5526C11.7432 7.9541 11.9226 8.04851 12.0356 8.20843C12.1487 8.36833 12.1821 8.57475 12.1255 8.76442L10.7953 13.2272C10.697 13.5568 10.3608 13.7411 10.0444 13.6388C9.72791 13.5363 9.55103 13.1862 9.64927 12.8565L10.738 9.20408H8.85079C8.51943 9.20408 8.25079 8.92425 8.25079 8.57908Z" fill="black" />
											</svg>
											<p>Calendar</p>
										</Link>

										<Link className={url === '/app/trainers' ? styles.linkActive : styles.link} to={'/app/trainers'}>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
												<path d="M4.95149 18.1236C4.58062 18.1162 4.22715 17.9584 3.96629 17.6837C3.70542 17.4091 3.55774 17.0392 3.55469 16.6527C3.55469 15.1439 3.55469 13.6352 3.55469 12.1269C3.55467 11.7466 3.69514 11.3808 3.947 11.1054C4.19886 10.8301 4.54279 10.6662 4.9075 10.6477H5.8075C6.17697 10.6605 6.52736 10.8217 6.78523 11.0976C7.0431 11.3735 7.18842 11.7427 7.1907 12.1277C7.1907 13.6372 7.1907 15.1458 7.1907 16.6536C7.18813 17.038 7.04223 17.4063 6.78384 17.6807C6.52545 17.9552 6.17478 18.1143 5.80588 18.1244L4.95149 18.1236ZM4.9563 11.8969C4.9012 11.9025 4.85005 11.9292 4.81279 11.9719C4.77554 12.0146 4.75482 12.0701 4.75469 12.1277C4.75469 13.6361 4.75469 15.1439 4.75469 16.6511C4.75488 16.7092 4.77679 16.7649 4.81577 16.8065C4.85475 16.848 4.90773 16.8721 4.96348 16.8736H5.7939C5.84766 16.8694 5.89787 16.8441 5.9344 16.8027C5.97093 16.7615 5.99106 16.7072 5.9907 16.6511C5.9907 15.1439 5.9907 13.6364 5.9907 12.1286C5.99057 12.0688 5.9684 12.0114 5.92881 11.9682C5.88922 11.9249 5.83519 11.8991 5.77788 11.8961L4.9563 11.8969Z" fill="black" />
												<path d="M11.9919 18.1237H11.1207C10.751 18.1113 10.4002 17.9502 10.1422 17.674C9.88424 17.3978 9.7392 17.0282 9.73752 16.6428C9.73752 15.1345 9.73752 13.6258 9.73752 12.117C9.74024 11.7328 9.88616 11.3649 10.1443 11.0907C10.4026 10.8164 10.7529 10.6573 11.1215 10.647H11.9767C12.3474 10.6545 12.7008 10.8123 12.9617 11.0868C13.2226 11.3612 13.3706 11.7308 13.3743 12.117C13.3743 13.6264 13.3743 15.135 13.3743 16.6428C13.3745 17.0234 13.234 17.3895 12.982 17.6651C12.7299 17.9407 12.3857 18.1046 12.0207 18.1228L11.9919 18.1237ZM11.9639 11.897H11.1343C11.0807 11.9012 11.0306 11.9264 10.9941 11.9675C10.9575 12.0087 10.9374 12.0627 10.9375 12.1187C10.9375 13.6264 10.9375 15.1339 10.9375 16.6412C10.9372 16.701 10.9591 16.7586 10.9986 16.8021C11.0381 16.8456 11.0922 16.8715 11.1495 16.8745H11.9727C12.0278 16.8683 12.0787 16.8413 12.1158 16.7987C12.153 16.7559 12.1738 16.7004 12.1743 16.6428C12.1743 15.1356 12.1743 13.6278 12.1743 12.1195C12.1738 12.0604 12.1511 12.004 12.111 11.9623C12.0709 11.9207 12.0166 11.8972 11.9599 11.897H11.9639Z" fill="black" />
												<path d="M10.3386 15.0106H6.59374C6.43462 15.0106 6.282 14.9448 6.16947 14.8275C6.05695 14.7103 5.99374 14.5513 5.99374 14.3856C5.99374 14.2198 6.05695 14.0608 6.16947 13.9437C6.282 13.8264 6.43462 13.7606 6.59374 13.7606H10.3386C10.4977 13.7606 10.6503 13.8264 10.7628 13.9437C10.8754 14.0608 10.9386 14.2198 10.9386 14.3856C10.9386 14.5513 10.8754 14.7103 10.7628 14.8275C10.6503 14.9448 10.4977 15.0106 10.3386 15.0106Z" fill="black" />
												<path d="M2.60626 16.2299C2.44713 16.2299 2.29451 16.1641 2.18199 16.0468C2.06947 15.9297 2.00626 15.7707 2.00626 15.6049V13.1632C2.00626 12.9975 2.06947 12.8385 2.18199 12.7213C2.29451 12.6041 2.44713 12.5382 2.60626 12.5382C2.76538 12.5382 2.918 12.6041 3.03053 12.7213C3.14305 12.8385 3.20626 12.9975 3.20626 13.1632V15.6049C3.20626 15.7707 3.14305 15.9297 3.03053 16.0468C2.918 16.1641 2.76538 16.2299 2.60626 16.2299Z" fill="black" />
												<path d="M14.3234 16.2299C14.1643 16.2299 14.0117 16.1641 13.8992 16.0468C13.7866 15.9297 13.7234 15.7707 13.7234 15.6049V13.1632C13.7234 12.9975 13.7866 12.8385 13.8992 12.7213C14.0117 12.6041 14.1643 12.5382 14.3234 12.5382C14.4826 12.5382 14.6352 12.6041 14.7477 12.7213C14.8602 12.8385 14.9234 12.9975 14.9234 13.1632V15.6049C14.9234 15.7707 14.8602 15.9297 14.7477 16.0468C14.6352 16.1641 14.4826 16.2299 14.3234 16.2299Z" fill="black" />
												<path d="M7.90688 10.3938C7.56876 10.3938 7.24165 10.2687 6.984 10.0406C6.72636 9.81249 6.55497 9.49641 6.50049 9.14882C6.28075 7.65602 6.06262 6.16407 5.84608 4.67297C5.79084 4.29741 5.87629 3.9141 6.08476 3.60233C6.29323 3.29057 6.60876 3.07419 6.96608 2.99797L6.99487 2.99297L7.85568 2.8563C8.22336 2.81071 8.59376 2.91552 8.88872 3.14868C9.18376 3.38184 9.3804 3.72514 9.43728 4.1063C9.65704 5.59741 9.87512 7.08908 10.0917 8.58132C10.1441 8.96099 10.0528 9.34707 9.83712 9.65807C9.62144 9.96907 9.29824 10.1806 8.93568 10.248L8.09088 10.383C8.02984 10.3905 7.96836 10.3942 7.90688 10.3938ZM7.19887 4.22713C7.14521 4.24152 7.09853 4.27597 7.06769 4.32392C7.03686 4.37187 7.02404 4.42997 7.03168 4.48713C7.24822 5.97824 7.46635 7.46908 7.68608 8.95966C7.69552 9.01682 7.72572 9.06799 7.7704 9.10257C7.81508 9.13716 7.87081 9.15249 7.92607 9.14549L8.74688 9.01466C8.79872 9.00132 8.84392 8.96832 8.87352 8.92199C8.90312 8.87574 8.91504 8.81957 8.90688 8.76466C8.69352 7.27352 8.47512 5.78324 8.25168 4.2938C8.24448 4.23476 8.21528 4.18104 8.17032 4.14425C8.12544 4.10745 8.06848 4.09053 8.01168 4.09713L7.19887 4.22713Z" fill="black" />
												<path d="M14.0323 9.42151C13.69 9.42559 13.3577 9.30084 13.0967 9.07009C12.8357 8.83934 12.6633 8.51818 12.6115 8.16568C12.3907 6.67457 12.1723 5.18318 11.9563 3.69151C11.9045 3.31188 11.9961 2.92612 12.2116 2.61531C12.4272 2.3045 12.7501 2.09284 13.1123 2.02484L13.9571 1.89068C14.3253 1.83573 14.6994 1.9345 14.9981 2.16548C15.2966 2.39648 15.4956 2.74098 15.5515 3.12401C15.7713 4.61568 15.9893 6.10735 16.2059 7.59902C16.2609 7.97444 16.1753 8.35751 15.9669 8.66909C15.7585 8.98068 15.4431 9.19693 15.0859 9.27318L15.0563 9.27818L14.1947 9.41568C14.1407 9.42059 14.0865 9.42251 14.0323 9.42151ZM14.1523 3.12318H14.1251L13.3051 3.25318C13.2533 3.26648 13.2081 3.29953 13.1785 3.3458C13.1489 3.39207 13.1369 3.44822 13.1451 3.50318C13.3585 4.99429 13.5766 6.48429 13.7995 7.97318C13.8084 8.03148 13.838 8.08417 13.8825 8.12076C13.9269 8.15736 13.983 8.17518 14.0395 8.17068L14.8531 8.03984C14.907 8.02596 14.954 7.99158 14.9848 7.94347C15.0155 7.89536 15.0279 7.837 15.0195 7.77985C14.8061 6.28818 14.5883 4.7979 14.3659 3.30901C14.3569 3.25685 14.3305 3.20965 14.2915 3.17568C14.2525 3.14171 14.2032 3.12313 14.1523 3.12318Z" fill="black" />
												<path d="M9.17649 7.05278C9.02473 7.05358 8.87825 6.9944 8.76665 6.88718C8.65505 6.77996 8.58665 6.63267 8.57513 6.47498C8.56369 6.31729 8.61001 6.16094 8.70481 6.03744C8.79969 5.91393 8.93593 5.83246 9.08609 5.80943H9.09009H9.11009L12.7901 5.2261C12.9475 5.20102 13.1079 5.24207 13.2362 5.34021C13.3644 5.43835 13.45 5.58555 13.4741 5.74943C13.4982 5.91332 13.4588 6.08045 13.3646 6.21408C13.2703 6.34769 13.1291 6.43685 12.9717 6.46194H12.9565H12.9493L9.26929 7.04527C9.23857 7.04985 9.20753 7.05236 9.17649 7.05278Z" fill="black" />
												<path d="M16.9926 7.04622C16.8493 7.04593 16.7109 6.99226 16.6023 6.8949C16.4937 6.79754 16.4222 6.66292 16.4006 6.51539L16.0478 4.09873C16.033 4.0163 16.0342 3.9316 16.0514 3.84968C16.0686 3.76777 16.1016 3.6903 16.1482 3.6219C16.1947 3.5535 16.2541 3.49558 16.3226 3.45156C16.3911 3.40754 16.4674 3.37833 16.547 3.36569C16.6266 3.35305 16.7078 3.35723 16.7858 3.37797C16.8638 3.3987 16.937 3.43558 17.0011 3.48641C17.0651 3.53723 17.1187 3.60096 17.1586 3.6738C17.1986 3.74664 17.2239 3.8271 17.2334 3.91039L17.5862 6.32706C17.5982 6.40817 17.5947 6.49097 17.576 6.57068C17.5572 6.6504 17.5236 6.72548 17.4769 6.7916C17.4302 6.85773 17.3714 6.91359 17.304 6.956C17.2366 6.99841 17.1617 7.02652 17.0838 7.03872C17.0536 7.0437 17.0231 7.04621 16.9926 7.04622Z" fill="black" />
												<path d="M5.41055 8.88626C5.26719 8.88601 5.12864 8.83234 5.01993 8.73501C4.91122 8.63768 4.83952 8.50301 4.81776 8.35543L4.46495 5.93875C4.45011 5.85633 4.45137 5.77163 4.46861 5.68971C4.48586 5.60779 4.51875 5.53033 4.56534 5.46193C4.61193 5.39353 4.67125 5.33559 4.73978 5.29159C4.80831 5.24757 4.88463 5.21836 4.96422 5.20572C5.04381 5.19308 5.12503 5.19725 5.20303 5.21799C5.28105 5.23873 5.35426 5.2756 5.4183 5.32643C5.48234 5.37725 5.53591 5.44099 5.57582 5.51383C5.61571 5.58667 5.64112 5.66713 5.65055 5.75041L6.00416 8.16709C6.02804 8.33084 5.98855 8.49776 5.89435 8.63118C5.80015 8.76468 5.65895 8.85368 5.50177 8.87876C5.4716 8.88376 5.4411 8.88626 5.41055 8.88626Z" fill="black" />
											</svg>
											<p>Trainers</p>
										</Link>
									</div>

									<div className={styles.linksRight}>
										<div className={styles.linksGroup}>
											<Tooltip title={'Billing'}>
												<Link className={url === '/app/billing' ? styles.linkGroupActive : styles.linkGroup} to={'/app/billing'}>
													<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
														<path d='M13.544 17.5479H6.05601C4.98074 17.5463 3.94994 17.1007 3.18961 16.3087C2.42929 15.5167 2.00148 14.443 2 13.3229V6.67374C2.00127 5.55353 2.42898 4.47956 3.18933 3.68738C3.94968 2.89519 4.98061 2.44945 6.05601 2.44791H13.544C14.6194 2.44923 15.6505 2.8949 16.4109 3.68714C17.1713 4.47937 17.599 5.55346 17.6 6.67374V13.3246C17.5983 14.4444 17.1704 15.5179 16.4101 16.3096C15.6498 17.1012 14.619 17.5466 13.544 17.5479ZM6.05601 3.69624C5.29874 3.69734 4.57278 4.01125 4.03739 4.56911C3.50199 5.12697 3.20085 5.88325 3.2 6.67207V13.3229C3.20106 14.1116 3.5023 14.8677 4.03767 15.4253C4.57305 15.983 5.29887 16.2968 6.05601 16.2979H13.544C14.3012 16.297 15.0271 15.9833 15.5626 15.4256C16.098 14.8678 16.3991 14.1117 16.4 13.3229V6.67374C16.3994 5.88485 16.0983 5.12844 15.5629 4.57053C15.0274 4.01262 14.3014 3.69879 13.544 3.69791L6.05601 3.69624Z' fill='black' />
														<path d='M12.825 13.7906C12.423 13.7906 12.0302 13.6665 11.6961 13.4339C11.3619 13.2013 11.1014 12.8707 10.9477 12.484C10.7938 12.0972 10.7536 11.6716 10.832 11.261C10.9104 10.8504 11.1039 10.4733 11.3882 10.1773C11.6723 9.88125 12.0344 9.67967 12.4286 9.598C12.8227 9.51633 13.2313 9.55817 13.6026 9.71842C13.9739 9.87858 14.2912 10.1499 14.5145 10.498C14.7378 10.8461 14.857 11.2553 14.857 11.6739C14.8563 12.2351 14.642 12.7732 14.2611 13.1699C13.8802 13.5668 13.3637 13.79 12.825 13.7906ZM12.825 10.8073C12.6604 10.8073 12.4995 10.8581 12.3627 10.9533C12.2259 11.0486 12.1193 11.1839 12.0563 11.3423C11.9934 11.5007 11.9769 11.6749 12.009 11.843C12.041 12.0112 12.1203 12.1656 12.2366 12.2867C12.353 12.408 12.5013 12.4905 12.6626 12.524C12.8241 12.5574 12.9914 12.5402 13.1434 12.4747C13.2954 12.4091 13.4254 12.298 13.5167 12.1554C13.6082 12.0129 13.657 11.8453 13.657 11.6739C13.657 11.4441 13.5693 11.2237 13.4133 11.0612C13.2573 10.8986 13.0456 10.8073 12.825 10.8073Z' fill='black' />
														<path d='M13.9147 8.48316C13.8127 8.48341 13.7125 8.45666 13.6234 8.40532C13.5342 8.35399 13.4591 8.27983 13.4051 8.18984L12.3067 6.36486C12.0235 5.89279 11.5721 5.55699 11.0515 5.43108C10.531 5.30517 9.98377 5.39943 9.52985 5.69319L5.54025 8.29567C5.43901 8.37007 5.31851 8.41074 5.19464 8.41232C5.03514 8.41232 4.88211 8.34666 4.76896 8.22954C4.6558 8.11245 4.5917 7.95348 4.59065 7.78734C4.59007 7.67547 4.61845 7.56551 4.67279 7.46902C4.72713 7.37252 4.80543 7.29307 4.89945 7.23902L8.89385 4.63318C9.61777 4.16453 10.4905 4.01382 11.3209 4.21407C12.1513 4.4143 12.8716 4.94917 13.3243 5.70152L14.4227 7.52568C14.4794 7.6203 14.5109 7.72902 14.5138 7.84056C14.5167 7.9521 14.4908 8.06241 14.439 8.16007C14.3872 8.25772 14.3112 8.33916 14.2191 8.39599C14.1269 8.45282 14.0218 8.48291 13.9147 8.48316Z' fill='black' />
														<path d='M17 8.48307H2.6C2.44087 8.48307 2.28826 8.41724 2.17574 8.3C2.06322 8.1828 2 8.02382 2 7.85806C2 7.6923 2.06322 7.53333 2.17574 7.41611C2.28826 7.2989 2.44087 7.23306 2.6 7.23306H17C17.1591 7.23306 17.3118 7.2989 17.4242 7.41611C17.5368 7.53333 17.6 7.6923 17.6 7.85806C17.6 8.02382 17.5368 8.1828 17.4242 8.3C17.3118 8.41724 17.1591 8.48307 17 8.48307Z' fill='black' />
													</svg>
												</Link>
											</Tooltip>

											<Tooltip title={'Settings'}>
												<Link className={url === '/app/settings' ? styles.linkGroupActive : styles.linkGroup} to={'/app/settings'}>
													<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
														<path fillRule='evenodd' clipRule='evenodd' d='M10.2007 8.375C11.0622 8.375 11.7607 9.1025 11.7607 10C11.7607 10.8975 11.0622 11.625 10.2007 11.625C9.33911 11.625 8.64071 10.8975 8.64071 10C8.64071 9.1025 9.33911 8.375 10.2007 8.375ZM12.9607 10C12.9607 8.41217 11.7249 7.125 10.2007 7.125C8.67639 7.125 7.44067 8.41217 7.44067 10C7.44067 11.5878 8.67639 12.875 10.2007 12.875C11.7249 12.875 12.9607 11.5878 12.9607 10Z' fill='black' />
														<path fillRule='evenodd' clipRule='evenodd' d="M8.28137 2.12288C8.89585 1.9609 9.53889 1.875 10.2003 1.875C10.8618 1.875 11.5048 1.96091 12.1195 2.12292C12.6462 2.26177 12.9147 2.73433 13.0004 3.12043C13.0947 3.54509 13.3505 3.92736 13.7404 4.16186C14.0989 4.37747 14.5041 4.42813 14.878 4.33631C15.2482 4.24539 15.7727 4.28689 16.1256 4.71586C16.7502 5.47517 17.243 6.35644 17.5663 7.32117C17.7691 7.92625 17.4539 8.46633 17.1292 8.745C16.7808 9.04408 16.5603 9.49492 16.5603 10C16.5603 10.5051 16.7808 10.9559 17.1292 11.255C17.4539 11.5337 17.7691 12.0737 17.5663 12.6788C17.243 13.6434 16.7503 14.5247 16.1258 15.2839C15.7729 15.7129 15.2483 15.7544 14.8781 15.6634C14.5041 15.5716 14.0989 15.6223 13.7403 15.8379C13.3504 16.0724 13.0947 16.4547 13.0003 16.8795C12.9147 17.2656 12.6462 17.7382 12.1193 17.8771C11.5047 18.0391 10.8618 18.125 10.2003 18.125C9.53889 18.125 8.89593 18.0391 8.28137 17.8772C7.75456 17.7383 7.48607 17.2656 7.40032 16.8795C7.30603 16.4547 7.0503 16.0724 6.66034 15.8379C6.30177 15.6223 5.89655 15.5716 5.5226 15.6635C5.1524 15.7544 4.62773 15.7129 4.27484 15.2839C3.65033 14.5247 3.15766 13.6435 2.83437 12.6788C2.63159 12.0737 2.94674 11.5337 3.27141 11.255C3.61984 10.956 3.84033 10.5051 3.84033 10C3.84033 9.49492 3.61984 9.044 3.27141 8.745C2.94674 8.46633 2.63159 7.92624 2.83437 7.32116C3.15769 6.35642 3.65044 5.47514 4.27504 4.71583C4.62792 4.28686 5.15252 4.24537 5.5227 4.33629C5.89662 4.42814 6.3018 4.37748 6.66034 4.16186C7.05026 3.92736 7.30597 3.54508 7.4003 3.12042C7.48607 2.73431 7.75455 2.26173 8.28137 2.12288ZM8.59801 3.32884C8.59481 3.33383 8.59073 3.34092 8.58641 3.35041C8.57985 3.36475 8.57385 3.38232 8.56937 3.4022C8.40321 4.15028 7.95013 4.82954 7.26034 5.24439C6.62669 5.62548 5.90691 5.71495 5.24728 5.55292C5.22827 5.54826 5.21053 5.54611 5.19534 5.54585C5.18519 5.54568 5.17724 5.54635 5.1715 5.5472C4.65491 6.17957 4.24661 6.91011 3.9759 7.70773C3.97915 7.71454 3.98426 7.72364 3.99197 7.73436C4.00297 7.74965 4.01736 7.76557 4.03448 7.78027C4.64771 8.30657 5.04033 9.10575 5.04033 10C5.04033 10.8942 4.64771 11.6934 4.03448 12.2197C4.01736 12.2344 4.00296 12.2503 3.99196 12.2657C3.98426 12.2763 3.97915 12.2854 3.9759 12.2922C4.24658 13.0898 4.65482 13.8202 5.17132 14.4526C5.17706 14.4534 5.18501 14.4541 5.19517 14.4539C5.21036 14.4537 5.2281 14.4515 5.24712 14.4468C5.90678 14.2848 6.62664 14.3742 7.26034 14.7553C7.95021 15.1702 8.40337 15.8496 8.56945 16.5978C8.57385 16.6177 8.57993 16.6352 8.58641 16.6496C8.59073 16.6591 8.59481 16.6662 8.59809 16.6712C9.11041 16.8042 9.64705 16.875 10.2003 16.875C10.7536 16.875 11.2903 16.8042 11.8026 16.6712C11.8059 16.6662 11.8099 16.6591 11.8143 16.6496C11.8208 16.6352 11.8268 16.6177 11.8312 16.5977C11.9974 15.8496 12.4505 15.1702 13.1403 14.7553C13.774 14.3742 14.4939 14.2848 15.1535 14.4468C15.1726 14.4515 15.1903 14.4537 15.2055 14.4539C15.2156 14.4541 15.2235 14.4534 15.2293 14.4526C15.7458 13.8202 16.154 13.0897 16.4247 12.2922C16.4215 12.2854 16.4163 12.2763 16.4087 12.2657C16.3977 12.2503 16.3833 12.2344 16.3662 12.2197C15.7529 11.6934 15.3603 10.8942 15.3603 10C15.3603 9.10583 15.7529 8.30658 16.3662 7.78028C16.3833 7.76558 16.3977 7.74967 16.4087 7.73437C16.4163 7.72365 16.4215 7.71455 16.4247 7.70773C16.154 6.91012 15.7457 6.17959 15.2291 5.54722C15.2234 5.54637 15.2155 5.54569 15.2053 5.54587C15.1901 5.54613 15.1724 5.54827 15.1534 5.55295C14.4938 5.71494 13.774 5.62546 13.1404 5.24439C12.4506 4.82955 11.9975 4.1503 11.8313 3.40223C11.8269 3.38234 11.8209 3.36478 11.8143 3.35044C11.81 3.34094 11.8059 3.33385 11.8027 3.32887C11.2903 3.1958 10.7537 3.125 10.2003 3.125C9.64697 3.125 9.11041 3.19578 8.59801 3.32884Z" fill="black" />
													</svg>
												</Link>
											</Tooltip>
										</div>

										<UserDropdown
											image={user.profile_picture_url}
											onClick={async event => {
												if (event.target.value === 'logout') {
													await wretch('/api/oauth/logout').get().res()
													removeItem()
													dispatch(setUser(null))
													navigate('/')
												} else {
													navigate(event.target.value)
												}
											}}
											options={[
												{
													id: 'calendar',
													name: 'Calendar',
													value: '/app/calendar',
													showOnDesktop: false,
												},
												{
													id: 'trainers',
													name: 'Trainers',
													value: '/app/trainers',
													showOnDesktop: false,
												},
												{
													id: 'billing',
													name: 'Billing',
													value: '/app/billing',
													showOnDesktop: false,
												},
												{
													id: 'settings',
													name: 'Settings',
													value: '/app/settings',
													showOnDesktop: false,
												},
												{
													id: 'logout',
													name: 'Logout',
													value: 'logout',
													showOnDesktop: true,
												},
											]}
										/>
									</div>
								</>
							) : (
								<button
									className={styles.githubButton}
									disabled={isLoading}
									onClick={async () => {
										setIsLoading(true)
										const response: OAuthResponse = await wretch('/api/oauth').get().json()
										if (response) {
											if (response.error) {
												console.error(response.error)
											} else if (response.url) {
												setItem('true')
												window.location.href = response.url
											}
										}
									}}
								>
									Login with GitHub
								</button>
							)}
						</nav>
					</div>
				</div>
			</div>
		</header>
	)
}
