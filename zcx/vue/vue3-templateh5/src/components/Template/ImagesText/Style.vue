<template>
  <div :class="TempData.cssType == 3? 'box type3': 'box'" v-if="TempData.cssType == 3">
    <ToolButton v-if="fromPage" :templateType="templateType" :templateIndex="templateIndex" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></ToolButton>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in TempData.list" :key="index">
          <div style="font-size: 0;">
            <el-image :src="item.imageUrl || ''">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </div>
          <div v-if="TempData.checkTitle && TempData.checkTitle.length > 0" class="imagetext-box">
            <div v-if="TempData.checkTitle.indexOf('title')>=0" :class="TempData.checkTitle.indexOf('subtitle')<0?'title margin-bottom-none':'title'">{{item.title}}</div>
            <span v-if="TempData.checkTitle.indexOf('subtitle')>=0">{{item.subtitle}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="box" v-else>
    <ToolButton v-if="fromPage" :templateType="templateType" :templateIndex="templateIndex" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></ToolButton>
    <div v-if="(TempData.cssType == 1 || TempData.cssType == 2) && (TempData.cssClass == 1 || TempData.cssClass == 2)" >
      <div v-for="(item, index) in TempData.list" :key="index" :class="TempData.cssType == 2? 'imagetext type2': 'imagetext'">
        <div v-if="((TempData.cssType == 1 || TempData.cssType == 2) && TempData.cssClass == 2) && TempData.checkTitle && TempData.checkTitle.length > 0" class="imagetext-box">
          <div v-if="TempData.checkTitle.indexOf('title')>=0" :class="TempData.checkTitle.indexOf('subtitle')<0?'title margin-bottom-none':'title'">{{item.title}}</div>
          <span v-if="TempData.checkTitle.indexOf('subtitle')>=0">{{item.subtitle}}</span>
        </div>
        <el-image v-if="(TempData.cssType == 1 || TempData.cssType == 2) && (TempData.cssClass == 1 || TempData.cssClass == 2)"  :src="item.imageUrl || ''">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        <div v-if="((TempData.cssType == 1 || TempData.cssType == 2) && TempData.cssClass == 1) && TempData.checkTitle && TempData.checkTitle.length > 0" class="imagetext-box">
          <div v-if="TempData.checkTitle.indexOf('title')>=0" :class="TempData.checkTitle.indexOf('subtitle')<0?'title margin-bottom-none':'title'">{{item.title}}</div>
          <span v-if="TempData.checkTitle.indexOf('subtitle')>=0">{{item.subtitle}}</span>
        </div>
      </div>
    </div>
    <div v-if="TempData.cssType == 1 && (TempData.cssClass == 3 || TempData.cssClass == 4)">
      <div v-for="(item, index) in TempData.list" :key="index" :class="TempData.cssClass == 4?'images_text right' :'images_text'">
        <div class="images" style="font-size: 0;">
          <el-image :src="item.imageUrl || ''">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="text" v-if="TempData.checkTitle && TempData.checkTitle.length > 0">
          <div v-if="TempData.checkTitle.indexOf('title')>=0" class="title">{{item.title}}</div>
          <span v-if="TempData.checkTitle.indexOf('subtitle')>=0">{{item.subtitle}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.swiper-container
  width: 660px
  height: 100%
  .swiper-slide
    border-radius: 8px
    width: 660px
    overflow: hidden
    img
      width: 660px
      height: 320px
      
.box
  position: relative
  padding: 20px 0 20px 44px
  border-radius: 8px
  overflow: hidden
  border: 1px solid #f7f7f7
  min-height: 160px
  &.type3
    padding-left: 0
  &:hover
    border: 1px dashed #409EFF
    .tool
      visibility: visible
  .imagetext
    width: 660px
    border-radius: 4px
    overflow: hidden
    margin-bottom: 10px
    &.type2
      width: 320px
      float: left
      margin-right: 0px
      .el-image
        height: 204px
    &:last-child
      margin-bottom: 0
  .imagetext-box
    background-color: #ffffff
    padding: 26px 28px
    .title
      height: 32px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      color: #333333
      font-width: 700
      font-size: 32px
      line-height: 32px
      margin-bottom: 16px
      &.margin-bottom-none
        margin-bottom: 0
    span
      display: block
      height: 28px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      font-size: 26px
      color: #666666
      line-height: 28px
  .images_text
    width: 660px
    overflow: hidden
    padding-bottom: 32px
    &.right
      .images
        .el-image
          float: right
          margin-right: 0
    &:last-child
      padding-bottom: 0
      border-bottom: 1px solid #E1E1E1
      .text
        border-bottom: 0
    .images
      .el-image
        float: left
        width: 240px
        height: 160px
        border-radius: 8px
        margin-right: 28px
    .text
      display: block
      width: 392px
      height: 192px
      border-bottom: 1px solid #E1E1E1
      overflow: hidden
      .title
        width: 100%
        height: 96px
        line-height: 48px
        font-size: 34px
        color: #333333
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        margin-bottom: 40px
      span
        font-size: 26px
        line-height: 26px
        color: #666666
  .el-image
    display: block
    height: 320px
    overflow: hidden
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
</style>

<script>
import Swiper from 'swiper'
import ToolButton from './../ToolButton'

export default {
  name: "TemplateImagesText-Style",
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
      slidesPerView: 'auto',
      spaceBetween: 10
    });
  },
  updated() {
    new Swiper('.swiper-container', {
      loop : true,
      slidesPerView: 'auto',
      spaceBetween: 10
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


