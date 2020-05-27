require('../../css/swiper.min.scss');
require('../../css/new-video-detail.scss');
require('../../css/messagebox.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axiosServer from 'axiosServer';
import {getN,apiHost,dataHost,isCeair,isNative,utcTime,dataVersion,isGround,getHash,resTimeout,getQueryString,eventLog,Fingerprint2,isEmpty} from 'nativeA';
import {isIos} from "../modules/method.js";
import loading from 'loading';
import headerOpacityNav from 'headerOpacityNav';
import popLayer from 'pop-layer';
import Swiper from 'swiper';

import {setCookie, getCookie} from '../modules/cookie.js';
import FastClick from 'fastclick';

Vue.use(Resource);

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

window.addEventListener('DOMContentLoaded',function (){
    var NATIVEPARAM = getN('getBase');
    //强制修改app最新版本
    NATIVEPARAM.version = "4.2.0";

    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: false,   // 显示加载中
            isShow: false,      // 显示toast
            show_msg: "",
            apiHost: apiHost,
            baseUrl: '',
            isNative: isNative,
            showNav: NATIVEPARAM.showNav,
            dataToken: "",
            movieData:[],
            fold:true,
            toggle_btn_text:'展开',
            movieID:"",  //电影id
            videoPath:'',//视频所在机上路径
            dxjResourceDir:"",//获取机上静态资源目录
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            dxjFilmDir:"",//机上电影目录
            isEmpty:isEmpty,
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted(){
            var _this = this;    
                //机上电影信息
                _this.movieID = getQueryString("id"); //电影id
                _this.isWaiting = true;
                getHash().then(res => {
                    _this.dataToken = res.token;
                    var planeType = res.planeType;//飞机机型是否是BC03
                    if(planeType=="00"){
                        _this.dxjResourceDir = res.hash+'/dxj';//获取最新更新机上静态资源目录
                    }else if(planeType=="bc03"){
                        _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
                    }else{
                        _this.dxjResourceDir = res.hash;//获取机上静态资源目录
                    }
                    
                    _this.getDxjJsonData()  //获取飞机本地资源
                    //setTimeout(function(){
                        _this.getMovieDetailcacheData(utcTime,_this.movieID,_this.dataToken);//获取cache资源
                    //},5000)
                    //_this.getMovieDetailData(_this.movieID,_this.dataToken);//获取电影详情

                }).catch(e => {
                    console.log('获取token失败，错误信息:', e);
                });
        },

        methods:{
            getDxjJsonData:function (){
                //获取机上静态资源数据
                var _this = this;
                let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/audioVideo/'+_this.movieID+'.json';
                axiosServer(jsonSrc,"get",{},'').then((res) => {
                    if(_this.isCacheDataLoad){
                        return false
                    }
                    _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
                    _this.movieDetailShow(res,_this.dataToken);
                },(err) => {
                    console.log(err)
                });
            },
            getMovieDetailcacheData(planeData,videoID,dataToken) {
                var _this = this;
                var movieCahcheUrl = apiHost + '/app/dxj/cache/' + dataVersion + '/audioVideo/' + videoID  + planeData;
                //请求本地缓存数据
                _this.isWaiting = true;
                _this.getMovieDetailFun(movieCahcheUrl,{},'',function(){
                    //请求服务器数据
                    _this.$nextTick(()=>{
                        let movieApiUrl = dataHost +'/v1/audioVideo/detail';
                        let param = {
                                param: JSON.stringify({
                                    "version": NATIVEPARAM.version,
                                    "environment":'plan',
                                    "platform": '4',
                                    "id":videoID      //视频id
                                })
                            };
                        _this.getMovieDetailFun(movieApiUrl,param,dataToken)
                    });
                })

            },
            //获取视频详情数据
            getMovieDetailData:function (videoID,token){
                var _this = this;
                let movieApiUrl = dataHost +'/v1/audioVideo/detail';
                let param = {
                        param: JSON.stringify({
                            "version": NATIVEPARAM.version,
                            "environment":'plan',
                            "platform": '4',
                            "id":videoID   //视频id
                        })
                    };
                this.getMovieDetailFun(movieApiUrl,param,token)
            },
            getMovieDetailFun:function (url,param,token,callback){
                var _this = this;
                _this.isWaiting = true;
                axiosServer(url,"get",param,token).then((res) => {
                    _this.isWaiting = false;
                    _this.baseUrl = _this.apiHost + '/app/dxj';
                    _this.isCacheDataLoad = true;
                    //console.log(res)
                    _this.movieDetailShow(res,_this.dataToken);
                },(err) => {
                    //_this.isWaiting = false;
                    console.log(err)
                    callback();
                    
                });
            },
            movieDetailShow:function(res,token){
                var _this = this;
                if (res.status === 200) {
                    _this.movieData = res.data;
                    _this.movieData.row_image = _this.baseUrl+_this.movieData.row_image;
                    
                    if(_this.movieData.status==1){
                        console.log('该电影已下架');
                        return false;
                    }
                    if(_this.movieData.columnTitle){
                        _this.title = _this.movieData.columnTitle;
                        document.title = _this.movieData.columnTitle;
                    }
                                 
                    _this.getDxjfilmDir(token);

                    /*剧集轮播滑动 */
                    _this.$nextTick(()=>{
                        _this.videoSetsSwiper();
                    });
                }
                    
               
            },
            //获取机上视频目录或静态资源目录
            getDxjfilmDir:function (token){
                var _this = this;
                $.ajax({
                    type: "GET",
                    async:false,
                    url: apiHost + "/api/apps/contents/ces_ad",
                    headers:{"Content-Type": "application/x-www-form-urlencoded","token": token},
                    dataType: "json",
                    success: function(data){
                        //if(data.ces_ad==null){
                            _this.dxjFilmDir = _this.dxjResourceDir;
                        //}else{
                            //_this.dxjFilmDir = data.ces_ad;
                        //}
                    },
                    error: function(e){
                        console.log(e);
                        _this.dxjFilmDir = _this.dxjResourceDir;
                        
                    }
                });
            },
            //获取机上视频列表
            getDxjfilmList:function (url,videoData){
                var _this = this;
                //_this.isWaiting = true;
                axiosServer(url,"get",{},'').then((res) => {
                    _this.isWaiting = false;
                    //console.log(res)
                    let data = res.data;
                    //遍历机上电影列表
                    var isHasMovieMatch = false;
                    var isJsonHasData = false; 
                    data.list.forEach(function(item,index,arr){
                        if(item.videoId==decodeURI(videoData.videoMD5)){
                            isHasMovieMatch = true;
                            isJsonHasData =true;
                            //console.log(item.video)
                            if(_this.dxjFilmDir == _this.dxjResourceDir){
                                if(videoData.videoMD5 == "784018424"){
                                    _this.videoPath = "615103357784018424";
                                }else{
                                    _this.videoPath = item.videoPath;
                                }
                            }else{
                                if(videoData.videoMD5 == "784018424"){
                                    _this.videoPath = _this.dxjFilmDir+"615103357784018424";
                                }else{
                                    _this.videoPath = _this.dxjFilmDir+item.videoPath;
                                }
                            }
                            window.location.href = "new-video-play.html?videoPath="+_this.videoPath+"&videoDirId="+item.dirId+"&videoMD5="+videoData.videoMD5+"&videoType="+item.type+"&videoName="+encodeURI(videoData.name)+"&videoPoster="+videoData.row_image+"&id="+videoData.id+"&rotate=true";
                            return false;
                        }
                    });
                    if(!isJsonHasData){
                        //机上文件存在，json不存在bug修复
                        var baseData = {
                            "data":{"list":[
                                {"dirId":"movie5","title":"神秘巨星","videoPath":"","type":"m3u8","videoId":"4527834731846706682"},
                                {"dirId":"movie3","title":"一条狗的使命","videoPath":"","type":"m3u8","videoId":"4527834711423703274"},
                                {"dirId":"movie1","title":"冈仁波齐","videoPath":"","type":"m3u8","videoId":"4527834691218972228"},
                                {"dirId":"movie1","title":"动物世界","videoPath":"","type":"m3u8","videoId":"4527834691218972259"},
                                {"dirId":"movie2","title":"追龙","videoPath":"","type":"m3u8","videoId":"4527834701218972197"},
                                {"dirId":"movie1","title":"反贪风暴3","videoPath":"","type":"m3u8","videoId":"4527834691218972197"},
                                {"dirId":"movie2","title":"太空救援","videoPath":"","type":"m3u8","videoId":"4527834701218972228"},
                                {"dirId":"movie2","title":"妖铃铃","videoPath":"","type":"m3u8","videoId":"4527834701218972259"},
                                {"dirId":"movie3","title":"血观音","videoPath":"","type":"m3u8","videoId":"4527834711846706775"},
                                {"dirId":"movie3","title":"廉政风云","videoPath":"","type":"m3u8","videoId":"4527834711846706744"},
                                {"dirId":"movie4","title":"心理罪之城市之光","videoPath":"","type":"m3u8","videoId":"4527834721846706682"},
                                {"dirId":"movie4","title":"绣春刀2：修罗战场","videoPath":"","type":"m3u8","videoId":"4527834721846706775"},
                                {"dirId":"movie4","title":"来电狂响","videoPath":"","type":"m3u8","videoId":"4527834721846706713"},
                                {"dirId":"movie4","title":"欧洲攻略","videoPath":"","type":"m3u8","videoId":"4527834721846706744"},
                                {"dirId":"movie5","title":"记忆大师","videoPath":"","type":"m3u8","videoId":"4527834731846706744"},
                                {"dirId":"movie5","title":"驴得水","videoPath":"","type":"m3u8","videoId":"452783473865756566"},
                                {"dirId":"movie5","title":"吃吃的爱","videoPath":"","type":"m3u8","videoId":"4527834731846706775"},
                                {"dirId":"movie5","title":"密战","videoPath":"","type":"m3u8","videoId":"452783473309445862"},
                                {"dirId":"movie5","title":"影","videoPath":"","type":"m3u8","videoId":"4527834731846706713"}
                                ]
                            }
                        }
                        baseData.data.list.forEach(function(item,index,arr){
                            if(item.videoId==decodeURI(videoData.videoMD5)){
                                isHasMovieMatch = true;
                                if(_this.dxjFilmDir == _this.dxjResourceDir){
                                    _this.videoPath = item.videoPath;
                                }else{
                                    _this.videoPath = _this.dxjFilmDir+item.videoPath;
                                }
                                window.location.href = "new-video-play.html?videoPath="+_this.videoPath+"&videoDirId="+item.dirId+"&videoMD5="+videoData.videoMD5+"&videoType="+item.type+"&videoName="+encodeURI(videoData.name)+"&videoPoster="+videoData.row_image+"&id="+videoData.id+"&rotate=true";
                                return false;
                            }
                        });
                    }   
                    
                    if(!isHasMovieMatch){
                        _this.showLayer("showMsg","本次航班暂未上映，敬请期待");
                        console.log('本次航班暂未上映，敬请期待');
                    }
                },(err) => {
                    //_this.isWaiting = false;
                    //console.log(err)
                    //callback();
                    _this.showLayer("showMsg","本次航班暂未上映，敬请期待");
                    console.log('本次航班暂未上映，敬请期待');
                });

            },
            playStart:function (movieData,item,index) {
                var _this = this;
                
                eventLog({eventId:'EntertainmentVideo_program_Anthology_'+ (parseInt(index)+1) +'_click',eventType:'1',contentTitle:movieData.title+'：'+movieData.series[index].name})
                var videoData = {
                    "id":movieData.id,
                    "videoMD5":movieData.series[index].url,
                    "name": movieData.title+'：'+movieData.series[index].name,
                    "video":movieData.series[index].video,
                    "row_image":movieData.row_image
                }
                if(_this.dxjFilmDir==_this.dxjResourceDir){
                    var filmPath = _this.apiHost + _this.dxjFilmDir + '/movies/'+ _this.movieData.videoUrl+'.json';
                }else{
                    var filmPath = _this.apiHost + _this.dxjFilmDir + '/'+_this.movieData.videoUrl+'.json';
                }
                if(!!_this.movieData.videoUrl){
                    _this.getDxjfilmList(filmPath,videoData);
                }else{
                    _this.showLayer("showMsg","本次航班暂未上映，敬请期待");
                    console.log('本次航班暂未上映，敬请期待');
                };
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
            //展开收起内容
            showOrHide:function(){   
                this.fold = !this.fold;
                if(this.fold==true){
                    this.toggle_btn_text = '展开';
                }else{
                    this.toggle_btn_text = '收起';
                }
            },
            //集数轮播
            videoSetsSwiper: function () {
                this._mySwiper = new Swiper(this.$el.querySelector('#videoSetsSwiper'), {
                    initialSlide :0,
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    observer:true,
                });
            },
            
        },
        components: {
            loading,
            headerOpacityNav,
            popLayer
        }
    });

});