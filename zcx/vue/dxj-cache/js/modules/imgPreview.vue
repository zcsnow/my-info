<template>
    <div class="img-preview-box" >
      <div class="img-box" @click="closeImgDes()"><img id="pinch_zoom" :src="previewData.image" /></div>
      <div class="btn-mask" v-if="isBtnMask">
         <span class="desc-btn" @click="showImgDes()">介绍</span>
         <span class="close-btn" @click="closePreview()">关闭</span>
      </div>
     
      <div class="img-desc" v-if="descIsShow">
        <div class="img-desc-content">
          <h3 >{{previewData.title}}</h3>
          <span>{{previewData.authorName}} {{previewData.createTime}}</span>
          <p v-html="previewData.content"></p>
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
  import {dataHost,apiHost,eventLog} from 'nativeA';
  import Hammer from '../libs/hammer.min.js';
	export default {
    data(){
      return{
        dataHost: dataHost,
        apiHost: apiHost,
        isBtnMask:true,
        descIsShow: false,
        imgElement:'',
        imgOffx:0, 
        imgOffy: 0,
        imgScale:1,
        eventLog:eventLog
      }
    },
		props: ['previewData'],
    mounted(){
      var _this = this;
      console.log(_this.previewData.title)
      eventLog({eventId:'artWork_preview_img',contentType:'艺术品作品预览',contentTitle:_this.previewData.title})
      //图片移动和缩放
      _this.imgElement = document.getElementById("pinch_zoom");
      var currScale;
      var mc = new Hammer.Manager(_this.imgElement);
      mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 })); 
      mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan')]);
      mc.on('panstart',function(ev){});
      mc.on("panmove", function(ev){
          if(!ev.isFinal) {
              var currOffx = _this.imgOffx + ev.deltaX;
              var currOffy = _this.imgOffy + ev.deltaY;
              _this.imgElement.style.webkitTransform = _this.formatTransform(currOffx, currOffy, _this.imgScale);
          } 
      });
      mc.on('panend',function(ev){
          _this.imgOffx += ev.deltaX
          _this.imgOffy += ev.deltaY;
      });
      
      mc.on("pinchstart pinchmove", function(ev){
          if(typeof ev.scale != 'undefined') {
              currScale = ev.scale - 1 + _this.imgScale;
              console.log('currScale ' + currScale)
              if(currScale<0.5){
                  currScale = 0.5;
              }
              _this.imgElement.style.webkitTransform = _this.formatTransform(_this.imgOffx, _this.imgOffy, currScale);
              //_this.imgElement.style.webkitTransformOrigin = _this.imgOffx + ' ' + _this.imgOffy + ' '  +' 0';
          }
      });

      mc.on('pinchend',function(ev){
          _this.imgScale = currScale;
      });


    },
    methods:{
      //关闭图片预览弹层
      closePreview(){
        var _this = this;
        //通知父组件关闭图片预览弹层
        this.$emit('closeimgpreview');

        //恢复初始图片的位置和大小
        _this.imgOffx = 0; 
        _this.imgOffy = 0;
        _this.imgElement.style.webkitTransform = 'translate3d(0px, 0px, 0px) scale(1)';
        
      },
      //显示图片介绍
      showImgDes(){
        this.descIsShow = true;
        this.isBtnMask = false;
      },
      //关闭图片介绍
      closeImgDes(){
        if(this.descIsShow == true){
          this.descIsShow = false;
          this.isBtnMask = true;
        }
      },
      //改变图片位置和大小
      formatTransform(offx, offy, scale) {
          var translate = 'translate3d(' + (offx + 'px,') + (offy + 'px,') + '0)',
              myScale = 'scale(' + scale + ')';
          var result = translate + ' ' + myScale;
          return result;
      }
      
    },
    
	}
</script>

<style lang="sass" scoped>
.img-preview-box{
    background-image: linear-gradient(-180deg, #212122 0%, #DEDDDE 100%);
    position: fixed;
    width: 100%;
    height:100%;
    z-index:10001;
    text-align:center;
    top: 0;
    left: 0;
    .img-box{
        position:absolute;
        width: 100%;
        height:100%;
        z-index:10002;
        text-align:center;
        top: 0;
        left: 0;
        bottom:0;
        display: flex;
        align-items: center;
        img{
          display: block;
          width: 100%;
          margin:0 auto;
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
    .btn-mask{
      position: fixed;
      width: 100%;
      height:2.28rem;
      z-index: 10003;
      bottom: 0;
      left: 0;
      background: #C4C3C4;
      span{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.88rem;
        height: 0.88rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 0.88rem 0.88rem;
        z-index: 9999;
        color:#fff;
        padding-top:2rem;
        &.desc-btn{
          transform:translate(-200%,-56%);
          background-image: url('../../images/yishupin_jieshao@2x.png');
          background-image: -webkit-image-set(
            url('../../images/yishupin_jieshao@2x.png') 2x,
            url('../../images/yishupin_jieshao@3x.png') 3x);
        }
        &.close-btn{
          transform:translate(100%,-56%);
          background-image: url('../../images/yishupin_guanbi@2x.png');
          background-image: -webkit-image-set(
            url('../../images/yishupin_guanbi@2x.png') 2x,
            url('../../images/yishupin_guanbi@3x.png') 3x);
        }
      }
      
    }
    .img-desc{
      position: fixed;
      width: 100%;
      z-index: 10004;
      bottom: 0;
      left: 0;
      background: rgba(196,196,196,0.9);
      color: #fff;
      text-align:left;
      padding:0.68rem 0.44rem;
      box-sizing:border-box;
      .img-desc-content{
        width: 100%;
        height:3.17rem;
        overflow-y:auto;
        h3{
          font-size: 0.32rem;
          line-height: 0.36rem;
        }
        span{
          display: block;
          font-size: 0.32rem;
          line-height: 0.36rem;
          margin-top: 0.34rem;
        }
        p{
          font-size: 0.28rem;
          line-height: 0.36rem;
          margin-top: 0.48rem;
        }
      }
      
    }
    
	
}
</style>