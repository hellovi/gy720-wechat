<template>
  <div>
    <FilterBar class="panos-filter" :left-tag-data="filterTag" @tag-update="tagUpdate"/>
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="scrollerList"
      class="list-scroller"
    >
      <ul class="panos">
        <li
          class="pano"
          v-for="(list, index) in panoramas"
          :key="index"
        >
          <a :href="`/pano/view/${list.hash_pano_id}`">
            <div class="pano__image">
              <img v-qiniu-src="list.thumb" :alt="list.name">
            </div>
            <div class="pano__info">
              <img
                class="pano__avatar"
                v-qiniu-src="list.avatar"
                :alt="list.nickname"
              >
              <span class="ellipsis">{{list.name}}</span>
            </div>
          </a>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
import { scroller, weixinsdk } from '@/mixins'

export default {
  name: 'Panos',

  mixins: [scroller, weixinsdk],

  data() {
    return {
      filterTag: [],
      panoramas: [],
      page: 0,
      lastPage: 1,
    }
  },

  methods: {
    // 获取作品标签数据
    getTagData() {
      this.$http.get('/wechatapi/tags')
      .then((res) => {
        this.filterTag = [...res.result.tags]
      })
    },

    // 获取列表数据
    getListData(qs, status = false) {
      return this.$http.get(`/wechatapi/pano?page=${this.page}${qs}`)
        .then(({ result: { panoramas } }) => {
          this.lastPage = panoramas.last_page
          if (panoramas && panoramas.data.length > 0) {
            this.panoramas = status ? [...this.panoramas, ...panoramas.data] : [...panoramas.data]
          }
          return panoramas
        })
    },
  },

}
</script>

<style lang="postcss">
@import 'scroller.css';

.panos {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  margin: 0 0 0 20px;

  & .pano {
    width: calc((100vw - 60px) / 2);
    max-width: 346px;
    margin: 0 20px 20px 0;
  }

  & .pano__image {
    &::before {
      content: "";
      float: left;
      width: 1px;
      margin-top: 100%;
      margin-left: -1px;
    }

    & img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  & .pano__info {
    display: flex;
    align-items: center;
    height: 50px;
    background-color: #fff;
    font-size: 24px;
  }

  & .pano__avatar {
    width: 55px;
    height: 55px;
    margin-left: 8px;
    margin-right: 14px;
    border-radius: 50%;
    transform: translateY(-22%);
  }
}
</style>
