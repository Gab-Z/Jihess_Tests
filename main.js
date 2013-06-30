var Views = {
	home   :	{
			dom :	"<div id='nav_info'>\
						<p id='x_pos'></p><p id='y_pos'></p>\
					</div>",
			init : function(){
				document.addEventListener("touchstart", handleStart, false);
				document.addEventListener("touchend", handleEnd, false);
				//document.addEventListener("touchcancel", handleCancel, false);
				//document.addEventListener("touchleave", handleLeave, false);
				document.addEventListener("touchmove", handleMove, false);
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
var ongoingTouches = [];
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
function handleStart(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i=0; i<touches.length; i++) {
	ongoingTouches.push(touches[i]);
  }
  
}
function handleMove(evt) {
	evt.preventDefault();
	var touches = evt.changedTouches;
	for (var i=0; i<touches.length; i++) {
		var idx = ongoingTouchIndexById(touches[i].identifier);
		ongoingTouches.splice(idx, 1, touches[i]);  // swap in the new touch record
	}
	document.getElementById("x_pos").textContent = "x : " + touches[touches.length-1].pageX;
	document.getElementById("y_pos").textContent = "y : " + touches[touches.length-1].pageY; 
}
function handleEnd(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i=0; i<touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
   ongoingTouches.splice(i, 1);  // remove it; we're done
  }
}
