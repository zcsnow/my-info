var flag=false;
var aniFrame = null;
var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);}, 
	}	
//滚动条不可滚动、高度100%
tool.disabledScroll();

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
	window.requestAnimationFrame = function(callback, element) {
	var currTime = new Date().getTime();
	var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	var id = window.setTimeout(function() { 
		callback(currTime + timeToCall); 
	}, timeToCall);
	lastTime = currTime + timeToCall;
	return id;
	};

if (!window.cancelAnimationFrame){
	window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}

 
	  
function audioAutoPlay(id){
	var audio = document.getElementById(id),
		play = function(){
		audio.play();
		document.removeEventListener("touchstart",play, false);
	};
	audio.play();
	document.addEventListener("WeixinJSBridgeReady", function () {//微信
	   play();
	}, false);
	document.addEventListener('YixinJSBridgeReady', function() {//易信
			  play();
		}, false);
	document.addEventListener("touchstart",play, false);
}
//audioAutoPlay('bgMusic');

function add(name,className, time)  {
  setTimeout(function(){
	  $(name).addClass(className);
  },time*1000);
};
function remove(name, className, time)  {
  setTimeout(function(){
	  $(name).removeClass(className);
  },time*1000);
};  

var bar = 0;
var loadingTime;
function progress() {
	bar = bar + 1;
	$("#progressbar em").text(bar);
	$('.loading-box .plane').css('left',bar+'%');
	$('.loading-box .plane').css('transform','scale('+(1+parseFloat(bar/100))+','+(1+parseFloat(bar/100))+')')
	if (bar <= 60) {
		loadingTime = setTimeout(progress, 40);
	}
	else if (bar <= 90&bar > 60) {
		loadingTime =setTimeout(progress, 50);
	}
	else if (bar <= 99&bar > 90) {
		loadingTime = setTimeout(progress, 100);
	}
}
progress();
setTimeout(function(){
      //隐藏loading页面
	  $('.loading-box').hide();
	  page0Ani();
},5000);



//其他星星数据
var allStarData = [
    {
        "name": "依怡",
        "content": "希望自己好好完成毕业实习和毕业论文"
    },
    {
        "name": "夜晚的眼",
        "content": "我想买一套小房子，按揭，然后再把它全款结清～"
    },
    {
        "name": "于萌萌",
        "content": "祝自己考研成功。"
    },
    {
        "name": "惠子HzzzZ",
        "content": "不要像2018年一样这么惨了"
    },
    {
        "name": "一只考研er",
        "content": "不熬夜、坚持健身、坚持读书"
    },
    {
        "name": "Andy",
        "content": "转专业"
    },
    {
        "name": "MeredithTa",
        "content": "国奖\\考研成功"
    },
    {
        "name": "Frida",
        "content": "希望雅思上7.0，申请到挪威访问生"
    },
    {
        "name": "XSA",
        "content": "通过cfa"
    },
    {
        "name": "蝙蝠侠",
        "content": "股票暴涨暴跌"
    },
    {
        "name": "刘L",
        "content": "摆脱单身"
    },
    {
        "name": "ChrisSung",
        "content": "不再焦虑，能多点时间陪陪家人。"
    },
    {
        "name": "阿梨",
        "content": "希望能瘦身成功，摆脱肉肉"
    },
    {
        "name": "Ca'Yoo",
        "content": "多读读书，多思考"
    },
    {
        "name": "觉然悠",
        "content": "希望家人身体健康，希望自己不要被加班击垮，希望开心没有矛盾。"
    },
    {
        "name": "DaileZhang",
        "content": "变有钱，更独立，更有魅力，更有思想"
    },
    {
        "name": "Sven",
        "content": "对2019的期待莫过于中美合资，文体两开花了吧！"
    },
    {
        "name": "Ybaby",
        "content": "要开心"
    },
    {
        "name": "杨雨凝",
        "content": "家人一切顺利"
    },
    {
        "name": "Irise",
        "content": "跟爱的人幸幸福福一辈子，有个宝宝，一起努力工作，一起旅游!"
    },
    {
        "name": "bwxjj",
        "content": "1.身体健康；2.暴富"
    },
    {
        "name": "张晓",
        "content": "存够首付买套房。"
    },
    {
        "name": "韩信",
        "content": "能够让自己回到之前上进的状态里。"
    },
    {
        "name": "bfe1925",
        "content": "抑郁症康复"
    },
    {
        "name": "我就是我",
        "content": "风雨里像个大人，阳光下像个孩子"
    },
    {
        "name": "FancyKo",
        "content": "读很多书，学好跳舞。好好健身，攒很多钱。"
    },
    {
        "name": "叶子晴",
        "content": "脱贫。脱脂。脱单。"
    },
    {
        "name": "梁爱敬",
        "content": "做小事，立小业，做个幸福小人物。"
    },
    {
        "name": "安",
        "content": "希望成为上海坠好的GMAT和GRE老师之一"
    },
    {
        "name": "伊峮",
        "content": "为EME Pharma Consultant 写52篇关于医学写作的文章；录12个医学写作的视频"
    },
    {
        "name": "岛屿之歌",
        "content": "希望能考出日语N2"
    },
    {
        "name": "江先桑",
        "content": "做一个快乐的人，慢一点，不要像今年这么快了，不适应。希望找个女朋友。嗯愿望？"
    },
    {
        "name": "永安",
        "content": "身体健康，身边的人都要健康才是啊"
    },
    {
        "name": "BobD",
        "content": "去趟莫斯科"
    },
    {
        "name": "Klaus Yan",
        "content": "2019年，利用好自己的人脉关系，调动一切可以利用的资源去实现自己的抱负。"
    },
    {
        "name": "Spontaneo",
        "content": "做为老博，千言万语化成两个字：毕业。"
    },
    {
        "name": "晨晨",
        "content": "养一只猫"
    },
    {
        "name": "暖暖",
        "content": "朋友家人平安顺利"
    },
    {
        "name": "Alina",
        "content": "彻底离婚，开始新生活，重新做回自己。"
    },
    {
        "name": "GongyEight",
        "content": "希望身边人平安喜乐，希望和老杨顺顺利利。"
    },
     {
        "name": "7infeng",
        "content": "女人通性:瘦一点吧。五六斤也好，美一点吧。一两分也好"
    },
     {
        "name": "Momo",
        "content": "希望新的一年爸爸妈妈健康平安。"
    },
     {
        "name": "芒果慕斯",
        "content": "愿2018熬的每一个夜都是有意义的"
    },
     {
        "name": "小阿发",
        "content": "今年过生日我希望可以在东京❤(&gt;^ω^&lt;)喵mua~"
    },
     {
        "name": "四季豆",
        "content": "最最最大的愿望，希望爸爸妈妈能够平安健康啊！"
    },
     {
        "name": "naaaaaa",
        "content": "天天开心，一直好运，不要熬夜。"
    },
     {
        "name": "青栀桠",
        "content": "我没有什么宏大的愿望，唯一一个是希望明年跨年的时候不再感到孤单。"
    },
     {
        "name": "陈温柔",
        "content": "认真健身 瘦腿成功 体重保持在100斤左右"
    },
     {
        "name": "疯子的信仰",
        "content": "我希望家人都能健康平安，其他的我不奢求。感情嘛，随缘就好。"
    },
     {
        "name": "火锅",
        "content": "我希望完结一本小说。"
    },
     {
        "name": "寻梦家",
        "content": "考下PMP"
    },
     {
        "name": "翻译爱好者",
        "content": "依旧希望自己能够在四点到5点钟之间的话起床学习英语"
    },
     {
        "name": "四毛",
        "content": "想摆脱自卑，想接受自己，想好好爱自己，好好生活！"
    },
     {
        "name": "MR.小志",
        "content": "跑步，每天达成一个小目标，从五公里，十公里，半马，一直到全马！"
    },
     {
        "name": "远方的树",
        "content": "重拾写日记的习惯，每隔一段时间回头看看自己有没有朝着更好的方向进步。"
    },
     {
        "name": "磺二~昊昊",
        "content": "每月捐一笔钱给希望小学学习成绩优异的贫困生，这是我2019年最大的心愿。"
    },
     {
        "name": "吴小莹",
        "content": "好好吃饭，好好养胃。"
    },
     {
        "name": "罗芳远",
        "content": "希望我老公在外面工作顺利，希望我的身体能快点恢复健康，愿我们一家人都平安快乐。"
    },
     {
        "name": "Rika",
        "content": "不再用恶语伤人。"
    },
     {
        "name": "王三胖",
        "content": "我希望，今年可以尽快拿到驾照"
    },
     {
        "name": "Alex",
        "content": "永远不要放弃努力跳出窘境。"
    },
     {
        "name": "叶为名",
        "content": "报名CPA会计和经济法并通过考试"
    },
     {
        "name": "功不唐捐",
        "content": "有进一寸的勇气，也有退一步的从容"
    },
     {
        "name": "Gwyne",
        "content": "多做有用功，少演内心戏。"
    }
];
var starData = getRandomArrayElements(allStarData, 31);

//添加元素到指定位置
Array.prototype.add = function (val, index) {
	if (index > - 1) {
	  this.splice(index, 0, val);
	}
};
var starListHtml = "";

//setCookie('wishVal','');
//setCookie('nameVal','');

var nameVal = getCookie('nameVal');
var wishVal = getCookie('wishVal');
var myselfStarIsShow = false;

function page0Ani(){
	$('.big-plane').fadeIn();
	$('.page0').fadeIn();
	setTimeout(function(){
		$('.page0 .text1').addClass('animated fadeIn');
	},100);
	setTimeout(function(){
		$('.page0 .text2').addClass('animated fadeIn');
	},800);
	setTimeout(function(){
		$('.page0 .text3').addClass('animated fadeIn');
	},1500);
	//$('.page2').fadeIn();
	setTimeout(function(){
		$('.page0 .btn').addClass('animated fadeIn');
	},2000);
	
}

//起飞按钮点击
$('.page0').on('click','.start-btn',function(e){
	//e.stopPropagation();
	$('.big-plane').addClass('planeflyAni');
	$('.particles').fadeIn();
	$('.plane-text').fadeIn();
	
	$('.page0').hide();	
	setTimeout(function(){
		$('.big-plane').hide();
		$('.plane-text').hide();
		$('.particles').fadeOut();
		//$('.big-plane').removeClass('planeflyAni').addClass('planeflyAni2');
		page1Ani();
		
	},1500);
	// setTimeout(function(){
	// 	$('.star-plane').fadeOut();
	// },2500)
	
	
});

function page1Ani(){
	nameVal = decodeURIComponent(getCookie('nameVal'));
	wishVal = decodeURIComponent(getCookie('wishVal'));

	var myselfStar = {
		"name": nameVal,
		"content": wishVal
	};
    var myselfStarIndex = 0;
	if(wishVal!=''&&wishVal!=null&&wishVal!="null"){
		if(myselfStarIsShow == false){
			starData.add(myselfStar, myselfStarIndex);
			myselfStarIsShow = true;
		}
		$('.page1-btn1').removeClass('js-write-wish-btn').addClass('js-look-self-btn');
		$('.page1-btn1 img').attr('src','images/btn3.png');
	 }else{
		$('.page1-btn1').removeClass('js-look-self-btn').addClass('js-write-wish-btn');
		$('.page1-btn1 img').attr('src','images/btn0.png')
	 }
	starListHtml = "";
	$.each(starData, function (key, value) {
		if(myselfStarIsShow==true && key==myselfStarIndex){
			starListHtml +='<li class="wish-list js-look-self-btn" data-content='+ value.content +'>';
		}else{
			starListHtml +='<li class="wish-list js-wish-list" data-content='+ value.content +'>';
		}
		starListHtml +='<span class="name">'+ value.name +'</span>';
		starListHtml +='<div class="star-box lightFlash" style="animation-delay:'+key/2+'s;">';
		if(myselfStarIsShow==true && key==myselfStarIndex){
			starListHtml +='<img class="star" src="images/big_star.png">';
		}else{
			starListHtml +='<img class="star" src="images/star.png">';
		}
		starListHtml +='<i class="star-shine"><img src="images/shine.png"></i>';
		starListHtml +='</div>';
		starListHtml +='</li>'; 
	});
	$('#wish_box').empty();
	$('#wish_box').append(starListHtml);
	 
	 $('.page1').fadeIn();
	 //$('.page1').addClass('animated fadeInUpBig');
	 starInit()
	 
	
	// setTimeout(function(){
	// 	$('.page1 .cloud').addClass('animated fadeInUp');
	// },1500);
	setTimeout(function(){
		$('.page1 .btn').addClass('animated fadeIn');
		$('.page1 .logo1').addClass('animated fadeIn');
	},500);
	
}

function page2Ani(){
	$('.page2').fadeIn();
	//$('.page2').addClass('animated fadeInUpBig')
	//$('.page2').fadeIn();
	setTimeout(function(){
		$('.page2 .btn').addClass('animated fadeIn');
	},500);
	
}
//许愿按钮点击
$('.page1').on('click','.js-write-wish-btn',function(e){
	//e.stopPropagation();
	$('.page1').hide();	
	cancelAnimationFrame(aniFrame);
	page2Ani();
});
//查看许愿按钮点击
$('.page1').on('click','.js-look-self-btn',function(e){
	cancelAnimationFrame(aniFrame);
	lookSelfWish()
});

//查看自己的心愿
function lookSelfWish(){
	$('.page1').hide();
	$('.page3 .js-replay-btn').css({'margin': '0 4%','float': 'left'})
	$('.page3 .js-share-btn').show();
	$('.page3 .save-txt').css('visibility','visible');
	$('.wish-content h2').text(nameVal);
	$('.wish-content .star-bg p').text(wishVal);
	$('.page3').fadeIn(1000);
	//$('.page3').addClass('animated fadeInUpBig')
	if($('.page3 .save').children().length === 0){
		var savaImgUrl = getCookie('savaImgUrl');
		if(savaImgUrl!=''&&savaImgUrl!=null&&savaImgUrl!="null"){
			var flagImg = document.createElement("img");
			flagImg.src = savaImgUrl;
			$(".page3 .save").append(flagImg);
		}else{
			writeTextOnCanvas(newCanvas, 42, nameVal, wishVal);
		}
	}
	
}

//查看其他人心愿
$('#wish_box').on('click','.js-wish-list',function(e){
	cancelAnimationFrame(aniFrame);
		var starName = $(this).find('.name').text();
		var starContent = $(this).attr('data-content');
		$('.page1').hide();
		$('.wish-content h2').text(starName);
		$('.wish-content .star-bg p').text(starContent);
		$('.page3 .save-txt').css('visibility','hidden');
		$('.page3 .js-replay-btn').css({'margin': '0 auto','float': 'none'})
		$('.page3 .js-share-btn').hide();
		$('.page3').fadeIn(1000);
		//$('.page3').addClass('animated fadeInUpBig');
		
});

var newCanvas = document.getElementById('reusltCanvas');
//提交心愿内容
$('.js-submit-wish-btn').on('click',function(e){
	//e.stopPropagation();
	var wish_val = $('#wish_val').val();
	var name_val = $('#name_val').val();
	if(wish_val==''){
		popTip('还没许下心愿哦');
		return false;
	}
	if(name_val==''){
		name_val = '匿名';
	}

	wish_val_substr = cutString(wish_val, 140);
	wish_val = wish_val.substr(0, wish_val_substr).replace(/^\s+|\s+$/, "")
	setCookie('wishVal',encodeURIComponent(wish_val));
	setCookie('nameVal',encodeURIComponent(name_val));
	$('.fly-star').addClass('flyAni');
	setTimeout(function () { 
		//$('.page2').hide();
		$('.page3 .js-replay-btn').css({'margin': '0 4%','float': 'left'})
		$('.page3 .js-share-btn').show();
		$('.page3 .save-txt').css('visibility','visible');
		$('.page3').fadeIn(1000);
		//$('.page3').addClass('animated fadeInUpBig')
		$('.wish-content h2').text(name_val);
		$('.wish-content .star-bg p').text(wish_val);
		setTimeout(function(){
			$('.page2').hide();
			$('.fly-star').removeClass('flyAni');
		},1000);
		writeTextOnCanvas(newCanvas, 42, name_val, wish_val);
		
	},1000)
	

});

//返回按钮
$('.js-replay-btn').click(function(e){
	e.stopPropagation();
	page1Ani();
	$('.page3').hide();
});

//分享
$('.js-share-btn').on('click',function(e){
	$('.js-share-pop').show();	

});
$('.js-share-pop').click(function(e){
	e.stopPropagation();
	$('.js-share-pop').hide();	
});

//文字图片合成
function writeTextOnCanvas(canvasId, lineHeight, userName, text){
	//提供canvas的数据
	var ctx = canvasId.getContext("2d");
	var canvasW = 750;
	var canvasH = 1334;
	canvasId.width = canvasW;
	canvasId.height = canvasH;
	ctx.width = canvasW;
	ctx.height = canvasH;
	ctx.clearRect(0, 0, canvasW, canvasH);
	//画背景
	var img1=document.getElementById("result_bg");
	ctx.drawImage(img1,0,0,canvasW,canvasH);
	//画二维码
	//var img2= document.getElementById("ewm");
	//ctx.drawImage(img2,428,884,171,172);

	//颜值能打、灵魂有趣，不仅是新生代消费者为代表的交友、择偶的标准，也是他们为消费场所“用脚投票”、为产品内容“掏钱买单”的标准。
	//var wordsTop = canvasH*0.4;
	var wordsTop = 566;
	var wordsLeft = canvasW*0.215;
	var wordsAllWidth = canvasW*0.45;
	//填充用户名称文字
	ctx.font = "28px PingFangSC-Regular";
	ctx.fillStyle = '#e2311f';
	ctx.textAlign='center';
	ctx.fillText(userName, canvasW/2, wordsTop-150); 

	//填充用户心愿文字
	
	var wordsNumOnline = parseInt(wordsAllWidth/12)
	var lineheight = lineHeight;
	var text = text;
	ctx.font="bold 30px PingFangSC-Regular";//字体大小必须和字体类型一起设置
	ctx.fillStyle = '#333';//字体颜色
	//ctx.textAlign='center';
	//ctx.textAlign='left';//文本水平对齐方式
	
	for(var i = 1; getTrueLength(text) > 0; i++){//分行
		var tl = cutString(text, wordsNumOnline);
		//ctx.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ""), wordsLeft, i * lineheight + wordsTop);
		ctx.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ""), canvasW/2, i * lineheight + wordsTop);
		text = text.substr(tl);
	}

	//请求图片base64转jpeg
	var uploadUrl = convertCanvasToImage(canvasId, true);
	var url = "http://topic.dongxingji.cn/image/upload";
	var parm = {
		"base64" : encodeURI(uploadUrl),
		"extension" : "jpeg"
	   };
	$.ajax({
		type:"post", 
		url: url, 
		dataType:"json",
		data:  JSON.stringify(parm),
		contentType:"application/json",  
		success: function (data) {
			//console.log(data);
			setCookie('savaImgUrl',data.data.url);
			var flagImg = document.createElement("img");
				var uploadUrl2 = getCookie('savaImgUrl');
				flagImg.src = uploadUrl2;
				$(".page3 .save").append(flagImg);
		},
		error: function (data) {	
			//popTip('图片生成失败');
			var uploadUrl1 = convertCanvasToImage(canvasId, false);
			var flagImg = document.createElement("img");
			flagImg.src = uploadUrl1;
			$(".page3 .save").append(flagImg);
		}
	});

}
//获取字符串的真实长度（字节长度）
function getTrueLength(str){//获取字符串的真实长度（字节长度）
	var len = str.length, truelen = 0;
	for(var x = 0; x < len; x++){
		if(str.charCodeAt(x) > 128){
			truelen += 2;
		}else{
			truelen += 1;
		}
	}
	return truelen;
}
//按字节长度截取字符串，返回substr截取位置
function cutString(str, leng){//按字节长度截取字符串，返回substr截取位置
	var len = str.length, tlen = len, nlen = 0;
	for(var x = 0; x < len; x++){
		if(str.charCodeAt(x) > 128){
			console.log('汉字')
			if(nlen + 2 <= leng){
				nlen += 2;
			}else{
				tlen = x;
				break;
			}
		}else{
			console.log('字符')
			if(nlen + 1 <= leng){
				nlen += 1;
			}else{
				tlen = x;
				break;
			}
		}
	}
	return tlen;
}

//canvas生成img
function convertCanvasToImage(canvas, is_data) {
	var image = new Image();
	var data_url = canvas.toDataURL("image/jpeg", 0.6);
	var baseUrl;
	var sup_Blob = Boolean(window.Blob);
	var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

	function get_blob(base64) {
		var dataURI = base64; //base64 字符串
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
		var byteString = atob(dataURI.split(',')[1]); //base64 解码
		var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
		var intArray = new Uint8Array(arrayBuffer); //创建视图
		//baseUrl = dataURI.replace(/^data:image\/\w+;base64,/, "");
		baseUrl = dataURI.slice(dataURI.indexOf(',')+1);
		for (i = 0; i < byteString.length; i += 1) {
			intArray[i] = byteString.charCodeAt(i);
		}
		var blob = new Blob([intArray], {
			type: mimeString
		}); //转成blob
		return URL.createObjectURL(blob);
	}

	if (sup_Blob && !BlobBuilder) {
		var blob_url = get_blob(data_url);
	}else{
		var blob_url = data_url;
	}
	if (is_data) {
		return baseUrl;
	}else{
		//image.src = blob_url;
		//return image;
		return blob_url;
	}

};

//数组随机获取
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

//设置cookie
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setHours(exp.getHours() + 5*24);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	//document.cookie = name + "=" + value + ";path=/;expires=" + exp.toUTCString();
}
//获取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}






//提示totast层
function popTip(msg){
	$('.pop-tip-msg').html(msg);
	$('.pop-tip-box').show();
	setTimeout(function(){
		$('.pop-tip-box').hide();
	},2000);
};

//音乐控制
$('.music').on('click', function () {
  if ($('.music').hasClass('on')) {
	  $('.music').removeClass('on');
	  $('.music img').attr('src', 'images/music1.png');
		 $('#media')[0].pause();
	  
  } else {
	  $('.music').addClass('on');
	  $('.music img').attr('src', 'images/music0.png');
		 $('#media')[0].play();
		
  }
});


function starInit(){
	var radius = $(window).width()*0.7/2; //半径
	var PI = Math.PI // 值为3.14 = 180°
	var degree = PI/180; // 1°
	var ddddd=300; 
	var starList = []; //元素的宽(width)，高(height)，空间坐标(x,y,z),缩放大小(scale)，透明度(alpha)等信息
	var active = true; //是否自动旋转
	var lasta = 1;
	var lastb = 1;
	var tspeed=2; //速度
	var size=50; // 大小
	var mouseX=10;
	var mouseY=0;
	var sina,cosa,sinb,cosb,sinc,cosc;
	var oDiv=document.getElementById('wish_box');
	var aA=oDiv.getElementsByTagName('li');
	var eleBox = $("#wish_box");  //所有星星元素放置的盒子
	var eleLi = $("#wish_box li"); //每一个星星元素
	var eleBoxHalfWidth = $("#wish_box").width()/2;
	var eleBoxHalfHeight = $("#wish_box").height()/2;
	var i=0;
	var eleTag=null;

	for(i=0;i<eleLi.length;i++){
		eleTag={};
		eleTag.width = eleLi.eq(i).width();
		eleTag.height = eleLi.eq(i).height();
		starList.push(eleTag);
	}

	//sineCosine( 0,0,0 );
	positionAll();

	var mc = new Hammer.Manager(oDiv);
	mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 })); 
	mc.on('panstart',function(ev){
		mouseX = 15;
	});
	mc.on("panmove", function(ev){
		if(!ev.isFinal) {
			mouseX = ev.deltaX;
			mouseY = ev.deltaY;
		} 
	});
	mc.on('panend',function(ev){
	});

	//update()
	//setInterval(update, 50);

	var animloop = function(){
		aniFrame = requestAnimationFrame(animloop);
		update();
	};
	animloop();

	


	
function update(){
	var a;
	var b;

	if(active){
		a = (-Math.min( Math.max( -mouseY, -size ), size ) / radius ) * tspeed;
		b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
		//console.log(a,b)
	}else{
		a = lasta * 0.98;
		b = lastb * 0.98;
	}
	
	lasta=a;
	lastb=b;
	// mouseY=a;
	// mouseX=b;
	
	if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01){
		return;
	}
	var c=0;
	sineCosine(a,b,c);
	var eleMaxLength=starList.length;
	for(var j=0;j<eleMaxLength;j++){
		var rx1=starList[j].x;
		var ry1=starList[j].y*cosa+starList[j].z*(-sina);
		var rz1=starList[j].y*sina+starList[j].z*cosa;

		var rx2=rx1*cosb+rz1*sinb;
		var ry2=ry1;
		var rz2=rx1*(-sinb)+rz1*cosb;
		
		var rx3=rx2*cosc+ry2*(-sinc);
		var ry3=rx2*sinc+ry2*cosc;
		var rz3=rz2;
		
		starList[j].x=rx3;
		starList[j].y=ry3;
		starList[j].z=rz3;
		
		per=ddddd/(ddddd+rz3);
		
		starList[j].scale=per;
		starList[j].alpha=per;
		
		starList[j].alpha=(starList[j].alpha-0.6)*(10/6);
		//console.log(starList)
	}
	
	doPosition();
}


//初始元素位置成球型
function positionAll(){
	var phi=0;//方位面（水平面）内的角度,范围0~360度
	var theta=0; //俯仰面（竖直面）内的角度，范围0~180度
	var eleMaxLength=starList.length;
	for(var i=0; i<eleMaxLength; i++){
		phi = Math.acos(-1+(2*(i+1)-1)/eleMaxLength); //Math.acos返回数的反余弦值，值是 0 到 PI 之间的弧度值
		theta = Math.sqrt(eleMaxLength*PI)*phi; //Math.sqrt返回数的平方根
		starList[i].x = radius * Math.cos(theta)*Math.sin(phi);  //星星三维坐标x值 (x=r*cos(theta)*sin(phi))
		starList[i].y = radius * Math.sin(theta)*Math.sin(phi);  //星星三维坐标y值 (x=r*sin(theta)*sin(phi))
		starList[i].z = radius * Math.cos(phi);                  //星星三维坐标z值 (x=r*cos(phi))
		var eleLeft = starList[i].x+eleBoxHalfWidth-starList[i].width/2;
		var eleTop = starList[i].y+eleBoxHalfHeight-starList[i].height/2;
		var eleScale = 1;
		aA[i].style.webkitTransform = formatTransform(eleLeft, eleTop, eleScale);

	}
}

function doPosition(){
	var eleMaxLength=starList.length;
	for(var i=0;i<eleMaxLength;i++){
		var eleLeft = starList[i].x+eleBoxHalfWidth-starList[i].width/2;
		var eleTop = starList[i].y+eleBoxHalfHeight-starList[i].height/2;
		var eleScale = starList[i].scale/1.8;
		aA[i].style.webkitTransform = formatTransform(eleLeft, eleTop, eleScale);
		aA[i].style.zIndex= eleMaxLength - i;
		aA[i].style.opacity=starList[i].alpha;
	}
}


function sineCosine(a,b,c){
	sina = Math.sin(a * degree); //返回参数a的正弦 ，值在 -1.0 到 1.0 之间
	cosa = Math.cos(a * degree); //返回参数a的余弦 ，值在 -1.0 到 1.0 之间
	sinb = Math.sin(b * degree); //返回参数b的正弦
	cosb = Math.cos(b * degree); //返回参数b的余弦
	sinc = Math.sin(c * degree); //返回参数c的正弦
	cosc = Math.cos(c * degree); //返回参数c的余弦
}

}



//大小缩放
function formatTransform(offx, offy, scale) {
	var translate = 'translate3d(' + (offx + 'px,') + (offy + 'px,') + '0)',
		myScale = 'scale(' + scale + ')';
	var result = translate + ' ' + myScale;
	return result;
}


	  
	 