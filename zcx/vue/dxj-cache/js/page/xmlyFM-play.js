require('../../css/xmlyFM-play.scss');

const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import {getN,callN,isNative,dataHost,apiHost,utcTime,getHash} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import VueLazyload from 'vue-lazyload';
import Amplitude from '../modules/amplitude.min'

import FastClick from 'fastclick';

Vue.use(Resource);
Vue.use(VueLazyload,{
    error: '../images/e.gif'
});




//接口超时方法
Vue.http.interceptors.push((request, next) => {
  let timeout;
  // 如果某个请求设置了_timeout,那么超过该时间，会终端该（abort）请求,并执行请求设置的钩子函数onTimeout方法，不会执行then方法。
  if (request._timeout) {
    timeout = setTimeout(() => {
        if(request.onTimeout) {
          request.onTimeout(request);
          request.abort();
        }
    }, request._timeout);
  }
  next((response) => {
    clearTimeout(timeout);
    return response;
  });
});

window.addEventListener('DOMContentLoaded', function() {
    var NATIVEPARAM = getN('getBase');

    var vm = new Vue({
        el: "#main",
        data: {
            isWaiting: false,    // 显示加载中
            isShow: false,       // 显示toast
            isReady: false,      // 下拉加载控制器
            isLoad: true,        // 显示加载中
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            dataHost: dataHost,
            apiHost: apiHost,
            title: "播放",    //页面标题
            dxjApi: "",      //飞机环境访问资源路径
            songs:[]
        },
        mounted() {
          var _this = this;

          //外部调用dataToken&dxjApi
          getHash().then(res => {
            _this.dataToken = res.token;
            _this.dxjApi = res.hash;

            // 获取短视频数据
            _this.getVideoData();

          }).catch(e => {
              console.log('获取dxjApi失败，错误信息:', e);
          });
          



          // Amplitude.init({
          //   //shuffle_on: true,
          //   "songs": [
          //     {
          //       "name": "新手创业前需要先了解什么东西？",
          //       "artist": "Ancient Astronauts",
          //       "album": "We Are to Answer",
          //       "url": "../../images/tmp/1.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg"
          //     },
          //     {
          //       "name": "众生颠倒，人们认为错误的东西反而是正确的",
          //       "artist": "Lorn",
          //       "album": "Ask The Dust",
          //       "url": "../../images/tmp/2.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/ask-the-dust.jpg"
          //     },
          //     {
          //       "name": "能盈利你才是合格的商人",
          //       "artist": "Lorn",
          //       "album": "Anvil",
          //       "url": "../../images/tmp/3.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/anvil.jpg"
          //     },
          //     {
          //       "name": "只要你把自己锻炼的很优秀，自然会有强者来,自然会有强者来",
          //       "artist": "Ancient Astronauts",
          //       "album": "We Are to Answer",
          //       "url": "../../images/tmp/4.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-but-hunks-of-wood.jpg"
          //     },
          //     {
          //       "name": "尊重客户，掏心掏肺的为用户服务，我们才能尊重客户",
          //       "artist": "Emancipator",
          //       "album": "Soon It Will Be Cold Enough",
          //       "url": "../../images/tmp/5.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg"
          //     },
          //     {
          //       "name": "新手创业前需要先了解什么东西？",
          //       "artist": "Ancient Astronauts",
          //       "album": "We Are to Answer",
          //       "url": "../../images/tmp/1.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg"
          //     },
          //     {
          //       "name": "众生颠倒，人们认为错误的东西反而是正确的",
          //       "artist": "Lorn",
          //       "album": "Ask The Dust",
          //       "url": "../../images/tmp/2.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/ask-the-dust.jpg"
          //     },
          //     {
          //       "name": "能盈利你才是合格的商人",
          //       "artist": "Lorn",
          //       "album": "Anvil",
          //       "url": "../../images/tmp/3.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/anvil.jpg"
          //     },
          //     {
          //       "name": "只要你把自己锻炼的很优秀，自然会有强者来,自然会有强者来",
          //       "artist": "Ancient Astronauts",
          //       "album": "We Are to Answer",
          //       "url": "../../images/tmp/4.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-but-hunks-of-wood.jpg"
          //     },
          //     {
          //       "name": "尊重客户，掏心掏肺的为用户服务，我们才能尊重客户",
          //       "artist": "Emancipator",
          //       "album": "Soon It Will Be Cold Enough",
          //       "url": "../../images/tmp/5.mp3",
          //       "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg"
          //     }
          //   ]
          // });
          // document.getElementById('amplitude-song-slider').addEventListener('click', function( e ){
          //   var offset = this.getBoundingClientRect();
          //   var x = e.pageX - offset.left;
    
          //   Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
          // });

          
          // $('.show-playlist').on('click', function(){
          //   $('#white-player-playlist-container').fadeIn();
          //   $('.mask').fadeIn();
          //   setTimeout(function(){
          //     $(".white-player-playlist").animate({ scrollTop: $(".white-player-playlist").scrollTop() + $('.amplitude-active-song-container').offset().top - $(".white-player-playlist").offset().top }, 300); 
          //     //$(".white-player-playlist").scrollTop($(".white-player-playlist").scrollTop() + $('.amplitude-active-song-container').offset().top - $(".white-player-playlist").offset().top); 
          //   },200)
          // });
    
          // $('.close-playlist,.mask').on('click', function(){
          //   $('#white-player-playlist-container').fadeOut();
          //   $('.mask').fadeOut();
          // })

            
        },
        methods: {
          showLayer(type, v, auto) { //执行toast弹出层
            var _this = this;
            if (type == "show") {
              _this.isShow = v;
            } else if (type == "showMsg") {
              _this.show_msg = v;
            }
            if (!auto) {
              if(_this.timeId){clearTimeout(_this.timeId);}
              _this.timeId = setTimeout(() => {
                _this.isShow = false;
              _this.show_msg = "";
            }, 2000);
            }
          },
          
          getVideoData:function () {

            var _this = this;
            _this.isReady = true;

            var videoUrl = "/images/tmp/audio.json";
            // var videoUrl = _this.dataHost + `/v1/video/index?` + querystring.stringify({
            //     param: JSON.stringify({
            //       "version":NATIVEPARAM.version,
            //       "platform":NATIVEPARAM.platform,
            //       "environment":NATIVEPARAM.environment
            //     })
            //   });
            _this.$http.get(videoUrl).then((message)=>{
              _this.isReady = false;
              
              var status = message.body.status,
                  msg = message.data.msg;

              if (status === 200) {
                var curData = message.body.data.list;    //当次请求内容

                _this.songs = curData;
                // console.log(message.body.data);
                console.log(_this.songs)
                Amplitude.init({
                  "songs": _this.songs
                });

                //音频列表总数
                //_this.tabTypes[1].title += _this.radio.length;

              }else{
                _this.showLayer("showMsg", msg);
              }

            },()=>{
              _this.isReady = false;
              _this.showLayer("showMsg", "网络请求错误");
            });

          },
          songSliderClick:function (e) {
            var offset = this.getBoundingClientRect();
            var x = e.pageX - offset.left;
            Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
          },
          playlistShow:function () {
            $('#white-player-playlist-container').fadeIn();
            $('.mask').fadeIn();
            setTimeout(function(){
              $(".white-player-playlist").animate({ scrollTop: $(".white-player-playlist").scrollTop() + $('.amplitude-active-song-container').offset().top - $(".white-player-playlist").offset().top }, 300); 
              //$(".white-player-playlist").scrollTop($(".white-player-playlist").scrollTop() + $('.amplitude-active-song-container').offset().top - $(".white-player-playlist").offset().top); 
            },200)
          },
          playlistHide:function () {
            $('#white-player-playlist-container').fadeOut();
            $('.mask').fadeOut();
          },
        },
        components: {
            loading,
            popLayer,
            headerNav
        }
    });

});