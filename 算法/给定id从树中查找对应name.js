var obj = [{
	name: '中国',
	id: 'aaa',
	children: [
		{
			name: '北京',
			id: 'bbb',
			children: [
				{
					name: '朝阳区',
					id: 'ccc',
					children: []
				}, {
					name: '天安门',
					id: 'ddd',
					children: [
						{
							name: '故宫',
							id: 'eee',
							children: []
						}
					]
				}
			]
		}, {
			name: '浙江',
			id: 'fff',
			children: [
				{
					name: '嘉兴市',
					id: 'ggg',
					children: [
						{
							name: '平湖',
							id: 'hhh',
							children: [
								{
									name: '乍浦',
									id: 'iii',
									children: [
										{
											name: '亭子桥',
											id: 'mmm'
										}
									]
								}, {
									name: '黄姑',
									id: 'jjj',
									children: []
								}
							]
						}
					]
				}, {
					name: '杭州市',
					id: 'kkk',
					children: [
						{
							name: '上城区',
							id: 'lll'
						}, {
							name: '下沙',
							id: 'nnn'
						}
					]
				}
			]
		}
	]
}]

// var list = []

// function recursion(oj) {
// 	oj.forEach(o => {
// 		list.push({
// 			name: o.name,
// 			id: o.id
// 		})
// 		if (o.children && o.children.length > 0) {
// 			recursion(o.children)
// 		}
// 	})
// }

// recursion(obj)
// console.log(list.find(l => l.id === 'mmm'))

function findName(id, obj) {

	let fun = (oj) => {
		oj.forEach(o => {
			if (o.id === id) {
				console.log(o.name)
			} else {
				fun(o.children ? o.children : [])
			}
		})
	}

	fun(obj)
}

findName('mmm', obj)


















