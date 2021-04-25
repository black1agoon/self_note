var co = require('co');

var p1 = new Promise((resolve, reject) => {
	resolve(1111)
})

var p2 = Promise.resolve(222);

function * gen() {
	var result = yield p1;
	// console.log(result);

	var result2 = yield p2;
	// console.log(result2)
	return result
}

// co(gen);
co(gen).then(function(val) {
	console.log(val)
})