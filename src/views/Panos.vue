<template>
  <div>
    <FilterBar class="panos-filter" :left-tag-data="filterTag" @tag-update="tagUpdate"/>
    <AppScroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="scrollerList"
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
          </a>
          <div class="pano__info">
            <router-link :to="`/author/${list.hash_user_id}`">
              <img
                class="pano__avatar"
                v-qiniu-src="list.avatar"
                :alt="list.nickname"
              >
            </router-link>
            <span class="ellipsis">{{list.name}}</span>
          </div>
        </li>
      </ul>
    </AppScroller>
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
.panos {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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

@media screen and (min-width: 640px) {
  .panos {
    margin: 0 0 0 16px;

    & .pano {
      width: calc((100vw - 64px) / 3);
      margin: 0 16px 16px 0;
    }

    & .pano__info {
      height: 40px;
      font-size: 14px;
    }

    & .pano__avatar {
      width: 45px;
      height: 45px;
      margin-right: 10px;
    }
  }
}

@media screen and (min-width: 750px) {
  .panos {
    margin: 0 0 0 14px;

    & .pano {
      width: calc((100vw - 70px) / 4);
      margin: 0 14px 14px 0;
    }

    & .pano__info {
      height: 35px;
      font-size: 12px;
    }

    & .pano__avatar {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
}

@media screen and (min-width: 1024px) {
  .panos {
    margin: 0 0 0 10px;

    & .pano {
      width: calc((100vw - 60px) / 5);
      margin: 0 10px 10px 0;
    }

    & .pano__info {
      height: 30px;
      font-size: 10px;
    }

    & .pano__avatar {
      width:35px;
      height: 35px;
      margin-right: 8px;
    }
  }
}
</style>
