<template>
  <el-container class="page-main">
    <el-container style="padding-right: 420px;">
      <el-main>
        <div class="phone">
          <div class="header" @click="clickHeaderTemplate('Header')">
            <span>{{TemplateHeader.title}}</span>
          </div>
          <div class="phone-main" :style="'height:' + (height-210) + 'px; overflow-x: hidden; overflow-y: auto;'">
            <vuedraggable class="wrapper" v-model="TemplateData">
              <transition-group>
                <TemplateComponents class="TemplateComponents" v-for="(item, index) in TemplateData" :key="index" fromPage="template" :index="index" :templateType="item.templateType" :templateStyle="item.templateStyle" :TempData="item" :templateIndex="index" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateComponents>
              </transition-group>
            </vuedraggable>
            <TemplateComponents v-if="TemplateIndex==null" class="TemplateComponents skeleton" fromPage="template" :templateType="TemplateType" :templateStyle="TempData.templateStyle" :TempData="TempData" :templateTypeEditState="true" @saveTemplate="saveTemplate"  @deleteTemplate="clearTemplate"></TemplateComponents>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-aside style="position: fixed; right: 20px; width:400px;">
      <el-card class="box-card edit-card">
        <!-- 图片类型 -->
        <div slot="header" class="clearfix">
          <span v-if="TemplateType==='Images'">图片类型</span>
          <span v-else-if="TemplateType==='Header'">页面标题</span>
          <span v-else-if="TemplateType==='Navigation'">图文导航</span>
          <span v-else-if="TemplateType==='Title'">标题</span>
          <span v-else-if="TemplateType==='Text'">纯文本类型</span>
          <span v-else-if="TemplateType==='ImagesText'">图文内容</span>
          <span v-else-if="TemplateType==='Notice'">公告</span>
          <span v-else>未知类型</span>
          <span v-if="TemplateType!='Header'"> - {{TemplateIndex==null?'添加':'编辑'}}模块</span>
        </div>
        <div class="edit-card-box" :style="'height:' + (height-220) + 'px; verflow-x: hidden; overflow-y: auto;'">
          <div v-if="TemplateType==='Images'">
            <span>选择模板 {{styleName}}</span>
            <el-button-group class="select-template">
              <el-tooltip v-for="(val, key, index) in styleObj" :key="index" class="item" :content="styleObj[key].name" placement="bottom">
                <el-button :class="key==TemplateStyle?'acitve':''" @click="styleChange('Images',styleObj[key].id)"><img :src="key=='style'+TemplateStyle?styleObj[key].icon_selected:styleObj[key].icon" /></el-button>
              </el-tooltip>
            </el-button-group>
            <TemplateImages v-if="TemplateStyle != null" :TemplateType="TemplateType" :TemplateStyle="TemplateStyle" :templateIndex="TemplateIndex" :TemplateData="TemplateData" :TempData="TempData" @submitTemplate="submitTemplate" @clearTemplate="clearTemplate" @TempDataUpdate="TempDataUpdate" @changeTemplate="changeTemplate"></TemplateImages>
          </div>
          <div v-else-if="TemplateType==='Header'">
            <TemplateHeader :TemplateType="TemplateType" :TemplateStyle="TemplateStyle" :templateIndex="TemplateIndex" :TemplateHeader="TemplateHeader" :TemplateData="TemplateData" :TempData="TempData" @submitTemplate="submitTemplate" @clearTemplate="clearTemplate" @TempDataUpdate="TempDataUpdate" @changeTemplate="changeTemplate"></TemplateHeader>
          </div>
          <div v-else-if="TemplateType==='Navigation'">
            <el-form label-position="right" :label-width="formLabelWidth">
              <el-form-item label="选择模板">
                <el-radio-group v-model="TempData.cssType">
                  <el-form-item>
                    <el-radio :label="1">图文导航</el-radio>
                    <el-radio :label="2">文字导航</el-radio>
                  </el-form-item>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="一行显示">
                <el-radio-group v-model="TempData.cssClass">
                  <el-form-item>
                    <el-radio :label="4">4个</el-radio>
                    <el-radio :label="6">6个</el-radio>
                  </el-form-item>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <TemplateNavigation :TemplateType="TemplateType" :TemplateStyle="TemplateStyle" :templateIndex="TemplateIndex" :TemplateData="TemplateData" :TempData="TempData" @submitTemplate="submitTemplate" @clearTemplate="clearTemplate" @TempDataUpdate="TempDataUpdate" @changeTemplate="changeTemplate"></TemplateNavigation>
          </div>
          <div v-else-if="TemplateType==='Title'">
            <TemplateTitle :TemplateType="TemplateType" :TemplateStyle="TemplateStyle" :templateIndex="TemplateIndex" :TemplateData="TemplateData" :TempData="TempData" @submitTemplate="submitTemplate" @clearTemplate="clearTemplate" @TempDataUpdate="TempDataUpdate" @changeTemplate="changeTemplate"></TemplateTitle>
          </div>
          <div v-else-if="TemplateType==='Text'">
            <TemplateText :TemplateType="TemplateType" :TemplateStyle="TemplateStyle" :templateIndex="TemplateIndex" :TemplateData="TemplateData" :TempData="TempData" @submitTemplate="submitTemplate" @clearTemplate="clearTemplate" @TempDataUpdate="TempDataUpdate" @changeTemplate="changeTemplate"></TemplateText>
          </div>
          <div v-else-if="TemplateType==='ImagesText'">
            <el-form label-position="right" :label-width="formLabelWidth">
              <el-form-item label="效果展示">
                <el-radio-group v-model="TempData.cssType">
                  <el-form-item>
                    <el-radio :label="1">一行一个</el-radio>
                    <el-radio :label="2">一行两个</el-radio>
                  </el-form-item>
                  <el-form-item>
                    <el-radio :label="3">左右滑动</el-radio>
                  </el-form-item>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="列表样式">
                <el-radio-group v-model="TempData.cssClass">
                  <el-form-item>
                    <el-radio :label="1">上图下文</el-radio>
                    <el-radio :label="2" v-if="TempData.cssType == 1 || TempData.cssType == 2">下图上文</el-radio>
                  </el-form-item>
                  <el-form-item v-if="TempData.cssType == 1">
                    <el-radio :label="3">左图右文</el-radio>
                    <el-radio :label="4">右图左文</el-radio>
                  </el-form-item>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="TempData.checkTitle" label="显示内容">
                <el-checkbox-group v-model="TempData.checkTitle">
                  <el-checkbox label="title">主标题</el-checkbox>
                  <el-checkbox label="subtitle">副标题</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <TemplateImagesText :TemplateType="TemplateType" :TemplateStyle="TemplateStyle" :templateIndex="TemplateIndex" :TemplateData="TemplateData" :TempData="TempData" @submitTemplate="submitTemplate" @clearTemplate="clearTemplate" @TempDataUpdate="TempDataUpdate" @changeTemplate="changeTemplate"></TemplateImagesText>
          </div>
          <div v-else-if="TemplateType==='Notice'">
            <el-form label-position="right" :label-width="formLabelWidth">
              <el-form-item label="效果展示">
                <el-radio-group v-model="TempData.cssType">
                  <el-radio :label="0">静止</el-radio>
                  <el-radio :label="1">滚动</el-radio>
                  <el-radio :label="2">多条轮播</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <TemplateNotice :TemplateType="TemplateType" :TemplateStyle="TemplateStyle" :templateIndex="TemplateIndex" :TemplateData="TemplateData" :TempData="TempData" @submitTemplate="submitTemplate" @clearTemplate="clearTemplate" @TempDataUpdate="TempDataUpdate" @changeTemplate="changeTemplate"></TemplateNotice>
          </div>
        </div>
      </el-card>
      <div class="page-tool">
        <div class="page-button">
          <el-button @click="previewPage">预览</el-button>
          <el-button type="primary" @click="savePage">保存</el-button>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>

<style lang="sass" scoped>
  .page-tool
    position: fixed
    height: 120px
    top: 0
    right: 0
    line-height: 120px
    .page-button
      float: right
      margin-right: 160px
  .phone
    margin: 0 auto
    width: 750px
    background-color: #f7f7f7
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
    transition: .3s
    .header
      width: 750px
      height: 128px
      background: url("./../../assets/images/ios_header.png") no-repeat
      background-size: 100% 100%
      text-align: center
      cursor: pointer
      font-size: 36px
      font-weight: 700
      span
        display: block
        padding-top: 40px
        line-height: 80px
        border: 1px solid #f7f7f7
        &:hover
          border: 1px dashed #409EFF
    .phone-main
      border: 2px solid #f7f7f7
      border-top: none
      &::-webkit-scrollbar
        width: 10px
      &::-webkit-scrollbar-thumb
        width: 10px
        background-color: #e8e8e8
        background-clip: padding-box
        border-radius: 10px
    .TemplateComponents
      cursor: pointer
      &:first-child
        margin-top: 20px
  .edit-card-box      
    &::-webkit-scrollbar
      width: 10px
    &::-webkit-scrollbar-thumb
      width: 10px
      background-color: #e8e8e8
      background-clip: padding-box
      border-radius: 10px
  .select-template
    margin: 40px 0 20px
    .el-button
      width: 25%
      height: 100px
      margin-bottom: 20px
      &.acitve
        border-color: #c6e2ff
        background-color: #ecf5ff
      &:nth-child(4n+4)
        border-top-right-radius: 8px
        border-bottom-right-radius: 8px
      &:nth-child(4n+5)
        border-top-left-radius: 8px
        border-bottom-left-radius: 8px
      img
        width: 46.8px
        height: 28.8px
  .image-ico
    width: 100%
    .el-form-item__content
      >div
        display: inline-block
        border: 1px solid #e5e5e5
        &:hover
          cursor: pointer
          border-color: #409EFF
        width: 100px
        padding: 8px 4px 30px
        margin: 0 10px 20px
        text-align: center
        .el-image
          width: 180px
          height: 120px
        span
          display: block
          line-height: 20px
</style>

<script>
import store from '@/store'
import vuedraggable from 'vuedraggable'
import TemplateConfig from "./TemplateConfig"
import TemplateComponents from "@/components/Template/Template.vue"
import { TemplateHeader, TemplateNavigation, TemplateImages, TemplateTitle, TemplateText, TemplateImagesText, TemplateNotice } from "@/components/Template/Template"
import { constants } from 'crypto';

export default {
  name: "Template",
  props: {
    TemplateType: {
      type: String
    },
    TemplateStyle: {
      type: Number
    },
    TemplateIndex: {
      type: Number
    }
  },
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      TemplateHeader: {
        title: "页面标题",
        remarks: ""
      },
      TemplateData: [],
      TempData: {},
      styleObj: {},
      styleName: null,
      formLabelWidth: '70px'
    };
  },
  mounted() {
    window.onresize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    };
    this.styleObj = TemplateConfig.Images.style;
  },
  methods: {
    styleChange(type, style) {
      this.TempData = {}
      this.$nextTick(function(){
        if(type == "Images")
        {
          let TempData = TemplateConfig[type].style["style" + style]
          TempData.templateStyle = style
          TempData.cssType = "style" + style
          TempData.list = []
          TempData.beginTime = ""
          TempData.endTime = ""
          this.TempData = TempData
          this.styleName = TempData.name
          this.$emit('changeTemplateType', type)
          this.$emit('changeTemplateStyle', this.TemplateType, style)
          this.$emit('changeTemplateIndex', null)
        }
        else if(type == "ImagesText")
        {
          let TempData = TemplateConfig[type].style
          TempData.templateStyle = null
          TempData.list = []
          this.TempData = TempData
          this.styleName = ""
          // this.$emit('changeTemplateType', type)
          // this.$emit('changeTemplateStyle', this.TemplateType, "style")
          // this.$emit('changeTemplateIndex', null)
        }
        else if (type == "Title")
        {
          let TempData = TemplateConfig[type]
          this.TempData = TempData
          this.styleName = ""
          this.templateType = "Title"
          this.$nextTick(function(){
            this.$emit('changeTemplateStyle', this.TemplateType, null)
          })
        }
        else if(type == "Navigation")
        {
          let TempData = TemplateConfig[type].style
          TempData.templateStyle = null
          TempData.list = []
          this.TempData = TempData
          this.styleName = ""
        }
        else if (type == "Text")
        {
          let TempData = TemplateConfig[type]
          this.TempData = TempData
          this.styleName = ""
          this.templateType = "Text"
          this.$nextTick(function(){
            this.$emit('changeTemplateStyle', this.TemplateType, null)
          })
        }
      })
    },
    clickHeaderTemplate(e) {
      this.$emit('changeTemplateType', e)
    },
    changeTemplate(e) {
      this.styleChange(e.type, e.style)
    },
    TempDataUpdate(data) {
      // let TempData = this.TempData
      let TempData = data
      TempData.templateType = this.TemplateType
      // TempData.list = data.list
      this.TempData = Object.assign({}, this.TempData, TempData)
    },
    submitTemplate(e) {
      console.log("保存事件触发")
      console.log(e)
      if(this.TemplateType === "Images" && this.TempData.list.length == 0)
      {
        this.$message({
          type: 'error',
          message: '未添加图片!'
        });
        return false
      }
      if(this.TemplateIndex == null) {
        let TempData =  this.TempData
        this.TemplateData.push(TempData)
      }
      this.$emit('changeTemplateStyle', this.TemplateType, null)
      this.styleName = null
      this.$emit('changeTemplateIndex', null)
      if(this.TemplateType === "Images") {
        this.TempData = {}
      }
      else if(this.TemplateType === "Navigation") {
        this.TempData = TemplateConfig[this.TemplateType].style
        this.$emit('changeTemplateType', this.TemplateType)
      }
      else if(this.TemplateType === "ImagesText") {
        this.TempData = TemplateConfig[this.TemplateType].style
        this.$emit('changeTemplateType', this.TemplateType)
      }
      else if(this.TemplateType === "Title" || this.TemplateType === "Text" || this.TemplateType === "Notice") {
        this.TempData = {}
        this.$emit('changeTemplateType', this.TemplateType)
      }
    },
    clearTemplate() {
      console.log("取消事件触发")
      if(this.TemplateType==="Images") {
        let TempData = TemplateConfig[this.TemplateType].style[this.TemplateStyle]
        TempData.templateStyle = this.TemplateStyle
        TempData.list = []
        TempData.beginTime = ""
        TempData.endTime = ""
        this.$emit('changeTemplateStyle', this.TemplateType, null)
        this.TempData = {}
      }
      else if(this.TemplateType==="Navigation") {
        let TempData = TemplateConfig[this.TemplateType].style
        TempData.templateStyle = this.TemplateStyle
        TempData.list = []
        this.TempData = TempData
      }
      else if(this.TemplateType==="ImagesText") {
        let TempData = TemplateConfig[this.TemplateType].style
        TempData.templateStyle = this.TemplateStyle
        TempData.list = []
        this.TempData = TempData
      }
      else {
        this.$emit('changeTemplateType', this.templateType)
        this.$emit('changeTemplateStyle', this.TemplateType, null)
      }
    },
    saveTemplate(e) {
      console.log("触发保存组件")
      this.submitTemplate()
    },
    editTemplate(e) {
      console.log("触发修改组件")
      this.$emit('changeTemplateIndex', e)
      this.$emit('changeTemplateStyle', this.TemplateType, this.TemplateData[e].templateStyle)
      this.TempData = {}
      if(this.TemplateType != this.TemplateData[e].templateType) {
        this.$emit('changeTemplateType', this.TemplateData[e].templateType)
      }
      this.TempData = this.TemplateData[e]
    },
    deleteTemplate(e) {
      console.log("触发删除组件")
      this.$confirm('此操作将删除该组件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.TemplateData[e].templateType === "Title" || this.TemplateData[e].templateType === "Text" || this.TemplateData[e].templateType === "ImagesText" || this.TemplateData[e].templateType === "Notice")
        {
          this.$emit('changeTemplateType', this.TemplateData[e].templateType)
        }
        this.TemplateData.splice(e, 1)
        this.templateType = null
        this.$emit('changeTemplateStyle', this.TemplateType, null)
        this.styleName = null
        this.TempData = {}
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    previewPage() {
      console.log("预览")
      sessionStorage.setItem("TemplateHeader", JSON.stringify(this.TemplateHeader))
      sessionStorage.setItem("TemplateData", JSON.stringify(this.TemplateData))
      window.open("./h5.html", '_blank');
    },
    savePage() {
      console.log("保存")
      // sessionStorage.setItem("TemplateHeader", JSON.stringify(this.TemplateHeader))
      // sessionStorage.setItem("TemplateData", JSON.stringify(this.TemplateData))
      // window.open("/h5.html", '_blank');
    }
  },
  components: {
    vuedraggable,
    TemplateHeader,
    TemplateNavigation,
    TemplateImages,
    TemplateTitle,
    TemplateText,
    TemplateImagesText,
    TemplateNotice,
    TemplateComponents
  }
};
</script>