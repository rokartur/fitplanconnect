import styles from '@/styles/calendar.module.scss'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { range } from 'lodash-es'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { ScheduleMeeting } from 'react-schedule-meeting'
import Swal from 'sweetalert2'
import wretch from 'wretch'
import { AnimateWrapper } from '@/components/animateWrapper/animateWrapper.tsx'
import { Button } from '@/components/button/button.tsx'
import { Container } from '@/components/container/container.tsx'
import { Overlay } from '@/components/overlay/overlay.tsx'
import { SEO } from '@/components/seo.tsx'
import { Tooltip } from '@/components/tooltip/tooltip.tsx'
import { useAppSelector } from '@/utils/store.ts'

const metaData = {
	title: 'Calendar',
	description: '',
	path: '/app/calendar',
}

type Timeslot = {
	id: number
	startTime: Date
	endTime: Date
}

type Meetings = {
	available: Timeslot[]
	unavailable: Timeslot[]
}

type DayData = {
	displayDate: string
	selectedDate: Date
}

type AllMeetings = {
	id: string
	userId: string
	trainerID: string
	startTime: string
	endTime: string
}[]

export default function Calendar() {
	const navigate = useNavigate()
	const user = useAppSelector(state => state.user.data)
	const trainers = useAppSelector(state => state.trainers.data)
	const [view, setView] = useState<string>('upcoming')
	const availableTimeslots: Timeslot[] = useMemo(
		() =>
			Array.from({ length: 30 }, (_, i) => {
				const date = new Date()
				date.setDate(date.getDate() + i)
				return {
					id: i,
					startTime: new Date(new Date(date).setHours(8, 0, 0, 0)),
					endTime: new Date(new Date(date).setHours(17, 0, 0, 0)),
				}
			}),
		[],
	)
	const [meetings, setMeetings] = useReducer((prev: Meetings, next: Meetings) => ({ ...prev, ...next }), {
		available: availableTimeslots,
		unavailable: [],
	})
	const eventDuration: number = 60
	const eventGap: number = 0
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<number[]>([])
	const [allHoursPerDay, setAllHoursPerDay] = useState<number[]>([])
	const [allGapsPerDay, setAllGapsPerDay] = useState<Date[]>([])
	const [dayData, setDayData] = useState<DayData | null>(null)

	const changeDayData = (
		date: Date = new Date(
			moment().get('year'),
			moment().get('month'),
			moment().get('date'),
			moment().set('hour', 0).get('hour'),
			moment().set('minute', 0).get('minute'),
			moment().set('second', 0).get('second'),
		),
	) => {
		const displayDate = moment(date).format('ddd. DD MMMM')

		setDayData({ displayDate, selectedDate: date })

		const allHoursPerDay = meetings.available.reduce((hours: number[], meet) => {
			if (moment(meet.startTime).isSame(date, 'day')) {
				const startDay = Number(moment(meet.startTime).format('HH'))
				const endDay = Number(moment(meet.endTime).format('HH')) + 1
				return [...hours, ...range(startDay, endDay)]
			}
			return hours
		}, [])

		setAllHoursPerDay(allHoursPerDay)

		const allGapsPerDay = meetings.unavailable.reduce((gaps: Date[], meet) => {
			if (moment(meet.startTime).startOf('day').isSame(date)) {
				return [...gaps, meet.startTime]
			}
			return gaps
		}, [])

		setAllGapsPerDay(allGapsPerDay)
	}

	useEffect(() => {
		changeDayData()

		if (user) {
			if (isNaN(moment(user.subscription_expiration_date).unix())) {
				navigate('/app/billing')
			} else if (moment().unix() > moment(user.subscription_expiration_date).unix()) {
				navigate('/app/billing')
			}
		}
	}, [])

	useEffect(() => {
		const fetchMeetings = async () => {
			const data: AllMeetings = await wretch('/api/meetings').get().json()
			if (!data) return

			setMeetings({
				available: availableTimeslots,
				unavailable: data?.map(({ startTime, endTime }, index) => ({
					id: index,
					startTime: new Date(startTime),
					endTime: new Date(endTime),
				})),
			})
		}

		fetchMeetings().then()
	}, [])

	return (
		<>
			<SEO title={metaData.title} description={metaData.description} path={metaData.path} />

			<Overlay>
				<AnimateWrapper>
					<Container>
						<div className={styles.content}>
							<div className={styles.scheduleMeeting}>
								<div className={styles.calenMain}>
									<ScheduleMeeting
										borderRadius={12}
										primaryColor={'#CD66FF'}
										eventDurationInMinutes={eventDuration}
										eventStartTimeSpreadInMinutes={eventGap}
										availableTimeslots={meetings.available}
										onSelectedDayChange={date => changeDayData(date)}
										startTimeListStyle={'grid'}
									/>

									<div className={styles.scheduleMeetingDivider} />

									<div className={styles.selectedDayHoursContainer}>
										<p className={styles.headingDisplayDate}>{dayData?.displayDate}</p>
										{dayData && (
											<div className={styles.hoursListPerDay}>
												{allHoursPerDay.length === 0 ? (
													<div className={styles.hourListError}>
														<p>No available hours</p>
													</div>
												) : (
													allHoursPerDay.map((hour, index) => {
														const buttonTime = Number(moment(dayData.selectedDate).set('hour', hour).format('HH'))
														const isUnavailable = allGapsPerDay.some((day: Date) => buttonTime === day.getHours())
														const isPast =
															moment(dayData.selectedDate).add(buttonTime, 'hour').unix() <= moment().unix()
														const isSelected =
															selectedTimeSlot[0] === moment(dayData.selectedDate).set('hour', hour).unix()

														const buttonClass = isSelected ? styles.hourButtonActive : styles.hourButton
														const buttonOnClick = () =>
															setSelectedTimeSlot([
																moment(dayData.selectedDate).set('hour', hour).unix(),
																moment(dayData.selectedDate).set('hour', hour).add(eventDuration, 'minute').unix(),
															])

														return (
															<Tooltip key={index} title={isUnavailable || isPast ? 'Hour is unavailable' : ''}>
																<button
																	className={buttonClass}
																	disabled={isUnavailable || isPast}
																	onClick={buttonOnClick}
																>
																	{hour}:00
																</button>
															</Tooltip>
														)
													})
												)}
											</div>
										)}
									</div>
								</div>

								<div className={styles.actions}>
									<Button
										size={'medium'}
										label={'Book your training'}
										onClick={async () => {
											if (selectedTimeSlot.length === 0) {
												await Swal.fire({
													title: 'Please select a time slot',
													icon: 'error',
												})
												return
											}

											if (!user) return

											if (user.selected_trainer_id === '' || !user.selected_trainer_id) {
												await Swal.fire({
													title: 'Please select a trainer',
													icon: 'error',
												})
												navigate('/app/trainers')
												return
											}

											await wretch('/api/meetings')
												.post({
													userId: user.id,
													trainerID: user.selected_trainer_id,
													startTime: new Date(selectedTimeSlot[0] * 1000),
													endTime: new Date(selectedTimeSlot[1] * 1000),
												})
												.json(json => console.log(json))
												.then(() => {
													Swal.fire({
														title: 'Meeting scheduled',
														icon: 'success',
													}).then(() => {
														location.reload()
													})
												})
												.catch(() => {
													Swal.fire({
														title: 'An error occurred',
														icon: 'error',
													}).then(() => {
														location.reload()
													})
												})
										}}
									/>
								</div>
							</div>

							<div className={styles.scheduleRightPanel}>
								<div className={styles.scheduleRightPanelActions}>
									<button
										className={view === 'upcoming' ? styles.rightPanelButtonActive : styles.rightPanelButton}
										onClick={() => setView('upcoming')}
									>
										<span>
											<svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M3.08105 7.88574C3.08105 7.54057 3.34968 7.26074 3.68105 7.26074H16.2398C16.5711 7.26074 16.8398 7.54057 16.8398 7.88574C16.8398 8.23092 16.5711 8.51075 16.2398 8.51075H3.68105C3.34968 8.51075 3.08105 8.23092 3.08105 7.88574Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M12.7832 1.875C13.1146 1.875 13.3832 2.15483 13.3832 2.5V4.89358C13.3832 5.23875 13.1146 5.51858 12.7832 5.51858C12.4519 5.51858 12.1832 5.23875 12.1832 4.89358V2.5C12.1832 2.15483 12.4519 1.875 12.7832 1.875Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M7.14126 1.875C7.47264 1.875 7.74126 2.15483 7.74126 2.5V4.89358C7.74126 5.23875 7.47264 5.51858 7.14126 5.51858C6.80989 5.51858 6.54126 5.23875 6.54126 4.89358V2.5C6.54126 2.15483 6.80989 1.875 7.14126 1.875Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M4.15815 4.06386C4.87546 3.35349 5.87285 3.02332 7.00649 3.02332H12.9184C14.0544 3.02332 15.0522 3.35325 15.7683 4.06447C16.4888 4.7801 16.8462 5.80434 16.843 7.02617V9.47004C16.843 9.81529 16.5744 10.095 16.243 10.095C15.9116 10.095 15.643 9.81529 15.643 9.47004V7.02542V7.02357C15.6457 6.05908 15.3692 5.39517 14.9402 4.96916C14.5066 4.53853 13.8391 4.27332 12.9184 4.27332H7.00649C6.08905 4.27332 5.42069 4.53829 4.98498 4.96978C4.5539 5.39669 4.27495 6.06141 4.27495 7.02542V13.6078C4.27495 14.5917 4.55573 15.2735 4.98917 15.7111C5.42558 16.1518 6.09266 16.4215 7.00649 16.4215H8.72675C9.05811 16.4215 9.32675 16.7013 9.32675 17.0465C9.32675 17.3916 9.05811 17.6715 8.72675 17.6715H7.00649C5.86925 17.6715 4.87056 17.3322 4.15398 16.6087C3.43441 15.8822 3.07495 14.8446 3.07495 13.6078V7.02542C3.07495 5.80263 3.43623 4.7788 4.15815 4.06386Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M13.8353 11.6879C12.4606 11.6879 11.3459 12.8495 11.3459 14.2819C11.3459 15.714 12.4604 16.875 13.8353 16.875C15.2111 16.875 16.3256 15.714 16.3256 14.2819C16.3256 12.8496 15.2108 11.6879 13.8353 11.6879ZM10.1459 14.2819C10.1459 12.1595 11.7975 10.4379 13.8353 10.4379C15.8738 10.4379 17.5256 12.1595 17.5256 14.2819C17.5256 16.4045 15.8736 18.125 13.8353 18.125C11.7977 18.125 10.1459 16.4044 10.1459 14.2819Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M13.8185 12.5774C14.1499 12.5774 14.4185 12.8572 14.4185 13.2024V14.1556L15.1031 14.5819C15.3876 14.759 15.4804 15.1426 15.3104 15.439C15.1404 15.7353 14.772 15.8319 14.4876 15.6549L13.5107 15.0467C13.3295 14.9339 13.2185 14.7301 13.2185 14.5102V13.2024C13.2185 12.8572 13.4871 12.5774 13.8185 12.5774Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M6.23657 10.7804C6.23657 10.4352 6.5052 10.1554 6.83657 10.1554C7.16795 10.1554 7.43708 10.4352 7.43708 10.7804C7.43708 11.1256 7.16845 11.4054 6.83708 11.4054C6.50571 11.4054 6.23657 11.1256 6.23657 10.7804Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M9.17871 10.7804C9.17871 10.4352 9.44735 10.1554 9.77871 10.1554C10.1101 10.1554 10.3792 10.4352 10.3792 10.7804C10.3792 11.1256 10.1106 11.4054 9.77919 11.4054C9.44783 11.4054 9.17871 11.1256 9.17871 10.7804Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M6.23657 13.606C6.23657 13.2608 6.5052 12.981 6.83657 12.981C7.16795 12.981 7.43708 13.2608 7.43708 13.606C7.43708 13.9512 7.16845 14.231 6.83708 14.231C6.50571 14.231 6.23657 13.9512 6.23657 13.606Z'
													fill='#374151'
												/>
											</svg>
										</span>
										Upcoming Meetings
									</button>

									<button
										className={view === 'held' ? styles.rightPanelButtonActive : styles.rightPanelButton}
										onClick={() => setView('held')}
									>
										<span>
											<svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M4.33135 4.12719C5.06657 3.39906 6.08987 3.05981 7.25533 3.05981H13.3516C14.5197 3.05981 15.5435 3.3988 16.2777 4.12776C17.0163 4.86112 17.3836 5.91172 17.3803 7.16791V14.0113C17.3803 15.2676 17.0113 16.3193 16.2727 17.0541C15.5382 17.7847 14.5145 18.1261 13.3454 18.1261H7.25533C6.08616 18.1261 5.06159 17.7772 4.32711 17.0355C3.58967 16.2907 3.22034 15.2262 3.22034 13.9546V7.16725C3.22034 5.91011 3.59149 4.8599 4.33135 4.12719ZM5.15818 5.03311C4.70925 5.4777 4.42034 6.16871 4.42034 7.16725V13.9546C4.42034 14.9734 4.71107 15.6822 5.16242 16.1381C5.61671 16.5968 6.30963 16.8761 7.25533 16.8761H13.3454C14.2974 16.8761 14.9911 16.6004 15.4439 16.1501C15.8924 15.7039 16.1803 15.0107 16.1803 14.0113V7.16725V7.16546C16.1831 6.16646 15.8966 5.47625 15.4497 5.03255C14.9982 4.5842 14.3046 4.30981 13.3516 4.30981H7.25533C6.30593 4.30981 5.61173 4.58394 5.15818 5.03311ZM8.98587 11.5529C9.22019 11.797 9.22019 12.1927 8.98587 12.4367L7.7996 13.6725C7.56529 13.9166 7.18539 13.9166 6.95107 13.6725L6.3416 13.0376C6.10729 12.7935 6.10729 12.3978 6.3416 12.1537C6.57592 11.9097 6.95582 11.9097 7.19013 12.1537L7.37534 12.3467L8.13733 11.5529C8.37164 11.3088 8.75155 11.3088 8.98587 11.5529Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M8.9855 7.51045C9.21982 7.75452 9.21982 8.15026 8.9855 8.39433L7.79926 9.63C7.56495 9.87408 7.18505 9.87408 6.95073 9.63L6.34126 8.99517C6.10695 8.75108 6.10695 8.35533 6.34126 8.11126C6.57557 7.86718 6.95548 7.86718 7.18979 8.11126L7.375 8.30418L8.13698 7.51045C8.3713 7.26637 8.75118 7.26637 8.9855 7.51045Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M10.0453 13.1411C10.0453 12.7959 10.3139 12.5161 10.6453 12.5161H13.8351C14.1665 12.5161 14.4351 12.7959 14.4351 13.1411C14.4351 13.4863 14.1665 13.7661 13.8351 13.7661H10.6453C10.3139 13.7661 10.0453 13.4863 10.0453 13.1411Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M10.0453 9.10156C10.0453 8.7564 10.3139 8.47656 10.6453 8.47656H13.8351C14.1665 8.47656 14.4351 8.7564 14.4351 9.10156C14.4351 9.44673 14.1665 9.72656 13.8351 9.72656H10.6453C10.3139 9.72656 10.0453 9.44673 10.0453 9.10156Z'
													fill='#374151'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M7.39517 1.875C7.72653 1.875 7.99517 2.15483 7.99517 2.5V4.64703C7.99517 4.99221 7.72653 5.27203 7.39517 5.27203C7.0638 5.27203 6.79517 4.99221 6.79517 4.64703V2.5C6.79517 2.15483 7.0638 1.875 7.39517 1.875ZM13.2121 1.875C13.5435 1.875 13.8121 2.15483 13.8121 2.5V4.64703C13.8121 4.99221 13.5435 5.27203 13.2121 5.27203C12.8807 5.27203 12.6121 4.99221 12.6121 4.64703V2.5C12.6121 2.15483 12.8807 1.875 13.2121 1.875Z'
													fill='#374151'
												/>
											</svg>
										</span>
										Held Meetings
									</button>
								</div>

								<div className={styles.scheduleRightPanelActionsMeetings}>
									{view === 'upcoming' ? (
										<>
											{user?.meetings.map(({ trainerID, startTime, endTime }, index) => {
												if (moment(startTime).unix() > moment().unix()) {
													return (
														<div key={index} className={styles.meeting}>
															<div className={styles.leftSide}>
																<p>Training</p>
																<p>w/ {trainers?.find(trainer => trainer.id === trainerID)?.name}</p>
															</div>

															<div className={styles.rightSide}>
																<p>{moment(startTime).format('DD.MM.YYYY, HH:mm')} -{' '}{moment(endTime).format('HH:mm')}</p>
																<p>&nbsp;</p>
															</div>
														</div>
													)
												}
											})}
										</>
									) : (
										<>
											{user?.meetings.map(({ trainerID, startTime, endTime }, index) => {
												if (moment(endTime).unix() < moment().unix()) {
													return (
														<div key={index} className={`${styles.meeting} ${view === 'held' ? styles.meetingDisable : ''}`}>
															<div className={styles.leftSide}>
																<p>Training</p>
																<p>w/ {trainers?.find(trainer => trainer.id === trainerID)?.name}</p>
															</div>

															<div className={styles.rightSide}>
																<p>{moment(startTime).format('DD.MM.YYYY, HH:mm')} -{' '}{moment(endTime).format('HH:mm')}</p>
																<p>&nbsp;</p>
															</div>
														</div>
													)
												}
											})}
										</>
									)}
								</div>
							</div>
						</div>
					</Container>
				</AnimateWrapper>
			</Overlay>
		</>
	)
}
