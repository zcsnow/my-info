document.addEventListener('DOMContentLoaded', function() {

	var realNavTop = 120;
	var realTieTop = 212;
	var realDerta1 = 0;
	var realDerta2 = 0;
	var sc = 1;
	
	var mc = new Hammer($('.header .nav_ico_container')[0]);
	mc.on("tap", function() {
		if (hasClass($('.header .nav_ico')[0], 'close')) {
			closeMenu(true);
		} else {
			if (hasClass($('.product-nav #close')[0], 'opened')) {
				closeNav(true);
			}
			closeMenu(false);
		}
	});
	var clickMenu1 = new Hammer($('.header .menu .menu-product')[0]);
	clickMenu1.on("tap", function() {
		window.location.href = "index.html#product";
	});
	var clickMenu2 = new Hammer($('.header .menu .menu-about')[0]);
	clickMenu2.on("tap", function() {
		window.location.href = "index.html#aboutus";
	});
	var clickMenu3 = new Hammer($('.header .menu .menu-contact')[0]);
	clickMenu3.on("tap", function() {
		window.location.href = "index.html#contactus";
	});

	var mc2 = new Hammer($('.product-nav #close')[0]);
	mc2.on("tap", function() {
		if (hasClass($('.product-nav #close')[0], 'opened')) {
			closeNav(true);
		} else {
			if (hasClass($('.header .nav_ico')[0], 'close')) {
				closeMenu(true);
			}
			closeNav(false);
		}
	});
	var clickNav1 = new Hammer($('#nav-cardiovascular')[0]);
	clickNav1.on("tap", function() {
		closeNav(true);
		window.location.hash = 'cardiovascular';
		checkHash(852);
	});
	var clickNav2 = new Hammer($('#nav-metabolism')[0]);
	clickNav2.on("tap", function() {
		closeNav(true);
		window.location.hash = 'metabolism';
		checkHash(852);
	});
	var clickNav3 = new Hammer($('#nav-ophthalmology')[0]);
	clickNav3.on("tap", function() {
		closeNav(true);
		window.location.hash = 'ophthalmology';
		checkHash(852);
	});
	var clickNav4 = new Hammer($('#nav-immunology')[0]);
	clickNav4.on("tap", function() {
		closeNav(true);
		window.location.hash = 'immunology';
		checkHash(852);
	});
	var clickNav5 = new Hammer($('#nav-neuroscience')[0]);
	clickNav5.on("tap", function() {
		closeNav(true);
		window.location.hash = 'neuroscience';
		checkHash(852);
	});
	var clickNav6 = new Hammer($('#nav-respiratory')[0]);
	clickNav6.on("tap", function() {
		closeNav(true);
		window.location.hash = 'respiratory';
		checkHash(852);
	});
	var clickNav7 = new Hammer($('#nav-hypertension')[0]);
	clickNav7.on("tap", function() {
		closeNav(true);
		window.location.hash = 'hypertension';
		checkHash(852);
	});
	var clickNav8 = new Hammer($('#nav-hepatopathy')[0]);
	clickNav8.on("tap", function() {
		closeNav(true);
		window.location.hash = 'hepatopathy';
		checkHash(852);
	});
	/*var clickNav9 = new Hammer($('#nav-orthopaedics')[0]);
	clickNav9.on("tap", function() {
		closeNav(true);
		window.location.hash = 'orthopaedics';
		checkHash(852);
	});*/
	var clickNav10 = new Hammer($('#nav-oncology')[0]);
	clickNav10.on("tap", function() {
		closeNav(true);
		window.location.hash = 'oncology';
		checkHash(852);
	});
	var clickNav11 = new Hammer($('#nav-other')[0]);
	clickNav11.on("tap", function() {
		closeNav(true);
		window.location.hash = 'other';
		checkHash(852);
	});

	var sk = skrollr.init({
		smoothScrolling: false,
		mobileDeceleration: 0.004,
		render: function(data) {
			renderFrame(this, data.curTop,data.lastTop)
		}
	});
	
	whenResize();
	checkHash(0);
	window.addEventListener("resize", whenResize, false);
	TweenMax.set($('.wrapper'),{autoAlpha:1});

	function whenResize() {
		var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		sc = winWidth / 640;
		if (sc > 1) {
			sc = 1;
		}
		var realWidth = winWidth / sc;
		realNavTop = Math.ceil((120 + realDerta1) * sc);
		realTieTop = Math.floor((212 + realDerta1 + realDerta2) * sc - 1);
		
		TweenMax.set($('.container'), {
			scale: sc,
			width: realWidth
		});
		TweenMax.set($('.product-nav'), {
			scale: sc,
			width: realWidth
		});
		TweenMax.set($('.main-tie'), {
			scale: sc,
			width: realWidth
		});
		TweenMax.set($('.header-container'), {
			width: realWidth,
			scale: sc
		});
		TweenMax.set($('.header'), {
			height: 127*sc
		});
		TweenMax.set($('.product-container .banner'), {
			height: winHeight * 0.50 / sc
		});
		
		if(sc>=1){
			TweenMax.set($('.header .border1'),{width:(winWidth-189)});
		}else{
			TweenMax.set($('.header .border1'),{width:450});
		}



		if (sk != null) {
			sk.refresh();
			var a = sk.getMaxScrollTop();
			var ah = $('.product-content')[0].clientHeight + $('.product-container .banner')[0].clientHeight + $('.product-nav-gap')[0].clientHeight;
			sk.setMaxScrollTop(a - ah * (1 - sc));
		}
	}
	
	function resetScrollMax(){
			var a = sk.getMaxScrollTop();
			var ah = $('.product-content')[0].clientHeight + $('.product-container .banner')[0].clientHeight + $('.product-nav-gap')[0].clientHeight;
			sk.setMaxScrollTop(a - ah * (1 - sc));
	}
	
	function renderFrame(tsk, curTop,lastTop) {
		
		var offset = tsk.relativeToAbsolute($('.product-nav-gap')[0], 'top', 'top') - curTop;
		var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if (hasClass($('.product-nav')[0], 'open')) {
			if(offset<realNavTop){
				offset = $('.product-nav')[0].offsetTop+lastTop - curTop;
				if(offset>realNavTop)
				{
					offset = realNavTop;
				}
			}
			var tempTop = winHeight - $('.product-nav')[0].clientHeight*sc;
			if(tempTop<realNavTop && offset<=tempTop)
			{
				offset = tempTop;
			}
		}else if (offset <= realNavTop) {
			offset = realNavTop
		}
		TweenMax.set($('.product-nav'), {
			top: offset
		});
		offset = 72 * sc;
		/*var offset11 = tsk.relativeToAbsolute($('#other-page')[0], 'top', 'top') - curTop;
		if (offset11 <= realTieTop) {
			offset11 = realTieTop
		}
		TweenMax.set($('#other-tie'), {
			top: offset11
		});*/
		var offset10 = tsk.relativeToAbsolute($('#oncology-page')[0], 'top', 'top') - curTop;
		if (offset10 <= realTieTop) {
			offset10 = realTieTop
		}
		TweenMax.set($('#oncology-tie'), {
			top: offset10
		});
		//orthopaedics 
		var offset9 = tsk.relativeToAbsolute($('#other-page')[0], 'top', 'top') - curTop;
		if (offset9 <= realTieTop) {
			offset9 = realTieTop
		}
		if (offset10 <= offset9 + offset) {
			offset9 = offset10 - offset;
		}
		TweenMax.set($('#other-tie'), {
			top: offset9
		});
		//hypertension 
		var offset8 = tsk.relativeToAbsolute($('#immunology-page')[0], 'top', 'top') - curTop;
		if (offset8 <= realTieTop) {
			offset8 = realTieTop
		}
		if (offset9 <= offset8 + offset) {
			offset8 = offset9 - offset;
		}
		TweenMax.set($('#immunology-tie'), {
			top: offset8
		});
		var offset7 = tsk.relativeToAbsolute($('#hepatopathy-page')[0], 'top', 'top') - curTop;
		if (offset7 <= realTieTop) {
			offset7 = realTieTop
		}
		if (offset8 <= offset7 + offset) {
			offset7 = offset8 - offset;
		}
		TweenMax.set($('#hepatopathy-tie'), {
			top: offset7
		});
		var offset6 = tsk.relativeToAbsolute($('#respiratory-page')[0], 'top', 'top') - curTop;
		if (offset6 <= realTieTop) {
			offset6 = realTieTop
		}
		if (offset7 <= offset6 + offset) {
			offset6 = offset7 - offset;
		}
		TweenMax.set($('#respiratory-tie'), {
			top: offset6
		});
		var offset5 = tsk.relativeToAbsolute($('#neuroscience-page')[0], 'top', 'top') - curTop;
		if (offset5 <= realTieTop) {
			offset5 = realTieTop
		}
		if (offset6 <= offset5 + offset) {
			offset5 = offset6 - offset;
		}
		TweenMax.set($('#neuroscience-tie'), {
			top: offset5
		});
		var offset4 = tsk.relativeToAbsolute($('#ophthalmology-page')[0], 'top', 'top') - curTop;
		if (offset4 <= realTieTop) {
			offset4 = realTieTop
		}
		if (offset5 <= offset4 + offset) {
			offset4 = offset5 - offset;
		}
		TweenMax.set($('#ophthalmology-tie'), {
			top: offset4
		});
		//ophthalmology-page
		var offset3 = tsk.relativeToAbsolute($('#metabolism-page')[0], 'top', 'top') - curTop;
		if (offset3 <= realTieTop) {
			offset3 = realTieTop
		}
		if (offset4 <= offset3 + offset) {
			offset3 = offset4 - offset;
		}
		TweenMax.set($('#metabolism-tie'), {
			top: offset3
		});
		var offset2 = tsk.relativeToAbsolute($('#cardiovascular-page')[0], 'top', 'top') - curTop;
		if (offset2 <= realTieTop) {
			offset2 = realTieTop
		}
		if (offset3 <= offset2 + offset) {
			offset2 = offset3 - offset;
		}
		TweenMax.set($('#cardiovascular-tie'), {
			top: offset2
		});
		var offset1 = tsk.relativeToAbsolute($('#hypertension-page')[0], 'top', 'top') - curTop;
		if (offset1 <= realTieTop) {
			offset1 = realTieTop
		}
		if (offset2 <= offset1 + offset) {
			offset1 = offset2 - offset;
		}
		TweenMax.set($('#hypertension-tie'), {
			top: offset1
		});
	}

	function gotoTarget(t, d) {
		var tt = 0;
		if (typeof(t) == 'number') {
			tt = t;
		} else {
			tt = sk.relativeToAbsolute($('#' + t + '-page')[0], 'top', 'top') - (d + 195) * sc;
		}
		var o = {
			top: sk.getScrollTop()
		};
		TweenMax.set(o, {
			top: tt,
			onUpdate: function() {
				sk.setScrollTop(o.top);
			}
		});
	}

	function closeMenu(_f) {
		if (_f) {
			removeClass($('.header .nav_ico')[0], 'close');
			var o = {
				t: 375
			};
			var tl = new TimelineMax();
			tl.to($('.header .nav_ico .e1'), 0.3, {
				rotation: 0,
				x: 0,
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.header .nav_ico .n_3'), 0.3, {
				scale: 1,
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.header-container'), 0.3, {
				height: 127,
				ease: Sine.easeInOut
			}, 0);
			tl.to(o, 0.3, {
				t: 0,
				onUpdate: function() {
					realDerta1 = o.t;
					realNavTop = Math.ceil((120 + realDerta1) * sc);
					realTieTop = Math.floor((212 + realDerta1 + realDerta2) * sc);
				},
				ease: Sine.easeInOut
			}, 0);
			tl.to($('.product-skrollr-container'), 0.3, {
				y: 0,
				onUpdate: function() {
					sk.refresh();
					renderFrame(sk, sk.getScrollTop())
				},
				onComplete:resetScrollMax,
				ease: Sine.easeInOut
			}, 0);
			/*tl.to($('.header .menu li:eq(0)'), 0.3, {
				rotationX: -105,
				ease: Sine.easeInOut
			}, 0);
			tl.to($('.header .menu li:eq(1)'), 0.3, {
				rotationX: 65,
				y: -160,
				z: -140,
				ease: Sine.easeInOut
			}, 0);
			tl.to($('.header .menu li:eq(2)'), 0.3, {
				rotationX: -110,
				y: -215,
				z: -10,
				ease: Sine.easeInOut
			}, 0);*/
		} else {
			addClass($('.header .nav_ico')[0], 'close');
			var o = {
				t: 0
			};
			var tl = new TimelineMax();
			tl.to($('.header .nav_ico .n_1'), 0.3, {
				x: 10,
				rotation: 45,
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.header .nav_ico .n_2'), 0.3, {
				x: -10,
				rotation: -45,
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.header .nav_ico .n_4'), 0.3, {
				x: 10,
				rotation: -45,
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.header .nav_ico .n_5'), 0.3, {
				x: -10,
				rotation: 45,
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.header .nav_ico .n_3'), 0.3, {
				scale: 0,
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.header-container'), 0.3, {
				height: 502,
				ease: Sine.easeInOut
			}, 0);
			/*tl.fromTo($('.header .menu li:eq(0)'), 0.3, {
				rotationX: -105
			}, {
				rotationX: 0,
				ease: Sine.easeInOut
			}, 0);
			tl.fromTo($('.header .menu li:eq(1)'), 0.3, {
				rotationX: 65,
				y: -160,
				z: -140
			}, {
				rotationX: 0,
				y: 0,
				z: 0,
				ease: Sine.easeInOut
			}, 0);
			tl.fromTo($('.header .menu li:eq(2)'), 0.3, {
				rotationX: -110,
				y: -215,
				z: -10
			}, {
				rotationX: 0,
				y: 0,
				z: 0,
				ease: Sine.easeInOut
			}, 0);*/
			tl.to(o, 0.3, {
				t: 375,
				onUpdate: function() {
					realDerta1 = o.t;
					realNavTop = Math.ceil((120 + realDerta1) * sc);
					realTieTop = Math.floor((212 + realDerta1 + realDerta2) * sc);
				},
				ease: Sine.easeInOut
			}, 0);
			tl.to($('.product-skrollr-container'), 0.3, {
				y: 375 * sc,
				onUpdate: function() {
					sk.refresh();
					renderFrame(sk, sk.getScrollTop())
				},
				onComplete:resetScrollMax,
				ease: Sine.easeInOut
			}, 0);
		}
	}

	function closeNav(_f) {
		if (_f) {
			removeClass($('.product-nav #close')[0], 'opened');
			removeClass($('.product-nav')[0], 'open');
			var o = {
				t: 852
			};
			var tl = new TimelineMax();
			tl.to($('.product-nav ul'), 0.5, {
				height: 0,
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.product-nav #close'), 0.5, {
				rotation: 0,
				ease: Expo.easeInOut
			}, 0);
			tl.to(o, 0.5, {
				t: 0,
				onUpdate: function() {
					realDerta2 = o.t;
					realTieTop = Math.floor((212 + realDerta1 + realDerta2) * sc);
				},
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.product-content'), 0.5, {
				y: 0,
				onUpdate: function() {
					sk.refresh();
					renderFrame(sk, sk.getScrollTop())
				},
				onComplete:resetScrollMax,
				ease: Expo.easeInOut
			}, 0);
		} else {
			addClass($('.product-nav #close')[0], 'opened');
			var o = {
				t: 0
			};
			var tl = new TimelineMax();
			tl.to($('.product-nav ul'), 0.5, {
				height: 852,
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.product-nav #close'), 0.5, {
				rotation: 45,
				ease: Expo.easeInOut
			}, 0);
			tl.to(o, 0.5, {
				t: 852,
				onUpdate: function() {
					realDerta2 = o.t;
					realTieTop = Math.floor((212 + realDerta1 + realDerta2) * sc);
				},
				onComplete:function(){
					addClass($('.product-nav')[0], 'open');
				},
				ease: Expo.easeInOut
			}, 0);
			tl.to($('.product-content'), 0.5, {
				y: 852,
				onUpdate: function() {
					sk.refresh();
					renderFrame(sk, sk.getScrollTop())
				},
				onComplete:resetScrollMax,
				ease: Expo.easeInOut
			}, 0);
		}
	}

	function checkHash(d) {
		var miao = window.location.hash;
		miao = miao.replace('#', '');
		if (miao != '') {
			gotoTarget(miao, d);
		}
	}
});