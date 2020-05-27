import Vue from 'vue'
import App from './App.vue'
import '@/plugins/element.js'
import '@/assets/css/swiper.css'
import '@/plugins/flexible.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
