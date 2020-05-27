
/*
 
 * 游戏类
 
 */


//工具类
var Tools = new startTools();

//倒计时总时间, 是否开始
var Time, TimeTotal = 6, isGameStart = false;

//游戏背景
var gameBG = new Image();

//当前关卡
var Level = 0;

//所有关卡
var gameArray = Tools.getRandomArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

//是否打开帮助中
var isHelp = false;

//构造方法
function startGame(_time)
{	
	//设置倒计时总时间
	TimeTotal = _time;
	
	//倒计时
	window.setInterval(this.initTime, 100);
}

//开始游戏
startGame.prototype.start = function()
{
	isHelp = false;
	
	$('#msg_help').show();
	this.nextGame();
}

//下一关
startGame.prototype.nextGame = function()
{
	Time = TimeTotal;
	$('#timetext').text(TimeTotal + '秒');
	$('#time').css({'width' : '100%'});
	$('#gbg').css({'background':'url(img/img'+gameArray[Level]+'.jpg) no-repeat'});
	$('#gbg').html('<div id="radius'+gameArray[Level]+'"></div>');
	
	
	//更新关卡
	Level++;
	$('#num_num').html('10/<span>'+Level+'</span>');
	
	//设置为开始状态
	isGameStart = true;
}
	

//倒计时
startGame.prototype.initTime = function()
{
	if(isGameStart && this.isHelp)
	{		
		if(Time > 0)
		{	
			$('#timetext').text(Math.round(Time) + '秒');
			$('#time').css({'width' : Math.round(Time * 100) / TimeTotal + '%'});
			Time -=0.1;
				
		}else
		{
			//游戏结束
			$('#timetext').text('0秒');
			$('#time').css({'width' : '0%'});	
			
			//设置游戏为结束状态
			isGameStart = false;
			
			//游戏失败
			$('#msg_over').show();
		}
	}
}


//初始化
startGame.prototype.gameInit = function()
{
	isGameStart = false;	
	
	Level = 0;
	Time = TimeTotal;
	gameArray = Tools.getRandomArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);	
	
	$('#timetext').text(TimeTotal + '秒');
	$('#time').css({'width' : '100%'});
}

//过关
startGame.prototype.gameSuccess = function(_id)
{
	//设置游戏为结束状态
	isGameStart = false;
	
	if(_id == 'radius'+gameArray[Level-1])
	{	
		if(Level < 10)
		{
			$('#radius'+gameArray[Level-1]).animate({'opacity':'1'}, 1000, null, this.nextGame);
		
		}else
		{			
			$('#radius'+gameArray[Level-1]).animate({'opacity':'1'}, 1000, null, function()
			{
				//显示游戏结果
				$('#msg_success').show();
				
				_WXShare('http://intel515.buzzopt.com/intel515/img/coreM_logo.jpg', 180, 180, '这么隐蔽都被我发现了，你敢来挑战我吗？', '这么隐蔽都被我发现了，你敢来挑战我吗？', 'http://intelweixin.buzzopt.com/index.php/wapActivity/index/subject/CoreM', '');
			});	
		}	
		
	}else
	{
		if(Time >= 2)
		{
			Time -= 2;
			isGameStart = true;
			
		}else
		{
			//设置游戏为结束状态
			isGameStart = false;
			
			//游戏失败
			$('#msg_over').show();
		}
	}
}

//关闭帮助
startGame.prototype.help_close = function()
{
	$('#msg_help').hide();
	
	isHelp = true;
}

//打开帮助
startGame.prototype.help_open = function()
{
	$('#msg_help').show();
	
	isHelp = false;
}

