require('../../css/city-search.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,dataHost,apiHost,getHash, utcTime,getQueryString,dataVersion} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';

Vue.use(Resource, axios);
Vue.use(VueLazyload,{
    error: '../images/e.gif',
});

//解决vue-resource请求报错,data默认不是以form data的形式，而是request payload的问题
Vue.http.options.emulateJSON = true;

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

    var vm = new Vue({
        el:"#main",
        data:{
          isWaiting: false,   // 显示加载中
          isShow: false,      // 显示toast
          dataHost: dataHost,
          dataToken: "",
          dxjApi: "",     //飞机环境访问资源路径
          isCacheDataLoad:false, //cache或接口资源是否优先加载成功
          isCacheCity: true,//默认读取缓存数据
          baseUrl: '',
          show_msg: "",
          keyword: "",
          citySearchResultList: [],
          resou: false
        },
        mounted(){
            var _this = this;
          // 外部调用dataToken&dxjApi
          getHash().then(res => {
              _this.dataToken = res.token;
              //飞机机型是否是BC03
              var planeType = res.planeType;
              if(planeType=="00"){
                _this.dxjResourceDir = res.hash+'/dxj';//获取最新更新机上静态资源目录
              }else if(planeType=="bc03"){
                  _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
              }else{
                  _this.dxjResourceDir = res.hash;//获取机上静态资源目录
              }
              //_this.getDxjJsonData();
              //飞机环境要先获取资源

          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
   
          });

        },
        methods:{
            cacheSearchResult(keyword,planeData) {
              var _this = this;
              var url = apiHost + '/app/dxj/cache/' + dataVersion + '/area-list' + planeData;
              //请求本地缓存数据
              _this.isWaiting = true;
              axios.get(url).then((result) => {
                _this.baseUrl = apiHost + '/app/dxj';
                _this.isCacheDataLoad = true;
                // 是否读取缓存数据
                _this.isCacheCity = true;

                var data = result.data.data;
                if(data==undefined){
                  console.log("数据类型转换");
                  data = JSON.parse(data);
                }
                var cityId=[]
                _this.isWaiting = false;
                $.each(data,function (listIndex,listItem) {
                  //取出所有城市数据
                  if (listIndex.indexOf('list') >= 0) {
                    $.each(listItem,function (index,item) {
                      //取出搜索到的城市数据
                      if(item.name.indexOf(keyword) >= 0){
                        //去掉重复搜索到的城市数据
                        if (cityId.indexOf(item.id)<0){
                            cityId.push(item.id)
                           _this.citySearchResultList.push(item)
                        }
                      }
                    });
                  }
                });
              }).catch((err) => {
                  _this.isWaiting = false;
                  // 是否读取缓存数据
                  _this.isCacheCity = false;
                  // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                  //获取接口数据
                  _this.$nextTick(()=>{
                      _this.getSearchResult(keyword,_this.dataToken);
                  });

              });

            },

            getSearchResult:function (keyword ,token) {
              var _this=this;
              var url = _this.dataHost + `/v1/whither/search`;
              _this.$http.post(url, querystring.stringify({
                param: JSON.stringify({
                  "version":NATIVEPARAM.version,
                  "platform":4,
                  "environment":'plan',
                  "keyword": keyword
                })
              }), {
                headers:{
                  "Content-Type": "application/x-www-form-urlencoded",
                  "token": token
                }
              }).then((message) => {
                var starts = message.body.status,
                    msg = message.body.msg;
                if (starts == 200) {
                  _this.baseUrl = apiHost + '/app/dxj';
                  _this.isCacheDataLoad = true;
                  var data = message.body.data.list;
                  _this.citySearchResultList = data;
                  _this.isWaiting = false;
                  
                } else {
                  _this.resou = false;
                  _this.citySearchResultList = [];
                  _this.showLayer("showMsg", msg);
                  _this.isWaiting = false;
                }
              },()=>{
                _this.resou = false;
                _this.isWaiting = false;
                _this.showLayer("showMsg", "网络请求错误");
              });
            },
            search:function(keyword ,token){
              if (keyword.replace(/(^s*)|(s*$)/g, "").length ==0) {
                return false
              } 
              this.citySearchResultList=[];
              this.cacheSearchResult(keyword,utcTime)

            },
            
            clearCitySearchResultList:function(){
              // this.keyword = "";
              // this.citySearchResultList = [];
              window.history.back();
            },
            clearKeyword:function(){
              this.keyword = "";
            },
            showLayer(type,v,auto){    //执行toast弹出层
              var _this = this;
              if(type == "show"){
                  _this.isShow = v;
              }else if(type == "showMsg"){
                  _this.show_msg = v;
              }
              if(!auto){
                if(_this.timeId){ clearInterval(_this.timeId);}
                  _this.timeId = setTimeout(()=>{
                    _this.isShow = false;
                    _this.show_msg = "";
                },2000);
              }
            },
            show:function(ev){
                var _this = this;
                if(ev.keyCode == 13){
                  _this.search(_this.keyword, _this.dataToken);          //获取资源目录
                  // alert('你按回车键了');
                }
            }

        },
        components: {
            loading,
            popLayer
        }
    });

});