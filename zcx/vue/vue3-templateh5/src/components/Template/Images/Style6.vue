<template>
  <div class="box">
    <ToolButton v-if="fromPage" :templateType="templateType" :templateIndex="templateIndex" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></ToolButton>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in TempData.list" :key="index">
          <img :src="item.imageUrl || ''">
        </div>
      </div>
    </div>
    <!-- <el-carousel height="155px" type="card" arrow="never">
      <el-carousel-item v-for="(item, index) in TempData.list" :key="index">
        <el-image fit="fill" :src="item.imageUrl || ''">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel> -->
    
  </div>
</template>

<style lang="sass" scoped>
.box
  position: relative
  padding: 20px 20px 20px 20px
  border-radius: 8px
  overflow: hidden
  height: 310px
  border: 1px solid #f7f7f7
  &:hover
    border: 1px dashed #409EFF
    .tool
      visibility: visible

  .swiper-container
    width: 100%
    height: 100%
    .swiper-slide
      height: 310px
      text-align: center
      font-size: 36px
      background: #fff
      display: -webkit-box
      display: -ms-flexbox
      display: -webkit-flex
      display: flex
      -webkit-box-pack: center
      -ms-flex-pack: center
      -webkit-justify-content: center
      justify-content: center
      -webkit-box-align: center
      -ms-flex-align: center
      -webkit-align-items: center
      align-items: center
      transition: 300ms
      img
        width: 230px
        height: 310px
    .swiper-slide:not(.swiper-slide-active)
      transform: scale(0.8)

  .el-carousel
    width: 640px
    .el-carousel__item--card
      height: 310px
      width: 230px
    .el-carousel__item:nth-child(2n)
      margin: 0 40px
    .el-carousel__item:nth-child(2n+1)
      margin: 0 40px
    .el-image
      display: block
      width: 100%
      height: 100%
      .el-image__error
        width: 100%
        height: 100%
      .image-slot
        display: flex;
        width: 100%
        height: 100%
        background: #F5F7FA;
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        -webkit-box-pack: center
        -ms-flex-pack: center
        justify-content: center
        -webkit-box-align: center
        -ms-flex-align: center
        align-items: center
        font-size: 28px
        color: #C0C4CC
        vertical-align: middle
    .el-carousel__item:nth-child(2n)
      background-color: #99a9bf;
    .el-carousel__item:nth-child(2n+1)
      background-color: #d3dce6;
</style>

<script>

import Swiper from 'swiper'
import ToolButton from './../ToolButton'

export default {
  name: "TemplateImages-Style5",
  props: {
    fromPage: {
      type: String
    },
    templateType: {
      type: String
    },
    TempData: {
      type: Object
    },
    templateIndex: {
      type: Number
    },
    templateTypeEditState: {
      type: Boolean
    }
  },
  data() {
    return {
      
    };
  },
  mounted() {
    
    new Swiper('.swiper-container', {
      loop : true,
      slidesPerView: 3,
      spaceBetween: 10,
	    centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  },
  updated() {
    new Swiper('.swiper-container', {
      loop : true,
      slidesPerView: 3,
      spaceBetween: 10,
	    centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  },
  methods: {
    saveTemplate() {
      this.$emit('saveTemplate', this.templateIndex)
    },
    editTemplate() {
      this.$emit('editTemplate', this.templateIndex)
    },
    deleteTemplate() {
      this.$emit('deleteTemplate', this.templateIndex)
    }
  },
  components: {
    ToolButton
  }
};
</script>


