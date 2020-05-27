<template>
  <el-form ref="form" v-model="TempData" label-position="top">
    <div v-for="(item,index) in TempData.list || []" :value="index" :key="index">
      <el-form-item label="标题">
        <el-input v-model="TempData.list[index].title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item class="card-item" label="跳转链接">
        <el-input v-model="TempData.list[index].url"></el-input>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitTemplate">保存</el-button>
      <!-- <el-button @click="clearTemplate">取消</el-button> -->
    </el-form-item>
  </el-form>
</template>

<style lang="sass" scoped>
  
</style>

<script>
import store from '@/store'
import TemplateConfig from "@/views/pages/TemplateConfig";

export default {
  name: "TemplateImages",
  props: {
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
    this.$emit('changeTemplate', {"type": "Title", "style": "style"})
    let tempData = []
    if(this.templateIndex != null)
    {
      tempData = this.TempData
    }
    else{
      tempData = this.tempData
      tempData["list"].push(Object.assign({},store.state.template))
    }
    this.$nextTick(function(){
      this.$emit('TempDataUpdate', tempData)
    })
  },
  methods: {
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

  }
};
</script>