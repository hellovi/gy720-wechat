<template>
  <div>
    <!-- 顶部导航 -->
    <FilterBar />

    <!-- 摄影师列表 -->
    <ul class="photographer-list">
      <li
       v-for="item in data"
       :key="item.hash_user_id"
      >
        <Photographer :data="item"/>
      </li>
    </ul>

  </div>
</template>

<script>

export default {
  name: 'Photographers',

  data() {
    return {
      data: [],
    }
  },

  methods: {
    // 获取摄影师数据
    getData(page) {
      this.$http.get(`/wechatapi/author?page=${page}`)
        .then(({ result: { authors } }) => {
          this.data = [...this.data, ...authors.data]
        })
    },
  },

  created() {
    this.getData(1)
  },
}
</script>

<style lang="postcss">
.photographer-list {
  padding: 0 20px;
  list-style: none;
  margin: 0;

  & li:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
