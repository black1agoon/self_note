var http = require('http')
var fs = require('fs')
var server = http.createServer(function(req, res) {
	if (req.url == '/') {
		var fileList = fs.readdirSync('./')
		res.writeHead(200, {'Content-type': 'text/plain'})
		res.end(fileList.toString())
	} else {
		var path = req.url
		fs.readFile('.' + path, function(err, data) {
			if (err) {
				res.end('Internal Error')
				throw err
			}
			res.writeHead(200, {'Content-type': 'text/plain'})
			res.end(data)
		})
	}
})

var port = 3000
server.listen(port)
console.log('Listening on 3000')

process.on('uncaughtException', function() {
	console.log('got error')
})