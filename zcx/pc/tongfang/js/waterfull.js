$(function(){
	/*瀑布流开始*/
	console.log(1);
	var container = $('.waterfull ul');
	var loading=$('#imloading');
	// 初始化loading状态
	loading.data("on",true);
	
	/*判断瀑布流最大布局宽度，最大为1280*/
	/*function tores(){
		var tmpWid=$(window).width();
		if(tmpWid>1280){
			tmpWid=1280;
		}else{
			var column=Math.floor(tmpWid/320);
			tmpWid=column*320;
		}
		$('.waterfull').width(tmpWid);
	}
	tores();
	$(window).resize(function(){
		tores();
	});*/
	
	container.imagesLoaded(function(){
	  container.masonry({
		itemSelector : '.item',
		gutter: 20,
		isAnimated: true,
	  });
	});
	/*模拟从后台获取到的数据*/
	var sqlJson=[
		{
			'title':'同方律师悦跑沈阳国际马拉松',
			'intro':'9月27日，适逢中国传统节日中秋佳节，2015智美体育杯沈阳马拉松赛如约开赛。同方律师事务所......',
			'src':'../images/culture_img1.jpg',
			'date':'2016-10-22',
		},
		{
			'title':'同方律师悦跑沈阳国际马拉松',
			'intro':'9月27日，适逢中国传统节日中秋佳节，2015智美体育杯沈阳马拉松赛如约开赛。同方律师事务所......',
			'src':'../images/culture_img2.jpg',
			'date':'2016-10-23',
		},
		{
			'title':'同方律师悦跑沈阳国际马拉松',
			'intro':'9月27日，适逢中国传统节日中秋佳节，2015智美体育杯沈阳马拉松赛如约开赛。同方律师事务所......',
			'src':'../images/culture_img3.jpg',
			'date':'2016-10-24',
		},
		{
			'title':'同方律师悦跑沈阳国际马拉松',
			'intro':'9月27日，适逢中国传统节日中秋佳节，2015智美体育杯沈阳马拉松赛如约开赛。同方律师事务所......',
			'src':'../images/culture_img4.jpg',
			'date':'2016-10-25',
		}
		
	];
	/*本应该通过ajax从后台请求过来类似sqljson的数据然后，便利，进行填充，这里我们用sqlJson来模拟一下数据*/
	$(".classname").mCustomScrollbar({
	　
	　　callbacks: {
	　　　　whileScrolling: function(){      　// 只要滚动条滚动，这个函数就会执行
	　　　　　　if (this.mcs.topPct >= 90) {    // 这表示当滚动条滚动到这个div的90%(当然这个值是可变的)的时候调用下面的代码，
	　　　　　　　　
				if(!loading.data("on")) return;
					console.log();
					// 计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，方法很多这里只列举最简单一种，最易理解一种
					var itemNum=$('#waterfull').find('.item').length;
					var itemArr=[];
					itemArr[0]=$('#waterfull').find('.item').eq(itemNum-1).offset().top+$('#waterfull').find('.item').eq(itemNum-1)[0].offsetHeight;
					itemArr[1]=$('#waterfull').find('.item').eq(itemNum-2).offset().top+$('#waterfull').find('.item').eq(itemNum-1)[0].offsetHeight;
					itemArr[2]=$('#waterfull').find('.item').eq(itemNum-3).offset().top+$('#waterfull').find('.item').eq(itemNum-1)[0].offsetHeight;
					var maxTop=Math.max.apply(null,itemArr);
					if(maxTop<$(window).height()+$(document).scrollTop()){
						//加载更多数据
						loading.data("on",false).fadeIn(800);
						(function(sqlJson){
							/*这里会根据后台返回的数据来判断是否你进行分页或者数据加载完毕这里假设大于30就不在加载数据*/
							if(itemNum>30){
								loading.text('没有更多了......');
							}else{
								var html="";
								for(var i in sqlJson){
									html+="<li class='item'>";
									html+="<a href='javascript:;' class='a-img'><img src='"+sqlJson[i].src+"'></a>";
									html+="<h2 class='li-title'>"+sqlJson[i].title+"</h2>";
									html+="<em><img src='../images/date-icon.png'>"+sqlJson[i].date+"</em>";
									html+="<p class='description'>"+sqlJson[i].intro+"<a href=''>[详情信息]</a></p>";
									html+="</li>";		
								}
								
								/*模拟ajax请求数据时延时800毫秒*/
								var time=setTimeout(function(){
									$(html).find('img').each(function(index){
										loadImage($(this).attr('src'));
									})
									var $newElems = $(html).css({ opacity: 0}).appendTo(container);
									$newElems.imagesLoaded(function(){
										$newElems.animate({ opacity: 1},800);
										container.masonry( 'appended', $newElems,true);
										loading.data("on",true).fadeOut();
										clearTimeout(time);
									});
								},800)
							}
						})(sqlJson);
					}
	
	
	
	　　　　　　}
	　　　　}
	　　}
	})
	
	
	
	function loadImage(url) {
		 var img = new Image(); 
		 //创建一个Image对象，实现图片的预下载
		  img.src = url;
		  if (img.complete) {
			 return img.src;
		  }
		  img.onload = function () {
			return img.src;
		  };
	 };

});
		


