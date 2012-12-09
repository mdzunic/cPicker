$(document).ready(function(){
	var colors = [];
	var pattern = ['00', '66', 'CC', 'FF'];
	var l = pattern.length;

	for(var i=0;i<l;i++){
		for(var j=0;j<l;j++){
			for(var k=0;k<l;k++){
				colors.push(pattern[i]+pattern[j]+pattern[k]);
			}
		}
	}
	var k = colors.length;
	for(var i =0; i<k; i++){
		if(i%(l*2)===0 && i !=0){
			$('.colorsWrapper').append('<br />');
		}
		$('.colorsWrapper').append('<span id='+colors[i]+'></span>');
		$('#'+colors[i]).css('background', '#'+colors[i]);
	}
	$('.colorsWrapper span').click(function(){
		$('.colorSelected input').val('#'+$(this).attr('id'));
	});
});