<template>
    <div>
      <div class="imgTemlate1" v-for="(item) in temlateData" v-bind:key="item.id">
          <a :href="item.url"><img :src="item.image"></a>
      </div>

      
    </div>
</template>

<script type="text/javascript">
  import {dataHost,apiHost,eventLog} from 'nativeA';
  //import Swiper from 'swiper';
  //import marquee from '../libs/jquery.marquee.js';
	export default {
    data(){
      return{
        dataHost: dataHost,
        apiHost: apiHost,
        temlateData:''
      }
    },
		props: ['temlateData'],
    mounted(){
      var _this = this;
      console.log(_this.temlateData.title)

    },
    methods:{
    },
    
	}
</script>

<style lang="sass" scoped>
/*一行一个*/
.imgTemlate1{width: 6.62rem; margin: 0 auto .34rem;overflow: hidden;border-radius: .16rem;}
.imgTemlate1 a{display: block;height: 3.2rem; margin-bottom: 0.34rem;background-color: #fff;overflow: hidden;border-radius: .16rem;}
.imgTemlate1 a img{display: block;width: 6.62rem;height: 3.2rem}
/*一行两个*/
.imgTemlate2{width: 6.84rem; margin: 0 auto .46rem;}
.imgTemlate2:after{content:"";display:block;height:0;clear:both;visibility:hidden;zoom:1}
.imgTemlate2 a{display: block; position: relative; float: left;width: 3.2rem; height: 2.04rem; margin: 0 0.11rem 0.22rem;border-radius: .08rem;overflow: hidden;}
.imgTemlate2 a img{display: block;width: 3.2rem; height: 2.04rem;}
.imgTemlate2 .text { position: absolute;bottom:0; width: 100%; background-image: linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.0) 100%);}
.imgTemlate2 .text h5{color: #fff; font-size: .28rem; font-weight: 400; padding:0 0.2rem; margin: 0.20rem 0 0.20rem;line-height: .28rem;font-family: PingFangSC-Medium;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
.imgTemlate2 .text p{color: #f5f5f5; font-size: .24rem;line-height: .24rem;padding:0 0.2rem;margin-top: -0.10rem;margin-bottom: .20rem;font-family: PingFangSC-Regular;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}

/*大图横向滚动*/
.imgTemlate3{width: 100%; margin: 0 auto .68rem;}
.imgTemlate3 .swiper-container{padding: 0 0.40rem;}
.imgTemlate3 .swiper-container .swiper-slide{width: 6.62rem;height: 3.2rem;  background-color: #fff; border-radius: .08rem; overflow: hidden; box-shadow: 0 2px 10px 4px rgba(0,0,0,.04); }
.imgTemlate3 .swiper-container a{display: block; width: 100%}
.imgTemlate3 .swiper-container a img{display: block; width: 100%; height: 3.2rem;  background-color: #f5f5f5}
.imgTemlate3 .swiper-container a h5{color: #333; font-size: .32rem; font-weight: 400; margin: .26rem 0 0.26rem;line-height: .32rem;font-family: PingFangSC-Medium;padding: 0 .28rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
.imgTemlate3 .swiper-container a p{color: #666; font-size: .26rem;line-height: .28rem;margin-top: -0.1rem; margin-bottom: .26rem;font-family: PingFangSC-Regular;padding: 0 .28rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap}

/*小图横向滚动*/
.imgTemlate4{width: 100%; margin: 0 auto .68rem;}
.imgTemlate4 .swiper-container{padding: 0 0.40rem;}
.imgTemlate4 .swiper-slide{width: 2.06rem; height: 1.72rem;background-color: #fff; border-radius: .08rem; overflow: hidden;position: relative}
.imgTemlate4 .swiper-slide a{display: block; width: 100%; position: relative}
.imgTemlate4 .swiper-slide a img{display: block; width: 100%;height: 1.72rem; position: absolute}
.imgTemlate4 .swiper-slide a h5{width: 100%; height: 1.72rem; position: absolute; color: #fff; font-size: .36rem; line-height: 1.72rem; font-weight: 400; text-align: center; overflow: hidden; white-space: nowrap}

/*轮播图*/
.imgTemlate5 {width: 6.62rem; margin: 0 auto .68rem;}
.imgTemlate5 .swiper-container{border-radius: .16rem}
.imgTemlate5 .swiper-container img{display: block; width: 6.62rem; height: 3.2rem}
.imgTemlate5 .swiper-container .swiper-pagination{bottom: 6px}
.imgTemlate5 .swiper-container .swiper-pagination .swiper-pagination-bullet{width: 12px; height: 4px; border: none; border-radius: 9px; background: hsla(0,0%,100%,.5); opacity: 1; margin: 0 .06rem; transition: background .3s,width .3s}
.imgTemlate5 .swiper-container .swiper-pagination .swiper-pagination-bullet-active{background: #fff}

/*跑马灯*/
.imgTemlate6 {width: 6.62rem; margin: 0 auto .68rem;}
.imgTemlate6 .swiper-container{  width: 100%; -webkit-perspective: 200px;  perspective: 200px}
.imgTemlate6 .swiper-container .swiper-wrapper{margin-top: 10px}
.imgTemlate6 .swiper-container .swiper-slide{width: 2.3rem; height: 3.69rem;border-radius: 0.18rem; -webkit-transform-style: preserve-3d; transform-style: preserve-3d;-webkit-transition: transform 1.0s;transition: transform 1.0s;-webkit-transform: scale(0.7);transform: scale(0.7);opacity:0.7}
.imgTemlate6 .swiper-container .swiper-slide a:hover{ color: #333;}
.imgTemlate6 .swiper-container .swiper-slide span{ display: none;font-family: PingFangSC-Medium;font-size: .34rem;color: #333333;line-height: .34rem; margin-top: 0.26rem;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
.imgTemlate6 .swiper-container .swiper-slide-active,.swiper-slide-duplicate-active {-webkit-transform: scale(1);transform: scale(1);opacity:1}
.imgTemlate6 .swiper-container .swiper-slide-active span,.swiper-slide-duplicate-active span{display: block;}
.imgTemlate6 .swiper-container .swiper-slide .main-img{width: 2.3rem; height: 3.09rem;border-radius: 0.18rem; margin: 0 auto; display: block}

/*一左两右*/
.imgTemlate7{width: 6.62rem; margin: 0 auto .68rem; position: relative;}
.imgTemlate7:after{content:"";display:block;height:0;clear:both;visibility:hidden;zoom:1}
.imgTemlate7 .left{float:left;width: 3.2rem;height: 4.3rem;overflow: hidden;border-radius: .08rem;}
.imgTemlate7 .left img{width: 3.2rem;height: 4.3rem;border-radius: .08rem;}
.imgTemlate7 .right1{ position: absolute;right:0;width: 3.2rem;height: 2.04rem;border-radius: .08rem;overflow: hidden;}
.imgTemlate7 .right1 img{width: 3.2rem;height: 2.04rem;border-radius: .08rem;}
.imgTemlate7 .right2{ position: absolute;right:0; top:2.26rem;width: 3.2rem;height: 2.04rem;border-radius: .08rem;overflow: hidden;}
.imgTemlate7 .right2 img{width: 3.2rem;height: 2.04rem;border-radius: .08rem;}

/*一上三下*/
.imgTemlate8{width: 6.84rem; margin: 0 auto .46rem;}
.imgTemlate8 .big-img{width: 6.62rem;height: 3.2rem;margin: 0 auto;border-radius: .08rem;overflow: hidden;}
.imgTemlate8 ul{}
.imgTemlate8 ul:after{content:"";display:block;height:0;clear:both;visibility:hidden;zoom:1}
.imgTemlate8 ul li{ float:left;width: 2.06rem;height: 1.72rem;margin: 0.22rem 0.11rem 0.22rem;border-radius: .08rem;overflow: hidden;}
.imgTemlate8 ul li a{display: block; width: 100%; position: relative}
.imgTemlate8 ul li a img{display: block; width: 100%;height: 1.72rem; position: absolute}

/* 标题 */
.titleTemlate{margin: 0 auto .34rem; padding:0 0.14rem 0 0.44rem;position: relative}
.titleTemlate h3.title{font-size: .36rem; line-height: .36rem; color: #181818; }
.titleTemlate .more{color: #666; font-size: .28rem; font-weight: normal; padding-right: .3rem;  display: inline-block; position: absolute; top: 0.01rem; right: .3rem}
.titleTemlate .more:after{position: absolute;content: "";width: 0.14rem;height: 0.14rem;top: 0.1rem;right: 0.06rem;border:1px solid #807E7D;border-radius: 1px;border-top: none;border-left: none;transform: rotate(-45deg);}
.titleTemlate .sub-title{font-size: 0.3rem;color: #666666;line-height: 0.3rem; margin-top: 0.22rem}

/*图文导航4*/
.navTemlate1{width: 6.62rem; margin: 0 auto .24rem;}
.navTemlate1:after{content:"";display:block;height:0;clear:both;visibility:hidden;zoom:1}
.navTemlate1 a{width: 25%;float: left;display:block; /*background: #f72f42;*/ margin-bottom: 0.44rem}
.navTemlate1 a i {display: block;width: 0.94rem; height:0.94rem; margin:0 auto 0.22rem;overflow: hidden;}
.navTemlate1 a i img{ width: 100%;}
.navTemlate1 a span{display: block;font-size: 0.26rem;color: #333; line-height: 0.32rem; text-align:center;overflow:hidden;white-space:nowrap; text-overflow:ellipsis;}
/* 图文导航5 */
.navTemlate2{width: 6.62rem; margin: 0 auto .24rem;}
.navTemlate2:after{content:"";display:block;height:0;clear:both;visibility:hidden;zoom:1}
.navTemlate2 a{width: 20%;float: left;display:block;/*background: #38f;*/margin-bottom: 0.44rem}
.navTemlate2 a i {display: block;width: 0.78rem; height:0.78rem; margin:0 auto 4px;overflow: hidden;}
.navTemlate2 a i img{width: 100%;}
.navTemlate2 a span{display: block;font-size: 0.26rem;color: #333;  line-height: 0.32rem; text-align:center;overflow:hidden;white-space:nowrap; text-overflow:ellipsis;}
/* 文字导航 */
.navTemlate3{margin: 0 auto .68rem; padding: 0 0.14rem; line-height: .3rem;white-space: nowrap; overflow-x: auto;overflow-y: hidden}
.navTemlate3 a{display: inline-block;color: #666;font-size: 0.26rem;color: #333;  margin: 0 .3rem;}

/* 纯文本 */
.textTemlate{margin: 0 auto .34rem;padding:0 0.44rem;font-size: 0.28rem;color: #666666;line-height: 0.46rem;}

/* 公告 */
.announcementTemlate {width: 6.63rem; margin: 0 auto .68rem; background-color: #fff; border-radius: .08rem;padding: .22rem; box-sizing: border-box;}
.announcementTemlate:after{content:"";display:block;height:0;clear:both;visibility:hidden;zoom:1}
.announcementTemlate i{display: block; float: left; width: 1.24rem; height: .44rem; margin-right: .40rem; background-repeat: no-repeat; 
background-image: url('../../images/notice@2x.png');background-image: -webkit-image-set(url('../../images/notice@2x.png') 2x,url('../../images/notice@3x.png') 3x);background-size:1.24rem ,.44rem;background-position: center;}
.announcementTemlate .marquee{display: block; width: 4.38rem; height: .44rem; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: left; line-height: .44rem; font-size: .28rem; color: #666}

/******图文内容******/
/*一行一个 上图下文*/
.imgTextContent1_1{margin: 0 auto .68rem;width: 6.62rem;}
.imgTextContent1_1 a{display: block; width: 6.62rem;  }
.imgTextContent1_1 a img{display: block; width: 100%; height: 3.2rem; background-color: #fff; border-radius: .08rem; overflow: hidden; }
.imgTextContent1_1 a h5{color: #333; font-size: .32rem; font-weight: 400; margin: .26rem 0 0.26rem;line-height: .32rem;font-family: PingFangSC-Medium;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
.imgTextContent1_1 a p{color: #666; font-size: .26rem;line-height: .28rem;margin-top: -0.1rem; margin-bottom: .26rem;font-family: PingFangSC-Regular;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
/*一行一个 下图上文*/
.imgTextContent1_2{margin: 0 auto .68rem;width: 6.62rem;}
.imgTextContent1_2 a{display: block; width: 6.62rem;   overflow: hidden; }
.imgTextContent1_2 a img{display: block; width: 100%; height: 3.2rem;border-radius: .08rem; overflow: hidden;  background-color: #fff}
.imgTextContent1_2 a h5{color: #333; font-size: .32rem; font-weight: 400; margin: 0 0 0.26rem;line-height: .32rem;font-family: PingFangSC-Medium;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
.imgTextContent1_2 a p{color: #666; font-size: .26rem;line-height: .28rem;margin-top: -0.1rem; margin-bottom: .26rem;font-family: PingFangSC-Regular;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
/*一行一个 左图右文*/
.imgTextContent1_3{margin: 0 auto .68rem; padding:0 0.44rem;}
.imgTextContent1_3 a{display: block;  overflow: hidden;position: relative;  padding-bottom: 0.34rem; margin-bottom: 0.34rem; }
.imgTextContent1_3 a:after{content:"";display:block; position: absolute;left:2.4rem; right:0; bottom:0rem;height:1px; background: #e1e1e1;}
.imgTextContent1_3 a:last-child:after{left:0;}
.imgTextContent1_3 a img{display: block; float: left; width: 2.4rem; height: 1.6rem;border-radius: .08rem; overflow: hidden;  background-color: #fff}
.imgTextContent1_3 a h5{color: #333; position: relative;font-size: .34rem; font-weight: 400;margin-left: 2.68rem; line-height: .42rem;font-family: PingFangSC-Medium;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
.imgTextContent1_3 a p{color: #666; position: absolute;left:2.68rem;right: 0; bottom:0.34rem;font-size: .26rem;line-height: .28rem;font-family: PingFangSC-Regular;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
/*一行一个 右图左文*/
.imgTextContent1_4{margin: 0 auto .68rem; padding:0 0.44rem;}
.imgTextContent1_4 a{display: block; height: 1.52rem; overflow: hidden; position: relative; padding-bottom: 0.34rem; margin-bottom: 0.34rem;}
.imgTextContent1_4 a:after{content:"";display:block; position: absolute;left:0; right:2.18rem; bottom:0rem;height:1px; background: #e1e1e1;}
.imgTextContent1_4 a:last-child:after{right:0;}
.imgTextContent1_4 a img{display: block; position: absolute; top: 0;right: 0; width: 2.18rem; height: 1.52rem;border-radius: .08rem; overflow: hidden;  background-color: #fff}
.imgTextContent1_4 a h5{color: #333;float: left; font-size: .32rem; font-weight: 400; margin-right: 2.68rem;line-height: .42rem;font-family: PingFangSC-Medium;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
.imgTextContent1_4 a p{color: #666; position: absolute;left:0;right:2.68rem; bottom:0.34rem;font-size: .26rem;line-height: .28rem;font-family: PingFangSC-Regular;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
/*一行两个 上图下文*/
.imgTextContent2_1{width: 6.84rem; margin: 0 auto .34rem;}
.imgTextContent2_1 ul:after{content:"";display:block;height:0;clear:both;visibility:hidden;zoom:1}
.imgTextContent2_1 ul li{ float: left; width: 3.2rem; margin: 0 0.11rem 0.34rem; }
.imgTextContent2_1 ul li a{display: block; width:100%;   overflow: hidden; }
.imgTextContent2_1 ul li a img{display: block; width: 100%; height: 2.04rem;border-radius: .08rem; overflow: hidden;  background-color: #fff}
.imgTextContent2_1 ul li a h5{color: #333; font-size: .28rem; font-weight: 400; margin: 0.24rem 0 0.24rem;line-height: .28rem;font-family: PingFangSC-Medium;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
.imgTextContent2_1 ul li a p{color: #666; font-size: .26rem;line-height: .28rem;margin-top: -0.12rem;font-family: PingFangSC-Regular;overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
/*左右滑动 上图下文*/
.imgTextContent3_1{width: 100%; margin: 0 auto .68rem;}
.imgTextContent3_1 .swiper-container{padding: 0 0.40rem;}
.imgTextContent3_1 .swiper-container .swiper-slide{width: 6.62rem;  background-color: #fff; border-radius: .08rem; overflow: hidden; box-shadow: 0 2px 10px 4px rgba(0,0,0,.04); }
.imgTextContent3_1 .swiper-container a{display: block; width: 100%}
.imgTextContent3_1 .swiper-container a img{display: block; width: 100%; height: 3.2rem;  background-color: #f5f5f5}
.imgTextContent3_1 .swiper-container a h5{color: #333; font-size: .32rem; font-weight: 400; margin: .26rem 0 0.26rem;line-height: .32rem;font-family: PingFangSC-Medium;padding: 0 .28rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
.imgTextContent3_1 .swiper-container a p{color: #666; font-size: .26rem;line-height: .28rem;margin-top: -0.1rem; margin-bottom: .26rem;font-family: PingFangSC-Regular;padding: 0 .28rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
/*左右滑动 下图上文*/
.imgTextContent3_2{width: 100%; margin: 0 auto .68rem;}
.imgTextContent3_2 .swiper-container{padding: 0 0.40rem;}
.imgTextContent3_2 .swiper-container .swiper-slide{width: 6.62rem;  background-color: #fff; border-radius: .08rem; overflow: hidden; box-shadow: 0 2px 10px 4px rgba(0,0,0,.04); }
.imgTextContent3_2 .swiper-container a{display: block; width: 100%}
.imgTextContent3_2 .swiper-container a img{display: block; width: 100%; height: 3.2rem;  background-color: #f5f5f5}
.imgTextContent3_2 .swiper-container a h5{color: #333; font-size: .32rem; font-weight: 400; margin: .26rem 0 0.26rem;line-height: .32rem;font-family: PingFangSC-Medium;padding: 0 .28rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
.imgTextContent3_2 .swiper-container a p{color: #666; font-size: .26rem;line-height: .28rem;margin-top: -0.1rem; margin-bottom: .26rem;font-family: PingFangSC-Regular;padding: 0 .28rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap}


</style>