var board=new Array();
//var bestScore=0;
var score=0;
var hasConflicted=new Array();
var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function(e) {
	prepareForMobile();
    newgame();
	(localStorage.getItem("bestScore") || 0) < score ? (localStorage.setItem("bestScore", score)) : score; 
	maxscore = parseInt(localStorage.getItem("bestScore") || 0)
	$('.bestScoreNum').text(maxscore);
});

function prepareForMobile()
{
	if(documentWith>500){
		gridcontentWidth=500;
		cellSideLength=100;
        cellSpace=20;
	}
	$('.grid-content').css('width',gridcontentWidth-cellSpace*2);
	$('.grid-content').css('height',gridcontentWidth-cellSpace*2);
	$('.grid-content').css('padding',cellSpace);
	$('.grid-content').css('border-radius',0.02*gridcontentWidth);
	$('.container').css('width',gridcontentWidth);
}

function newgame()
{
	//初始化棋盘格
	$('.mask').hide();
	$('.over-box').hide();
	init();
	//在随机两个盒子生成数
	generateOneNumber();
	generateOneNumber();
}

function init()
{
	for(var i=0;i<4;i++){
	   for(var j=0;j<4;j++){
		   var gridcell=$('#grid-cell'+'-'+i+'-'+j);
		   gridcell.css('top',getPosTop(i,j));
		   gridcell.css('left',getPosLeft(i,j));
		   gridcell.css('width',cellSideLength);
		   gridcell.css('height',cellSideLength);
	   }
	}
	
	for(var i=0; i<4;i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConflicted[i][j]=false;	
		}
		
	}
	updateBoardView(); 
	
	score=0;
	updateScore(score);     
}

function updateBoardView()
{
	$('.num-cell').remove();
	for(var i=0; i<4;i++){
		for(var j=0;j<4;j++){
			$('.grid-content').append('<div class="num-cell" id="num-cell-'+i+'-'+j+'"></div>');
			var theNumCell=$('#num-cell-'+i+'-'+j);
			
			if(board[i][j]==0){
				theNumCell.css('width','0px');
				theNumCell.css('height','0px');
				theNumCell.css('top',getPosTop(i,j)+ cellSideLength/2);
				theNumCell.css('left',getPosLeft(i,j)+ cellSideLength/2);
			}
			else{
				theNumCell.css('width',cellSideLength);
				theNumCell.css('height',cellSideLength);
				theNumCell.css('top',getPosTop(i,j));
				theNumCell.css('left',getPosLeft(i,j));
				theNumCell.css('background-color',getNumBgColor(board[i][j]));
				theNumCell.css('color',getNumColor(board[i][j]));
				//theNumCell.text(board[i][j]);
				theNumCell.text(getText(board[i][j]));
				if(board[i][j]==2048){
					gamewin();
				}
				
				
			}
			hasConflicted[i][j]=false;
		}
	}
	$('.num-cell').css('line-height',cellSideLength+'px');
	$('.num-cell').css('font-size',0.2*cellSideLength+'px');
	
}

function generateOneNumber()
{
	if(nospace(board)){
		return false;
	}
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	var times=0;
	while(times<50){
		if(board[randx][randy]==0){
			break;
	    }
		randx=parseInt(Math.floor(Math.random()*4));
	    randy=parseInt(Math.floor(Math.random()*4));
		times++;
	}
	if(times==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx=i;
				    randy=j;
				}
			}
		}
	}
	
	//随机一个数字
	var randNum=Math.random()<0.5 ? 2 : 4;
	
	//在随机位置显示随机数
	board[randx][randy]=randNum;
	showNumAnimate(randx,randy,randNum);
	return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
		   event.preventDefault();
		   if(moveLeft()){
			   setTimeout(generateOneNumber,210);
			   setTimeout(isgameover,300);
		   }
		   break;
		case 38://up
		   event.preventDefault();
		   if(moveUp()){
			   setTimeout(generateOneNumber,210);
			   setTimeout(isgameover,300);
		   }
		   break;
		case 39://right
		   event.preventDefault();
		   if(moveRight()){
			   setTimeout(generateOneNumber,210);
			   setTimeout(isgameover,300);
		   }
		   break;
		case 40://down
		   event.preventDefault();
		   if(moveDown()){
			   setTimeout(generateOneNumber,210);
			   setTimeout(isgameover,300);
		   }
		   break;
		default://default
		   break;
	}
})

document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
})

document.addEventListener('touchmove',function(event){
	event.preventDefault();
})

document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	
	var deltax=endx-startx;
	var deltay=endy-starty;
	
	if(Math.abs(deltax)<0.3*documentWith && Math.abs(deltay)<0.3*documentWith){
		return;
	}
	if(Math.abs(deltax)>=Math.abs(deltay)){
		if(deltax>0){
			//moveRight
			if(moveRight()){
			   setTimeout(generateOneNumber,210);
			   setTimeout(isgameover,300);
		   }
		}else{
			//moveLeft
			if(moveLeft()){
			   setTimeout(generateOneNumber,210);
			   setTimeout(isgameover,300);
		   }
		}
	}else{
		if(deltay>0){
			//moveDown
			if(moveDown()){
			   setTimeout(generateOneNumber,210);
			   setTimeout(isgameover,300);
		   }
		}else{
			//moveUp
			if(moveUp()){
			   setTimeout(generateOneNumber,210);
			   setTimeout(isgameover,300);
		   }
		}
	}
})

function isgameover()
{
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}

function gameover()
{
	$('.mask').show();
	$('.over-box').show();
}

function gamewin()
{
	$('.mask').show();
	$('.over-box').show();
	$('.over-box h3').text('你赢了');
}

function moveLeft()
{
	if(!canMoveLeft){
		return false
	}
	
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimate(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimate(i,j,i,k);
						//add
						board[i][k] +=board[i][j];
						board[i][j]=0;
						//add score
						score +=board[i][k];
						updateScore(score);
						
						(localStorage.getItem("bestScore") || 0) < score ? (localStorage.setItem("bestScore", score)) : score; 
				        maxscore = parseInt(localStorage.getItem("bestScore") || 0)
						$('.bestScoreNum').text(maxscore);
						
						hasConflicted[i][k]=true;
						continue;
					}
				}
				
			}
		}
	}
	
	setTimeout(updateBoardView,200);
	return true;
}

function moveRight()
{
	if(!canMoveRight){
		return false
	}
	
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimate(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimate(i,j,i,k);
						//add
						board[i][k] +=board[i][j];
						board[i][j]=0;
						//add score
						score +=board[i][k];
						updateScore(score);
						
						(localStorage.getItem("bestScore") || 0) < score ? (localStorage.setItem("bestScore", score)) : score; 
				        maxscore = parseInt(localStorage.getItem("bestScore") || 0)
						$('.bestScoreNum').text(maxscore);
						
						hasConflicted[i][k]=true;
						continue;
					}
				}
				
			}
		}
	}
	
	setTimeout(updateBoardView,200);
	return true;
}

function moveUp()
{
	if(!canMoveUp){
		return false
	}
	
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimate(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimate(i,j,k,j);
						//add
						board[k][j] +=board[i][j];
						board[i][j]=0;
						//add score
						score +=board[k][j];
						updateScore(score);
						
						(localStorage.getItem("bestScore") || 0) < score ? (localStorage.setItem("bestScore", score)) : score; 
				        maxscore = parseInt(localStorage.getItem("bestScore") || 0)
						$('.bestScoreNum').text(maxscore);
						
						hasConflicted[k][j]=true;
						continue;
					}
				}
				
			}
		}
	}
	
	setTimeout(updateBoardView,200);
	return true;
}

function moveDown()
{
	if(!canMoveDown){
		return false
	}
	
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
						//move
						showMoveAnimate(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimate(i,j,k,j);
						//add
						board[k][j] +=board[i][j];
						//board[k][j] *=2;
						board[i][j]=0;
						//add score
						score +=board[k][j];
						updateScore(score);
                        
						(localStorage.getItem("bestScore") || 0) < score ? (localStorage.setItem("bestScore", score)) : score; 
				        maxscore = parseInt(localStorage.getItem("bestScore") || 0)
						$('.bestScoreNum').text(maxscore);
						
						hasConflicted[k][j]=true;
						continue;
					}
				}
				
			}
		}
	}
	
	setTimeout(updateBoardView,200);
	return true;
}