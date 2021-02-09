var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 3004})
wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		console.log('received: %s', message)
	})
	ws.send('I am a message sent from a ws server')
})