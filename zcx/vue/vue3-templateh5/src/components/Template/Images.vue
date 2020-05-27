<template>
  <el-form v-model="TempData" :label-width="formLabelWidth">
    <span v-if="TempData.list">添加图片</span>
    <vuedraggable class="wrapper" v-model="TempData.list">
      <transition-group>
        <el-card v-for="(item,index) in TempData.list || []" :value="index" :key="index" class="box-info" shadow="never">
          <div class="tool">
            <el-button-group>
              <el-button size="mini" type="danger" icon="el-icon-close" @click="imgDelete(index)"></el-button>
            </el-button-group>
          </div>
          <div class="imgUrl" @click="imgUrlUpdate(index)">
            <el-image :src="item.imageUrl" fit="fill"></el-image>
            <span>更改图片</span>
          </div>
          <div class="info">
            <el-form-item label="主标题">
              <el-input v-model="TempData.list[index].title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
              <el-input v-model="TempData.list[index].subtitle"></el-input>
            </el-form-item>
          </div>
          <el-form-item class="card-item" label="跳转链接">
            <el-input v-model="TempData.list[index].url"></el-input>
          </el-form-item>
        </el-card>
      </transition-group>
    </vuedraggable>
    <el-upload class="upload-images" drag action="#"
  :before-upload="beforeAvatarUpload" :on-change="handleAvatarSuccess" :show-file-list="false" :auto-upload="false" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将图片拖到此处，或<em>点击上传</em>
        <p>{{TempData.imgSize}}</p>
      </div>
    </el-upload>
    <!-- <el-card class="images-add" shadow="never" @click.native="imagesAdd">
      <a>
        <i class="el-icon-circle-plus-outline"></i>
        {{TempData.describe}}
      </a>
      <span>{{TempData.imgSize}}</span>
    </el-card> -->
    <span class="card-title">时间排期</span>
    <el-form-item label="开始时间">
      <el-date-picker v-model="beginTime" type="datetime" placeholder="选择日期时间" style="width: 100%;" @change="timeChange"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间" style="width: 100%;" @change="timeChange"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitTemplate">保存</el-button>
      <el-button @click="clearTemplate">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="sass" scoped>
  .card-title
    display: block
    margin-bottom: 40px
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
    .imgUrl
      position: relative
      cursor: pointer
      float: left
      width: 144px
      height: 144px
      text-align: center
      background: #D8D8D8
      background-image: linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.00) 32%)
      .el-image
        display: block
        width: 144px
        height: 144px
      span
        display: block
        width: 144px
        font-size: 20px
        line-height: 40px
        background: #2b2b2b
        color: #ffffff
        &:before
          opacity: 0.5
    .info
      display: block
      width: 440px
      float: right
    .card-item
      width: 100%
      margin-top: 0
      float: right
  .upload-images
    margin-bottom: 40px
  .images-add
    cursor: pointer
    margin-bottom: 40px
    text-align: center
    color: #409EFF
    line-height: 60px
    span
      display: block
      color: #C0C4CC
  .line
    text-align: center
</style>

<script>
import store from '@/store'
import vuedraggable from 'vuedraggable'
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
      beginTime: null,
      endTime: null,
      formLabelWidth: '1.4rem'
    };
  },
  mounted() {
    let tempData = []
    if(this.templateIndex != null)
    {
      tempData = this.TempData
    }
    else{
      let tempData = this.TempData.cssType? this.TempData: TemplateConfig["Images"].style[TemplateConfig["Images"].cssType]
      tempData.cssType = this.TempData.cssType? this.TempData.cssType :TemplateConfig["Images"].cssType
      tempData.templateStyle = tempData.id
      tempData.list = []
      tempData["list"].push(Object.assign({},store.state.template))
      this.tempData = tempData
      this.$nextTick(function(){
      this.$emit('TempDataUpdate', tempData)
      })
    }
  },
  methods: {
    handleAvatarSuccess(file, fileList) {
      if(this.templateIndex==null){
        let tempData = this.tempData
        let template = JSON.parse(JSON.stringify(TemplateConfig.Images.template))
        template.imageUrl = URL.createObjectURL(file.raw)
        tempData["list"].push(Object.assign({},template))
        this.$emit('TempDataUpdate', tempData)
      }
      else
      {
        let tempData = this.TempData
        let template = JSON.parse(JSON.stringify(TemplateConfig.Images.template))
        template.imageUrl = URL.createObjectURL(file.raw)
        tempData["list"].push(Object.assign({},template))
        this.$emit('TempDataUpdate', tempData)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    imagesAdd() {
      let imgNumCheck = this.imgNumCheck(this.tempData.list.length)
      if(!imgNumCheck) {
        return false
      }

      if(this.templateIndex==null){
        let tempData = this.tempData
        tempData["list"].push(Object.assign({},TemplateConfig.Images.template))
        this.$emit('TempDataUpdate', tempData)
      }
      else
      {
        let tempData = this.TempData
        tempData["list"].push(Object.assign({},TemplateConfig.Images.template))
        this.$emit('TempDataUpdate', tempData)
      }
    },
    imgNumCheck(number) {
      // 判断允许添加图片数
      if(this.TempData.cssType=="style1" && number>=5)
      {
        this.$message({
          type: 'error',
          message: '图片不能超过5张!'
        });
        return false
      }
      else if(this.TempData.cssType=="style2" && number>=10)
      {
        this.$message({
          type: 'error',
          message: '图片不能超过10张!'
        });
        return false
      }
      else if(this.TempData.cssType=="style5" && number>=3)
      {
        this.$message({
          type: 'error',
          message: '图片不能超过3张!'
        });
        return false
      }
      else if(this.TempData.cssType=="style6" && number>=5)
      {
        this.$message({
          type: 'error',
          message: '图片不能超过5张!'
        });
        return false
      }
      else if(this.TempData.cssType=="style7" && number>=15)
      {
        this.$message({
          type: 'error',
          message: '图片不能超过15张!'
        });
        return false
      }
      else if(this.TempData.cssType=="style8" && number>=20)
      {
        this.$message({
          type: 'error',
          message: '图片不能超过20张!'
        });
        return false
      }
      else{
        return true
      }
    },
    imgDelete(index) {
      let tempData = this.TempData
      tempData["list"].splice(index, 1)
      this.$emit('TempDataUpdate', tempData)
    },
    imgUrlUpdate(index) {
      if(this.templateIndex==null)
      {
        let tempData = this.tempData
        this.$set(tempData["list"][index], 'imageUrl', "http://image.dongxingji.cn/cache/image/homead/160/20190606095207_185.jpg")
        // tempData["list"][index].imageUrl = "http://image.dongxingji.cn/cache/image/homead/160/20190606095207_185.jpg"
      }
      else{
        let TemplateData = this.TemplateData
        this.$set(this.TemplateData[this.templateIndex]["list"][index], 'imageUrl', "http://image.dongxingji.cn/cache/image/homead/121/20190412110229_041.jpg")
        // this.TemplateData[this.templateIndex]["list"][index].imageUrl = "http://image.dongxingji.cn/cache/image/homead/121/20190412110229_041.jpg"
      }
      // this.$emit('submitTemplate', tempData)
    },
    timeChange() {
      let TempData = this.TempData
      TempData.beginTime = this.beginTime
      TempData.endTime = this.endTime
      this.TempData = TempData
    },
    urlUpdate() {
      // this.$emit('submitTemplate')
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