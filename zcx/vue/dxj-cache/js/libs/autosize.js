/*
 * by zhe-he
 * 特别说明 1rem = 100px
 */
import "css/reset.scss";
(function () {
		var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			// var clientWidth = window.innerWidth;
            var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 750) {
				clientWidth = 750;
			}
			document.documentElement.style.fontSize = 100 * (clientWidth / 750) + 'px';

        };
	window.addEventListener(resizeEvt, recalc, false);
	window.addEventListener('DOMContentLoaded', recalc, false);
	recalc();
})();
