
<template lang="pug">
    div(class="list-box")
        h3(class="column-title") {{columnTitle}}
        div(class="column-list")
            div(class="imgTextContent-box" v-if="columnStyle==1")
                a(:href="'new-video-detail.html?id='+item.videoVideoId" v-for="(item,index) in columnContent"  @click="eventLog({eventId:'EntertainmentVideo_program_'+ item.videoVideoId +'_click',eventType:'1',contentTitle:item.title})")
                    img(:src="baseUrl + item.image")
                    h5 {{item.title}}
                    p {{item.titleSecond}}
            div(class="marqueeSwiper-box" v-if="columnStyle==2")
                div(class="swiper-container" :id="'marqueeSwiper' + index")
                    div(class="swiper-wrapper")
                        div(class="swiper-slide" v-for="(item,index) in columnContent"  @click="eventLog({eventId:'EntertainmentVideo_program_'+ item.videoVideoId +'_click',eventType:'1',contentTitle:item.title})")
                            a(:href="'new-video-detail.html?id='+item.videoVideoId")
                                img(class="main-img" :src="baseUrl + item.image")
                                span {{item.title}}
            div(class="bigSwiper-box" v-if="columnStyle==3")
                div(class="swiper-container" :id="'bigSwiper' + index")
                    div(class="swiper-wrapper")
                        div(class="swiper-slide" v-for="(item,index) in columnContent"  @click="eventLog({eventId:'EntertainmentVideo_program_'+ item.videoVideoId +'_click',eventType:'1',contentTitle:item.title})")
                            a(:href="'new-video-detail.html?id='+item.videoVideoId")
                                img(:src="baseUrl + item.image")
                                h5 {{item.title}}
                                p {{item.titleSecond}}
            div(class="smallSwiper-box" v-if="columnStyle==4")
                div(class="swiper-container" :id="'smallSwiper' + index")
                    div(class="swiper-wrapper")
                        div(class="swiper-slide" v-for="(item,index) in columnContent"  @click="eventLog({eventId:'EntertainmentVideo_program_'+ item.videoVideoId +'_click',eventType:'1',contentTitle:item.title})")
                            a(:href="'new-video-detail.html?id='+item.videoVideoId")
                                img(:src="baseUrl + item.image")
                                h5 {{item.title}}
                                span {{item.titleSecond}}
</template>

<style lang="sass" scoped>
.list-box {
    h3 {
        padding: .3rem .44rem 0.34rem;
        text-align: left;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: .40rem;
        height:0.40rem;
        font-size:0.36rem;
        color:#181818;
    }
}

.column-list{
    width: 100%;
    
    .imgTextContent-box {
        margin: 0 auto;
        width: 6.62rem;
        a {
            display: block;
            width: 6.62rem;
            margin-bottom: 0.3rem;
            position: relative;
            img {
                display: block;
                width: 100%;
                height: 3.66rem;
                background-color: #fff;
                border-radius: .08rem;
                overflow: hidden;
            }
            h5 {
                color: #333;
                font-size: .32rem;
                font-weight: 400;
                margin: .13rem 0 0.2rem;
                line-height: .32rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            p{
                color: #666;
                font-size: .26rem;
                line-height: .28rem;
                margin-top: -.1rem;
                margin-bottom: .26rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .marqueeSwiper-box {
        width: 6.62rem;
        margin: 0 auto .3rem;

        .swiper-container {
            width: 100%;
            -webkit-perspective: 200px;
            perspective: 200px;

            .swiper-wrapper {
                margin-top: 0.1rem;
                .swiper-slide {
                    width: 2.3rem;
                    height: 3.69rem;
                    border-radius: .18rem;
                    -webkit-transform-style: preserve-3d;
                    transform-style: preserve-3d;
                    -webkit-transition: transform 1s;
                    transition: transform 1s;
                    -webkit-transform: scale(.7);
                    transform: scale(.7);
                    opacity: .7;

                    .main-img {
                        width: 2.3rem;
                        height: 3.09rem;
                        border-radius: .18rem;
                        margin: 0 auto;
                        display: block;
                    }
                    a:hover {
                        color: #333;
                    }
                    span {
                        text-align: center;
                        display: none;
                        font-family: PingFangSC-Medium;
                        font-size: .34rem;
                        color: #333;
                        line-height: .34rem;
                        margin-top: .26rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .swiper-slide-active,
                .swiper-slide-duplicate-active {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                    opacity: 1;
                    span {
                        display: block;
                    }
                }
            }
        }
    }

    .bigSwiper-box {
        width: 100%;
        margin: 0 auto .3rem;
        .swiper-container {
            padding: 0 .4rem;
            .swiper-slide {
                width: 6.62rem;
                background-color: #fff;
                border-radius: .08rem;
                overflow: hidden;
                box-shadow: 0 2px 10px 4px rgba(0, 0, 0, .04);
                a {
                    display: block;
                    width: 100%;
                    img {
                        display: block;
                        width: 100%;
                        height: 3.66rem;
                        background-color: #f5f5f5;
                    }
                    h5 {
                        color: #333;
                        font-size: .32rem;
                        font-weight: 400;
                        margin: .26rem 0;
                        line-height: .32rem;
                        font-family: PingFangSC-Medium;
                        padding: 0 .28rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    p {
                        color: #666;
                        font-size: .26rem;
                        line-height: .28rem;
                        margin-top: -.1rem;
                        margin-bottom: .26rem;
                        font-family: PingFangSC-Regular;
                        padding: 0 .28rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

            }
        }
    }

    .smallSwiper-box {
        margin: 0 auto .3rem;
        .swiper-container {
            padding: 0 .44rem;
            .swiper-slide {
                width: 34%;
                display: flex;
                justify-content: center;
                align-items: center;
                a{
                    display: block;
                    width: 100%;

                    img{
                        display: block;
                        width: 2.06rem;
                        height: 2.8rem;
                        border-radius: .08rem;
                        background-repeat: no-repeat;
                        background-image: url('../../images/Bitmap@2x.png');
                        background-image: -webkit-image-set(
                            url('../../images/Bitmap@2x.png') 2x,
                            url('../../images/Bitmap@3x.png') 3x);
                        background-position: center;
                        background-color: #F5F5F5;
                    }

                    h5{
                        width: 2.06rem;
                        color: #333333;
                        text-align: left;
                        line-height: .7rem;
                        height: .7rem;
                        font-size: .32rem;
                        font-weight: normal;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }
                    span {
                        width: 2.06rem;
                        display:block;
                        color: #666666;
                        height: .56rem;
                        font-size: .26rem;
                        overflow: hidden;
                        line-height: .28rem;
                    }
                }
            }
        }
    }
    
    
}
</style>

<script type="text/javascript">
  import {eventLog} from 'nativeA';
  import Swiper from 'swiper';

  export default {
    data () {
      return {
          eventLog:eventLog
      }
    },
    props: {
        index: {
            type: Number
        },
        columnTitle: {
            type: String
        },
        columnStyle: {
            type: Number
        },
        columnContent: {
            type: Array
        },
        baseUrl: {
            type: String
        },
    },
    mounted(){
        //columnStyle=1 一行一个
        //columnStyle=2 跑马灯 
        this.marqueeSlider = new Swiper(this.$el.querySelector('#marqueeSwiper' + this.index), {
            loop:true,       //循环切换
            //autoplay: 3000,  //自动播放
            slidesPerView: "auto",
            centeredSlides: true,
            watchSlidesProgress: true,
            pagination: `#marqueeSwiper${this.index} .swiper-pagination`,
            paginationClickable: true
        });
        //columnStyle=3 大图横向滚动
        this.bigSwiper = new Swiper(this.$el.querySelector('#bigSwiper' + this.index), {
            initialSlide :0,
            slidesPerView: 1,
            spaceBetween: 10,
            observer:true
        });

        //columnStyle=4 小图横向滚动
        this.smallSwiper = new Swiper(this.$el.querySelector('#smallSwiper' + this.index), {
            initialSlide :0,
            slidesPerView: 3,
            spaceBetween: 7,
            observer:true,
        });
        // if(this.columnContent.length<=3) {
        //     this["smallSwiper"].destroy(true, true);
        //     this["smallSwiper"] = null;
        // }

        
        
    },
    updated () {
        //columnStyle=1 一行一个
       
        //columnStyle=2 跑马灯 
        this.marqueeSlider = new Swiper(this.$el.querySelector('#marqueeSwiper' + this.index), {
            loop:true,       //循环切换
            //autoplay: 3000,  //自动播放
            slidesPerView: "auto",
            centeredSlides: true,
            watchSlidesProgress: true,
            pagination: `#marqueeSwiper${this.index} .swiper-pagination`,
            paginationClickable: true
        });

        //columnStyle=3 大图横向滚动
        this.bigSwiper = new Swiper(this.$el.querySelector('#bigSwiper' + this.index), {
            initialSlide :0,
            slidesPerView: 1,
            spaceBetween: 10,
            observer:true
        });

        //columnStyle=4 小图横向滚动
        this.smallSwiper = new Swiper(this.$el.querySelector('#smallSwiper' + this.index), {
            initialSlide :0,
            slidesPerView: 3,
            spaceBetween: 7,
            observer:true
        });
        // if(this.columnContent.length<=3) {
        //     this["smallSwiper"].destroy(true, true);
        //     this["smallSwiper"] = null;
        // }
    },
    methods: {
      
    },
    components: {
      
    }
  }
</script>