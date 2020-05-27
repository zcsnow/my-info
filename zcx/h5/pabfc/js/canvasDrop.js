/*$(function () {            
var ctx, angle = 8, len = 50, count = 150;    
      
	canvas = document.getElementById('canvas');            
	ctx = canvas.getContext('2d');   
	DPR = window.devicePixelRatio;
	canvasWidth = canvas.clientWidth * DPR;
	canvasHeight =canvas.clientHeight * DPR;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;           
          
	ctx.strokeStyle = 'rgba(188, 188, 188, 0.5)';            
	var run = setInterval(draw, 200);            
	function draw() {                
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);                
		xiayus();            
	}            
	//画线       
	function xiayu(x, y, r) {                
		ctx.beginPath();                
		ctx.moveTo(x, y);                
		//console.log(y, len);                
		ctx.lineTo(x + angle, y + len);                
		ctx.lineWidth = 1;                
		ctx.stroke();            
	}            
	function xiayus() {                
		for (var i = 1; i <= count; i++) {                    
			xiayu(Math.random() * canvasWidth, Math.random() * canvasHeight, angle);                
		}            
	}        
});  */