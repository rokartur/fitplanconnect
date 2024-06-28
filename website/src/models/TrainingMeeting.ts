import { Meeting } from '@/models/Meeting'

export class TrainingMeeting extends Meeting {
	userID: string
	trainerID: string

	constructor(startTime: Date, endTime: Date, userID: string, trainerID: string) {
		super(startTime, endTime)
		this.userID = userID
		this.trainerID = trainerID
	}

	getUserID(): string {
		return this.userID
	}

	getTrainerID(): string {
		return this.trainerID
	}
}
