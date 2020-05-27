<template>
  <div class="box">
    <ToolButton v-if="fromPage" :templateType="templateType" :templateIndex="templateIndex" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></ToolButton>
    <div v-for="(item, index) in TempData.list" :key="index">
      <div class="title">
        {{item.title}}
        <span v-if="item.url">更多 <i class="el-icon-arrow-right"></i></span>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.box
  position: relative
  padding: 0 0 0 44px
  border-radius: 8px
  overflow: hidden
  border: 1px solid #f7f7f7
  height: 72px
  .title
    width: 660px
    line-height: 72px
    font-size: 36px
    color: #181818
    span
      float: right
      font-size: 28px
      color: #666666
  &:hover
    border: 1px dashed #409EFF
    .tool
      visibility: visible
</style>

<script>
import ToolButton from './../ToolButton'

export default {
  name: "TemplateTitle-Style",
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
    ToolButton
  }
};
</script>


