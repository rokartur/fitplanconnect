import { Member } from '@/models/Member'

export class User extends Member {
	private selected_trainer_id: string
	private subscription_expiration_date: string
	private meetings: {
		id: string;
		userId: string;
		trainerID: string;
		startTime: Date;
		endTime: Date;
	}[]

	constructor(data: User | any) {
		super(data.id, data.name, data.email, data.email, data.profile_picture_url)
		this.selected_trainer_id = data.selected_trainer_id
		this.subscription_expiration_date = data.subscription_expiration_date
		this.meetings = data.meetings
	}

	getSelectedTrainerId() {
		return this.selected_trainer_id
	}

	setSelectTrainerId(trainerId: string) {
		this.selected_trainer_id = trainerId
	}

	getSubscriptionExpirationDate() {
		return this.subscription_expiration_date
	}

	setSubscriptionExpirationDate(date: string) {
		this.subscription_expiration_date = date
	}

	getMeetings() {
		return this.meetings
	}

	setMeetings(meetings: {
		id: string;
		userId: string;
		trainerID: string;
		startTime: Date;
		endTime: Date;
	}[]) {
		this.meetings = meetings
	}

	getInfo() {
		return `User: ${this.name}, ${this.email}, Trainer ID: ${this.selected_trainer_id}`;
	}
}
