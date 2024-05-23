import styles from '@/styles/calendar.module.scss'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { range } from 'lodash-es'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { ScheduleMeeting } from 'react-schedule-meeting'
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
	user_id: string
	trainer_id: string
	start_time: string
	end_time: string
}[]

export default function Calendar() {
	const navigate = useNavigate()
	const user = useAppSelector(state => state.user.data)
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

		const fetchMeetings = async () => {
			const data: AllMeetings = await wretch('/api/meetings').get().json()
			setMeetings({
				available: availableTimeslots,
				unavailable: data.map(meeting => ({
					id: Number(meeting.id),
					startTime: new Date(meeting.start_time),
					endTime: new Date(meeting.end_time),
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
									<Button size={'medium'} label={'Book your training'} />
								</div>
							</div>

							<div>
							{/*
							TODO list of upcoming and past meetings
							*/}
							</div>
						</div>
					</Container>
				</AnimateWrapper>
			</Overlay>
		</>
	)
}
