function addzero (i) {
		if(i < 10){
			return "0" + i;
		}
		return i;
}
function shoW(){
	var i;
    dd = new Array("日","一","二","三","四","五","六");
	var d = new Date();
	//年，月，日
	time = d.getFullYear() + "年";
	time += (d.getMonth() + 1) + "月";
	time += d.getDate() + "日";

	//星期几
	time += "   星期" + dd[d.getDay()] + "    ";
	//时，分，秒
	
	time += addzero (d.getHours()) + ":";
	
	time += addzero (d.getMinutes()) + ":";
	
	time += addzero ( d.getSeconds());
	//显示
	alert(time);
	}
