var co = require('co');

var p1 = Promise.resolve(111);

var p2 = Promise.resolve(222);

function * gen() {
	var result = yield p1;
	console.log(result);

	var result2 = yield p2;
	console.log(result2)
}

// co(gen);
co(gen).then((val) => {
	console.log(val)
})