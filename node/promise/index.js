var promise = new Promise(function(resolve, reject) {
	// throw new Error("get error")
	reject(new Error("get error2"))
})

promise.catch(function(error) {
	console.log(error)
})