<template>
  <div>
    <!-- 顶部导航 -->
    <FilterBar
      :left-tag-data="levels"
      left-name="等级"
      tag-field="level_id"
      @tag-update="tagUpdate" />

    <AppScroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="scrollerList"
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
    </AppScroller>
  </div>
</template>

<script>
import { scroller, weixinsdk } from '@/mixins'

export default {
  name: 'Photographers',

  mixins: [scroller, weixinsdk],

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
.photographer-list {
  padding: 0 20px;

  &>li {
    margin-bottom: 20px;
  }
}

@media screen and (min-width: 640px) {
  .photographer-list {
    &>li {
      display: inline-block;
    }
  }
}

@media screen and (min-width: 640px) and (max-width: 749px) {
  .photographer-list {
    padding: 0 16px;

    &>li{
      margin: 0 16px 16px 0;
      width: calc((100vw - 48px) / 2);

      &:nth-child(2n+0) {
        margin-right: 0;
      }
    }
  }
}

@media screen and (min-width: 750px) and (max-width: 1023px) {
  .photographer-list {
    padding: 0 14px;
    &>li{
      margin: 0 14px 14px 0;
      width: calc((100vw - 56px) / 3);

      &:nth-child(3n+0) {
        margin-right: 0;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .photographer-list {
    padding: 0 10px;
    &>li{
      margin: 0 10px 10px 0;
      width: calc((100vw - 50px) / 4);

      &:nth-child(4n+0) {
        margin-right: 0;
      }
    }
  }
}

</style>
