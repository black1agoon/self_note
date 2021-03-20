function * Generator() {
	yield "Hello World";
	yield "From Lear";
	return "end";
}

var gen = Generator();
for (let i of gen) {
	console.log(i)
}

console.log(Array.from(Generator()))

console.log(gen[Symbol.iterator])