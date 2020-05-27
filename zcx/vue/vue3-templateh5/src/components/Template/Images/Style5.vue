<template>
  <div class="box">
    <ToolButton v-if="fromPage" :templateType="templateType" :templateIndex="templateIndex" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></ToolButton>
    <el-carousel height="3.2rem" arrow="never">
      <el-carousel-item v-for="(item, index) in TempData.list" :key="index">
        <el-image :src="item.imageUrl || ''">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="sass" scoped>
.box
  position: relative
  padding: 20px 0 20px 44px
  border-radius: 8px
  overflow: hidden
  border: 1px solid #f7f7f7
  &:hover
    border: 1px dashed #409EFF
    .tool
      visibility: visible
  .el-carousel
    width: 660px
    height: 320px
    border-radius: 8px
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
        font-size: 14px
        color: #C0C4CC
        vertical-align: middle
    .el-carousel__item:nth-child(2n)
      background-color: #99a9bf;
    .el-carousel__item:nth-child(2n+1)
      background-color: #d3dce6;
</style>

<script>
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


