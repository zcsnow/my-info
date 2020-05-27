import Vue from 'vue'
import Router from 'vue-router'
import layout from './views/layout/layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      redirect: () => {
        return "/dashboard/template"
      }
    },
    {
      path: "/dashboard",
      meta: {
        title: "动态模板"
      },
      component: layout,
      children: [
        {
          path: "/dashboard/template",
          name: "动态模板",
          meta: {
            requireAuth: false, 
            title: "动态模板"
          },
          component: () => import("./views/pages/Template.vue")
        }
      ]
    }
  ]
})
