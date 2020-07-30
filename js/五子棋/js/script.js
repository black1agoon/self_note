var chessBoard = [];
var me = true;
var over = false;

// 赢法数组 
var wins = []; // 三维数组
var myWin = []; // 记录某赢法（落点次数）的统计数组, 比如myWin[k]=5就代表赢了。K为第K种赢法
var computerWin = [];


for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
}

// 初始化赢法数组
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for(var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}

var count = 0; // 赢法数
for (var i = 0; i < 15; i++) { // 所有横线的赢法
	for(var j = 0; j < 11; j++) {
		// wins[0][0][0] = true
		// wins[0][1][0] = true
		// wins[0][2][0] = true
		// wins[0][3][0] = true
		// wins[0][4][0] = true

		// wins[0][1][1] = true
		// wins[0][2][1] = true
		// wins[0][3][1] = true
		// wins[0][4][1] = true
		// wins[0][5][1] = true
		for (var k = 0; k < 5; k++) {
			wins[i][j + k][count] = true;
		}
		count++;
	}
}

for (var i = 0; i < 15; i++) {  // 所有竖线的赢法
	for(var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j + k][i][count] = true;
		}
		count++;
	}
}

for (var i = 0; i < 11; i++) {  // 所有斜线的赢法
	for(var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j + k][count] = true;
		}
		count++;
	}
}

for (var i = 0; i < 11; i++) {  // 所有斜线的赢法
	for(var j = 14; j > 3; j--) {
		// wins[0][14][0] = true
		// wins[1][13][0] = true
		// wins[2][12][0] = true
		// wins[3][11][0] = true
		// wins[4][10][0] = true
		for (var k = 0; k < 5; k++) {
			wins[i + k][j - k][count] = true;
		}
		count++;
	}
}

console.log(count);
for (var i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = '#bfbfbf';

var logo = new Image()
logo.src = "img/image.png";
logo.onload = function() {
	// context.drawImage(logo, 0, 0, 450, 450);
	drawChessBoard();
}

var drawChessBoard = function() {
	for (var i=0; i<15; i++) {
		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30, 435);
		context.stroke();  // 描边

		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();
	}	
}

var oneStep = function(i, j, me) {
	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	context.closePath();

	var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);  // 创建渐变对象
	if (me) { // 给棋子加渐变
		gradient.addColorStop(0, "#0a0a0a");
		gradient.addColorStop(1, "#636766");	
	} else {
		gradient.addColorStop(0, "#d1d1d1");
		gradient.addColorStop(1, "#f9f9f9");	
	}
	
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e) {
	if (over) {
		return;
	}
	if (!me) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if (chessBoard[i][j] === 0) {
		oneStep(i, j, me);
		chessBoard[i][j] = 1;
		// if (me) {
		// 	chessBoard[i][j] = 1;
		// } else {
		// 	chessBoard[i][j] = 2;
		// }
		for (var k = 0; k < count; k++) { // 如果第K中赢法，有5个点落下，则表示赢 
			if (wins[i][j][k]) {
				myWin[k]++;
				computerWin[k] = 6;
				if (myWin[k] == 5) {
					window.alert('你赢了');
					over = true;
				}
			}
		}
		if (!over) {
			me = !me;
			computerAI();
		}
	}
}

var computerAI = function() {
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0, v = 0;
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (chessBoard[i][j] == 0) {
				for (var k = 0; k < count; k++) { // 遍历了多个赢法，一个点在多种赢法上，那么分数会累加
					if (wins[i][j][k]) { // 第K种赢法 在i, j这个点是true(代表没落子的点)
						if(myWin[k] == 1) {
							myScore[i][j] +=200;
						} else if (myWin[k] == 2) {
							myScore[i][j] += 400;
						} else if (myWin[k] == 3) {
							myScore[i][j] += 2000;
						} else if (myWin[k] == 4) {
							myScore[i][j] += 10000;
						}
						if(computerWin[k] == 1) {
							computerScore[i][j] +=220;
						} else if (computerWin[k] == 2) {
							computerScore[i][j] += 420;
						} else if (computerWin[k] == 3) {
							computerScore[i][j] += 2100;
						} else if (computerWin[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if (myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				} else if (myScore[i][j] === max) {
					if (computerScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}
				if (computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;
				} else if (computerScore[i][j] === max) {
					if (myScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	chessBoard[u][v] = 2;
	for (var k = 0; k < count; k++) { // 如果第K中赢法，有5个点落下，则表示赢 
		if (wins[u][v][k]) {
			computerWin[k]++;
			myWin[k] = 6;
			if (computerWin[k] == 5) {
				window.alert('计算机赢了');
				over = true;
			}
		}
	}
	if (!over) {
		me = !me;
	}
}