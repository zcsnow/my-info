
<template lang="pug">
	nav
		h1 
			i {{ title }}
			span(@click="goBack()")
			a(@click="goNet()") 连网
</template>

<style lang="sass" scoped>
nav{
	background: #fff;
	position:fixed;
	top:0;
	z-index: 99999;
	border-bottom: 0.01rem solid #E6E6E6;
	>h1{
		width: 7.5rem;
		margin: 0 auto;
		font-size: 0.36rem;
		font-weight:normal;
		height: 0.91rem;
		line-height: 0.91rem;
		color: #1A1919;
		position:relative;
		text-align:center;
		
		>i{
			width: 4.5rem;
			display: inline-block;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		>span{
			cursor: pointer;
			content:"";
			height:.98rem;
			width:.98rem;
			background-repeat: no-repeat;
			background-image: url('../../images/icon_more@2x.png');
			background-image: -webkit-image-set(
				url('../../images/icon_more@2x.png') 2x,
				url('../../images/icon_more@3x.png') 3x);
			background-size: 0.16rem 0.26rem;
			background-position: center;
			position:absolute;
			left:0;
			top:0;
			-webkit-transform:rotate(180deg);
			transform:rotate(180deg);
			-webkit-transition: transform .25s linear;
			transition: transform .25s linear;
		}
		>a{
			display: block;
			width: .66rem;
			padding-left: .37rem;
			background-repeat: no-repeat;
			background-image: url('../../images/lianwang@2x.png');
			background-image: -webkit-image-set(
				url('../../images/lianwang@2x.png') 2x,
				url('../../images/lianwang@3x.png') 3x);
			background-size: 0.26rem 0.26rem;
			background-position: .09rem center;
			font-size: .28rem;
			color: #807E7D;
			height: .46rem;
			line-height: .46rem;
			border-radius: .08rem;
			border: .02rem solid #B3B0AF;
			position:absolute;
			right: .22rem;
			top: .22rem;
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