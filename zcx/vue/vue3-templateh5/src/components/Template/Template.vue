<template>
  <div>
    <TemplateImagesStyle1 v-if="templateType === 'Images' && TempData.cssType === 'style1'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateImagesStyle1>
    <TemplateImagesStyle2 v-else-if="templateType === 'Images' && TempData.cssType === 'style2'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateImagesStyle2>
    <TemplateImagesStyle5 v-else-if="templateType === 'Images' && TempData.cssType === 'style5'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateImagesStyle5>
    <TemplateImagesStyle6 v-else-if="templateType === 'Images' && TempData.cssType === 'style6'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateImagesStyle6>
    <TemplateImagesStyle7 v-else-if="templateType === 'Images' && TempData.cssType === 'style7'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateImagesStyle7>
    <TemplateImagesStyle8 v-else-if="templateType === 'Images' && TempData.cssType === 'style8'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateImagesStyle8>
    <TemplateTitleStyle v-else-if="templateType === 'Title'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateTitleStyle>
    <TemplateTextStyle v-else-if="templateType === 'Text'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateTextStyle>
    <TemplateImagesTextStyle v-if="templateType === 'ImagesText'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateImagesTextStyle>
    <TemplateNoticeStyle v-else-if="templateType === 'Notice'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateNoticeStyle>
    <TemplateNavigationStyle v-else-if="templateType === 'Navigation'" :fromPage="fromPage" :index="index" :templateType="templateType" :TempData="TempData" :templateIndex="templateIndex" :templateTypeEditState="templateTypeEditState" @saveTemplate="saveTemplate" @editTemplate="editTemplate" @deleteTemplate="deleteTemplate"></TemplateNavigationStyle>
  </div>
</template>

<script>


import TemplateImages from './Images'

import { TemplateNavigationStyle, TemplateImagesStyle1, TemplateImagesStyle2, TemplateImagesStyle5, TemplateImagesStyle6, TemplateImagesStyle7, TemplateImagesStyle8, TemplateTitleStyle, TemplateTextStyle, TemplateImagesTextStyle, TemplateNoticeStyle } from './Template'

export default {
  name: "Template",
  props: {
    fromPage: {
      type: String
    },
    index: {
      type: Number
    },
    templateType: {
      type: String
    },
    templateStyle: {
      type: Number
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
    TemplateNavigationStyle,
    TemplateImagesStyle1,
    TemplateImagesStyle2,
    TemplateImagesStyle5,
    TemplateImagesStyle6,
    TemplateImagesStyle7,
    TemplateImagesStyle8,
    TemplateTitleStyle,
    TemplateTextStyle,
    TemplateImagesTextStyle,
    TemplateNoticeStyle
  }
}
</script>

