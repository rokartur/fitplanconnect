import { Member } from '@/models/Member'

export class Trainer extends Member {
	constructor(data: Trainer | any) {
		super(data.id, data.name, data.username, data.email, data.profile_picture_url)
	}

	static fromJson(data: any) {
		return new Trainer({
			id: data.id,
			name: data.name,
			username: data.username,
			email: data.email,
			profile_picture_url: data.profile_picture_url
		})
	}

	static fromJsonList(data: any) {
		return data.map((item: any) => Trainer.fromJson(item))
	}
}
