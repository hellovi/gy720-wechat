<template>
  <div>
    用户中心
    <router-view />
  </div>
</template>

<script>
import { Http } from '@/utils'

export default {

  data() {
    return {
      userInfo: null,
    }
  },

  beforeRouteEnter(to, from, next) {
    Http.get('/wechatapi/achieve')
      .then((res) => {
        next((vm) => {
          /* eslint-disable no-param-reassign */
          vm.userInfo = res
        })
      })
  },
}
</script>

<style>

</style>
