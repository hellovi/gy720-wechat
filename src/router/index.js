/**
 * 路由配置
 * @author zhoumenglin
 * @version 2017-12-26
 */

import Vue from 'vue'
import Router from 'vue-router'
import * as views from '@/views'

Vue.use(Router)

const router = new Router({
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
      path: '/mypanos',
      name: 'MyPanos',
      component: views.MyPanos,
      meta: {
        title: '我的作品',
        needToken: true,
      },
    },
    {
      path: '/publish',
      name: 'Publish',
      component: views.Publish,
      meta: {
        title: '发布全景',
        needToken: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  /**
   * 不是所有页面都需要鉴权
   * 需要鉴权的页面，我都会在路由 meta 添加添加一个字段 needToken
   * needToken 设置为 true 的时候，必须要已登录才能进入
   */
  if (to.meta.needToken) {
    // if (这里写已登录的判断条件) {
    //   next();
    // } else {
    //   next({
    //     path: '/login',
    //   });
    // }
    next()
  }

  // 更换页面title
  const defaultTitle = '光鱼全景'
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${defaultTitle}`
  } else {
    document.title = defaultTitle
  }

  next()
})


export default router
