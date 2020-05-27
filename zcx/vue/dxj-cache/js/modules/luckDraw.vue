
<template lang="pug">
  div(v-if="isOpen" class='box')
    div(class='box_bg')
    div(class='luckDraw')
      div(v-if='type==1' class='box_1')
        p 坐东航飞机，就能领红包！
        a(@click="getDraw(2)")
      div(v-if='type==2' class='box_2')
        h3 恭喜您
        p 获得{{prize.name}}
        img(:src="('/app/dxj'+prize.image)" class='photo')
        a(@click='goto(5)') 领取奖品
        span 关闭将视为放弃领奖
      div(v-if='type==3' class='box_3')
        h3 没抽中
        p 坐东航飞机，就能领红包！
        span(@click='goto(4)') 查看抽奖规则
      div(v-if='type==4' class='box_4')
        h3 活动规则
          span(@click="goto(tempType)")
        p(v-html='activity.description')
      div(v-if='type==5' class='box_5')
        h3 领取方法
        input(type='text' placeholder='请输入手机号' oninput='if(value.length>11)value=value.slice(0,11)' v-model="phone")
        p 1、留下您的手机号（领奖唯一凭证）<br>2、下飞机后使用上面手机号登录/注册“东行记”APP，进入“机上红包活动”完成领取
        a(@click='submit()') 提交
        span(@click='goto(4)') 查看抽奖规则
      div(class='icon_close' @click='close()')
      pop-layer(v-if='isShow || show_msg' :is-show='isShow' :show_msg='show_msg')
</template>

<style lang="sass" scoped>
  .box {
    width:100vw;
    height:100vh;
    position: fixed;
    z-index: 1000;
    top: 0;
    max-width: 750px;
    overflow: hidden;
  }
  .box_bg{
    width:100vw;
    height:100vh;
    display: block;
    background: #000;
    opacity: .7;
    position: absolute;
  }
  .luckDraw{
    position: relative;
    width: 6.1rem;
    height: 7.8rem;
    margin-top: 2.77rem;
    margin-left: .7rem;
    background: #D85940;
    border-radius: .1rem;
    position: absolute;
    color: #FFE7BB;
    .box_1{
      width: 6.1rem;
      height: 7.8rem;
      background-repeat: no-repeat;
      background-image: url('../../images/luckDrawBg1@2x.png');
      background-image: -webkit-image-set(
        url('../../images/luckDrawBg1@2x.png') 2x,
        url('../../images/luckDrawBg1@3x.png') 3x);
      background-size: 6.18rem 5.37rem;
      background-color: #cd533d;
      /*background-position: top;*/
      p{
        text-align: center;
        padding-top: 2.7rem;
        font-size: .4rem;
        height: .56rem;
        line-height: .56rem;
      }
      a{
        display: inline-block;
        width: 1.92rem;
        height: 1.92rem;
        background-repeat: no-repeat;
        background-image: url('../../images/open@2x.png');
        background-image: -webkit-image-set(
          url('../../images/open@2x.png') 2x,
          url('../../images/open@3x.png') 3x);
        background-size: 1.92rem 1.92rem;
        margin-top: 1.07rem;
        margin-left: 2.09rem;
      }
    }
    .box_2{
      color: #FFE7BB;
      text-align: center;
      h3{
        font-size: .4rem;
        line-height: .56rem;
        font-weight: 500;
        margin-top: .55rem;
      }
      img.photo{
        width: 2.98rem;
        height: 2.98rem;
        margin-top: .67rem;
        background-repeat: no-repeat;
        background-image: url('../../images/Bitmap@2x.png');
        background-image: -webkit-image-set(
          url('../../images/Bitmap@2x.png') 2x,
          url('../../images/Bitmap@3x.png') 3x);
        background-size: 1.1rem 1.1rem;
        background-position: center;
        background-color: #F5F5F5;
      }
      p{
        font-size: .28rem;
        line-height: .4rem;
        margin-top: .15rem;
      }
      a{
        display: inline-block;
        width: 4.7rem;
        height: .88rem;
        line-height: .88rem;
        border-radius: 100px;
        margin-top: .37rem;
        background-color: #FBDAA2;
        color: #C76300;
      }
      span{
        display: block;
        font-size: .24rem;
        line-height: .33rem;
        margin-top: .3rem;
      }
    }
    .box_3{
      color: #FFE7BB;
      text-align: center;
      h3{
        font-size: .48rem;
        line-height: .67rem;
        font-weight: 500;
        margin-top: 2.63rem;
      }
      p{
        font-size: .36rem;
        line-height: .5rem;
        margin-top: .07rem;
      }
      span{
        display: block;
        font-size: .28rem;
        line-height: .4rem;
        margin-top: 3.01rem;
      }
    }
    .box_4{
      color: #FFE7BB;
      h3{
        position: relative;
        font-size: .4rem;
        line-height: .5.6rem;
        font-weight: 500;
        text-align: center;
        margin-top: .41rem;
        span{
          position: absolute;
          display: inline-block;
          width: .17rem;
          height: .32rem;
          background-repeat: no-repeat;
          background-image: url('../../images/icon_back_luckDraw@2x.png');
          background-image: -webkit-image-set(
            url('../../images/icon_back_luckDraw@2x.png') 2x,
            url('../../images/icon_back_luckDraw@3x.png') 3x);
          background-size: .17rem .32rem;
          top: .1rem;
          left: .4rem;
        }
      }
      p{
        width: 5.4rem;
        height: 6.4rem;
        overflow-x: auto;
        overflow-y:scroll;
        font-size: .28rem;
        line-height: .4rem;
        margin-top: .21rem;
        margin-left: .38rem;
        word-break: break-all;
      }
    }
    .box_5{
      color: #FFE7BB;
      h3{
        text-align: center;
        font-size: .4rem;
        line-height: .56rem;
        font-weight: 500;
        margin-top: .55rem;
      }
      input{
        color: #1A1919;
        font-size: .28rem;
        line-height: .4rem;
        width: 4.66rem;
        height: .78rem;
        padding: 0 .2rem;
        margin-top: .73rem;
        margin-left: .52rem;
        border-radius: 10px;
      }
      p{
        width: 5.4rem;
        height: 2.6rem;
        font-size: .28rem;
        line-height: .4rem;
        margin-top: .25rem;
        margin-left: .38rem;
      }
      a{
        display: inline-block;
        width: 4.7rem;
        height: .88rem;
        line-height: .88rem;
        text-align: center;
        border-radius: 100px;
        margin-top: .37rem;
        margin-left: .7rem;
        background-color: #FBDAA2;
        color: #C76300;
      }
      span{
        display: block;
        font-size: .24rem;
        line-height: .33rem;
        text-align: center;
        margin-top: .3rem;
      }
    }
  }
  .icon_close{
    position: absolute;
    display: inline-block;
    width: .8rem;
    height: .8rem;
    background-repeat: no-repeat;
    background-image: url('../../images/icon_guanbi@2x.png');
    background-image: -webkit-image-set(
      url('../../images/icon_guanbi@2x.png') 2x,
      url('../../images/icon_guanbi@3x.png') 3x);
    background-size: .8rem .8rem;
    bottom: -1.2rem;
    margin-left: 2.58rem;
  }

  @media screen and (orientation: landscape) and (min-width: 640px) {
    .luckDraw {
      transform:scale(.5,.5);
      margin-top: 0;
    }
  }
</style>

<script type="text/javascript">
  var NATIVEPARAM = getN('getBase');

  const querystring = require('querystring');
  import {getN,isNative,dataHost,getHash,encrypt,decrypt} from 'nativeA';
  import popLayer from 'pop-layer';
  import {setCookie, getCookie} from '../modules/cookie.js';
  import formatStr from '../modules/dataFormat.js';

  export default {
    data () {
      return {
        dataHost: dataHost,
        isShow: false,
        show_msg: "",
        isOpen: false,
        type: 1,
        dataToken: "",
        activity: {},
        prize: {},
        tempType: null,
        phone: undefined
      }
    },
    mounted(){
      var _this = this;

      // 外部调用dataToken&dxjApi
      getHash().then(res => {
          _this.dataToken = res.token;
          _this.getActivity(res.token);
      }).catch(e => {
          console.log('获取token失败，错误信息:', e);
      });
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
              if (_this.timeId) { clearInterval(_this.timeId); }
              _this.timeId = setTimeout(() => {
                  _this.isShow = false;
                  _this.show_msg = "";
              }, 2000);
          }
      },
      getActivity: function (token) {
        var _this = this;
        var url = dataHost + `/v1/activity/exists`;
        this.$http.post(url, querystring.stringify({
          param: encrypt(JSON.stringify({
            "version":NATIVEPARAM.version,
            "platform":4,
            "environment":'plan',
            "type": 1,
            "time_stamp":  Date.parse(new Date()) / 1000
          }),"dongxingji#2018",0)
        }), {
          headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "token": token
          }
        }).then((message) => {
          var body = JSON.parse(decrypt(message.body,"dongxingji#2018"));
          var starts = body.status,
            msg = body.msg;
          if (starts == 200) {
            var data = body.data;
            let expireDays = 1000 * 60 * 60 ;
            
            if(data.exists == 1)
            {
              var activity = {};
              var dateTime = formatStr(new Date(),'YYYY-MM-DD')
              // 判断是否有历史红包活动记录
              if(getCookie('activity') == null)
              {
                activity.id = data.id;
                activity.name = data.name;
                activity.description = data.description;
                activity['activity_' + data.id] = {
                  'win': 0,
                  'dateTime': dateTime
                }
                setCookie('activity',JSON.stringify(activity),60);
                this.isOpen = true;
              }
              else
              {
                // 有记录的情况下更新红包接口信息
                activity = JSON.parse(getCookie('activity'));
                activity.id = data.id;
                activity.name = data.name;
                activity.description = data.description;
                if(activity['activity_' + data.id] != null){
                  var _Temp = activity['activity_' + data.id];
                  if(_Temp.win == 0 && _Temp.dateTime != dateTime)
                  {
                    activity['activity_' + data.id]['dateTime'] = dateTime;
                    this.isOpen = true;
                  }
                }
                setCookie('activity',JSON.stringify(activity),60);
              }
              this.activity = activity;
            }
          }
          else
          {
            this.showLayer("showMsg", msg);
          }
        });
      },
      getDraw: function () {
        var _this = this;
        var url = dataHost + `/v1/activity/draw`;
        this.$http.post(url, querystring.stringify({
          param: encrypt(JSON.stringify({
            "version":NATIVEPARAM.version,
            "platform":4,
            "environment":'plan',
            "type": 1,
            "id": this.activity.id,
            "time_stamp":  Date.parse(new Date()) / 1000
          }),"dongxingji#2018",0)
        }), {
          headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "token": this.dataToken
          }
        }).then((message) => {
          var body = JSON.parse(decrypt(message.body,"dongxingji#2018"));
          var starts = body.status,
            msg = body.msg;
          if (starts == 200) {
            var data = body.data;
            
            if(data.win == 1)
            {
              _this.prize = data.prize;

              this.goto(2);
            }
            else
            {
              this.goto(3);
              // this.showLayer("showMsg", '未中奖');
            }
            
            
          }
          else
          {
            this.showLayer("showMsg", msg);
          }
        });
      },
      getReceive: function (phone) {
        var _this = this;
        var url = dataHost + `/v1/activity/receive`;
        this.$http.post(url, querystring.stringify({
          param: encrypt(JSON.stringify({
            "version":NATIVEPARAM.version,
            "platform":4,
            "environment":'plan',
            "type": 1,
            "code": this.prize.code,
            "phone": phone,
            "time_stamp":  Date.parse(new Date()) / 1000
          }),"dongxingji#2018",0)
        }), {
          headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "token": this.dataToken
          }
        }).then((message) => {
          var body = JSON.parse(decrypt(message.body,"dongxingji#2018"));
          var starts = body.status,
            msg = body.msg;
          if (starts == 200) {

            // 领奖成功后更新Cookies
            var activity = JSON.parse(getCookie('activity'));
            activity['activity_' + this.activity.id].win = 1;
            setCookie('activity',JSON.stringify(activity),60);

            this.showLayer("showMsg", '领奖成功');
            setTimeout(() => {
              this.isOpen = false;
            }, 2000);
          }
          else
          {
            this.showLayer("showMsg", msg);
          }
        });
      },
      goto: function (type) {
        // 1 默认
        // 2 中奖
        // 3 未中奖
        // 4 活动规则
        // 5 兑奖
        this.type = type;
        if(type != 4)
        {
          this.tempType = type
        }
      },
      close: function () {
        this.isOpen = false;
      },
      submit: function () {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (this.phone=='' || !myreg.test(this.phone)) {
          this.showLayer("showMsg", '手机号格式不正确');
          return false;
        }
        this.getReceive(this.phone);
      }
    },
    components: {
      popLayer
    }
  }
</script>