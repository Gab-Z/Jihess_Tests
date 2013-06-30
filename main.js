var Views = {
	home   :	{
			dom :	"<div id='nav_info'>\
						<p id='x_pos'></p><p id='y_pos'></p>\
					</div>",
			init : function(){
				document.addEventListener('touchstart',function(event) {
					TouchX = event.touches[0].pageX;
					TouchY = event.touches[0].pageY;
					interval = window.setInterval(Draw_Touch,250);
					//Draw_Touch();
				},false);
				document.addEventListener('touchmove',function(event) {
					TouchX = event.touches[0].pageX+"m";
					TouchY = event.touches[0].pageY+"m";
					//Draw_Touch_M();
				},false);
				document.addEventListener('touchend',function(event) {
					TouchX = event.touches[0].pageX;
					TouchY = event.touches[0].pageY;
					interval = window.clearInterval(interval);
				},false);
			}		
	},
	home_c :	{
			dom :	"<div class='page_container' id='first_canvas'>\
						<canvas id='canvas' ></canvas>\
					</div>",
			init :	function(){
						var cnv = document.getElementById('canvas'),
							ctx = cnv.getContext('2d'),
							cv_W = window.innerWidth - 10,
							cv_H = window.innerHeight - 10;
						cnv.width  = cv_W;
						cnv.height = cv_H;
						cnv.style.marginLeft = 5;
						cnv.style.marginTop = 5;
						ctx.lineWidth = .5;
						ctx.beginPath();
						ctx.moveTo(0,0);
						ctx.lineTo(cv_W,cv_H);
						ctx.stroke();
					}
	},
	p_one : {
			dom :	"<div class='page_container' id='page_one'>\
						<h1> Hello, this a text page </h1>\
						<p> et blablabli et blablabla et patati et patata, bref...</p>\
					</div>",
			init :	function(){
					}
			}
}
var display_View = null;
var TouchX = 0;
var TouchY = 0;
var interval = null;
window.onload = function(){
	View_change();
	/*document.onmousedown = View_change;
	document.addEventListener('touchend',function(event) {
	  View_change;
	},false);*/
}
var View_change = function(){
	if(display_View == Views.home){
		display_View = Views.p_one;
	}else{
		display_View = Views.home
	}
	var body = document.getElementsByTagName('body')[0],
		old_content = body.firstChild;
	body.removeChild(old_content);
	body.innerHTML = display_View.dom;
	display_View.init();
}
var Draw_Touch = function(){
	document.getElementById('x_pos').textContent = "x : "+TouchX;
	document.getElementById('y_pos').textContent = "y : "+TouchY;
}
var Draw_Touch_M = function(){
	document.getElementById('x_pos').textContent = "xM : "+TouchX;
	document.getElementById('y_pos').textContent = "yM : "+TouchY;
}
var Draw_Touch_E = function(){
	document.getElementById('x_pos').textContent = "xE : "+TouchX;
	document.getElementById('y_pos').textContent = "yE : "+TouchY;
}
if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame				|| // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
		window.oRequestAnimationFrame				||
		window.msRequestAnimationFrame				||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 30 );
		};
	} )();
}
