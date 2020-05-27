<template>
  <div class="box">
    <ToolButton v-if="fromPage" :index="index" :templateType="templateType" :templateIndex="templateIndex" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></ToolButton>
    <div class="notice">
      <div class="p">
        <img :src="gogngao_icon" />
        <Marquee v-if="(TempData.cssType == 0 || TempData.cssType == 1) && TempData.list[0]" :fromPage="fromPage" :index="listIndex" :TempData="TempData" :item="TempData.list[0]" :templateIndex="templateIndex"></Marquee>
        <el-carousel v-else-if="TempData.cssType == 2" height=".6rem" direction="vertical" indicator-position="none" :autoplay="true">
          <el-carousel-item v-for="(item, index) in TempData.list" :key="index">
            {{item.title}}
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.box
  position: relative
  padding: 20px 0 20px 44px
  border-radius: 8px
  overflow: hidden
  border: 1px solid #f7f7f7
  min-height: 46px
  &:hover
    border: 1px dashed #409EFF
    .tool
      visibility: visible
  .notice
    width: 660px
    height: 60px
    background-color: #ffffff
    .p
      margin-left: 10px
      height: 60px
      word-break: break-all
      border-radius: 8px
      overflow: hidden
      font-size: 28px
      color: #666666
      line-height: 60px
      img
        width: 120px
        float: left
        margin-top: 10px
        margin-right: 20px
      span
        display: block
        width: 480px
        height: 80px
        overflow: hidden
        font-size: 28px
        color: #666666
        line-height: 60px
        text-overflow: ellipsis
        white-space: nowrap
      .el-carousel
        width: 510px
        float: left
</style>

<script>
import ToolButton from './../ToolButton'
import Marquee from './Marquee'
import gogngao_icon from '@/assets/images/gogngao_icon.png'

export default {
  name: "TemplateTitle-Style",
  props: {
    fromPage: {
      type: String
    },
    index: {
      type: Number
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
      gogngao_icon: "",
      listIndex: null
    };
  },
  mounted() {
    this.gogngao_icon = gogngao_icon
    this.listIndex = this.index
  },
  methods: {
    changeTemplate() {
      this.$emit('changeTemplate', this.templateIndex)
    },
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
    ToolButton,
    Marquee
  }
};
</script>


