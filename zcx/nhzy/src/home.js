document.addEventListener('DOMContentLoaded', function() {
	
var sc = 1;
var mc = new Hammer($('.header .nav_ico_container')[0]);
mc.on("tap", function(){
	if(hasClass($('.header .nav_ico')[0],'close')){
		closeMenu(true);
	}else{
		closeMenu(false);
	}
});
var clickMenu1 = new Hammer($('.header .menu .menu-product')[0]);
clickMenu1.on("tap", function(){closeMenu(true);window.location.hash = 'product';gotoTarget("p3",true);});
var clickMenu2 = new Hammer($('.header .menu .menu-about')[0]);
clickMenu2.on("tap", function(){closeMenu(true);window.location.hash = 'aboutus';gotoTarget(0);});
var clickMenu3 = new Hammer($('.header .menu .menu-contact')[0]);
clickMenu3.on("tap", function(){closeMenu(true);window.location.hash = 'contactus';gotoTarget("p4",true);});


var clickNav1 = new Hammer($('#nav-cardiovascular')[0]);
clickNav1.on("tap", function(){window.location.href='product.html#cardiovascular';});
var clickNav2 = new Hammer($('#nav-metabolism')[0]);
clickNav2.on("tap", function(){window.location.href='product.html#metabolism';});
var clickNav3 = new Hammer($('#nav-ophthalmology')[0]);
clickNav3.on("tap", function(){window.location.href='product.html#ophthalmology';});
var clickNav4 = new Hammer($('#nav-immunology')[0]);
clickNav4.on("tap", function(){window.location.href='product.html#immunology';});
var clickNav5 = new Hammer($('#nav-neuroscience')[0]);
clickNav5.on("tap", function(){window.location.href='product.html#neuroscience';});
var clickNav6 = new Hammer($('#nav-respiratory')[0]);
clickNav6.on("tap", function(){window.location.href='product.html#respiratory';});
var clickNav7 = new Hammer($('#nav-hypertension')[0]);
clickNav7.on("tap", function(){window.location.href='product.html#hypertension';});
var clickNav8 = new Hammer($('#nav-hepatopathy')[0]);
clickNav8.on("tap", function(){window.location.href='product.html#hepatopathy';});
//var clickNav9 = new Hammer($('#nav-orthopaedics')[0]);
//clickNav9.on("tap", function(){window.location.href='product.html#orthopaedics';});
var clickNav10 = new Hammer($('#nav-oncology')[0]);
clickNav10.on("tap", function(){window.location.href='product.html#oncology';});
var clickNav11 = new Hammer($('#nav-other')[0]);
clickNav11.on("tap", function(){window.location.href='product.html#other';});

	var sk= skrollr.init({
		smoothScrolling: false,
		mobileDeceleration: 0.004
	});
	
whenResize();
checkHash();
window.addEventListener("resize", whenResize, false);
TweenMax.set($('.wrapper'),{autoAlpha:1});

  function whenResize() {
        var s = 1;
        var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        s = winWidth / 640;
		if(s>1){
			s = 1;
		}
		sc = s;
		var realWidth = winWidth / s;
		var realHeaderHeight = 127 * s;
		
        TweenMax.set($('.container'),{scale:s,width:realWidth});
        TweenMax.set($('.header-container'),{scale:s,width:realWidth});
        TweenMax.set($('.header'),{height:127*sc});
        var realGapHeight = (winHeight/s - $('#p1')[0].clientHeight);
		TweenMax.set($('.wrapper'),{height:realGapHeight});
		
		
		if(sc>=1){
			TweenMax.set($('.header .border1'),{width:(winWidth-189)});
		}else{
			TweenMax.set($('.header .border1'),{width:450});
		}
		
		if(sk!=null){
			sk.refresh();
			//if(s<1){
			var a = sk.getMaxScrollTop();
			var ah = $('#p1')[0].clientHeight + $('#p2')[0].clientHeight + $('#p3')[0].clientHeight + $('#p4')[0].clientHeight;
			var ah1 = ah + 640*4;
			var ah2 = (ah + realGapHeight*4);
			var ah3 = (realGapHeight-500)*(1-s);
			sk.setMaxScrollTop(a - ah3);
			//}
		}
  }

function gotoTarget(t,f){
	var tt = 0;
	if(typeof(t)=='number'){
		tt = t;
	}else{
		tt = sk.relativeToAbsolute($('#'+t)[0], 'top', 'top')-375*sc;
		if(f){
			tt = tt - 375*sc;
		}
	}
	var o = {top:sk.getScrollTop()};
	TweenMax.to(o,1,{top:tt,onUpdate:function(){sk.setScrollTop(o.top);},ease:Sine.easeInOut});
}
function closeMenu(_f){
	if(_f){
		removeClass($('.header .nav_ico')[0],'close');
		var tl = new TimelineMax();
		tl.to($('.header .nav_ico .e1'),0.3,{rotation:0,x:0,ease:Expo.easeInOut},0);
		tl.to($('.header .nav_ico .n_3'),0.3,{scale:1,ease:Expo.easeInOut},0);
		tl.to($('.header-container'),0.3,{height:127,ease:Sine.easeInOut},0);
		tl.to($('.skrollr-container'),0.3,{y:0,ease:Sine.easeInOut,onComplete:function(){$('.skrollr-container')[0].style.cssText=""}},0);
		/*tl.to($('.header .menu li:eq(0)'),0.3,{rotationX:-105,ease:Sine.easeInOut},0);
		tl.to($('.header .menu li:eq(1)'),0.3,{rotationX:65,y:-160,z:-140,ease:Sine.easeInOut},0);
		tl.to($('.header .menu li:eq(2)'),0.3,{rotationX:-110,y:-215,z:-10,ease:Sine.easeInOut},0);*/
	}else{
		addClass($('.header .nav_ico')[0],'close');
		var tl = new TimelineMax();
		tl.to($('.header .nav_ico .n_1'),0.3,{x:10,rotation:45,ease:Expo.easeInOut},0);
		tl.to($('.header .nav_ico .n_2'),0.3,{x:-10,rotation:-45,ease:Expo.easeInOut},0);
		tl.to($('.header .nav_ico .n_4'),0.3,{x:10,rotation:-45,ease:Expo.easeInOut},0);
		tl.to($('.header .nav_ico .n_5'),0.3,{x:-10,rotation:45,ease:Expo.easeInOut},0);
		tl.to($('.header .nav_ico .n_3'),0.3,{scale:0,ease:Expo.easeInOut},0);
		tl.to($('.header-container'),0.3,{height:502,ease:Sine.easeInOut},0);
		/*tl.fromTo($('.header .menu li:eq(0)'),0.3,{rotationX:-105},{rotationX:0,ease:Sine.easeInOut},0);
		tl.fromTo($('.header .menu li:eq(1)'),0.3,{rotationX:65,y:-160,z:-140},{rotationX:0,y:0,z:0,ease:Sine.easeInOut},0);
		tl.fromTo($('.header .menu li:eq(2)'),0.3,{rotationX:-110,y:-215,z:-10},{rotationX:0,y:0,z:0,ease:Sine.easeInOut},0);*/
		tl.to($('.skrollr-container'),0.3,{y:375*sc,ease:Sine.easeInOut},0);
	}
}
function checkHash() {
	var miao = window.location.hash;
	miao = miao.replace('#','');
	switch(miao)
	{
		case 'contactus':gotoTarget('p4');break;
		case 'product':gotoTarget('p3');break;
	}
}
});