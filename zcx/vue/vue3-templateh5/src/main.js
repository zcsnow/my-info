import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/plugins/element.js'
import '@/assets/css/swiper.css'
import scroll from 'vue-seamless-scroll'
import utils from '@/lib/utils'
// import '@/plugins/flexible.js'

Vue.config.productionTip = false

Vue.use(VueAxios, axios, scroll);

// Vue.use(scroll,{componentName: 'scroll-seamless'})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    next();
  }
  else {
    next();
  }
})

router.afterEach((transition)=>{
  utils.setTitle(transition.meta.title)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
