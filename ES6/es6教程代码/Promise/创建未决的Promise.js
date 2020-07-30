let fs = require('fs')

function readFile(filename) {
	return new Promise(function(resolve, reject)) {
		fs.readFile(filename, {encoding: 'utf8'}, function(err, contents) {
			// 检查错误
			if (err) {
				reject(err)
				return;
			}

			// 读取成功
			resolve(contents);
		})
	}
}

let promise = readFile('example.txt');
promise.then(function(content) {
	console.log(contents)
}, function(err) {
	console.error(err.message)
})
