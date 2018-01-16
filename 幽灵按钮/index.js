$(function(){
	$('.link .button').hover(function(){
		var title = $(this).attr('data');
		$('.tip em').text(title);
		var pos = $(this).position().left;
		var emLength = $('.tip em').width();
		var emLeft = 0;
		emLeft = (180 - emLength)/2;
		// if(emLength >= 180){
		// 	emLeft = (emLength - pos)/2 + 180;
		// }else{
		// 	emLeft = (pos - emLength)/2 + 180;
		// }
		$('.tip').css({'left':pos+emLeft+'px'}).stop(true,false).animate({'top':140,'opacity':1},300);
	},function(){
		console.log($('.tip').is(':animated'));
		// if(!$('.tip').is(':animated')){
			$('.tip').stop(true,false).animate({'top':100,'opacity':0},300)
		// }
		
	});
});