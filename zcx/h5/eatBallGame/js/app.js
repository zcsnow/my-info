var playerName;
var playerNameInput = document.getElementById('playerNameInput');
var spin = -Math.PI;
var backgroundColor = '#343d50';
var animLoopHandle;
var gameStart = false;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var c = document.getElementById('canvas');
var graph = c.getContext('2d');
var gameWidth = 2000;
var gameHeight = 2000;
var xoffset = -gameWidth;
var yoffset = -gameHeight;
var starTime;
var V = SAT.Vector;
var C = SAT.Circle;


var foods =[];
var foodConfig = {
    border: 0,
    borderColor: '#f39c12',
    fillColor: '#f1c40f'
};

var playerConfig = {
    border: 6,
    textColor: '#FFFFFF',
    textBorder: '#000000',
    textBorderSize: 3,
    defaultSize: 25
};

var enemies = [];
var enemyDefaultSize = 30;
var enemyNum=10;
var enemyImg = new Image();
enemyImg.src = "img/enemy.png";

var giftBalls = [];
var giftBallDefaultSize = 30;
var giftBallNum=2;
var giftBallImg = new Image();
giftBallImg.src = "img/gift_icon.png";

var giftBalls2 = [];
var giftBallNum2=1;
var giftBallImg2 = new Image();
giftBallImg2.src = "img/gift_icon2.png";

var playerRadius = 10;
var player = {
    id: new Date().getTime(),
    x: screenHeight / 2,
    y: screenHeight / 2,
	w: playerRadius,
	h: playerRadius,
	radius: playerRadius,
	mass: 10,
	hue: Math.round(Math.random() * 360),
    screenWidth: screenWidth,
    screenHeight: screenHeight,
    target: {x: screenWidth / 2, y: screenHeight / 2}
};

var target = {x: player.x, y: player.y};
var toggleMassState = 0;

c.width = screenWidth; 
c.height = screenHeight;


//画球方法
function drawCircle(centerX, centerY, radius, sides) {
    var theta = 0;
    var x = 0;
    var y = 0;

    graph.beginPath();

    for (var i = 0; i < sides; i++) {
        theta = (i / sides) * 2 * Math.PI;
        x = centerX + radius * Math.sin(theta);
        y = centerY + radius * Math.cos(theta);
        graph.lineTo(x, y);
    }

    graph.closePath();
    graph.stroke();
    graph.fill();
}

//画食物方法
function drawFood(food) {
    graph.strokeStyle = food.color.border || foodConfig.borderColor;
    graph.fillStyle = food.color.fill || foodConfig.fillColor;
    graph.lineWidth = foodConfig.border;
    drawCircle(food.x - player.x + screenWidth / 2, food.y - player.y + screenHeight / 2, food.radius, 9);
}

//画玩家方法
function drawPlayer() {
    var x = 0;
    var y = 0;
    var circle = {
        x: screenWidth / 2,
        y: screenHeight / 2
    };
    var points = 30 + ~~(player.mass/5);
    var increase = Math.PI * 2 / points;
    graph.strokeStyle = 'hsl(' + player.hue + ', 80%, 40%)';
    graph.fillStyle = 'hsl(' + player.hue + ', 70%, 50%)';
    graph.lineWidth = playerConfig.border;
	
    var xstore = [];
    var ystore = [];

    spin += 0.0;

    for (var i = 0; i < points; i++) {

        x = player.radius * Math.cos(spin) + circle.x;
        y = player.radius * Math.sin(spin) + circle.y;
        x = valueInRange(-player.x + screenWidth / 2, gameWidth - player.x + screenWidth / 2, x);
        y = valueInRange(-player.y + screenHeight / 2, gameHeight - player.y + screenHeight / 2, y);
        spin += increase;

        xstore[i] = x;
        ystore[i] = y;

    }

    for (i = 0; i < points; ++i) {
        if (i === 0) {
            graph.beginPath();
            graph.moveTo(xstore[i], ystore[i]);
        } else if (i > 0 && i < points - 1) {
            graph.lineTo(xstore[i], ystore[i]);
        } else {
            graph.lineTo(xstore[i], ystore[i]);
            graph.lineTo(xstore[0], ystore[0]);
        }

    }
    graph.lineJoin = 'round';
    graph.lineCap = 'round';
    graph.fill();
    graph.stroke();

    var fontSize = (player.radius / 2);
    graph.lineWidth = playerConfig.textBorderSize;
    graph.miterLimit = 1;
    graph.lineJoin = 'round';
    graph.textAlign = 'center';
    graph.fillStyle = playerConfig.textColor;
    graph.textBaseline = 'middle';
    graph.strokeStyle = playerConfig.textBorder;
    graph.font = 'bold ' + fontSize + 'px sans-serif';

    if (toggleMassState === 1) {
        graph.strokeText(player.name, screenWidth / 2, screenHeight / 2);
        graph.fillText(player.name, screenWidth / 2, screenHeight / 2);
    } else {
        graph.strokeText(player.name + ' (' + player.mass + ')', screenWidth / 2, screenHeight / 2);
        graph.fillText(player.name + ' (' + player.mass + ')', screenWidth / 2, screenHeight / 2);
    }
}

//画背景网格
function drawgrid() {
	 graph.lineWidth = 1;
	 graph.strokeStyle = '#fff';
	 graph.globalAlpha = 0.15;
	 graph.beginPath();

    for (var x = xoffset - player.x; x < screenWidth; x += screenHeight / 18) {
        graph.moveTo(x, 0);
        graph.lineTo(x, screenHeight);
    }

    for (var y = yoffset - player.y ; y < screenHeight; y += screenHeight / 18) {
        graph.moveTo(0, y);
        graph.lineTo(screenWidth, y);
    }

    graph.stroke();
    graph.globalAlpha = 1;
}


//玩家关联
function tickPlayer(currentPlayer) {

    movePlayer(currentPlayer);
	
	var playerCircle = new C(
        new V(currentPlayer.x, currentPlayer.y),
        currentPlayer.radius
    );

    var foodEaten = food
        .map( function(f) { return SAT.pointInCircle(new V(f.x, f.y), playerCircle); })
        .reduce( function(a, b, c) { return b ? a.concat(c) : a; }, []);

    foodEaten.forEach( function(f) {
        food[f] = {};
        food.splice(f, 1);
    });
	
    
    currentPlayer.mass += foodEaten.length * cfg.foodMass;
    currentPlayer.radius = massToRadius(currentPlayer.mass);

	for (i in enemies){
	  if(Math.round(Math.pow(enemies[i].x-currentPlayer.x,2)+Math.pow(enemies[i].y-currentPlayer.y,2)) <= Math.round(Math.pow(currentPlayer.radius+enemyDefaultSize,2)))   	
	  {
		  
		    cancelAnimationFrame(animLoopHandle);
			animLoopHandle = undefined;
			enemies.splice(i, 1);
			enemyNum--;
			endTime= new Date().getTime();
			survivalTime = parseInt((endTime-starTime)/1000);
			//gameStart = false;
			
  
			$('.gameover').show();
			$('.gameover .mass-info em').html(currentPlayer.mass+"克");
			$('.gameover .ranking-info em').html(4);
			$('.gameover .time-info em').html(survivalTime+"秒");
			
		  
		  
	  };
	};
	
	for (i in giftBalls){
	  if(Math.round(Math.pow(giftBalls[i].x-currentPlayer.x,2)+Math.pow(giftBalls[i].y-currentPlayer.y,2)) <= Math.round(Math.pow(currentPlayer.radius+giftBallDefaultSize,2)))   	
	  {
		  
		  cancelAnimationFrame(animLoopHandle);
		  animLoopHandle = undefined;
		  
		  giftBalls.splice(i, 1);
		  giftBallNum--;
		  console.log(i);
		  var html = "<h3>恭喜你获得天天网20元劵！</h3>";
		  jShare(html,"");
		  $("#popup_ok").html("保存到我的奖励");
		  $("#popup_ok").click(function(){
		  	animLoopHandle = requestAnimFrame(animloop);
		  });
		  
	  };
	};
	
	for (i in giftBalls2){
	  if(Math.round(Math.pow(giftBalls2[i].x-currentPlayer.x,2)+Math.pow(giftBalls2[i].y-currentPlayer.y,2)) <= Math.round(Math.pow(currentPlayer.radius+giftBallDefaultSize,2)))   	
	  {
		  
		  cancelAnimationFrame(animLoopHandle);
		  animLoopHandle = undefined;
		  giftBalls2.splice(i, 1);
		  giftBallNum2--;
		  var html = "<h3>恭喜你获得1分抽大奖机会！</h3><p>苹果笔记本、Apple watch等超值礼品等你来拿！</p>";
		  jShare(html,"");
		  $("#popup_ok").html("保存到我的奖励");
		  $("#popup_ok").click(function(){
		  	animLoopHandle = requestAnimFrame(animloop);
		  });
		  
	  };
	};
	
}


//玩家移动
function movePlayer(player) {
    var dist = Math.sqrt(Math.pow(player.target.y, 2) + Math.pow(player.target.x, 2));
    var deg = Math.atan2(player.target.y, player.target.x);
    var slowDown = log(player.mass, cfg.slowBase) - initMassLog + 1;
    var deltaY = player.speed * Math.sin(deg)/ slowDown;
    var deltaX = player.speed * Math.cos(deg)/ slowDown;
	
    if (dist < (50 + player.radius)) {
        deltaY *= dist / (50 + player.radius);
        deltaX *= dist / (50 + player.radius);
    }

    if (!isNaN(deltaY)) {
        player.y += deltaY;
    }
    if (!isNaN(deltaX)) {
        player.x += deltaX;
    }

    var borderCalc = player.radius / 3;

    if (player.x > cfg.gameWidth - borderCalc) {
        player.x = cfg.gameWidth - borderCalc;
    }
    if (player.y > cfg.gameHeight - borderCalc) {
        player.y = cfg.gameHeight - borderCalc;
    }
    if (player.x < borderCalc) {
        player.x = borderCalc;
    }
    if (player.y < borderCalc) {
        player.y = borderCalc;
    }
	
}

//游戏主逻辑
function gameLoop() {
  if (gameStart) {
	
	//填充背景颜色  
  	graph.fillStyle = backgroundColor;
	graph.fillRect(0, 0, screenWidth, screenHeight);
	
	drawgrid();
	
	var visibleFood  = food
		.map(function(f) {
			if (f.x > player.x - player.screenWidth/2 - 20 &&
				f.x < player.x + player.screenWidth/2 + 20 &&
				f.y > player.y - player.screenHeight/2 - 20 &&
				f.y < player.y + player.screenHeight/2 + 20) {
				return f;
			}
		})
		.filter(function(f) { return f; });
		
	foods=visibleFood;
	
	foods.forEach(function(food) {
		drawFood(food);
	});
	
	
	
	drawPlayer();
	balanceMass();
	drawEnemy();
	drawGiftBalls();
	drawGiftBalls2()

	
	for (var i = 0; i < users.length; i++) {
        tickPlayer(users[i]);
    } 
	
    

  }else{
	  
  	$('.gameover').show();
  }
  
}

//游戏帧循环
function animloop(){
	
    animLoopHandle = requestAnimFrame(animloop);
    gameLoop();
}

// 敌方球
function drawEnemy(){
	for (i in enemies){
		var x=i;
		
		enemies[i].x+=enemies[i].vX;
		enemies[i].y+=enemies[i].vY;
				
		if(enemies[i].x>=gameWidth-enemyDefaultSize){
			enemies[i].x=gameWidth-enemyDefaultSize;
			enemies[i].vX=-enemies[i].vX;
			
		}
		if(enemies[i].x<=enemyDefaultSize){
			enemies[i].x=enemyDefaultSize;
			enemies[i].vX=-enemies[i].vX;
			
		}			
		if(enemies[i].y>=gameHeight-enemyDefaultSize){
			enemies[i].y=gameHeight-enemyDefaultSize;
			enemies[i].vY=-enemies[i].vY;
			
		}
		if(enemies[i].y<=enemyDefaultSize){
			enemies[i].y=enemyDefaultSize;
			enemies[i].vY=-enemies[i].vY;
			
		}

		for(var j=0;j<enemyNum;j++){
			if(j!==x){
				if(Math.round(Math.pow(enemies[x].x-enemies[j].x,2)+Math.pow(enemies[x].y-enemies[j].y,2)) <= Math.round(Math.pow(enemyDefaultSize+enemyDefaultSize,2)))   	
				{
					var tempX=enemies[x].vX;
					var tempY=enemies[x].vY;
					enemies[x].vX=enemies[j].vX;
					enemies[j].vX=tempX;
					enemies[x].vY=enemies[j].vY;
					enemies[j].vY=tempY;
				}
			}
		}
		
		graph.drawImage(enemyImg,enemies[i].x - player.x-25  + screenWidth / 2,enemies[i].y - player.y-25 + screenHeight / 2, 50, 50);
	}
	
}

//奖品球2
function drawGiftBalls2(){
	for (i in giftBalls2){
		var x=i;
		
		giftBalls2[i].x+=giftBalls2[i].vX;
		giftBalls2[i].y+=giftBalls2[i].vY;
				
		if(giftBalls2[i].x>=gameWidth-giftBallDefaultSize){
			giftBalls2[i].x=gameWidth-giftBallDefaultSize;
			giftBalls2[i].vX=-giftBalls2[i].vX;
			
		}
		if(giftBalls2[i].x<=giftBallDefaultSize){
			giftBalls2[i].x=giftBallDefaultSize;
			giftBalls2[i].vX=-giftBalls2[i].vX;
			
		}			
		if(giftBalls2[i].y>=gameHeight-giftBallDefaultSize){
			giftBalls2[i].y=gameHeight-giftBallDefaultSize;
			giftBalls2[i].vY=-giftBalls2[i].vY;
			
		}
		if(giftBalls2[i].y<=giftBallDefaultSize){
			giftBalls2[i].y=giftBallDefaultSize;
			giftBalls2[i].vY=-giftBalls2[i].vY;
			
		}

		for(var j=0;j<giftBallNum2;j++){
			if(j!==x){
				if(Math.round(Math.pow(giftBalls2[x].x-giftBalls2[j].x,2)+Math.pow(giftBalls2[x].y-giftBalls2[j].y,2)) <= Math.round(Math.pow(giftBallDefaultSize+giftBallDefaultSize,2)))   	
				{
					var tempX=giftBalls2[x].vX;
					var tempY=giftBalls2[x].vY;
					giftBalls2[x].vX=giftBalls2[j].vX;
					giftBalls2[j].vX=tempX;
					giftBalls2[x].vY=giftBalls2[j].vY;
					giftBalls2[j].vY=tempY;
				}
			}
		}
		
		graph.drawImage(giftBallImg2,giftBalls2[i].x - player.x-25  + screenWidth / 2,giftBalls2[i].y - player.y-25 + screenHeight / 2, 50, 50);
	}
	
}


function drawGiftBalls(){
	for (i in giftBalls){
		var x=i;
		
		giftBalls[i].x+=giftBalls[i].vX;
		giftBalls[i].y+=giftBalls[i].vY;
				
		if(giftBalls[i].x>=gameWidth-giftBallDefaultSize){
			giftBalls[i].x=gameWidth-giftBallDefaultSize;
			giftBalls[i].vX=-giftBalls[i].vX;
			
		}
		if(giftBalls[i].x<=giftBallDefaultSize){
			giftBalls[i].x=giftBallDefaultSize;
			giftBalls[i].vX=-giftBalls[i].vX;
			
		}			
		if(giftBalls[i].y>=gameHeight-giftBallDefaultSize){
			giftBalls[i].y=gameHeight-giftBallDefaultSize;
			giftBalls[i].vY=-giftBalls[i].vY;
			
		}
		if(giftBalls[i].y<=giftBallDefaultSize){
			giftBalls[i].y=giftBallDefaultSize;
			giftBalls[i].vY=-giftBalls[i].vY;
			
		}

		for(var j=0;j<giftBallNum;j++){
			if(j!==x){
				if(Math.round(Math.pow(giftBalls[x].x-giftBalls[j].x,2)+Math.pow(giftBalls[x].y-giftBalls[j].y,2)) <= Math.round(Math.pow(giftBallDefaultSize+giftBallDefaultSize,2)))   	
				{
					var tempX=giftBalls[x].vX;
					var tempY=giftBalls[x].vY;
					giftBalls[x].vX=giftBalls[j].vX;
					giftBalls[j].vX=tempX;
					giftBalls[x].vY=giftBalls[j].vY;
					giftBalls[j].vY=tempY;
				}
			}
		}
		
		graph.drawImage(giftBallImg,giftBalls[i].x - player.x-25  + screenWidth / 2,giftBalls[i].y - player.y-25 + screenHeight / 2, 50, 50);
	}
	
}

//开始游戏
function startGame() {
	graph.clearRect(0,0,5000,5000);
	starTime = new Date().getTime();
	var radius = massToRadius(10);
	/*var position = cfg.newPlayerInitialPosition == 'farthest' ? uniformPosition(users, radius) : randomPosition(radius);
	player.x=position.x;
	player.y=position.y;*/
	player.speed=4;
	player.mass=10;
	player.target = target; 
	gameStart = true;
	
    //playerName = playerNameInput.value.replace(/(<([^>]+)>)/ig, '');
	playerName = playerNameInput.innerHTML;
	player.name = playerName;
	player.screenWidth = screenWidth;
	player.screenHeight = screenHeight;
	users.push(player);
	

	for(var n=0;n<enemyNum;n++){
		var x={
			x:getRandomNumber(20,gameWidth-50),
			y:getRandomNumber(20,gameHeight-50),
			r:enemyDefaultSize,
			vX:getRandomNumber(-2,5),
			vY:getRandomNumber(-2,5),
			color:randomColor(),
		}
		enemies.push(x);
	};
	
	for(var n=0;n<giftBallNum;n++){
		var x={
			x:getRandomNumber(20,gameWidth-50),
			y:getRandomNumber(20,gameHeight-50),
			r:giftBallDefaultSize,
			vX:getRandomNumber(0.5,1),
			vY:getRandomNumber(0.5,1),
			color:randomColor(),
		}
		giftBalls.push(x);
	};
	
	for(var n=0;n<giftBallNum2;n++){
		var x={
			x:getRandomNumber(20,gameWidth-50),
			y:getRandomNumber(20,gameHeight-50),
			r:giftBallDefaultSize,
			vX:getRandomNumber(0.5,1),
			vY:getRandomNumber(0.5,1),
			color:randomColor(),
		}
		giftBalls2.push(x);
	}
	
    animloop();
	//加速功能
	$('#add_speed').click(function(){
		cfg.slowBase++;
	});
	
}



$('.revive-btn').click(function(){

	$('.gameover').hide();
		var x={
			  x:getRandomNumber(20,gameWidth-50),
			  y:getRandomNumber(20,gameHeight-50),
			  r:enemyDefaultSize,
			  vX:getRandomNumber(-2,5),
			  vY:getRandomNumber(-2,5),
			  color:randomColor(),
		  }
		  enemies.push(x);

	 animLoopHandle = requestAnimFrame(animloop);

});


//初始加载
window.onload = function() {
    'use strict';
    var btn = document.getElementById('startButton');
	//setTimeout(function(){
		$('.loading').hide();
		$('#startMenuWrapper').show();
		
	//},1000);
	
    btn.onclick = function () {
        
		$('#startMenuWrapper').hide();
		startGame();
    };
	
	$('.share-btn').click(function(){
		$('.mask').show();
	});
	$('.mask').click(function(){
		$('.mask').hide();
	});

};

$('.restart-btn').click(function(){
		$('.gameover').hide();
		location.reload();
		
		$('.gameover .mass-info em').html(playerRadius+"克");
		$('.gameover .ranking-info em').html(0+'秒');
		$('.gameover .time-info em').html(" ");

});


c.addEventListener('touchstart', touchInput, false);
c.addEventListener('touchmove', touchInput, false);

//触摸改变方向
function touchInput(touch) {
    touch.preventDefault();
    touch.stopPropagation();
    target.x = touch.touches[0].clientX - screenWidth / 2;
    target.y = touch.touches[0].clientY - screenHeight / 2;
}

//调整初始尺寸
window.addEventListener('resize', function() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    c.width = screenWidth;
    c.height = screenHeight;
}, true);


