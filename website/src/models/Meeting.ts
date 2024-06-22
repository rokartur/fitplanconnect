export class Meeting {
	startTime: Date
	endTime: Date

	constructor(startTime: Date, endTime: Date) {
		this.startTime = startTime
		this.endTime = endTime
	}

	getStartTime(): Date {
		return this.startTime
	}

	getEndTime(): Date {
		return this.endTime
	}

	getDuration(): number {
		return (this.endTime.getTime() - this.startTime.getTime()) / 1000
	}
}
