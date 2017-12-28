<template>
  <div>
    摄影师作品列表

  </div>
</template>

<script>
export default {

  computed: {
    // 是否是 “我的作品” 路由
    isMyPanos() {
      return this.$route.path === '/user/mypanos'
    },

    // 摄影师 hash_user_id
    id() {
      return this.$route.params.id || null
    },
  },

}
</script>

<style lang="postcss">
@import 'vars.css';

</style>
