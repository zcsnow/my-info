if (!!window.ActiveXObject || "ActiveXObject" in window) {
	//IE浏览器情况下，让placeholder-hidden出现
	$('.placeholder-hidden').css('display', 'block');
	//IE浏览器下，弹出框的位置改变
	$('.popup').css('right', '30px');
	$('.login-logo-lang').click (function () {
		$('.logo-lang-content').toggle();
		$('.login-logo-lang').toggleClass('active');
	});
	//获得焦点,对应的placeholder-hidden隐藏
	$('.placeholder-hidden').focus(function () {
		$(this).parent().find('.placeholder').focus();
		$(this).css('display', 'none');
	});
	//按tab键获得焦点时，对应的placeholder-hidden隐藏
	$('.placeholder').focus(function () {
		$(this).parent().find('.placeholder-hidden').css('display', 'none');
	});
	//失去焦点，如果没有内容则隐藏
	$('.placeholder').blur(function () {
		if ($(this).val() == '') {
			$(this).parent().find('.placeholder-hidden').css('display', 'block');
		}
	});
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
	var msg = $('.msg-hidden').text();
	$('.login-submit').click(function (event) {
		if ($('.user-ipt').val() == '') {
			var li = document.createElement('li');
			li.setAttribute('class', 'popup-inner');
			li.innerHTML = '请输入账号';
			$('.popup').append(li);
			setTimeout(function () {
				intervalHide();
			}, 2000);
			return false;
		} else if ($('.pass-ipt').val() == '') {
			var li = document.createElement('li');
			li.setAttribute('class', 'popup-inner');
			li.innerHTML = '请输入密码';
			$('.popup').append(li);
			setTimeout(function () {
				intervalHide();
			}, 2000);
			return false;
		} else if ($('.msg-hidden').text() != '') {
			var li = document.createElement('li');
			li.setAttribute('class', 'popup-inner');
			li.innerHTML = msg;
			$('.popup').append(li);
			setTimeout(function () {
				intervalHide();
			}, 2000);
			return false;
		}
	});
}