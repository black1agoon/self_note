var eventEmitter = require('events')
var myEmitter = new eventEmitter()
myEmitter.on('begin', function() {
	console.log('begin')
})
myEmitter.on('begin', function() {
	console.log('begin2')
})
myEmitter.on('begin3', function() {
	console.log('begin')
})


myEmitter.emit('begin')

console.log(myEmitter.eventNames())