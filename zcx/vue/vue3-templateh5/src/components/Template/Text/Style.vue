<template>
  <div class="box">
    <ToolButton v-if="fromPage" :templateType="templateType" :templateIndex="templateIndex" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></ToolButton>
    <div v-for="(item, index) in TempData.list" :key="index">
      <div class="p" v-html="item.content && item.content.indexOf('\n')>-1?item.content.replace(/\n/g,'<br/>'):item.content"></div>
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
  .p
    width: 660px
    word-break: break-all
    font-size: 28px
    color: #666666
    line-height: 46px
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


