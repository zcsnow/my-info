require('../../css/artworks.scss');

const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,callN,isNative,dataHost,apiHost,utcTime,getHash,getQueryString,dataVersion} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import VueLazyload from 'vue-lazyload';

import FastClick from 'fastclick';
import imgPreview from '../modules/imgPreview';

Vue.use(Resource,axios);
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
            noDataIShow:false,  //无数据提示
            listNoDataIShow:false,  //无数据提示
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            dataHost: dataHost,
            apiHost: apiHost,
            dxjResourceDir:"",//获取机上静态资源目录
            dataToken: "",
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            title: "国画",    //页面标题
            isImgPreviewShow:false,
            previewData:'',
            dxjApi: "",     //飞机环境访问资源路径
            cacheArtistsData:{},
            isHasArtListCache:true,
            artworkListCache: [],
            artworkList: [], //作品展览列表
            artworkTypes: [],  //作品列表类型列表
            curType: 1,        //当前作品列表类型
            curpage: 0,      //作品展览当前分页值
            lastNum: 0,      //作品展览当前分页最后一条upper_time值
            pagecount: 999 	//作品展览总页数
            //
        },
        mounted() {
          var _this = this;

          //作品类型
          _this.artworkTypes = [
            {"type":"1", "title":"国画", "active":false},
            {"type":"2", "title":"油画", "active":false},
            {"type":"3", "title":"书法", "active":false},
            {"type":"4", "title":"古玩", "active":false},
          ];

          //根据hash获取当前的分类
          var hash = _this.curType;
          if(location.hash.indexOf('#')>=0){
            hash = parseInt(location.hash.replace("#",""));
          }
          _this.curType = hash;
          _this.artworkTypes[_this.curType-1].active = true;

          // 外部调用dataToken&dxjApi
          getHash().then(res => {
            _this.dataToken = res.token;
            var planeType = res.planeType;
            if(planeType=="00"){
              _this.dxjApi = res.hash+'/dxj';
              _this.dxjResourceDir = res.hash+'/dxj';//获取最新更新机上静态资源目录
            }else if(planeType=="bc03"){
                _this.dxjApi = res.hash+'/dxj/dxj';
                _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
            }else{
                _this.dxjApi = res.hash;
                _this.dxjResourceDir = res.hash;//获取机上静态资源目录
            }

            _this.getDxjJsonData();
            // 获取艺术品作品列表数据
            _this.cacheArtListData(utcTime,_this.dataToken)
          }).catch(e => {
              console.log('获取dxjApi失败，错误信息:', e);
              _this.noDataIShow = true; 
          });
            
        },
        methods: {
          getDxjJsonData: function () {
            //获取机上静态资源数据
            var _this = this;
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/arts.json';
            axios.get(jsonSrc).then((result) => {
              if(_this.isCacheDataLoad){
                return false
              }
              var data = result.data.data;
              _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              //渲染数据
              _this.artworkListCache = data;
              _this.$nextTick(()=>{
                  _this.isLoad = false;
                  window.removeEventListener('scroll',_this.addMore,false);
                  _this.artworkList = data['list'+_this.curType];
                  if(_this.artworkList.length==0){
                    _this.listNoDataIShow = true;
                  }else{
                    _this.listNoDataIShow = false;
                }
              });
                
            }).catch((err) => {
                console.log(err);
            });
          },
          cacheArtListData:function (planeData,token) {
              var _this = this;
              //飞机环境要先获取资源
              var dataPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/arts' + planeData;
              //请求飞机本地缓存数据
              axios.get(dataPath).then((result) => {
                _this.baseUrl = _this.apiHost + '/app/dxj';
                _this.isCacheDataLoad = true;
                  var data = result.data.data;
                  //console.log(data);
                  if(data==undefined){
                      //console.log("数据类型转换");
                      data = JSON.parse(data);
                  }
                  _this.artworkListCache = data;
                  _this.$nextTick(()=>{
                      _this.isLoad = false;
                      window.removeEventListener('scroll',_this.addMore,false);
                      _this.artworkList = data['list'+_this.curType];
                      if(_this.artworkList.length==0){
                        _this.listNoDataIShow = true;
                      }else{
                        _this.listNoDataIShow = false;
                    }
                  });

              }).catch((err) => {
                  //获取作品展示数据
                  _this.isHasArtListCache = false;
                  _this.getArtListData(_this.curType,token);
                  _this.$nextTick(()=>{
                      window.addEventListener('scroll',this.addMore.bind(this),false);
                  });
              });
          },
          getArtListData:function (curType,token) {
            var _this = this;
            _this.isReady = true;
            var artworkListUrl = _this.dataHost + `/v1/art/index?` + querystring.stringify({
                param: JSON.stringify({
                  "version":NATIVEPARAM.version,
                  "platform":NATIVEPARAM.platform,
                  "environment":NATIVEPARAM.environment,
                  "category":curType,
                  "page":_this.curpage,
                  "pageSize": 10,
                  "lastNumber":_this.lastNum
                })
              });
            _this.$http.get(artworkListUrl, {
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded",
                    "token": token,
                    "cache-control": "no-cache"
                },
                timeout:15000,
                onTimeout: (request) => {
                  _this.isWaiting = false;
                  _this.isLoad = false;
                  //_this.showLayer("showMsg", "请求超时");
                  _this.noDataIShow = true; 
                }
            }).then((message) => {
              _this.isReady = false;
              _this.noDataIShow = false; 
              var status = message.body.status,
                  msg = message.data.msg;

              if (status === 200) {
                _this.baseUrl = '/app/dxj';
                _this.isCacheDataLoad = true;
                if(_this.curpage==0){
                  _this.artworkList = [];
                }
                var curData = message.body.data.list;    //当次请求内容
                _this.artworkList = _this.artworkList.concat(curData);
                if(_this.artworkList.length==0){
                  _this.listNoDataIShow = true;
                }else{
                  _this.listNoDataIShow = false;
                }
                if (_this.curpage++>=_this.pagecount) {
                  window.removeEventListener('scroll',_this.addMore,false);
                  _this.isReady = true;
                  _this.isLoad = false;
                }

                //分页第二页后需要传值upper_time
                if (_this.curpage > 0 && curData.length > 0) {
                  _this.lastNum = curData[curData.length-1].upper_time;       //接口赋值
                }else{
                  window.removeEventListener('scroll',_this.addMore,false);
                  _this.isReady = true;
                  _this.isLoad = false;
                }

              }else{
                //_this.showLayer("showMsg", msg);
                _this.noDataIShow = true; 
              }

            },()=>{
              _this.isReady = false;
              //_this.showLayer("showMsg", "网络请求错误");
              _this.noDataIShow = true;
                        
            });

        },
          //查看图片大图
          lookWorkDetail:function (previewData) {
              var _this = this;
              if(previewData.image.indexOf("http")==-1){ //没有http这个字符
                previewData.image = _this.baseUrl + previewData.image;
              }
              
              _this.isImgPreviewShow = true;
              _this.previewData = previewData;
          },
          //隐藏图片预览组件
          hideImgPreview: function (e) {
              this.isImgPreviewShow = false;
          },
          addMore(){
            var H = document.documentElement.scrollHeight || document.body.scrollHeight;
            var h = window.innerHeight;
            var t = document.documentElement.scrollTop||document.body.scrollTop;
            if (H - (h + t) < 15 && !this.isReady){
              this.getArtListData(this.curType,this.dataToken);
            }
          },
          //tab方法
          tabFn:function (index) {    //tab切换方法
            var _this = this;
            //设置tab默认赋值
            for(var i=0, len=_this.artworkTypes.length; i<len; i++){
              _this.artworkTypes[i].active = false;
            }
            _this.artworkTypes[index].active = true;
            _this.curpage = 0;
            _this.artworkList = [];
            _this.curType = index+1;
            if(_this.isHasArtListCache == true){
                var listNum = 'list'+_this.curType
                _this.$nextTick(()=>{
                    $("body").scrollTop(0); 
                    _this.artworkList = _this.artworkListCache[listNum];
                    if(_this.artworkList.length==0){
                      _this.listNoDataIShow = true;
                    }else{
                      _this.listNoDataIShow = false;
                    }
                });
            }else{
                _this.getArtListData(_this.curType,_this.dataToken)
            }
           
          },
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
        },
        components: {
            loading,
            popLayer,
            headerNav,
            imgPreview
        }
    });

});