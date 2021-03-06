/*
 * 微信SDK及注册分享功能
 * @Author: chenliangshan
 * @Date: 2017-12-29 16:51:16
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2018-01-08 16:09:35
 */

import wx from 'weixin-js-sdk'
import { WxTools } from '@/utils'

const userAgent = window.navigator.userAgent

export default {
  data() {
    return {
      shareInfo: {},
      weixinSDKConfig: {},
    }
  },

  methods: {
    /**
     * 通过url获取微信sdk授权配置信息
     * @param {String} url
     */
    getWxJsdk(url = window.location.href) {
      return this.$http.get(`/wechatapi/jssdk?url=${encodeURIComponent(url)}`)
        .then(({
          result,
        }) => {
          if (userAgent.indexOf('MicroMessenger') > -1) {
            wx.config(result.sdk)
            this.weixinSDKConfig = { ...result }
          }
          return result
        })
    },

    /**
     * 设置微信分享功能信息内容
     * @param {Object} info 微信分享自定义信息字段
     */
    setWxReady(info = this.shareInfo) {
      if (userAgent.indexOf('MicroMessenger') < 0) return

      const {
        seo,
        shareLogo,
      } = this.weixinSDKConfig
      const config = {
        title: info.title || document.title, // 分享标题
        link: info.link || window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: info.imgUrl || shareLogo, // 分享图标
        desc: info.desc || `${seo.keywords} -- ${seo.description}`, // 分享描述
        type: info.type || 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: info.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
      }
      wx.ready(() => {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          success: () => {
            // 用户确认分享后执行的回调函数
          },
          ...config,
        })

        // 分享给朋友
        wx.onMenuShareAppMessage({
          success: () => {
            // 用户确认分享后执行的回调函数
          },
          cancel: () => {
            // 用户取消分享后执行的回调函数
          },
          ...config,
        })

        // 分享到QQ
        wx.onMenuShareQQ({
          success: () => {
            // 用户确认分享后执行的回调函数
          },
          cancel: () => {
            // 用户取消分享后执行的回调函数
          },
          ...config,
        })

        // 分享到腾讯微博
        wx.onMenuShareWeibo({
          success: () => {
            // 用户确认分享后执行的回调函数
          },
          cancel: () => {
            // 用户取消分享后执行的回调函数
          },
          ...config,
        })

        // 分享到QQ空间
        wx.onMenuShareQZone({
          success: () => {
            // 用户确认分享后执行的回调函数
          },
          cancel: () => {
            // 用户取消分享后执行的回调函数
          },
          ...config,
        })
      })
    },

    /**
     * 设置微信标题
     * @param {String} title 自定义标题
     * @param {String} img 自定义图片
     */
    setWxTitle(title, img) {
      WxTools.setWechatTitle(title, img)
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (userAgent.indexOf('MicroMessenger') > -1) {
        vm.getWxJsdk()
        .then(() => {
          vm.setWxReady()
        })
      }
    })
  },

  beforeRouteUpdate(to, from, next) {
    next()
    this.setWxReady()
  },
}
