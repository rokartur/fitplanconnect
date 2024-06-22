import { Member } from '@/models/Member'

export class Trainer extends Member {
	constructor(data: Trainer | any) {
		super(data.id, data.name, data.username, data.email, data.profile_picture_url)
	}
}
