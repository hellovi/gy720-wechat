/*
 * 微信SDK及注册分享功能
 * @Author: chenliangshan
 * @Date: 2017-12-29 16:51:16
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2018-01-04 09:31:30
 */

import wx from 'weixin-js-sdk'

export default {
  data() {
    return {
      shareInfo: {},
      weixinSDKConfig: {},
    }
  },

  methods: {
    getWxJsdk(url = window.location.href) {
      return this.$http.get(`/wechatapi/jssdk?url=${encodeURIComponent(url)}`)
        .then(({
          result,
        }) => {
          wx.config(result.sdk)
          this.weixinSDKConfig = { ...result,
          }
          return result
        })
    },

    setWxReady(info = this.shareInfo) {
      const {
        seo,
        shareLogo,
      } = this.weixinSDKConfig
      const config = {
        title: document.title, // 分享标题
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareLogo, // 分享图标
        desc: `${seo.keywords} -- ${seo.description}`, // 分享描述
        ...info,
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
          // type: '', // 分享类型,music、video或link，不填默认为link
          // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
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
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getWxJsdk()
        .then(() => {
          vm.setWxReady()
        })
    })
  },

  beforeRouteUpdate(to, from, next) {
    next()
    this.setWxReady()
  },
}
