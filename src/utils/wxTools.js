/*
 * 微信公共方法
 * @Author: chenliangshan
 * @Date: 2018-01-05 11:34:49
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2018-01-05 11:41:06
 */

export default class wxTools {
  static setWechatTitle = (title, img) => {
    if (title === undefined || window.document.title === title) {
      return
    }
    document.title = title
    const mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      // 替换成站标favicon路径或者任意存在的较小的图片即可
      iframe.setAttribute('src', img || '/favicon.ico')
      const iframeCallback = () => {
        setTimeout(() => {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 0)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
  }
}
