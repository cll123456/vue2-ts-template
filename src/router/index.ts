import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'
import { matchRouteMenu } from './../../matchRouteMenu'
/* Layout */
import Layout from '@/views/layout/index.vue'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [

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
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/pages/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/TaskList',
    component: Layout,
    redirect: '/WillDoTaskList',
    meta: {
      title: '列表页面',
      icon: 'list'
    },
    children: [
      {
        path: '/WillDoTaskList',
        name: 'WillDoTaskList',
        component: () => import(/* webpackChunkName: "WillDoTaskList" */ '@/views/pages/taskList/willDoTaskList.vue'),
        meta: {
          title: '代办列表',
          icon: 'willDoTask',
          noCache: false
        }
      },
      {
        path: '/DidTaskList',
        name: 'DidTaskList',
        component: () => import(/* webpackChunkName: "DidTaskList" */ '@/views/pages/taskList/didTaskList.vue'),
        meta: {
          title: '已办列表',
          icon: 'didTask',
          noCache: false
        }
      },
    ]
  },

  {
    path: '/VATInvoice',
    component: Layout,
    redirect: '/VATInvoice',

    children: [
      {
        path: '/VATInvoice',
        name: 'VATInvoice',
        component: () => import(/* webpackChunkName: "PadBranch" */ '@/views/pages/VATInvoice/index.vue'),
        meta: {
          title: '测试页面一',
          icon: 'clipboard',
          noCache: false
        }
      },
    ]
  },
  {
    path: '/Purchase',
    component: Layout,
    redirect: '/Purchase',

    children: [
      {
        path: '/Purchase',
        name: 'Purchase',
        component: () => import(/* webpackChunkName: "Purchase" */ '@/views/pages/purchase/index.vue'),
        meta: {
          title: '采购页面',
          icon: 'shopping',
          noCache: false
        }
      },
    ]
  },
  {
    path: '/PadBranch',
    component: Layout,
    redirect: '/PadBranch',

    children: [
      {
        path: '/Hobby',
        name: 'Hobby',
        component: () => import(/* webpackChunkName: "Hobby" */ '@/views/pages/hobby/index.vue'),
        meta: {
          title: '兴趣',
          icon: 'money',
          noCache: false
        }
      },
    ]
  },


  // {
  //   path: '/*',
  //   component: () => import(/* webpackChunkName: "404" */ '@/views/pages/error-page/404.vue'),
  //   meta: { hidden: true }
  // },
]


const router = new VueRouter({
  mode: 'history',
  routes
})
// 路由守卫
router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  matchRouteMenu(to, from, next);
})

export default router


