$(document).ready(function(){
	var colors = [];
	var pattern = ['00', '66', 'cc', 'ff'];
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
		$('#codeDisplay').val('#'+$(this).attr('id'));
	});
	
	var context = canvas.getContext('2d');

	var palette = context.createLinearGradient(0, 0, 360, 0);
	palette.addColorStop(0 / 7, '#ff0000');
	palette.addColorStop(1 / 7, '#ffff00');
	palette.addColorStop(2 / 7, '#00ff00');
	palette.addColorStop(3 / 7, '#00ffff');
	palette.addColorStop(4 / 7, '#0000ff');
	palette.addColorStop(5 / 7, '#ff00ff');
	palette.addColorStop(6 / 7, '#ff0000');
	palette.addColorStop(7 / 7, '#ffffff');
	context.fillStyle = palette;
	context.fillRect(0, 0, 360, 360);

	var overlay = context.createLinearGradient(0, 0, 0, 360);
	overlay.addColorStop(0, 'rgba(0, 0, 0, 0)');
	overlay.addColorStop(1, 'rgba(0, 0, 0, 1)');
	context.fillStyle = overlay;
	context.fillRect(0, 0, 360, 360);
	
	function findPos(obj) {
		var curleft = 0, curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return { x: curleft, y: curtop };
		}
		return undefined;
	}

	function rgbToHex(r, g, b) {
		if (r > 255 || g > 255 || b > 255)
			throw "Invalid color component";
		return ((r << 16) | (g << 8) | b).toString(16);
	}
	
	$('#canvas').mousemove(function(e) {
		var pos = findPos(this);
		var x = e.pageX - pos.x;
		var y = e.pageY - pos.y;
		var c = this.getContext('2d');
		var p = c.getImageData(x, y, 1, 1).data; 
		var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
		$('#status').html("<span>" + hex+"</span>");
		$('#colorDisplay').css('background',hex);

	});
	$('#canvas').click(function(){
		$('#colorDisplay').css('background',$('#status span').html());
		$('#codeDisplay').val($('#status span').html());
	});
	
	$('.switch').click(function(){
		if($('.switch').text()=== "Show more colors"){
			$('.colorsWrapper').hide();
			$('.moreColorsWrap').show();
			$('.switch').text("Show less colors");
		}else{
			$('.moreColorsWrap').hide();
			$('.colorsWrapper').show();
			$('.switch').text("Show more colors");
		}
	});
	
	
});