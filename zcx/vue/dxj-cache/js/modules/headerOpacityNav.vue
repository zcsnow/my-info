<template lang="pug">
	nav.navbar
		h1 
			i {{ title }}
			span(@click="goBack()")
			a(@click="goNet()") 连网
</template>

<style lang="sass" scoped>
.navbar{
	position:fixed;
	top:0; 
	z-index: 99999;
	width:100%;
	background:rgba(255,255,255,0);
	min-width:320px; 
 	max-width:750px; 
	transition: background 1s;
	h1{
		width: 7.5rem;
		margin: 0 auto;
		font-size: 0.36rem;
		font-weight:normal;
		height: 0.91rem;
		line-height: 0.91rem;
		color: #fff;
		position:relative;
		text-align:center;
		
		i{
			width: 4.5rem;
			display: inline-block;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		span{
			cursor: pointer;
			content:"";
			height:.98rem;
			width:.98rem;
			background-repeat: no-repeat;
			background-image: url('../../images/back@2x.png');
			background-image: -webkit-image-set(
				url('../../images/back@2x.png') 2x,
				url('../../images/back@3x.png') 3x);
			background-size: 0.24rem 0.38rem;
			background-position: center;
			position:absolute;
			left:0;
			top:0;
			-webkit-transition: transform .25s linear;
			transition: transform .25s linear;
		}
		a{
			display: block;
			width: .66rem;
			padding-left: .37rem;
			background-repeat: no-repeat;
			background-image: url('../../images/lianwang_white@2x.png');
			background-image: -webkit-image-set(
				url('../../images/lianwang_white@2x.png') 2x,
				url('../../images/lianwang_white@3x.png') 3x);
			background-size: 0.26rem 0.26rem;
			background-position: .09rem center;
			font-size: .28rem;
			color: #fff;
			height: .46rem;
			line-height: .46rem;
			border-radius: .08rem;
			border: .02rem solid #fff;
			position:absolute;
			right: .22rem;
			top: .22rem;
		}
	}
}
.navbar.fixed{
	background:rgba(255,255,255,1);
	transition: background 1s;
	h1{
		color: #1A1919;
		span{
			background-image: url('../../images/icon_back@2x.png');
			background-image: -webkit-image-set(
				url('../../images/icon_back@2x.png') 2x,
				url('../../images/icon_back@3x.png') 3x);
			background-size: 0.38rem 0.38rem;
		}
		a{
			background-image: url('../../images/lianwang@2x.png');
			background-image: -webkit-image-set(
				url('../../images/lianwang@2x.png') 2x,
				url('../../images/lianwang@3x.png') 3x);
			border-color: #B3B0AF;
			color: #807E7D;
		}
	}
}
</style>

<script type="text/javascript">

	import {getN,callN,isNative,eventLog} from 'nativeA';

	export default {
		props: {
			isNative: {
				type: Boolean,
				default: false
			},
			title: {
				type: String
			},
			pageUrl: {
				type: String,
				default: ""
			}
		},
		mounted () {
			// var setCoverOpacity = function() { 
			// 	$('body').find('.nav').css({ 
			// 		opacity: ((($('body').scrollTop() / 150) > 0.9) ? 0.9 : ($('body').scrollTop() / 150)) 
			// 	}) 
			// } 

			$(window).scroll(function(){
				//var top = $("#navbar").height();//根据id获取指定的位置
				var top = 0;//根据id获取指定的位置
				//console.log(top)
                var scrollTop = $(window).scrollTop();//获取当前滑动的位置
                if(scrollTop > top){
                    $(".navbar").addClass("fixed");
                }else{
                    $(".navbar").removeClass("fixed");
 
                }
 
            })



			
		},
		methods: {
			goBack: function () {
				if(this.pageUrl != "") {
					window.location.href = this.pageUrl;
				}else {
					window.history.back();
				}
			},
			goNet: function () {
				if(this.isNative) {
					eventLog({eventId:'connect_other_click'})
					callN("link", {"url": "http://www.ce-air.com/?inet=1&browse=hmouter"});		//跳转开网页
				}else {
					eventLog({eventId:'connect_other_click'})
					window.location.href = "http://www.ce-air.com/?inet=1&browse=hmouter";
				}
			}
		}
	}
</script>