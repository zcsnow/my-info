new Image().src="decode.png";
new Image().src="234.png";
var start, showDecode, jumpToDecode, lastTime, lastAcc, isStarted = false;

start = function() {
	isStarted = true;
	$('.decode').hide();
	$('.result').show();
	setTimeout(showDecode, 3000);
}

showDecode = function(){
	$('.result').hide();
	$('.decode').show();
	setTimeout(jumpToDecode, 3000);
}

jumpToDecode = function(){
	var urls = [
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209278371&idx=1&sn=7d47af23fa9802050862f7ce789d5bb5#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209277387&idx=1&sn=993ea94de3c453dc4a0e70cb03633755#rd",
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209275728&idx=1&sn=a5f55dba7b127708252fc1a52864e990#rd",
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209275295&idx=1&sn=7b6aa24a5b345bfd60809925d4fecb18#rd",
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209274665&idx=1&sn=f70054c89ae14eef8a87b65dbcd9f1b4#rd",
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209274981&idx=1&sn=2a34341c2bb795271e03fb58e30e6866#rd",,
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209272914&idx=1&sn=dcc0410bc16e4deb917d348c007c168d#rd",
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209273334&idx=1&sn=c6e68460fc0de9e4330be2ebcea9e40f#rd",
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209274320&idx=1&sn=1b1bba20ce510fa3371aa86f32db1f2f#rd",
	"http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209275131&idx=1&sn=5b981b573d0166bf7f9af41aecb4125d#rd",
	];
	var jumpTo = urls[parseInt(Math.random() * urls.length)];
	window.location = jumpTo;
}

$('.do').click(start);

//摇一摇
$(window).on('deviceorientation', function(e) {
	if (isStarted) {
		return true;
	}
	if (!lastAcc) {
		lastAcc = e;
		return true;
	}
	var speed = e.alpha + e.beta + e.gamma - lastAcc.alpha - lastAcc.beta - lastAcc.gamma;
	if (Math.abs(speed) > 50) {
		start();
	}
	lastAcc = e;
});

//微信分享  失效了，有时间的可以根据官方公布的 JS-SDK进行开发

