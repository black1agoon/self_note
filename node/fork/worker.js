var begin = process.argv[2]

console.log('I am worker ' + begin)

process.on('message', function(msg) {
	console.log('from parent ', msg)
	process.exit()
})

process.end({hello: 'parent'})