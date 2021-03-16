Date.prototype.TimeZone = new Map([
	['Europe/London', 0],
	['Asia/Shanghai', -8],
	['America/New_York', 5]
])

Date.prototype.zoneDate = function() {
	if (process.env.TZ == undefined) {
		return new Date()
	} else {
		for (let item of this.TimeZone.entries()) {
			if (item[0] == process.env.TZ) {
				let d = new Date()
				d.setHours(d.getHours() + item[i])
				return d
			}
		}
		return new Date()
	}
}

var date = new Date().zoneDate()
console.log(date)
