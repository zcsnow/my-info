<template>
  <span>
    <div v-if="TempData.cssType == 1 && index != undefined && (!this.fromPage || templateIndex != undefined)" class="wrap">
      <div class="box" :id="'box' + index">
        <div class="marquee" :id="'marquee' + index">{{item.title}}</div>
        <div class="copy" :id="'copy' + index"></div>
      </div>
      <div class="node" :id="'node' + index">{{item.title}}</div>
    </div>
    <div v-else class="span">{{item.title}}</div>
  </span>
</template>

<style lang="sass" scoped>
.wrap
  overflow: hidden

.box
  width: 80000%

.box div
  float: left

.marquee
   margin: 0 16px 0 0

.node
  position: absolute
  z-index: -999
  top: -999999px

.span
  width: 480px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>

<script>
export default {
  name: 'Marquee',
  props: {
    fromPage: {
      type: String
    },
    index: {
      type: Number
    },
    TempData: {
      type: Object
    },
    item: {
      type: Object
    },
    templateType: {
      type: String
    },
    templateIndex: {
      type: Number
    }
  },
  data () {
    return {
      timer: null,
      width: 0
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    marqueeMove () {
      if(this.TempData.cssType == 1 && this.index != undefined && (!this.fromPage || this.templateIndex != undefined)) {
        // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
        let width = document.getElementById('node' + this.index).getBoundingClientRect().width 
        let distance = 0 // 位移距离
        this.width = width
        if(width > 240) {
          clearInterval(this.timer)
          let box = document.getElementById('box' + this.index)
          let copy = document.getElementById('copy' + this.index)
          copy.innerText = this.item.title // 文字副本填充
          //设置位移
          this.timer = setInterval(function () { 
            distance = distance - 1
          // 如果位移超过文字宽度，则回到起点
            if (-distance >= width) {
              distance = 16
            }
            box.style.transform = 'translateX(' + distance + 'px)'
          }, 100) 
        }
        else
        {
          clearInterval(this.timer)
          let box = document.getElementById('box' + this.index)
          let copy = document.getElementById('copy' + this.index)
          copy.innerText = "" // 文字副本填充
          box.style.transform = 'translateX(0px)'
        }
      }
    }
  },
  mounted: function () {
    
  },
  // 更新的时候运动
  updated: function () {
    this.marqueeMove()
  }
}
</script>