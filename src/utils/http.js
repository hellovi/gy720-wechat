/*
 * http请求
 * @Author: chenliangshan
 * @Date: 2017-12-27 17:09:04
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2018-01-29 13:26:21
 */


import 'whatwg-fetch'
import router from '@/router'

const token = localStorage.getItem('token')

const defaultHeaders = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}

const requestHeaders = {
  /**
   * 使用图形验证码校验
   * credentials为请求发送cookie配置
   * omit: 默认值，忽略cookie的发送
   * same-origin: 表示cookie只能同域发送，不能跨域发送
   * include: cookie既可以同域发送，也可以跨域发送
   */
  credentials: 'same-origin',
}

class Http {
  static install(Vue) {
    /* eslint-disable no-param-reassign */
    Vue.prototype.$http = {
      get: Http.get,
      post: Http.post,
      patch: Http.patch,
      put: Http.put,
      delete: Http.delete,
      cpost: Http.cpost,
    }
  }

  // 统一抛出错误
  static errorHandler(res) {
    if (res.ok) {
      return res.json()
        // eslint-disable-next-line
        .then((res) => {
          if (!res.status || res.status.code === 1) {
            return res
          }
          if (res.status.code === 401) {
            // 登录权限
            const fromPath = sessionStorage.getItem('from-path')
            sessionStorage.removeItem('from-path')
            localStorage.removeItem('token')
            router.push(`/login${fromPath ? `?from=${fromPath}` : ''}`)
          }
          throw res
        })
    }

    return res.json()
      .then((error) => {
        throw error
      })
  }

  /**
   * GET请求
   * @param {string} uri - 请求接口
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static get(uri, headers = {}) {
    return fetch(uri, {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...requestHeaders,
    })
      .then(Http.errorHandler)
  }

  /**
   * POST请求
   * @param {string} uri - 请求接口
   * @param {Object} body - 请求所需携带参数
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static post(uri, body, headers = {}) {
    return fetch(uri, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
      ...requestHeaders,
    })
      .then(Http.errorHandler)
  }

  /**
   * PATCH请求
   * @param {string} uri - 请求接口
   * @param {Object} body - 请求所需携带参数
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static patch(uri, body, headers = {}) {
    return fetch(uri, {
      method: 'PATCH',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
      ...requestHeaders,
    })
      .then(Http.errorHandler)
  }

  /**
   * PATCH请求
   * @param {string} uri - 请求接口
   * @param {Object} body - 请求所需携带参数
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static put(uri, body, headers = {}) {
    return fetch(uri, {
      method: 'PUT',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
      ...requestHeaders,
    })
      .then(Http.errorHandler)
  }

  /**
   * DELETE请求
   * @param {string} uri - 请求接口
   * @param {Object} headers - 指定额外的请求头
   * @returns {Promise}
   */
  static delete(uri, headers = {}) {
    return fetch(uri, {
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...requestHeaders,
    })
      .then(Http.errorHandler)
  }

  /**
   * 自定义表单数据格式
   * @param {string} uri
   * @param {any} body
   * @param {Object} headers
   */
  static cpost(uri, body, headers = {}) {
    return fetch(uri, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body,
      ...requestHeaders,
    })
      .then(Http.errorHandler)
  }
}

export default Http
