function showhidetxt(obj){
	var h_v = $(obj).css("height");
	if (h_v == 'auto'){		
		$(obj).css("height","96px");
	}else{
		$(obj).css("height","auto");
	}
}


var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return { //移动终端浏览器版本信息 
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
			iPad: u.indexOf('iPad') > -1, //是否iPad 
		};
	}(),
}
function getBrowserInfo(){ 
	var re = "" ;
	if(browser.versions.ios){
		re = re + "os=ios" ;
	}else{
		if(browser.versions.android){
			re = re + "os=android" ;
		}else{
			re = re + "os=others" ;
		}
	}
    var k = navigator.userAgent.toLowerCase();
	var ver = 0 ;
    try {
		var b = [];
		b = k.match(/micromessenger\/(\d)\.([0-9.]+)/);
		ver = b[1] ;
	}catch(f){
		ver = 0
    }
	re = re + "&wx=" + ver ;
	return re ;
}
var xmlhttpCmd = null;
var add_remove_classID = "";
var list =	"" ;
var showmore = true;
function GetXmlHttpObject(){
	var xmlHttp;
	try{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}catch (e){
		// Internet Explorer
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			try{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e){
				try{
					xmlHttp=new ActiveXObject("Msxml2.XMLHTTP.4.0");
				}catch (e){
					xmlHttp=null;
				}
			}
		}
	}
	return xmlHttp;
}
function setFlag(){
	showmore = true ;
}
function stateChanged(){
	if (xmlhttpCmd != null){
		if (xmlhttpCmd.readyState==4){
//			window.setTimeout('removeClassName(add_remove_classID,"list-more-loading")',500); 
			var ListMoreData = xmlhttpCmd.responseText ;
			divs = ListMoreData.split("@@@");
			list = divs[0];
			if(divs[1] ==0){
				list = "end" ;
//				document.getElementById("list-more").style.display="none" ;
//				document.getElementById("list-end").style.display="block" ;
			}
			if (divs[2] == undefined) {
				document.getElementById("listmore").style.display="none";
				document.getElementById("list-content").innerHTML = document.getElementById("list-content").innerHTML +"" ; 				
				setTimeout("setFlag()",1000);
			}else{
				$('#list-content').append(divs[2]);
				PBL('list-content','items fix');
				document.getElementById("listmore").style.display="none";
				setTimeout("setFlag()",1000);
				
//				document.getElementById("list-content").innerHTML = document.getElementById("list-content").innerHTML +divs[2] ;   
			}
//			hidejqmoldstyle();
			try{
				xmlhttpCmd.abort();
				xmlhttpCmd = null;
			}catch (e){
//				do nothing
//				window.scrollTo(0,getElementPos("list-more-root")); 
			}
		}	
	}
}
 function baidutj(id){
	var scurl = "/shangcheng/gotaobao/wxNotice/?id="+id;	
	_hmt.push(['_trackPageview', scurl]); 
}
function getMoreVideo(url){
//	showjqmoldstyle();
	if (xmlhttpCmd != null){
		try{
			xmlhttpCmd.abort();
			xmlhttpCmd = null;
		}catch (e){
			// do nothing
		}
	}
	xmlhttpCmd=GetXmlHttpObject();
	if (xmlhttpCmd==null){
		alert ("Your browser dosen't support AJAX");
		return;
	}else{
		xmlhttpCmd.onreadystatechange = stateChanged;
        xmlhttpCmd.open("GET",url,true);
        xmlhttpCmd.send(null);
	}
}

function scrollGetMoreVideo(url){
//	showjqmoldstyle();
	if (xmlhttpCmd != null){

	}else{
		xmlhttpCmd=GetXmlHttpObject();
		if (xmlhttpCmd==null){
			alert ("Your browser dosen't support AJAX");
			return;
		}else{
			xmlhttpCmd.onreadystatechange = stateChanged;
			xmlhttpCmd.open("GET",url,true);
			xmlhttpCmd.send(null);
		}
	}
}

function list_more(id){
	add_remove_classID=id;
	addClassName(id,"list-more-loading");
	if(list == "end"){
		window.setTimeout('removeClassName(add_remove_classID,"list-more-loading")',300); 
		document.getElementById("list-more").style.display="none" ;
		document.getElementById("list-end").style.display="block" ;
	}else{
		getMoreVideo("./listmore/?end=" + list);
	}	
}

function scrollGetMVideo(){
	scrollGetMoreVideo("./listmore/?end=" + list);
} 

function scroll_list_more(){
	if(list == "end"){
		document.getElementById("listmore").style.display="none";
		document.getElementById("listnone").style.display="";
		document.getElementById("listbr").style.display="none";
	}else{
		if(showmore){
			setTimeout("scrollGetMVideo()",500);
			showmore = false ;
		}
//		setTimeout("scrollGetMVideo()",800);
	}	
}

function addNextLoadList(nextList){
//	alert(nextList);
}

function stateSubjectChanged(){
	if (xmlhttpCmd != null){
		if (xmlhttpCmd.readyState==4){
			showElement("subject");
			document.getElementById("subject").innerHTML = xmlhttpCmd.responseText; 
//			setTimeout("gotop2()",1500);	
//			hidejqmoldstyle();		
			try{
				xmlhttpCmd.abort();
				xmlhttpCmd = null;
			}catch (e){
				// do nothing
			}
		}	
	}
}
function gotop2(){window.scrollTo(0,0);}	
function showVideoInfo(obj){
//	showjqmoldstyle();
	var obj = obj
	url = "./showinfo/?id=" + obj.getAttribute("href");	
	if (xmlhttpCmd != null){
		try{
			xmlhttpCmd.abort();
			xmlhttpCmd = null;
		}catch (e){
			// do nothing
		}
	}
	xmlhttpCmd=GetXmlHttpObject();
	if (xmlhttpCmd==null){
		alert ("Your browser dosen't support AJAX");
		return;
	}else{
		xmlhttpCmd.onreadystatechange = stateSubjectChanged;
        xmlhttpCmd.open("GET",url,true);
        xmlhttpCmd.send(null);
	}
}

function setLogChanged(){
	if (xmlhttpCmd != null){
		if (xmlhttpCmd.readyState==4){
			var reText = xmlhttpCmd.responseText ;
			try{
				xmlhttpCmd.abort();
				xmlhttpCmd = null;
			}catch (e){
			
			}
		}	
	}
}
 
function setVideoLog(url){
	if (xmlhttpCmd != null){
		try{
			xmlhttpCmd.abort();
			xmlhttpCmd = null;
		}catch (e){
			// do nothing
		}
	}
	xmlhttpCmd=GetXmlHttpObject();
	if (xmlhttpCmd==null){
		alert ("Your browser dosen't support AJAX");
		return;
	}else{
		xmlhttpCmd.onreadystatechange = setLogChanged;
        xmlhttpCmd.open("GET",url,true);
        xmlhttpCmd.send(null);
	}
}

function addClassName(id, className){
  var element = document.getElementById(id)
  if (!element) return;   
  var elementClassName = element.className;   
  if (elementClassName.length == 0){   
    element.className = elementClassName;   
    return;   
  }   
  if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))  return;   
  element.className = elementClassName + " " + className;   
}  

function removeClassName(id, className) { 
  var element = document.getElementById(id) 
  if (!element) return;   
  var elementClassName = element.className; 
  if (elementClassName.length == 0) return;   
  if(elementClassName == className) {   
    element.className = "";   
    return;   
  }   
  if (elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))   
  element.className = elementClassName.replace((new RegExp("(^|\\s)" + className + "(\\s|$)"))," ");   
  add_remove_classID = "";
}   

function getElementPos(elementId) {
	var win_clientHeight = document.documentElement.clientHeight ;
	var ua = navigator.userAgent.toLowerCase();
	var isOpera = (ua.indexOf('opera') != -1);
	var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
	var el = document.getElementById(elementId);
	if(el.parentNode === null || el.style.display == 'none') {
		return false;
	}
	var parent = null;
	var pos = [];     
	var box;     
	if(el.getBoundingClientRect){    //IE       
		box = el.getBoundingClientRect();
		var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		return box.top + scrollTop - win_clientHeight + el.offsetHeight + 2;
		//return {x:box.left + scrollLeft, y:box.top + scrollTop};
	}else if(document.getBoxObjectFor){    // gecko 
		box = document.getBoxObjectFor(el); 
		var borderLeft = (el.style.borderLeftWidth)?parseInt(el.style.borderLeftWidth):0; 
		var borderTop = (el.style.borderTopWidth)?parseInt(el.style.borderTopWidth):0; 
		pos = [box.x - borderLeft, box.y - borderTop];
	}else{    // safari & opera    
		pos = [el.offsetLeft, el.offsetTop];  
		parent = el.offsetParent;     
		if (parent != el) { 
			while (parent) {  
				pos[0] += parent.offsetLeft; 
				pos[1] += parent.offsetTop; 
				parent = parent.offsetParent;
			}  
		}   
		if (ua.indexOf('opera') != -1 || ( ua.indexOf('safari') != -1 && el.style.position == 'absolute' )) { 
			pos[0] -= document.body.offsetLeft;
			pos[1] -= document.body.offsetTop;         
		}    
	}              
	if (el.parentNode) {
		parent = el.parentNode;
	}else{
		parent = null;
	}
	while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
		pos[0] -= parent.scrollLeft;
		pos[1] -= parent.scrollTop;
		if (parent.parentNode) {
			parent = parent.parentNode;
		} else {
			parent = null;
		}
	}
 //eturn {x:pos[0], y:pos[1]};
	return pos[1] - win_clientHeight + el.offsetHeight + 2;
}

function showjqmoldstyle(){
	document.getElementById("jQui_modal").style.display="block";
	document.getElementById("jQui_mask").style.display="block";
}
function hidejqmoldstyle(){
	document.getElementById("jQui_modal").style.display="none";
	document.getElementById("jQui_mask").style.display="none";
}

Date.prototype.format =function(format){
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)){
		format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
	}
	for(var k in o){
		if(new RegExp("("+ k +")").test(format)){
			format = format.replace(RegExp.$1,RegExp.$1.length==1? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}

var getStartNum = 0;//设置请求加载的条数的位置
/**
* @param  wrap	[Str] 外层元素的ID
* @param  box 	[Str] 每一个box的类名
*/
function PBL(wrap,box){
	//	1.获得外层以及每一个box
	var wrap = document.getElementById(wrap);
	var boxs  = getClass(wrap,box);
	//	2.循环出所有的box
	for (var i = getStartNum; i < boxs.length; i++) {
		getStyle(boxs[i],i);
	}
}
/**
* 获取类元素
* @param  warp		[Obj] 外层
* @param  className	[Str] 类名
*/
function getClass(wrap,className){
	var obj = wrap.getElementsByTagName('*');
	var arr = [];
	for(var i=0;i<obj.length;i++){
		if(obj[i].className == className){
			arr.push(obj[i]);
		}
	}
	return arr;
}
/**
* 获得最后一个box所在列的高度
*/
function getLastH(){
	var wrap = document.getElementById('list-content');
	var boxs = getClass(wrap,'items fix');
	if(boxs.length==0){
		return 0
	}else{
		return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
	}
}	
/**
* 数据请求检验
*/
function getCheck(){
	var documentH = document.documentElement.clientHeight;
	var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
	return documentH+scrollH>=getLastH()-50 ?true:false;
}

function getStyle(box,index){
    if (getStartNum>=index) return;
    $(box).css({
        "display":"none"
    });
	imagesload(box).imagesLoaded(function(){	
		$(box).css({
			"display":"block"
		});
	});
    getStartNum = index;//更新请求数据的条数位置
}

function setCookie(name,value,time){
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";  
}
function setCookie2(name,value,time){
	if(time == "TrueDay"){
		delCookie(name);					
		var uom = new Date(new Date()-0+1*86400000);  
		uom = uom.getFullYear() + "/" + (uom.getMonth()+1) + "/" + uom.getDate() + " 00:00:00";  
		var s_time =  new Date(uom).getTime() - new Date().getTime() - 1000
		var exp = new Date();
		exp.setTime(exp.getTime() + s_time*1);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";  			
	}else{
		var strsec = getsec(time);
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec*1);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";  		
	}
}
function getsec(str){
	var str1=str.substring(1,str.length)*1; 
	var str2=str.substring(0,1); 
	if (str2=="s"){
		return str1*1000;
	}else if (str2=="h"){
		return str1*60*60*1000;
	}else if (str2=="d"){
		return str1*24*60*60*1000;
	}
}
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/"; ;
}

indexOnLine = '' ;
function myIndexWelcomecookie(){
	if(indexOnLine !="True"){		
		showcontent();
	}else{
		var indexWelcomeCookie = getCookie('indexWelcome');
		if (indexWelcomeCookie==null || indexWelcomeCookie != "true"){	
			showcontent();	
			setCookie('indexWelcome','true','1800s');
		}else{
			setCookie('indexWelcome','true','1800s');
			if(indexOnLine == "lvdeny"){
				$("#noticebox_head3").show();
			}
		}
	}
}
var indexGames = new Array();
var gamesIndex = new Array();
function clearArray(){
	gamesIndex.splice(0,gamesIndex.length);
}
function getGameIndexCookie(){
	for(var i=0;i<gamesIndex.length;i++){
		getMyGameCookieById(gamesIndex[i]);
	}
//	setTimeout('getGameDownStatus()',1500); 
}
function getMyGameCookie(){
	for(var i=0;i<indexGames.length;i++){
		getMyGameCookieById(indexGames[i]);
	}
}
function getMyGameCookieById(id){
	var gameDownloadCookie = getCookie('gameDownload');
	if (gameDownloadCookie==null){		
		
	}else{
		gamesdowns = gameDownloadCookie.split(",");
		for(var i=0;i<gamesdowns.length;i++){
			if(gamesdowns[i] == id){
				if(document.getElementById("down_"+id+"_f_s")){
					document.getElementById("down_"+id+"_f_s").style.display = "none" ;	
					document.getElementById("down_"+id+"_per_jin2").style.display = '' ;
					document.getElementById("downstatus_hid_"+id).value = "sep5" ;
					$("#"+"p_qp_a_gz_"+id).removeClass("pabtnGM"); 
					$("#"+"p_qp_a_gz_"+id).addClass("gamedownloadtxt"); 	
					document.getElementById("downstatus_txt_"+id).innerHTML = "完成" ;
					document.getElementById("text_game_per_"+id).innerHTML = "100%" ;
					document.getElementById("jindu_"+id).style.width = "101%" ;
				}
			}
		}
	}
}

function setGameDownloadCookie(id){
	var notInCookie = true ;
	var gameDownloadCookie = getCookie('gameDownload');
	if (gameDownloadCookie==null){
//		_hmt.push(['_trackPageview', '/game/download/100%']); 
		setCookie('gameDownload',id,'d365');
		return true ;
	}else{
		gamesdowns = gameDownloadCookie.split(",");
		for(var i=0;i<gamesdowns.length;i++){
			if(gamesdowns[i] == id){
				notInCookie = false ;		
			}
		}
		if(notInCookie){
//			_hmt.push(['_trackPageview', '/game/download/100%']); 
			setCookie('gameDownload',gameDownloadCookie+","+id,'d365');
			return true ;
		}else{
			return false ;
		}
	}
}

allauthstatus = 'none' ;
canDownLoadGame = true ;

var tagAndroid = true ;
var firstWXdown = true;



function gotaobao(id){
	if(allauthstatus == "auth" || allauthstatus == "redirect"){		
		$("#notLevels").show();
	}else{
		if(allauthstatus == "none" || allauthstatus == "error"){
			$("#interError").show();
		}else{	
			var scurl = "/shangcheng/gotaobao/";	
			location.href = '/shangcheng/gotaobao/?id='+id;
		}
	}
}

function fun_down(id){
		var downstatus_hid_id = "downstatus_hid_"+id ;
		var downstatus_txt_id = "downstatus_txt_"+id ;
		var downurl = "downurl_hid_" + id ;
		var gameurl = document.getElementById(downurl).value ;
		if(gameurl.indexOf('?') > -1){
			gameurl = gameurl.split("?")[0] ;
		}	
		var down_hid = '' ;
		if(document.getElementById(downstatus_hid_id)){down_hid = document.getElementById(downstatus_hid_id).value ;}
		if(browser.versions.android || !browser.versions.ios){	
			if(allauthstatus == "auth" || allauthstatus == "redirect"){		
				showGameNoticeNointernet(id);
			}else{
				if(allauthstatus == "none" || allauthstatus == "error"){
					showGameNoticeNodhcp(id);		
				}else{	
					switch(down_hid){ 
						case 'sep1':  //开始下载
//百度统计点击下载
var b_url="/game/clickStartDownload/?"+document.getElementById(downurl).value.split("?")[1]+"&id="+id+"&"+getBrowserInfo();
_hmt.push(['_trackPageview',b_url]); 
							var  newurl = "" ;
							document.getElementById(downstatus_hid_id).value = "sep2" ;
					$("#"+"p_qp_a_gz_"+id).removeClass("pabtnGM"); 
					$("#"+"p_qp_a_gz_"+id).addClass("gamedownloadtxt"); 	
							document.getElementById(downstatus_txt_id).innerHTML = "下载中" ;
							document.getElementById("down_"+id+"_f_s").style.display = "none" ;	
		//					document.getElementById("down_"+id+"_per_jin1").style.display = '' ;	
							document.getElementById("down_"+id+"_per_jin2").style.display = '' ;
							setGmaeDowndloadHouTai(document.getElementById(downurl).value);
							if(isWeiXin()){
								if(document.getElementById('menu_internet')){
									document.getElementById('menu_internet').href = document.getElementById('menu_internet').href + "&firstWXdown=false" ;
								}
								if(document.getElementById('menu_internet2')){
									document.getElementById('menu_internet2').href = document.getElementById('menu_internet2').href + "&firstWXdown=false" ;
								}
								if(document.getElementById('index_game')){
									document.getElementById('index_game').href = document.getElementById('index_game').href + "&firstWXdown=false" ;
								}
								newurl = "http://m.a.app.qq.com:8081/static/source/games/download/" + gameurl ;
							}else{
								newurl = "http://192.168.37.1:8081/static/source/games/download/" + gameurl ;					
							}
							if(isWeiXin()){							
								window.open(newurl);				
								if(firstWXdown && location.href.indexOf("firstWXdown=false") == -1){	
									setTimeout(function(){
										firstWXdown = false ;
										window.open(newurl);
									},1000);
								}
							}else{
								if(document.getElementById("downloadfile_"+id)){
									document.getElementById("downloadfile_"+id).src=newurl;
								}
							}
							setTimeout("getGameDownStatus()",2000);
							break; 
						case 'sep2': //下载后重复点击
							showGameNoticeHasdone(id);		
							break; 
						case 'sep3': //下载完成未注册
							showGameNoticeHasdone(id);				
							break; 
						case 'sep4': //下载注册完成
							showGameNoticeWeizhuce(id);				
							break; 
						case 'sep5': //下载注册完成
							showGameNoticeOK(id);				
							break; 
						default:			
							showGameNoticeNotandroid(id);			
							break; 
					}
				}
			}	
		}else{		
			var iosal = "抱歉，受IOS平台必须通过App Store安装应用的限制，iOS终端暂不支持该功能。" ;
			var otheral = "抱歉，暂只支持Android平台。" ;
			if(browser.versions.ios){
				document.getElementById("noAndroidorIos_"+id).innerHTML = iosal ;
			}else{		
				document.getElementById("noAndroidorIos_"+id).innerHTML = otheral ;
			}
			showGameNoticeNotandroid(id);
		}
}
function fun_down_times(id){
		if(browser.versions.android || !browser.versions.ios){	
			if(allauthstatus == "auth" || allauthstatus == "redirect"){		
				showGameNoticeNointernet(id);
			}else{
				if(allauthstatus == "none" || allauthstatus == "error"){
					showGameNoticeNodhcp(id);		
				}else{
					var downstatus_hid_id = "downstatus_hid_"+id ;
					var downstatus_txt_id = "downstatus_txt_"+id ;
					var downurl = "downurl_hid_" + id ;
					
					var gameurl = document.getElementById(downurl).value ;
					if(gameurl.indexOf('?') > -1){
						gameurl = gameurl.split("?")[0] ;
					}	
		
					if(document.getElementById("downloadfile_"+id)){document.getElementById("downloadfile_"+id).src="#";}
//百度统计重复下载
var b_url="/game/clickStartDownloadTimes/?"+document.getElementById(downurl).value.split("?")[1]+"&id="+id+"&"+getBrowserInfo();
_hmt.push(['_trackPageview',b_url]); 
					document.getElementById(downstatus_hid_id).value = "sep2" ;
					$("#"+"p_qp_a_gz_"+id).removeClass("pabtnGM"); 
					$("#"+"p_qp_a_gz_"+id).addClass("gamedownloadtxt"); 	
					document.getElementById(downstatus_txt_id).innerHTML = "下载中" ;
					document.getElementById("down_"+id+"_f_s").style.display = "none" ;	
					document.getElementById("down_"+id+"_per_jin2").style.display = '' ;
					setGmaeDowndloadHouTai(document.getElementById(downurl).value);					
					closegameNotice(id);
					
					var  newurl = "" ;
					if(isWeiXin()){
						if(document.getElementById('menu_internet')){
							document.getElementById('menu_internet').href = document.getElementById('menu_internet').href + "&firstWXdown=false" ;
						}
						if(document.getElementById('menu_internet2')){
							document.getElementById('menu_internet2').href = document.getElementById('menu_internet2').href + "&firstWXdown=false" ;
						}
						if(document.getElementById('index_game')){
							document.getElementById('index_game').href = document.getElementById('index_game').href + "&firstWXdown=false" ;
						}
						newurl = "http://m.a.app.qq.com:8081/static/source/games/download/" + gameurl ;
					}else{
						newurl = "http://192.168.37.1:8081/static/source/games/download/" + gameurl ;					
					}
					if(isWeiXin()){							
						window.open(newurl);				
						if(firstWXdown && location.href.indexOf("firstWXdown=false") == -1){							
								setTimeout(function(){
								firstWXdown = false ;
								window.open(newurl);
							},1500);
						}
					}else{
						if(document.getElementById("downloadfile_"+id)){
							document.getElementById("downloadfile_"+id).src=newurl;
						}
					}
				}
			}	
		}else{		
			var iosal = "抱歉，受IOS平台必须通过App Store安装应用的限制，iOS终端暂不支持该功能。" ;
			var otheral = "抱歉，暂只支持Android平台。" ;
			if(browser.versions.ios){
				document.getElementById("noAndroidorIos_"+id).innerHTML = iosal ;
			}else{		
				document.getElementById("noAndroidorIos_"+id).innerHTML = otheral ;
			}
			showGameNoticeNotandroid(id);
		}
}

function setGmaeDowndloadHouTai(gameurl){
	var gameurl = gameurl ;
	if(gameurl.indexOf('?') > -1){
		gameurl = gameurl.split("?")[0] ;
	}
	$.ajax({    
		url:'/game/dlhoutai/?gameurl='+gameurl, 
		data:'',    
		type:'get',    
		cache:false,    
		dataType:'',    
		success:function(data) {}, 
		error : function() {}    
	});

}

function fun_down_times22(id){
	if(canDownLoadGame){
		if(document.getElementById("downloadfile_"+id)){
			document.getElementById("downloadfile_"+id).src="#";
		}
		var downstatus_hid_id = "downstatus_hid_"+id ;
		var downurl = "downurl_hid_" + id ;	
		var down_hid = '' ;
		if(document.getElementById(downstatus_hid_id)){
			down_hid = document.getElementById(downstatus_hid_id).value ;
		}	

		var gameurl = document.getElementById(downurl).value ;
		if(gameurl.indexOf('?') > -1){
			gameurl = gameurl.split("?")[0] ;
		}		
		document.getElementById("down_"+id+"_f_s").style.display = "none" ;	
	//	document.getElementById("down_"+id+"_per_jin1").style.display = '' ;	
		document.getElementById("down_"+id+"_per_jin2").style.display = '' ;
		var  newurl = "" ;
		if(isWeiXin()){
			if(document.getElementById('menu_internet')){
				document.getElementById('menu_internet').href = document.getElementById('menu_internet').href + "&firstWXdown=false" ;
			}
			if(document.getElementById('menu_internet2')){
				document.getElementById('menu_internet2').href = document.getElementById('menu_internet2').href + "&firstWXdown=false" ;
			}
			if(document.getElementById('index_game')){
				document.getElementById('index_game').href = document.getElementById('index_game').href + "&firstWXdown=false" ;
			}
			newurl = "http://m.a.app.qq.com:8081/static/source/games/download/" + gameurl ;	
		}else{
			newurl = "http://192.168.37.1:8081/static/source/games/download/" + gameurl ;					
		}
		
		setGmaeDowndloadHouTai(document.getElementById(downurl).value);
		closegameNotice(id);
		if(isWeiXin()){
			window.open(newurl);
			if(firstWXdown && location.href.indexOf("firstWXdown=false") == -1){	
				setTimeout(function(){
					firstWXdown = false ;
					window.open(newurl);
				},1500);
			}
		}else{
			if(document.getElementById("downloadfile_"+id)){
				document.getElementById("downloadfile_"+id).src="";
				document.getElementById("downloadfile_"+id).src=newurl;
			}
		}
	//	setTimeout('getGameDownStatus()',1500);
	}else{
		$("#cannotAdd").show();
	}
}

function showGameNoticeWeizhuce(id){
	var bt1 = "gamenoticebox_" + id ;
	var notice_txt = "notice_txt_" + id ;
	$('#'+bt1).show();
	$('#'+notice_txt).html("请安装并运行应用！");
}
function showGameNoticeNotandroid(id){
	var bt1 = "gamenoticebox_" + id ;
	var notice_txt = "notice_txt_" + id ;
	$('#'+bt1).show();
	$('#'+notice_txt).html("抱歉，暂只支持Android平台。");
}
function showGameNoticeOK(id){
	var bt1 = "gamenoticebox_" + id ;
	var notice_txt = "notice_txt_" + id ;
	$('#'+bt1).show();
	$('#'+notice_txt).html("此应用您已成功再试试其他应用吧！");
}
function showGameNoticeHasdone(id){
	var bt1 = "gamenoticebox_" + id ;
	var notice_txt = "notice_txt_" + id ;
	$('#'+bt1).show();
	$('#'+notice_txt).html("您已在下载，请勿重新下载！");
}
function showGameNoticeNointernet(id){
	var bt1 = "gamenoticebox_" + id ;
	var notice_txt = "notice_txt_" + id ;
	$('#'+bt1).show();
	$('#'+notice_txt).html("您需完成上网认证，才能下载应用，是否现在去做上网认证？");
}
function showGameNoticeNodhcp(id){
	var bt1 = "gamenoticebox_" + id ;
	var notice_txt = "notice_txt_" + id ;
	$('#'+bt1).show();
	$('#'+notice_txt).html("连接状态异常,请重新连接网络。");
}
function closegameNotice(id){
	var bt1 = "gamenoticebox_" + id ;
	$('#'+bt1).hide();
}

var interval_getGameDownStatus = '' ;
function getGameDownStatus(){
	$.ajax({    
		url:'/game/getdownstatus/', 
		data:'',    
		type:'get',    
		cache:false,    
		dataType:'',    
		success:function(data) {
			setTimeout("getGameDownStatus()",3000);
			gameStateChanged(data);
		}, 
		error : function() {}
	});
}

function gameStateChanged(data){
	var stausData = data ;
	divs = stausData.split("@@@");	
    if(divs.length>2){
		if(divs[2] != ''){
			var ids = divs[2].split(",");
			for(var i=0;i<ids.length;i++){
				if(ids[i]!="none"){
					setMyGameCookie(ids[i],"gameDownload");
					var per = "text_game_per_" + ids[i] ;
					var jin = "jindu_" + ids[i] ;
					var downstatus_hid_id = "downstatus_hid_"+ids[i] ;
					var downstatus_txt_id = "downstatus_txt_"+ids[i] ;	
					if(document.getElementById("down_"+ids[i]+"_per_jin2")){
						document.getElementById("down_"+ids[i]+"_f_s").style.display = "none" ;	
						document.getElementById("down_"+ids[i]+"_per_jin2").style.display = '' ;
						document.getElementById(downstatus_hid_id).value = "sep5" ;
						$("#"+"p_qp_a_gz_"+ids[i]).removeClass("pabtnGM"); 
						$("#"+"p_qp_a_gz_"+ids[i]).addClass("gamedownloadtxt");
						document.getElementById(downstatus_txt_id).innerHTML = "完成" ;
						document.getElementById(per).innerHTML = "100%" ;
						document.getElementById(jin).style.width = "101%"  ;
					}
				}
			}
			var ids = divs[3].split(",");
			for(var i=0;i<ids.length;i++){
				if(ids[i]!="none"){	
					var per = "text_game_per_" + ids[i] ;
					var jin = "jindu_" + ids[i] ;
					var downstatus_hid_id = "downstatus_hid_"+ids[i] ;
					var downstatus_txt_id = "downstatus_txt_"+ids[i] ;	
					if(document.getElementById("down_"+ids[i]+"_per_jin2")){
						document.getElementById("down_"+ids[i]+"_f_s").style.display = "none" ;	
						document.getElementById("down_"+ids[i]+"_per_jin2").style.display = '' ;
						document.getElementById(downstatus_hid_id).value = "sep5" ;
						$("#"+"p_qp_a_gz_"+ids[i]).removeClass("pabtnGM"); 
						$("#"+"p_qp_a_gz_"+ids[i]).addClass("gamedownloadtxt");
						document.getElementById(downstatus_txt_id).innerHTML = "完成" ;
						document.getElementById(per).innerHTML = "100%" ;
						document.getElementById(jin).style.width = "101%"  ;
					}
				}
			}
		}
	}
	gameDownList = divs[0].split(",");
	for(var i=0;i<gameDownList.length;i++){
		keys = gameDownList[i].split(":") ;		
		if(keys[0] == "senddownloadTimes"){
			if(parseInt(keys[1])>1){
				for(var j=0;j<parseInt(keys[1]);j++ ){
					_hmt.push(['_trackPageview', '/game/download/100%']); 
				}
			}
		}
		if(document.getElementById(keys[0])){				
			var gameid = document.getElementById(keys[0]).value ;
			var per = "text_game_per_" + gameid ;
			var jin = "jindu_" + gameid ;
			var gameper = keys[1]+ "%"  ;		
			var downstatus_hid_id = "downstatus_hid_"+gameid ;
			var downstatus_txt_id = "downstatus_txt_"+gameid ;			
			
			if(keys[1]+"" == "100"){	
//百度统计下载完成
if(!getMyGameCookie(gameid,"downComplete")){
	setMyGameCookie(gameid,"downComplete");
	var b_url="/game/downloadComplete/?"+document.getElementById("downurl_hid_"+gameid).value.split("?")[1]+"&id="+gameid+"&"+getBrowserInfo();
	_hmt.push(['_trackPageview',b_url]); 
}					
		//		if(!isWeiXin()){
		//			setGameDownloadCookie(gameid);
		//		}
				if(document.getElementById("down_"+gameid+"_per_jin2")){
					if(document.getElementById(downstatus_txt_id)){
						if(document.getElementById(downstatus_txt_id).innerHTML != "完成"){					
							document.getElementById("down_"+gameid+"_f_s").style.display = "none" ;	
							document.getElementById("down_"+gameid+"_per_jin2").style.display = '' ;
							document.getElementById(downstatus_hid_id).value = "sep4" ;
							$("#"+"p_qp_a_gz_"+gameid).removeClass("pabtnGM"); 
							$("#"+"p_qp_a_gz_"+gameid).addClass("gamedownloadtxt"); 	
							document.getElementById(downstatus_txt_id).innerHTML = "去试玩" ;
							document.getElementById(per).innerHTML = "100%" ;
							document.getElementById(jin).style.width = "101%"  ;
						}
					}
				}
				
				
			}else{
				if(document.getElementById(downstatus_hid_id).value != "sep2"){						
					if(document.getElementById("down_"+gameid+"_per_jin2")){
						document.getElementById("down_"+gameid+"_f_s").style.display = "none" ;	
						document.getElementById("down_"+gameid+"_per_jin2").style.display = '' ;
						document.getElementById(downstatus_hid_id).value = "sep2" ;
					$("#"+"p_qp_a_gz_"+gameid).removeClass("pabtnGM"); 
					$("#"+"p_qp_a_gz_"+gameid).addClass("gamedownloadtxt"); 	
						document.getElementById(downstatus_txt_id).innerHTML = "下载中" ;
					}										
				}						
				if(document.getElementById("down_"+gameid+"_per_jin2")){
					document.getElementById(per).innerHTML = gameper ;
					document.getElementById(jin).style.width = gameper  ;	
				}	
			}
		}
	}
}

var xmlhttpGameDown = null;
function getGameDownStatus_old(){
	var url = '/game/getdownstatus/'
	if (xmlhttpGameDown != null){
		try{
			xmlhttpGameDown.abort();
			xmlhttpGameDown = null;
		}catch (e){
			// do nothing
		}
	}
	xmlhttpGameDown=GetXmlHttpObject();
	if (xmlhttpGameDown==null){
		alert ("Your browser dosen't support AJAX");
		return;
	}else{
		xmlhttpGameDown.onreadystatechange = gameStateChanged_old;
        xmlhttpGameDown.open("GET",url,true);
        xmlhttpGameDown.send(null);
	}
}

/*
	app1:23,app2:13@@@true/false
	true/false 查询结束标识
*/
var gamesJindus = new Array();
var gamesHasDownloaded = new Array();
function gameStateChanged_old(){
	if (xmlhttpGameDown != null){
		if (xmlhttpGameDown.readyState==4){
			var stausData = xmlhttpGameDown.responseText ;
			divs = stausData.split("@@@");			
			gameDownList = divs[0].split(",");
			for(var i=0;i<gameDownList.length;i++){
				keys = gameDownList[i].split(":") ;
				
				if(keys[0] == "senddownloadTimes"){	
					if(parseInt(keys[1])>1){
						for(var j=0;j<parseInt(keys[1]);j++ ){
							_hmt.push(['_trackPageview', '/game/download/100%']); 
						}
					}
				}
				if(document.getElementById(keys[0])){				
					var gameid = document.getElementById(keys[0]).value ;
					var per = "text_game_per_" + gameid ;
					var jin = "jindu_" + gameid ;
					var gameper = keys[1]+ "%"  ;		
					var downstatus_hid_id = "downstatus_hid_"+gameid ;
					var downstatus_txt_id = "downstatus_txt_"+gameid ;			
					
					if(keys[1]+"" == "100"){						
						if(!isWeiXin()){
							setGameDownloadCookie(gameid);
//百度统计下载完成--不生效
var b_url="/game/downloadComplete/?"+document.getElementById("downurl_hid_"+gameid).value.split("?")[1]+"&id="+gameid+"&"+getBrowserInfo();
_hmt.push(['_trackPageview',b_url]); 
						}
						if(document.getElementById("down_"+gameid+"_per_jin2")){
							document.getElementById("down_"+gameid+"_f_s").style.display = "none" ;	
							document.getElementById("down_"+gameid+"_per_jin2").style.display = '' ;
							document.getElementById(downstatus_hid_id).value = "sep5" ;
					$("#"+"p_qp_a_gz_"+gameid).removeClass("pabtnGM"); 
					$("#"+"p_qp_a_gz_"+gameid).addClass("gamedownloadtxt"); 	
							document.getElementById(downstatus_txt_id).innerHTML = "完成" ;
							document.getElementById(per).innerHTML = "100%" ;
							document.getElementById(jin).style.width = "101%"  ;
						}
					}else{
						if(document.getElementById(downstatus_hid_id).value != "sep2"){						
							if(document.getElementById("down_"+gameid+"_per_jin2")){
								document.getElementById("down_"+gameid+"_f_s").style.display = "none" ;	
								document.getElementById("down_"+gameid+"_per_jin2").style.display = '' ;
								document.getElementById(downstatus_hid_id).value = "sep2" ;
					$("#"+"p_qp_a_gz_"+gameid).removeClass("pabtnGM"); 
					$("#"+"p_qp_a_gz_"+gameid).addClass("gamedownloadtxt"); 	
								document.getElementById(downstatus_txt_id).innerHTML = "下载中" ;
							}										
						}						
						if(document.getElementById("down_"+gameid+"_per_jin2")){
							document.getElementById(per).innerHTML = gameper ;
							document.getElementById(jin).style.width = gameper  ;	
						}	
					}
				}
			}	
//			if(divs[1] == 'false'){
//				setTimeout('getGameDownStatus()',500); 
//			}		
			try{
				xmlhttpGameDown.abort();
				xmlhttpGameDown = null;
			}catch (e){	}
		}else{
		
		}		
	}
}

							
function getTraffic(){
	$.ajax({    
		url:'/internet/gettraffic/', 
		data:'',    
		type:'get',    
		cache:false,    
		dataType:'',    
		success:function(data) {		
			setTimeout("getTraffic()",7000);
			//    res = 'levels:' + levels + ";endbyte:" + str(endbyte) + ";all_trf:" + str(all_trf) + ";use_trf:" + str(use_trf) + ";per:" + str(per)		
			var divs = data.split(";");
			var levels = divs[0].split(":");
			var endbytes = divs[1].split(":");
			var all_trfs = divs[2].split(":");
			var use_trfs = divs[3].split(":");
			var pers = divs[4].split(":");
				
			allauthstatus = levels[1] ;			
			if(parseFloat(all_trfs[1]) >= 90.00){canDownLoadGame = false;}
			
			if(document.getElementById("internet_jindu")){
				var wb = $('#internet_per').width();
				$("#intnet_endbyte").html(endbytes[1]);	
				$("#intnet_all_trf").html(all_trfs[1]);
				if(parseFloat(all_trfs[1]) <= parseFloat(use_trfs[1])){					
					$("#intnet_use_trf").html(all_trfs[1]);
					$("#internet_jindu").css("width","100%") ;		
				}else{
					$("#intnet_use_trf").html(use_trfs[1]);		
					$("#internet_jindu").css("width",pers[1]+"%") ;	
				}
			}
			switch(levels[1]){ 
				case 'error': 
					$("#menu_internet").show();
					$("#menu_internet2").show();
					$("#menu_yanzheng").hide();
					$("#menu_yanzheng2").hide();
					$("#traff1").html("X");
					$("#traff2").html("X");
					break; 
				case 'none': 
					$("#menu_internet").show();
					$("#menu_internet2").show();
					$("#menu_yanzheng").hide();
					$("#menu_yanzheng2").hide();
					$("#traff1").html("X");
					$("#traff2").html("X");
					break; 
				case 'auth': 
					$("#menu_internet").hide();
					$("#menu_internet2").hide();
					$("#menu_yanzheng").show();
					$("#menu_yanzheng2").show();
					$("#traff1").html("!");
					$("#traff2").html("!");
					break; 
				case 'redirect': 
					$("#menu_internet").hide();
					$("#menu_internet2").hide();
					$("#menu_yanzheng").show();
					$("#menu_yanzheng2").show();
					$("#traff1").html("!");
					$("#traff2").html("!");
					break; 
				case 'lvdeny': 
					$("#menu_internet").show();
					$("#menu_internet2").show();
					$("#menu_yanzheng").hide();
					$("#menu_yanzheng2").hide();
					$("#traff1").html("0");
					$("#traff2").html("0");
					break; 
				default:	
					$("#menu_internet").show();
					$("#menu_internet2").show();
					$("#menu_yanzheng").hide();	
					$("#menu_yanzheng2").hide();							
					$("#traff1").html(Math.round(parseFloat(endbytes[1].replace("MB",""))));
					$("#traff2").html(Math.round(parseFloat(endbytes[1].replace("MB",""))));
			} 

		}, 
		error : function() {}    
	});
}

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

function hideme(){$("#noticebox_head2").hide();$("#noticebox_head3").hide();}
function showcontent(){
	$("#noticebox_head2").show();
/*	
	用于带遮罩层的隐藏
	$("#noticebox_head1").hide();
	$("#pageOverlay3").hide();
	$("#mslider").hide();
	init();
*/
}

function setMyGameCookie(id,keys){
	var notInCookie = true ;
	var gameDownloadCookie = getCookie(keys);
	if (gameDownloadCookie==null){
		setCookie(keys,id,'d365');
	}else{
		var mygamesdowns = gameDownloadCookie.split(",");
		for(var i=0;i<mygamesdowns.length;i++){
			if(mygamesdowns[i] == id){
				notInCookie = false ;		
			}
		}
		if(notInCookie){
			setCookie(keys,gameDownloadCookie+","+id,'d365');
		}
	}
}
function getMyGameCookie(id,keys){
	var inCookie = false ;
	var gameDownloadCookie = getCookie(keys);
	if (gameDownloadCookie==null){
		return inCookie ;
	}else{
		var mygamesdowns = gameDownloadCookie.split(",");
		for(var i=0;i<mygamesdowns.length;i++){
			if(mygamesdowns[i] == id){
				inCookie = true ;		
			}
		}
	}
	return  inCookie
}

