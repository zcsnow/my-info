<template>
    <div class="entry-adv-box" v-if="isOpen">
      <!-- 开屏广告 -->
      <a :href="advHref" @click="eventLog({eventId:'home_starup_click'})">
          <img :src="advSrc" />
      </a>
      <em @click="skip">{{countDown}}跳过</em>
      <!-- 开屏logo -->
      <span>
          <img :src="logoSrc+'@2x.png'" :srcset="logoSrc+'@2x.png 2x,'+ logoSrc+'@3x.png 3x'" />
      </span>
    </div>
</template>



<script type="text/javascript">
  import axios from 'axios';
  const querystring = require('querystring');
  import { getN,dataHost,apiHost,utcTime,getHash,eventLog,dataVersion } from 'nativeA';
  import {setCookie, getCookie} from '../modules/cookie.js';

  var NATIVEPARAM = getN('getBase');

	export default {
    data(){
      return{
        isOpen:false,  //是否有开屏广告
        dxjResourceDir:"",//获取机上静态资源目录
        // stayTime:5000, //开屏广告停留时间（废弃）
        advSrc:'../images/tmp/adv.png', //开屏广告图
        advHref: 'javascript:void(0)', //开屏广告点击外链地址
        countDown: 5, //开屏广告停留时间（秒）
        dataToken: "",
        eventLog:eventLog
      }
    },
		props: ['logoSrc'],
    mounted(){
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
          //飞机环境要先获取资源
          if(getCookie('opened') == null){
            _this.cacheAdData(utcTime);
          }
      }).catch(e => {
          console.log('获取token失败，错误信息:', e);
      });
    },
    methods:{
      showLayer(type,v,auto){    //执行toast弹出层
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
      cacheAdData(planeData) {
        var _this = this;
        var url = apiHost + '/app/dxj/cache/' + dataVersion + '/ad' + planeData;
        //请求本地缓存数据
        axios.get(url).then((result) => {
          var data = result.data.data;
          if(data==undefined){
            console.log("数据类型转换");
            data = JSON.parse(data);
          }
          var index = Math.floor(Math.random()*data.length);
          data = data[index];
          //data.image = "";
          //data.planeImage = '/cache/image/movie/26/20180926111633_827.jpg';
          if((data.image != undefined && data.image != "")||(data.planeImage != undefined && data.planeImage != ""))
          {
            _this.isOpen = true;
            // _this.advSrc = apiHost + data.image.replace(/cache/g, 'app/dxj/cache');
            _this.advSrc = data.planeImage == ''? apiHost + data.image.replace(/cache/g, 'app/dxj/cache'): apiHost + _this.dxjResourceDir + data.planeImage;
            _this.advSrc = data.image == ''? apiHost + _this.dxjResourceDir + data.planeImage: apiHost + data.image.replace(/cache/g, 'app/dxj/cache');
            
            if(data.url != undefined && data.url != "")
            {
              _this.advHref = data.url;
            }
            var exdate = new Date();
            setCookie('opened',true,20,'MM');
          }
          _this.countDown = data.countDown?data.countDown:_this.countDown;
          
          let timer = setInterval(() => {
            if (_this.countDown>1) {
                _this.countDown--;
            }else{
              _this.isOpen = false;
              clearInterval(timer);
              timer = null;
            }
          }, 1000)

          eventLog({eventId:'home_starup_load'}) //开屏页广告展示 发送埋点

        }).catch((err) => {
            console.log(err);
            // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
            //获取接口数据
            _this.$nextTick(()=>{
                _this.getHomeDataAxios(_this.dataToken);
            });

        });
        
      },
      //获取开屏广告数据
      getHomeDataAxios:function (token){
          var _this = this;
          let apiUrl = dataHost +'/v1/screen/ad?' + querystring.stringify({
              param: JSON.stringify({
                  "version":NATIVEPARAM.version,
                  "platform":4,
                  "environment":'plan',
                  "width": 480,
                  "height": 700
              })
          });
          _this.$http.get(apiUrl, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "token": token,
                "cache-control": "no-cache"
            },
            _timeout:15000,
            onTimeout: (request) => {
              
            }
          }).then((res) => {
              if (res.status === 200) {
                  let data = res.data.data;
                  if((data.image != undefined && data.image != "")||(data.planeImage != undefined && data.planeImage != ""))
                  {
                    _this.isOpen = true;
                    // _this.advSrc = data.image;
                    _this.advSrc = data.planeImage == ''? '/app/dxj' + data.image: '/app/dxj' + data.planeImage;
                    _this.advSrc = data.image == ''? '/app/dxj' + data.planeImage: '/app/dxj' + data.image;
            
                    if(data.url != undefined && data.url != "")
                    {
                      _this.advHref = data.url;
                    }
                    var exdate = new Date();
                    setCookie('opened',true,20,'MM');
                  }
                  _this.countDown = data.countDown?data.countDown:_this.countDown;
                  
                  let timer = setInterval(() => {
                    if (_this.countDown>1) {
                        _this.countDown--;
                    }else{
                      _this.isOpen = false;
                      clearInterval(timer);
                      timer = null;
                    }
                  }, 1000)

                  eventLog({eventId:'home_starup_load'}) //开屏页广告展示 发送埋点
                  
              }else{
                  _this.showLayer("showMsg", res.msg);
              }
          },(err) => {
              _this.showLayer("show", true);
              console.log(err);
          })
      },
      skip:function (){
        this.isOpen = false;
      },
      
      
    },
    
	}
</script>

<style lang="sass" scoped>
.entry-adv-box{
    background: #fff;
    position: fixed;
      width: 100%;
      height:100%;
      z-index:10001;
      text-align:center;
      top: 0;
      left: 0;
    a{
      display: block;
      img{
        width: 100%;
      }
    }
    em{
      background-color:rgba(0,0,0,.5);
      position: absolute;
      top:.3rem;
      right:.2rem;
      border-radius:.3rem;
      width:.9rem;
      height:.4rem;
      font-size:.24rem;
      line-height:.4rem;
      color:#fff;
    }
    span{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      position: fixed;
      width: 100%;
      height:2.05rem;
      z-index: 10002;
      bottom: 0;
      left: 0;
      img{
        width: 1.3rem;
        height:1.61rem;
      }
    }
	
}
</style>