<template>
  <div>
    <!-- 顶部导航 -->
    <FilterBar />

    <!-- 摄影师列表 -->
    <ul class="list photographer-list">
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
      levels: [],
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

    // 获取摄影师等级标签数据源
    getLevels() {
      this.$http.get('/wechatapi/levels')
        .then(({ result: { levels } }) => {
          this.levels = levels
        })
    },
  },

  created() {
    this.getLevels()
    this.getData(1)
  },
}
</script>

<style lang="postcss">
.photographer-list {
  padding: 0 20px;

  &>li:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
