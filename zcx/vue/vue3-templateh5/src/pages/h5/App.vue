<template>
  <div id="app">
    <TemplateComponents class="TemplateComponents" v-for="(item, index) in TemplateData" :key="index" :index="index" :templateType="item.templateType" :templateStyle="item.templateStyle" :TempData="item"></TemplateComponents>
  </div>
</template>

<script>
import utils from '@/lib/utils'
import TemplateComponents from "@/components/Template/Template.vue"

export default {
  name: 'app',
  data() {
    return {
      TemplateData: []
    };
  },
  mounted() {
    this.TemplateHeader = JSON.parse(sessionStorage.getItem("TemplateHeader"))
    this.TemplateData = JSON.parse(sessionStorage.getItem("TemplateData"))
    utils.setTitle(this.TemplateHeader.title)
  },
  methods: {

  },
  components: {
    TemplateComponents
  }
}
</script>

<style lang="sass">
body
  margin: 0
  padding: 0
  background-color: #f7f7f7

#app
  position: relative
  max-width: 750px
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  margin: 0 auto
  padding: 0
  /* -webkit-font-smoothing: antialiased;
   *-moz-osx-font-smoothing: grayscale;
   *text-align: center;
  color: #2c3e50
  /* margin-top: 60px;
  .box
    border: none
</style>