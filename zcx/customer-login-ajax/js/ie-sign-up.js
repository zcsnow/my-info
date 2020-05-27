if (!!window.ActiveXObject || 'ActiveXObject' in window) {
//小屏幕背景控制
	if ($(window).height() < $('.sign-up-wrap').outerHeight()) {
		$('.sign-up-all').css({height: $('.sign-up-wrap').outerHeight()});
		$('.sign-up-wrap').css({top: 0, 'margin-top': '0'});
	}
	//IE浏览器情况下，让placeholder-hidden出现
	$('.placeholder-hidden1, .placeholder-hidden2, .placeholder-hidden-identify').css('display', 'block');
	//IE浏览器下，弹出框的位置改变
	$('.popup').css('right', '30px');
	//change language
	$('.login-logo-lang').click (function () {
		$('.logo-lang-content').toggle();
		$('.login-logo-lang').toggleClass('active');
	});
	//获得焦点,对应的placeholder-hidden隐藏
	$('.placeholder-hidden1').focus(function () {
		$(this).parent().find('.ipt-section').focus();
		$(this).css('display', 'none');
	});
	$('.placeholder-hidden2').focus(function () {
		$(this).parent().find('.ipt-section2').focus();
		$(this).css('display', 'none');
	});
	$('.placeholder-hidden-identify').focus(function () {
		$(this).parent().find('.ipt-identify-input').focus();
		$(this).css('display', 'none');
	});
	//按tab键获得焦点时，对应的placeholder-hidden隐藏
	$('.ipt-section').focus(function () {
		$(this).parent().find('.placeholder-hidden1').css('display', 'none');
	});
	$('.ipt-section2').focus(function () {
		$(this).parent().find('.placeholder-hidden2').css('display', 'none');
	});
	$('.ipt-identify-input').focus(function () {
		$(this).parent().find('.placeholder-hidden-identify').css('display', 'none');
	});
	//失去焦点，如果没有内容则隐藏
	$('.ipt-section').blur(function () {
		if ($(this).val() == '') {
			$(this).parent().find('.placeholder-hidden1').css('display', 'block');
		}
	});
	$('.ipt-section2').blur(function () {
		if ($(this).val() == '') {
			$(this).parent().find('.placeholder-hidden2').css('display', 'block');
		}
	});
	$('.ipt-identify-input').blur(function () {
		if ($(this).val() == '') {
			$(this).parent().find('.placeholder-hidden-identify').css('display', 'block');
		}
	});
	function intervalHide () {
		clearTimeout(timer1);
		clearTimeout(timer2);
		var timer1 = setTimeout(function () {
			$('.popup-inner').eq(0).slideUp(500);
		}, 500);
		var timer2 = setTimeout(function () {
			$('.popup').find('.popup-inner').first().remove();
		}, 1000);
	}
	//阻止默认事件
	function stopDefault(event) {
		var ev = event || window.event;
	    // 阻止默认浏览器动作(W3C)
	    if (ev && ev.preventDefault) {
	        ev.preventDefault();
	    } else {
	        // IE中阻止函数器默认动作的方式
	        window.event.returnValue = false;
	    }
	    return false;
	}


}