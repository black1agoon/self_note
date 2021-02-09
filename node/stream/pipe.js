var stream = require('stream')
var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res) {
	if (req.url == '/') {
		var fileList = fs.readdirSync('./')
		res.writeHead(200, {'Content-type': 'text/plain'})
		res.end(fileList.toString())
	} else {
		var path = '.' + req.url
		var readStream = fs.createReadStream(path).pipe(res)
	}
})

var port = 3000
server.listen(port)
console.log('Listen on 3000')

process.on('uncaughtException', function() {
	console.log('got error')
})