require('../../css/video-js.css');
require('../../css/movie-play-demo.scss');
require('../../css/messagebox.scss');
require('../../css/swiper.min.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axiosServer from 'axiosServer';
import {getN,callN,apiHost,dataHost,isNative,getHash,resTimeout,getQueryString,checkLogin,eventLog,Fingerprint2} from 'nativeA';
import {isIos} from "../modules/method";
import loading from 'loading';
import popLayer from 'pop-layer';
import videojs from 'video.js';
//import 'videojs-contrib-hls';
import * as HLS from 'videojs-contrib-hls';
import Swiper from 'swiper';
import {setCookie, getCookie} from '../modules/cookie';



window.addEventListener('DOMContentLoaded',function (){
    var NATIVEPARAM = getN('getBase');
    //强制修改app最新版本
    NATIVEPARAM.version = "4.2.0";

    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: false,   // 显示加载中
            isNative: isNative,
            apiHost:apiHost,
            isShow: false,      // 显示toast
            show_msg: "",
            timeout:resTimeout,
            dataToken:"",
            showNav: NATIVEPARAM.showNav,
            eventLog:eventLog, //事件埋点发送方法
            movie:'',//电影video初始化

            movieName:"空中影院",
            isPlayBtnShow:true, //播放按钮是否显示
            flightInfo:{},//航班信息
            dxjFilmDir:"",  //机上广告目录
            moviePosterShow:true, //电影封面是否显示
            moviePoster:"/cache/image/movie/31/20180927172119_134.jpg",       //电影封面
            video_sources:'',//电影资源信息
            movieIsPlay:false,
            fullscreenToggle: false, // 是否有全屏控制按钮

        },
        mounted(){
            var _this = this;
            //var videoSource = document.getElementById('source');
            
            getHash().then(res => {
                _this.dataToken = res.token;
                _this.getDxjfilmDir(_this.dataToken);
                // videojs 初始化
                _this.movie = videojs('movie',{
                    bigPlayButton : true, 
                    textTrackDisplay : false, 
                    posterImage: true,
                    errorDisplay : false,
                    isFullscreen:false,
                    nativeControlsForTouch: false,
                    language: 'zh-CN',
                    controlBar : {
                        captionsButton : false,
                        chaptersButton: false,
                        subtitlesButton:false,
                        liveDisplay:false,
                        playbackRateMenuButton:false,
                        fullscreenToggle: _this.fullscreenToggle,
                    }
                    
                });
                _this.video_sources = apiHost+_this.dxjFilmDir+"/video_3/615103357784018424/784018424/playlist.m3u8";
                _this.movie.ready(function() {
                    var obj  = this;
                    obj.pause();
                    obj.src( _this.video_sources);         //重置video的src
                    obj.load();
                    obj.controls(false);//是否显示控制条
                    //obj.play();
                    if(_this.fullscreenToggle){
                        $('.vjs-duration').css('right','50px')
                    }else{
                        $('.vjs-duration').css('right','0.2rem')
                    }
                });
            }).catch(e => {
                console.log('获取token失败，错误信息:', e);
            });
            
        },
        
        methods:{
            //获取机上电影目录
            getDxjfilmDir:function (token){
                var _this = this;
                $.ajax({
                    type: "GET",
                    async:false,
                    url: apiHost + "/api/apps/contents/ces_ad",
                    headers:{"Content-Type": "application/x-www-form-urlencoded","token": token},
                    dataType: "json",
                    success: function(data){
                        _this.dxjFilmDir = data.ces_ad;
                    },
                    error: function(e){
                        console.log(e);
                        
                    }
                });
            },
           
            //点击播放按钮
            playStart:function(){
                var _this = this;
                    //$('.vjs-big-play-button').show();
                _this.moviePosterShow = false;
                _this.isPlayBtnShow = false;
                _this.movie.play();
                _this.movie.controls(true);
  
            },

         
            //执行toast弹出层
            showLayer(type,v,auto){    
                var _this = this;
                if(type == "show"){
                    _this.isShow = v;
                }else if(type == "showMsg"){
                    _this.show_msg = v;
                }
                if(!auto){
                    if(_this.timeId){clearTimeout(_this.timeId);}
                    _this.timeId = setTimeout(()=>{
                        _this.isShow = false;
                        _this.show_msg = "";
                    },2000);
                }
            },
            goBack: function(){
                //window.history.back();
                callN("moviePlay", {"rotate": false});
                window.location.href = "movie-detail.html?tag="+this.movieID;
            },

        },
        components: {
            loading,
            popLayer
        }
    });

});