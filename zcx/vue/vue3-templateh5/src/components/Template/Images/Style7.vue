<template>
  <div class="box">
    <ToolButton v-if="fromPage" :templateType="templateType" :templateIndex="templateIndex" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></ToolButton>
    <div>
      <el-image :class="(index+1)%3 == 1 || index == TempData.list.length-1?'noBottom':''" v-for="(item, index) in TempData.list" :key="index" :src="item.imageUrl || ''">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
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
  min-height: 430px
  &:hover
    border: 1px dashed #409EFF
    .tool
      visibility: visible
  .el-image
    display: block
    width: 320px
    height: 204px
    float: left
    border-radius: 8px
    overflow: hidden
    margin-bottom: 20px
    &:first-child
      height: 430px
      margin-right: 20px
    &:nth-child(3n+1)
      height: 430px
      margin-right: 20px
    &:nth-child(3n+2)
      margin-bottom: 22px
    &.noBottom
      margin-bottom: 0
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
import ToolButton from './../ToolButton'

export default {
  name: "TemplateImages-Style1",
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


