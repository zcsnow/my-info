<template lang="pug">
  div(v-if="isOpen" class="insert-screen-ad-box")
    div(class="insert-screen-ad-bg")
    div(class="insert-screen-ad")
      div(class='icon_close' @click='close()')
      div(class="insert-screen-ad-img")
        a(:href="advHref")
          img(:src="image")
</template>

<script type="text/javascript">
import axios from "axios";
const querystring = require("querystring");
import { getN, dataHost, apiHost, utcTime, getHash, dataVersion,eventLog } from "nativeA";
import { setCookie, getCookie } from "../modules/cookie.js";

var NATIVEPARAM = getN("getBase");

export default {
  data() {
    return {
      isOpen: false, //是否有插屏广告
      dxjResourceDir:"",//获取机上静态资源目录
      image: "../images/e.gif", //插屏广告图
      advHref: "javascript:void(0)", //插屏广告点击外链地址
      countDown: 5, //插屏广告停留时间（秒）
      dataToken: "",
      adTimeIn:"" 
    };
  },
  props: ["type","cityId"],
  mounted() {
    var _this = this;
    // 外部调用dataToken&dxjApi
    getHash().then(res => {
      _this.dataToken = res.token;
       //飞机机型是否是BC03
      var planeType = res.planeType;
      if(planeType=="bc03"){
          _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
      }else{
          _this.dxjResourceDir = res.hash;//获取机上静态资源目录
      }
      _this.adTimeIn = Date.parse(new Date());
      //飞机环境要先获取资源
      if(_this.type!=3){
        if(getCookie('insertScreenAd' + _this.type) == null){
          _this.cacheAdData(utcTime);
        }
      }else{
        if(getCookie('cityInsertScreenAd' + _this.cityId) == null){
          _this.cacheAdData(utcTime);
        }
      }
      
    })
    .catch(e => {
      console.log("获取token失败，错误信息:", e);
    });
  },
  methods: {
    cacheAdData(planeData) {
      var _this = this;
      var url = apiHost + "/app/dxj/cache/" + dataVersion + "/tableScreenAd/" + _this.type + planeData;
      //请求本地缓存数据
      axios.get(url).then(result => {
        var data = result.data.data;
        if (data == undefined) {
          console.log("数据类型转换");
          data = JSON.parse(data);
        }
        

        if(_this.type==3){
          Object.keys(data).forEach(function(item,index,arr){
            if(item==_this.cityId){
              data = data[item]
              if(Object.keys(data).length==0)
              {
                _this.isOpen = false;
                _this.getAdData(_this.dataToken);
                return false;
              }
            }
          })
        }
        else{
          if(Object.keys(data).length==0)
          //if(timestamp < data.start_time*1000 || timestamp > data.end_time * 1000)
          {
            _this.isOpen = false;
            return false;
          }
        }
        //var timestamp = (new Date()).getTime();
        
        var fullScreen = "";
        if(data.big == 1){
          if(data.url.indexOf('?')>=0){
            fullScreen = "&fullScreen=true"
          }
          else{
            fullScreen = "?fullScreen=true"
          }
        }
        _this.isOpen = true;
        if(_this.type!=3){
          setCookie('insertScreenAd' + _this.type,true,20,'MM');
        }else{
          setCookie('cityInsertScreenAd' + _this.cityId,true,20,'MM');
        }
        
        _this.image = data.planeImage == ''? apiHost + data.image: apiHost + _this.dxjResourceDir + data.planeImage;
        _this.image = data.image == ''? apiHost + _this.dxjResourceDir + data.planeImage: apiHost + data.image;
        _this.advHref = data.url!=''?data.url+fullScreen:"javascript:void(0)";
      })
      .catch(err => {
          console.log(err);
          //获取接口数据
          _this.$nextTick(() => {
            _this.getAdData(_this.dataToken);
          });
      });
    },
    getAdData:function(token){
      var _this = this;
      _this.isWaiting = true;
      var url = dataHost + `/v1/tableScreen/ad?` + querystring.stringify({
        param: JSON.stringify({
          "version": NATIVEPARAM.version,
          "platform": 4,
          "environment": 'plan',
          "type": parseInt(_this.type),
          "cid": parseInt(_this.cityId)
        })
      });
      _this.$http.get(url, {
          headers:{
              "Content-Type": "application/x-www-form-urlencoded",
              "token": token,
              "cache-control": "no-cache"
          },
          _timeout:15000,
          onTimeout: (request) => {
            
          }
      }).then((message)=>{
        var status = message.body.status,
            msg = message.body.msg;
        if (status === 200) {
          var data = message.body.data;
          
          //var timestamp = (new Date()).getTime();
          //if(timestamp < data.start_time*1000 || timestamp > data.end_time * 1000)
          
          if(Object.keys(data).length==0)
          {
            _this.isOpen = false;
            return false;
          }
          var fullScreen = "";
          if(data.big == 1){
            if(data.url.indexOf('?')>=0){
              fullScreen = "&fullScreen=true"
            }
            else{
              fullScreen = "?fullScreen=true"
            }
          }
          _this.isOpen = true;
          if(_this.type!=3){
            setCookie('insertScreenAd' + _this.type,true,20,'MM');
          }else{
            setCookie('cityInsertScreenAd' + _this.cityId,true,20,'MM');
          } 
          
          _this.image = data.planeImage == ''? '/app/dxj' + data.image: '/app/dxj' + data.planeImage;
          //_this.image = data.image == ''? '/app/dxj' + data.planeImage: '/app/dxj' + data.image;
          _this.advHref = data.url!=''?data.url+fullScreen:"javascript:void(0)";
        }
      });
  },
    close: function () {
        var adTimeOut = Date.parse(new Date());
        var detentionTime = adTimeOut-this.adTimeIn;
        if(this.type!=3){
          eventLog({eventId:'insertScreenAd' + this.type,eventType:'1',eventIsAD:'1',detentionTime:detentionTime})
        }else{
          eventLog({eventId:'cityInsertScreenAd' + this.cityId,eventType:'1',eventIsAD:'1',detentionTime:detentionTime})
        }
        
        this.isOpen = false;
    },
  }
};
</script>

<style lang="sass" scoped>
    .insert-screen-ad-box{
        position: fixed;
        z-index: 9999;
        width: 7.5rem;
        height: 100%;
        top: 0;
        display:flex;
        -webkit-align-items: center;
        align-items: center;
        justify-content: center;
    }
    .insert-screen-ad-bg{
        position:absolute;
        width: 7.5rem;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.7;
        background: #000000;
    }
    .insert-screen-ad{
        position: relative;
    }
    .insert-screen-ad-img{
        width:5.74rem;
        height: 7.36rem;
        background: #D8D8D8;
        border-radius: .16rem;
        overflow: hidden;
    }
    .insert-screen-ad-img img{
      width:5.74rem;
      height: 7.36rem;
    }
    .icon_close{
        position: absolute;
        display: inline-block;
        width: .52rem;
        height: .52rem;
        background-repeat: no-repeat;
        background-image: url('../../images/chaping-guanbi@2x.png');
        background-image: -webkit-image-set(
        url('../../images/chaping-guanbi@2x.png') 2x,
        url('../../images/chaping-guanbi@3x.png') 3x);
        background-size: .52rem .52rem;
        top: -.26rem;
        right: -.26rem;
    }
</style>