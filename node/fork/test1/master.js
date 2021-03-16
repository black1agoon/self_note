const child = require('child_process').fork('worker.js')
const server = require('net').createServer()

server.on('connention', socket => {
	socket.end('handled by parent')
})

server.listen(1337, function() {
	child.send('server', server)
})