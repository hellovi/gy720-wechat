/**
 * 路由配置
 * @author zhoumenglin
 * @version 2017-12-26
 */

import Vue from 'vue'
import Router from 'vue-router'
import * as views from '@/views'

Vue.use(Router)

let hmtCache = []

const router = new Router({
  base: 'wechat',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/panos',
    },
    {
      path: '/login',
      name: 'Login',
      component: views.Login,
      meta: {
        title: '账号登录',
        hideNav: true,
      },
    },
    {
      path: '/panos',
      name: 'Panos',
      component: views.Panos,
      meta: {
        title: '看全景',
      },
    },
    {
      path: '/photographers',
      name: 'Photographers',
      component: views.Photographers,
      meta: {
        title: '摄影师',
      },
    },
    {
      path: '/author/:id',
      name: 'AuthorPanos',
      component: views.AuthorPanos,
      meta: {
        title: '摄影师作品',
        noTag: true,
      },
    },
    {
      path: '/user',
      name: 'User',
      component: views.User,
      meta: {
        title: '用户中心',
      },
      children: [
        {
          path: '/user/publish',
          name: 'UserPublish',
          component: views.UserPublish,
          meta: {
            title: '发布全景',
          },
        },
        {
          path: '/user/mypanos',
          name: 'UserMyPanos',
          component: views.AuthorPanos,
          meta: {
            title: '我的作品',
            noTag: true,
          },
        },
      ],
    },

  ],
})

router.beforeEach((to, from, next) => {
  // 更换页面title
  const defaultTitle = `${process.env.COMPANY_NAME}`
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${defaultTitle}`
  } else {
    document.title = defaultTitle
  }
  next()
})

router.afterEach((to) => {
  if (to.path) {
      /* eslint-disable */
      hmtCache.push(['_trackPageview', `/wechat${to.fullPath}`])
      if (window._hmt) {
          hmtCache.map((cache) => {
            window._hmt.push(cache)
          })
          hmtCache = []
      }
  }
})


export default router
