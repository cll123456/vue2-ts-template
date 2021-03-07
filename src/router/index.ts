import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
/* Layout */
import Layout from '@/views/layout/index.vue'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/pages/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/About.vue'),
        name: 'index',
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    meta: {
      title: '表格组',
      icon: 'example'
    },
    redirect:'/Table1',
    children: [
      {
        path: '/Table1',
        component: () => import(/* webpackChunkName: "Table1" */ '@/views/pages/table/index.vue'),
        name: 'Table1',
        meta: {
          title: '表格1',
          icon: 'user',
          noCache: true
        }
      },
      {
        path: '/Table2',
        name: 'Table2',
        component: () => import(/* webpackChunkName: "Table2" */ '@/views/pages/table2/index.vue'),
        meta: {
          title: '表格2',
          icon: 'user',
          noCache: false
        }
      },
    ]
  },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/*',
    component: () => import(/* webpackChunkName: "404" */ '@/views/pages/error-page/404.vue'),
    meta: { hidden: true }
  },
]





const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
