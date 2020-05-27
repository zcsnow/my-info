<template>
  <el-container :style="'height:' + height + 'px'">
    <el-header></el-header>
    <el-container>
      <el-aside :style="'height:' + (height-60) + 'px; overflow-x: hidden; overflow-y: auto;'" width="200px" v-show="asideShow?'hidden':''">
        <el-menu :default-active="TemplateType" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">动态模板</span>
            </template>
            <el-menu-item-group>
              <span slot="title" index="template">基础组件</span>
              <el-menu-item index="Images" @click="Template('Images')">图片类型</el-menu-item>
              <el-menu-item index="Navigation" @click="Template('Navigation')">图文导航</el-menu-item>
              <el-menu-item index="Title" @click="Template('Title')">标题</el-menu-item>
              <el-menu-item index="Text" @click="Template('Text')">纯文本</el-menu-item>
              <el-menu-item index="Notice" @click="Template('Notice')">公告</el-menu-item>
              <el-menu-item-group>
                <span slot="title" index="template">内容类</span>
                <el-menu-item index="ImagesText" @click="Template('ImagesText')">图文内容</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="template">页面配置</span>
                <el-menu-item index="Header" @click="Template('Header')">页面标题</el-menu-item>
              </el-menu-item-group>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container :style="'height:' + (height-60) + 'px'">
        <el-main>
          <router-view ref="Template" :TemplateType="TemplateType" :TemplateStyle="TemplateStyle" :TemplateIndex="TemplateIndex" @changeTemplateType="changeTemplateType" @changeTemplateStyle="changeTemplateStyle" @changeTemplateIndex="changeTemplateIndex" />
        </el-main>
        <!-- <el-footer></el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="sass">
  .skeleton
    background-color: #b2b2b2
  .el-header
    border-bottom: solid 1px #e6e6e6
  .el-menu
    height: 100%
  .el-footer
    box-shadow: 0 -3px 5px #eee
  .el-time-panel
    left: -20px !important
  .el-message__icon
    font-size: 16px
  .edit-card
    >.el-card__body
      padding-right: 0
      .edit-card-box
        padding-right: 20px
</style>

<script>
import store from "@/store";
import TemplateConfig from "@/views//pages/TemplateConfig"

export default {
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      asideShow: true,
      isCollapse: false,
      defaultActive: this.$route.fullPath,
      TemplateType: "Images",
      TemplateStyle: 1,
      TemplateIndex: null
    };
  },
  mounted() {
    if (window.innerWidth < 500) {
      this.asideShow = false;
    }

    window.onresize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      if (this.width <= 500) {
        this.asideShow = false;
      } else {
        this.asideShow = true;
      }
    };
  },
  methods: {
    Template(type) {
      this.TemplateType = type;
      this.TemplateIndex = null;
      if(type === "Images") {
        // this.TemplateStyle = null
        this.$refs.Template.styleChange(type, 1);
        store.state.template = {}
      }
      else if(type === "ImagesText") {
        this.TemplateStyle = null
        store.state.template = TemplateConfig[type].template
      }
      else if(type === "Navigation") {
        this.TemplateStyle = 1
        store.state.template = TemplateConfig[type].template
      }
      else if(type === "Notice") {
        this.TemplateStyle = 1
        store.state.template = TemplateConfig[type].template
      }
      else if(type === "Header") {
        this.TemplateStyle = null
        store.state.template = {}
      }
      else {
        store.state.template = TemplateConfig[type].template
        this.TemplateStyle = null
      }
    },
    changeTemplateType(type) {
      this.TemplateType = null;
      this.TemplateIndex = null;
      this.$nextTick(function(){
        this.TemplateType = type;
      })
    },
    changeTemplateStyle(type, style) {
      this.TemplateStyle = null;
      this.$nextTick(function(){
        this.TemplateStyle = style;
      })
    },
    changeTemplateIndex(index) {
      this.TemplateIndex = null;
      this.$nextTick(function(){
        this.TemplateIndex = index;
      })
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  components: {
    
  }
};
</script>