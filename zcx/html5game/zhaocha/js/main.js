$(function ()
{	
	var SKROLLR;
	
	//游戏类
	var game = new startGame(6);
	
	//工具类
	var Tools = new startTools();
	
	loadImage(function()
	{
		skrollrInitAmin();
		startAmin();
	});
	
	var startAmin = function()
	{
		//初始化 Skrollr
		SKROLLR = skrollr.init();
		
		//添加侦听事件
		onTouchStart();
		
		//添加玩家信息
		LoadUser();
	}
	
	var skrollrInitAmin = function()
	{		
		$('#box2').attr({'data-0':'height:0%', 'data-1000':'height:100%' });
		$('#logo').attr({'data-900':'opacity:1', 'data-1000':'opacity:0'});
		
		$('#e').attr({'data-800':'margin:-257px 0 0 -289px; opacity:0', 
					  'data-1200':'margin:-257px 0 0 -189px; opacity:1;', 
					  'data-2600':'margin:-257px 0 0 -189px; transform:scale(1, 1);', 
					  'data-3200':'margin:-237px 0 0 81px; transform:scale(.5, .5);' });
					  
		$('#low').attr({'data-800':'margin-left:48px; opacity:0', 'data-1200':'margin-left:-52px; opacity:1; transform:scale(1, 1);', 'data-1400':'opacity:0; transform:scale(1.2, 1.2)' });
		
		$('#c').attr({'data-1400':'margin:-82px 0 0 124px; opacity:0', 
					  'data-1800':'margin:-82px 0 0 24px; opacity:1;', 
					  'data-2600':'margin:-82px 0 0 24px; transform:scale(1, 1);',
					  'data-3200':'margin:-172px 0 0 154px; transform:scale(.5, .5);' });
					  
		$('#qu').attr({'data-1400':'margin-left:-324px; opacity:0', 'data-1800':'margin-left:-224px; opacity:1; transform:scale(1, 1);', 'data-2200':'opacity:0; transform:scale(1.2, 1.2)' });
		
		$('#_s').attr({'data-2200':'margin:-358px 0 0 -60px; opacity:0', 
					   'data-2600':'margin:-228px 0 0 -160px; opacity:1; transform:scale(1, 1);', 
					   'data-3200':'margin:-258px 0 0 40px; transform:scale(.5, .5);' });
					   
		$('#yd').attr({'data-2600':'opacity:0; transform:rotate(-80deg) scale(2, 2);', 'data-3200':'opacity:1; transform:rotate(0deg) scale(1, 1);'});
		$('#cor').attr({'data-2600':'opacity:0; transform:rotate(80deg) scale(2, 2);', 'data-3200':'opacity:1; transform:rotate(0deg) scale(1, 1);'});
		
		$('#setext').attr({'data-2800':'opacity:0; transform:scale(2, 2);', 'data-3400':'opacity:1; transform:scale(1, 1);'});
		$('#btn1').attr({'data-2900':'margin-top:251px; opacity:0;', 'data-3500':'margin-top:231px; opacity:1;'});		
	}
	
	var onTouchStart = function()
	{
		//帮助
		Tools.getDOM('helpbtn').addEventListener(Tools.Event().down, function(e)
		{
			Tools.onTouch(e, function()
			{			
				game.help_open();
				
				ga('send', 'event', '首页', 'click', '帮助');
			});
		}, true);		
		
		//开始体验
		Tools.getDOM('btn1').addEventListener(Tools.Event().down, function(e)
		{
			Tools.onTouch(e, function()
			{			
				$('#e, #c, #_s, #yd, #cor, #setext').animate({'opacity':'0' }, 500);
				
				$('#btn1').animate({'opacity':'0' }, 500, null, function()
				{
					//卸载所有滚动条动画事件
					SKROLLR.destroy();
					
					//开始游戏
					game.start();
					
					$('#anim').hide();
					$('#game').show();
				});
				
				ga('send', 'event', '首页', 'click', '开始体验');
			});
		}, true);		
		
		//帮助
		Tools.getDOM('msg_help').addEventListener(Tools.Event().down, function(e)
		{
			Tools.onTouch(e, function()
			{				
				game.help_close();
			});
			
			ga('send', 'event', '首页', 'click', '开始游戏');
		}, true);
		
		//失败
		Tools.getDOM('ts_3btn').addEventListener(Tools.Event().down, function(e)
		{
			Tools.onTouch(e, function()
			{
				$('#msg_over').hide();
				
				//初始化游戏
				game.gameInit();
				
				//开始游戏
				game.start();
			});
			
			ga('send', 'event', '首页', 'click', '失败-重新开始');
		}, true);
		
		
		Tools.getDOM('imgs').addEventListener(Tools.Event().down, function(e)
		{
			Tools.onTouch(e, function()
			{
				//过关
				game.gameSuccess(e.target.id);
			});
		}, true);
		
		//过关
		Tools.getDOM('ts_2btn').addEventListener(Tools.Event().down, function(e)
		{
			Tools.onTouch(e, function()
			{
				$('#msg_success').hide();
				
				//初始化游戏
				game.gameInit();
				
				//开始游戏
				game.start();
			});
			
			ga('send', 'event', '首页', 'click', '过关-重新开始');
		}, true);
	}
	
	var LoadUser = function()
	{
		$.post('interface/isUser.php?openid='+Tools.getURL('openid'));
	}
	
	function loadImage($callback)
	{		
		$.get("interface/images.php", null, function(data, status)
		{
			var baseURL = 'img/';
			var pArr = eval('(' + data + ')');
			var loader = new PxLoader();
			
			for(var i = 0; i < pArr.length; i++)
			{
				loader.addImage(baseURL + pArr[i].url);
			}
				
			loader.addProgressListener(function (e)
			{
				var loadnum = parseInt((e.completedCount / e.totalCount) * 100);
				
				$('#unmbers').text(loadnum + '%');
			});
			
			loader.addCompletionListener(function (e)
			{
				$('#loading').animate({'opacity':'0'}, null, null, function()
				{
					$('#anim').show();
					$('#loading').hide();
					$callback();
				});
			});
			
			loader.start();
		});		
	}
});