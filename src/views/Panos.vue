<template>
  <div>
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="panosList"
    >
      <FilterBar :left-tag-data="filterTag" @tag-update="tagUpdate"/>
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
export default {
  name: 'Panos',

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

    // 选中标签更新路由
    tagUpdate(item) {
      this.$router.push({
        query: {
          ...this.$route.query,
          tag_id: item.id,
          per_page: 10,
        },
      })
    },

    /**
     * @param {Number} page 页码
     * @param {Boolean} status 是否上拉加载
     * @param {Function} callback 上拉加载回调
    */
    getPageData(page = 1, status = false, callback) {
      this.page = +page
      const query = {
        ...this.$route.query,
      }
      return this.getPanoData(this.parse(query), status, callback)
    },

    // 转换数据格式
    parse(query) {
      return Object.keys(query)
        .reduce((result, key) => {
          const value = query[key]
          return `${result}&${key}=${value}`
        }, '')
    },

    // 获取列表数据
    getPanoData(qs, status = false, callback) {
      return this.$http.get(`/wechatapi/pano?page=${this.page}&${qs}`)
        .then(({ result }) => {
          this.lastPage = result.panoramas.last_page
          if (result.panoramas && result.panoramas.data.length > 0) {
            if (status) {
              this.panoramas = [...this.panoramas, ...result.panoramas.data]
            } else {
              this.panoramas = [...result.panoramas.data]
            }
          }
          if (callback) callback()
          return result
        })
        .catch(() => {
          if (callback) callback()
        })
    },

    // 下拉刷新
    async refresh(done) {
      await this.getPageData()
      done()
    },

    // 上拉加载
    infinite(done) {
      if (this.lastPage !== this.page) {
        this.getPageData(this.page += 1, true, done)
      } else {
        done(true)
      }
    },

  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getTagData()
    })
  },

  beforeRouteUpdate(to, from, next) {
    this.getPanoData(this.parse(to.query))
    next()
  },
}
</script>

<style lang="postcss">
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
