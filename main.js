var Views = {
	home_c   :	{
			dom :	"<div id='nav_info'>\
						<p>10</p><p id='nb_touch'></p><p id='x_pos'></p><p id='y_pos'></p>\
					</div>",
			init : function(){
				document.addEventListener("touchstart", handleStart, false);
				document.addEventListener("touchend", handleEnd, false);
				//document.addEventListener("touchcancel", handleCancel, false);
				//document.addEventListener("touchleave", handleLeave, false);
				//document.addEventListener("touchmove", handleMove, false);
				launchRequest(callback_test,"argument=ask");
			}		
	},
	home :	{
			dom :	"<div class='page_container' id='first_canvas'>\
						<div id='options'></div>\
						<canvas id='canvas' ></canvas>\
					</div>",
			init :	function(){
						var opt = document.getElementById('options');
						opt.style.backgroundColor = '#D4B1ED';
						opt.style.marginTop = 0;
						opt.style.height = '20px';
						var cnv = document.getElementById('canvas'),
							ctx = cnv.getContext('2d'),
							cv_W = window.innerWidth - 10,
							cv_H = window.innerHeight - 20;
						cnv.width  = cv_W;
						cnv.height = cv_H;
						cnv.style.marginLeft = 5;
						cnv.style.marginTop = 0;
						
						
						spritesheet = new Image();
						spritesheet.onload = function(){start_animation()};
						spritesheet.src = "Media/spritesheet.png";
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
var nb = 0;
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
	/*var touches = evt.changedTouches;
	for (var i=0; i<touches.length; i++) {
		ongoingTouches.push(touches[i]);
	}
	document.getElementById("x_pos").textContent = "x : " + touches[touches.length-1].pageX;
	document.getElementById("y_pos").textContent = "y : " + touches[touches.length-1].pageY;*/
	nb++;
	document.getElementById("nb_touch").textContent = nb;
}
function handleMove(evt) {
	evt.preventDefault();
	/*var touches = evt.changedTouches;
	for (var i=0; i<touches.length; i++) {
		var idx = ongoingTouchIndexById(touches[i].identifier);
		ongoingTouches.splice(idx, 1, touches[i]);  // swap in the new touch record
	}*/
	document.getElementById("x_pos").textContent = "xm : " + evt.touches[0].pageX;
	document.getElementById("y_pos").textContent = "ym : " + evt.touches[0].pageY; 
	document.getElementById("nb_touch").textContent = evt.touches.length + " // "+evt.touches[0].identifier;
}
function handleEnd(evt) {
	evt.preventDefault();
	/*var touches = evt.changedTouches;
	for (var i=0; i<touches.length; i++) {
		var idx = ongoingTouchIndexById(touches[i].identifier);
		ongoingTouches.splice(i, 1);  // remove it; we're done
	}
	document.getElementById("x_pos").textContent = "xe : " + touches[touches.length-1].pageX;
	document.getElementById("y_pos").textContent = "ye : " + touches[touches.length-1].pageY; */
	nb+=-1;
	document.getElementById("nb_touch").textContent = nb;
}
function ongoingTouchIndexById(idToFind) {
	for (var i=0; i<ongoingTouches.length; i++) {
		var id = ongoingTouches[i].identifier;

		if (id == idToFind) {
			return i;
		}
	}
	return -1;    // toucher non trouvé
}
function getXMLHttpRequest() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xhr;
}
function launchRequest(callback,send_data){
	var	xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			callback(xhr.responseText);
		}
	};
	xhr.open("POST", "http://gabz.org/andro_test.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(send_data);
}
function callback_test(sData){
	if(sData == "err"){
		alert('err');
	}else{
		alert(sData);
	}
}
function start_animation(){
	bufferCanvas = document.createElement('canvas'),
	bufferContext = bufferCanvas.getContext('2d');
	bufferCanvas.width = spritesheet.width;
	bufferCanvas.height = spritesheet.height;
	bufferContext.drawImage(spritesheet, 0,0);
	
}
