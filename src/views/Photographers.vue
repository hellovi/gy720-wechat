<template>
  <div>
    <!-- 顶部导航 -->
    <FilterBar
      :left-tag-data="levels"
      left-name="等级"
      tag-field="level_id"
      @tag-update="tagUpdate" />

    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="scrollerList"
      class="list-scroller"
    >
      <!-- 摄影师列表 -->
      <ul class="list photographer-list">
        <li
          v-for="item in data"
          :key="item.hash_user_id"
        >
          <Photographer :data="item"/>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
import { scroller } from '@/mixins'

export default {
  name: 'Photographers',

  mixins: [scroller],

  data() {
    return {
      data: [],
      levels: [],
      tagField: 'level_id',
    }
  },

  methods: {
    // 获取摄影师数据
    getListData(qs, status = false) {
      return this.$http.get(`/wechatapi/author?page=${this.page}${qs}`)
        .then(({ result: { authors } }) => {
          this.lastPage = authors.last_page
          this.data = status ? [...this.data, ...authors.data] : [...authors.data]
          return authors
        })
    },

    // 获取摄影师等级标签数据源
    getTagData() {
      this.$http.get('/wechatapi/levels')
        .then(({ result: { levels } }) => {
          this.levels = levels
        })
    },
  },
}
</script>

<style lang="postcss">
@import 'scroller.css';
.photographer-list {
  padding: 0 20px;

  &>li:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
