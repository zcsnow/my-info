<template>
  <div class="box">
    <ToolButton v-if="fromPage" :templateType="templateType" :templateIndex="templateIndex" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></ToolButton>
    <div class="Navigation">
      <ul>
        <li :class="(index+1>TempData.list.length-TempData.cssClass && TempData.list.length%TempData.cssClass==0) || (index+1>TempData.list.length-TempData.list.length%TempData.cssClass &&TempData.list.length%TempData.cssClass!=0)?'num' + TempData.cssClass + ' noBottom':'num' + TempData.cssClass" v-for="(item, index) in TempData.list" :key="index">
          <el-image v-if="TempData.cssType == 1" :src="item.imageUrl || ''">
            <div slot="placeholder" class="image-slot">
              加载中
            </div>
          </el-image>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.box
  position: relative
  padding: 20px 0 20px 44px
  overflow: hidden
  border: 1px solid #f7f7f7
  min-height: 46px
  &:hover
    border: 1px dashed #409EFF
    .tool
      visibility: visible
  .Navigation
    ul
      padding: 0
      margin: 0
      li
        list-style: none
        float: left
        width: 130px
        overflow: hidden
        margin: 0 34.6px 40px 5px
        text-align: center;
        &.num4
          &:nth-child(4n)
            margin-right: 0
        &.num6
          width: 100px
          margin: 0 10px 40px 0
          &:nth-child(6n)
            margin-right: 0
          span
            font-size: 24px
          .el-image
            width: 78px
            height: 78px
            margin-left: 10px
            border-radius: 13px
            border-radius: 13px
        &.noBottom
          margin-bottom: 0
        span
          display: block
          font-size: 32px
          height: 42px
          overflow: hidden
          color: #333333
  .el-image
    display: block
    width: 94px
    height: 94px
    border-radius: 20px
    border-radius: 20px
    margin-bottom: 16px
    margin-left: 20px
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
  name: "TemplateNavigation-Style",
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
    
  },
  updated() {
    
    
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


