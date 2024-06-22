export class Member {
	readonly id: string
	name: string
	username: string
	email: string
	profile_picture_url: string

	constructor(id: string, name: string, username: string, email: string, profile_picture_url: string) {
		this.id = id
		this.name = name
		this.username = username
		this.email = email
		this.profile_picture_url = profile_picture_url
	}

	getId() {
		return this.id
	}

	getName() {
		return this.name
	}

	getUsername() {
		return this.username
	}

	getEmail() {
		return this.email
	}

	getProfilePictureUrl() {
		return this.profile_picture_url
	}

	getInfo() {
		return `Member: ${this.name}, ${this.email}`;
	}
}
