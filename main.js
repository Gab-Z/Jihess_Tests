var Views = {
	home :	{
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
window.onload = function(){
	View_change();
	if(document.onmousedown){
		alert('pop');
	}
	document.onmousedown = View_change;
	document.addEventListener('touchend',function(event) {
	  View_change;
	},false);
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
