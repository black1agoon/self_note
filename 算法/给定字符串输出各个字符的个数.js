var str = 'fdjskfjoiqwoeiwlmdx;;;';

var obj = {};

for (let i of str) {
	// console.log(i)
	if (obj.hasOwnProperty(i)) {
		obj[i]++
	} else {
		obj[i] = 1
	}
}

for (let key of str) {
	console.log(key, ':', obj[key])
}