<template>
  <el-form ref="form" v-model="TempData" label-position="right"  :label-width="formLabelWidth">
    <div v-if="(TempData.cssType == 0 || TempData.cssType == 1) && TempData.list[0]">
      <el-form-item label="公告内容">
        <el-input type="textarea" v-model="TempData.list[0].title" rows="5" placeholder="请输入公告内容"></el-input>
      </el-form-item>
      <el-form-item class="card-item" label="跳转链接">
        <el-input v-model="TempData.list[0].url"></el-input>
      </el-form-item>
    </div>
    <div v-else-if="TempData.cssType == 2">
      <vuedraggable v-if="TempData.list" class="wrapper" v-model="TempData.list">
        <transition-group>
          <el-card v-for="(item,index) in TempData.list || []" :value="index" :key="index" class="box-info">
            <div class="tool">
              <el-button-group>
                <el-button size="mini" type="danger" icon="el-icon-close" @click="noticeDelete(index)"></el-button>
              </el-button-group>
            </div>
            <el-form-item label="公告内容">
              <el-input type="textarea" v-model="TempData.list[index].title" rows="5" placeholder="请输入公告内容"></el-input>
            </el-form-item>
            <el-form-item class="card-item" label="跳转链接">
              <el-input v-model="TempData.list[index].url"></el-input>
            </el-form-item>
          </el-card>
        </transition-group>
      </vuedraggable>
      <el-card class="notice-add" shadow="never" @click.native="noticeAdd">
        <a>
          <i class="el-icon-circle-plus-outline"></i>
          {{TempData.describe}}
        </a>
      </el-card>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitTemplate">保存</el-button>
      <el-button @click="clearTemplate">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="sass" scoped>
  .box-info
    position: relative
    margin: 40px 0
    &:hover
      cursor: pointer
      border-color: #f56c6c
      .tool
        visibility: visible
    .tool
      position: absolute
      z-index: 99
      top: -1px
      right: -1px
      visibility: hidden
  .notice-add
    cursor: pointer
    margin-bottom: 40px
    text-align: center
    color: #409EFF
    line-height: 60px
    span
      display: block
      color: #C0C4CC
</style>

<script>
import store from '@/store'
import vuedraggable from 'vuedraggable'
import TemplateConfig from "@/views/pages/TemplateConfig";

export default {
  name: "TemplateNotice",
  props: {
    index: {
      type: Number
    },
    TemplateData: {
      type: Array
    },
    TempData: {
      type: Object
    },
    TemplateType: {
      type: String
    },
    TemplateStyle: {
      type: Number
    },
    templateIndex: {
      type: Number
    }
  },
  data() {
    return {
      tempData: {
        list: []
      },
      formLabelWidth: '1.4rem'
    };
  },
  mounted() {
    // this.$emit('changeTemplate', {"type": "Notice", "style": "style"})
    let tempData = []
    if(this.templateIndex != null)
    {
      tempData = this.TempData
    }
    else{
      let tempData = TemplateConfig["Notice"].style
      // tempData.templateStyle = "style"
      tempData.list = []
      tempData["list"].push(Object.assign({},store.state.template))
      this.tempData = tempData
      this.$nextTick(function(){
      this.$emit('TempDataUpdate', tempData)
      })
    }
  },
  methods: {
    noticeAdd() {
      if(this.templateIndex==null){
        let tempData = this.tempData
        tempData.cssType = this.TempData.cssType
        tempData["list"].push(Object.assign({},TemplateConfig.Notice.template))
        this.$emit('TempDataUpdate', tempData)
      }
      else
      {
        let tempData = this.TempData
        tempData["list"].push(Object.assign({},TemplateConfig.Notice.template))
        this.$emit('TempDataUpdate', tempData)
      }
    },
    noticeDelete(index) {
      let tempData = this.TempData
      tempData["list"].splice(index, 1)
      this.$emit('TempDataUpdate', tempData)
    },
    submitTemplate() {
      this.$emit('submitTemplate', this.templateIndex)
    },
    clearTemplate() {
      this.$emit('clearTemplate')
    },
    tempDataClear() {
      this.tempData = {
        list: []
      }
    }
  },
  watch: {
    
  },
  components: {
    vuedraggable
  }
};
</script>