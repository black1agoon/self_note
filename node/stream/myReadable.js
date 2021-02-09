var Readable = require('stream').Readable
var util = require('util')

util.inherits(MyReadable, Readable)

function MyReadable(array) {
	Readable.call(this, {objectMode: true})
	this.array = array
}

MyReadable.prototype._read = function() {
	// console.log(this.array.length)
	console.log(this.array)
	if (this.array.length) {
		this.push(this.array.shift())
	} else {
		this.push(null)
	}
}

const array = ['a', 'b', 'c', 'd', 'e']
const read = new MyReadable(array)

read.on('data', function(data) {
	console.log('data', data)
})

read.on('end', function() {
	console.log('end')
})
