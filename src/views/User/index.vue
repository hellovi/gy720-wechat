<template>
  <div>
    <router-view :user-info="userInfo" />
  </div>
</template>

<script>
import { Http } from '@/utils'

export default {
  name: 'User',

  data() {
    return {
      // 用户信息
      userInfo: {},
    }
  },

  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('token')
    if (!token) {
      sessionStorage.setItem('from-path', to.fullPath)
    }

    Http.get('/wechatapi/achieve')
      .then(({ result: { achieve } }) => {
        next((vm) => {
          /* eslint-disable no-param-reassign */
          vm.userInfo = achieve
        })
      })
  },
}
</script>
