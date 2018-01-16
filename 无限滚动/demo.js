function inBottomRange(distance) {
	if (document.documentElement.scrollHeight < window.innerHeight) {
		return false;
	}
	let dis = document.documentElement.scrollHeight - window.pageYOffset - window.innerHeight;
	return dis < distance;
}

function throttle(fn, delay) {
	let timer = null,
		firstTime = true;
	return function () {
		let ctx = this,
			args = arguments;
		if (firstTime) {
			fn.apply(ctx, args);
			return firstTime = false;
		}
		if (timer) {
			return false;
		}
		timer = setTimeout(function () {
			clearTimeout(timer);
			timer = null;
			fn.apply(ctx, args);
		}, delay);
	};
}

window.onscroll = throttle(function () {
	if (inBottomRange(500)) {
		console.log('test');
	}
}, 2000);