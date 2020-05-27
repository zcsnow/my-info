<template>
  <div class="tool">
    <div class="type">
      <el-tag>{{templateTypeName}}</el-tag>
      </div>
    <el-button-group>
      <el-button v-if="templateIndex!=undefined" size="mini" type="primary" icon="el-icon-edit" @click.native="editTemplate">修改</el-button>
      <el-button v-if="templateIndex==undefined" size="mini" type="primary" icon="el-icon-check" @click.native="saveTemplate">保存</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete" @click.native="deleteTemplate">删除</el-button>
    </el-button-group>
  </div>
</template>

<style lang="sass" scoped>
  .tool
    position: absolute
    width: 100%
    z-index: 99
    top: 0
    left: 0
    visibility: hidden
    .type
      float: left
    .el-button-group
      float: right
</style>

<script>
import TemplateConfig from "@/views/pages/TemplateConfig";

export default {
  name: "ToolButton",
  props: {
    templateType: {
      type: String
    },
    templateIndex: {
      type: Number
    }
  },
  data() {
    return {
      templateTypeName: ""
    };
  },
  mounted() {
    this.templateTypeName = TemplateConfig[this.templateType].name
  },
  methods: {
    saveTemplate() {
      console.log("save")
      this.$emit('saveTemplate', this.templateIndex)
    },
    editTemplate() {
      console.log("edit")
      this.$emit('editTemplate', this.templateIndex)
    },
    deleteTemplate() {
      console.log("del")
      this.$emit('deleteTemplate', this.templateIndex)
    }
  }
};
</script>


