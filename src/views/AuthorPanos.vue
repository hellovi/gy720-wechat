<template>
  <div class="author">
    <div class="author__header">
      <!-- 头像 -->
      <img
        v-qiniu-src="format('avatar')"
        class="author__header__avatar"
        :alt="format('nickname')"
      >
      <!-- 用户信息 -->
      <div class="author__header__meta">
        <div>{{ format('nickname') }}</div>
        <ul class="list">
          <li>作品：{{ format('panoramas') }}</li>
          <li>人气：{{ format('popular') | visited }}</li>
          <li>赞：{{ format('stargazers') | visited }}</li>
        </ul>
      </div>
      <!-- 发布作品 -->
      <router-link
        v-if="isMyPanos"
        to="/user/publish"
        class="author__header__btn"
      >发布</router-link>
    </div>

    <!-- 作品列表 -->
    <ul class="list author__list">
      <li v-for="(item,index) in list" :key="index">
        <!-- 封面 -->
        <a
          :href="`/pano/view/${item.hash_pano_id}`"
          class="author__list__link"
          :title="item.name"
        >
          <img v-qiniu-src="item.thumb" :alt="item.name">
        </a>
        <!-- 作品信息 -->
        <div class="author__list__meta">
          <p>{{item.name}}</p>
          <!-- 删除作品 -->
          <svg
            v-if="isMyPanos"
            class="author__list__svg"
            @click="remove(item.id)"
          >
            <use href="#trash"/>
          </svg>
        </div>
      </li>

      <!-- 缺省信息 -->
      <divider
        v-if="list.length === 0"
        content="暂时没有作品"
      ></divider>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'AuthorPanos',

  props: {
    userInfo: {
      type: Object,
    },
  },

  data() {
    return {
      list: [],
    }
  },

  computed: {
    isMyPanos() { // 是否是 “我的作品” 路由
      return this.$route.path === '/user/mypanos'
    },

    id() { // 摄影师 hash_user_id
      return this.$route.params.id || null
    },
  },

  filters: {
    // 点赞或者浏览数破万时转换单位
    visited(value) {
      if (value >= 10000) {
        return `${(value / 10000).toFixed(2)}万`
      }
      return value
    },
  },

  methods: {
    // 根据是他人作品还是我的作品获取不同数据
    format(item) {
      return this.isMyPanos ? this.userInfo[item] : this.$route.query[item]
    },

    // 删除作品
    remove(id) {
      // eslint-disable-next-line
      console.log(id)
    },

    // 我的作品
    getMyPanos(page) {
      this.$http.get(`/wechatapi/userpano?page=${page}`)
        .then(({ result: { panoramas } }) => {
          this.list = [...this.list, ...panoramas.data]
        })
    },

    // 摄影师作品
    getAuthorPanos(page) {
      this.$http.get(`/wechatapi/authorpano/${this.id}?page=${page}`)
        .then(({ result: { panoramas } }) => {
          this.list = [...this.list, ...panoramas.data]
        })
    },
  },

  beforeRouteEnter(to, from, next) {
    // 如果是他人作品页面，就加上作者名称
    if (to.path !== '/user/mypanos') {
      const authorName = to.query.nickname
      if (authorName) {
        document.title = `${authorName} - 光鱼全景`
      }
    }
    next()
  },

  created() {
    if (this.isMyPanos) {
      this.getMyPanos(1)
    } else {
      this.getAuthorPanos(1)
    }
  },

}
</script>

<style lang="postcss">
@import 'vars.css';

:root {
  --header-height: 140px;
  --avatar-width: 100px;
  --header-padding: calc((var(--header-height) - var(--avatar-width)) / 2);
  --btn-height: 60px;
  --text-color: #504F4F;
  --info-color: #999;
  --icon-color:#666;
  --meta-height:60px;
}

.author {
  &__list {
    padding: 0 20px;

    & > li {
      margin-top: 20px;
      width: 100%;
      background-color: #fff;
    }

    &__link {
      display: block;
      position: relative;
      width: 100%;
      padding-bottom: 100%;

      & img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    &__meta {
      height: var(--meta-height);
      line-height: var(--meta-height);
      padding: 0 20px;
      display: flex;
      font-size: 28px;
      justify-content: space-between;
      align-items: center;

      & > p {
        margin: 0;
        padding: 0;
        // flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &__svg {
      fill:var(--icon-color);
      width: 40px;
      height: 40px;
      flex-shrink: 0;
    }
  }

  &__header{
    background-color: #fff;
    width:100%;
    padding: 0 var(--header-padding);
    height: var(--header-height);
    display: flex;
    align-items: center;
    // justify-content: space-between;

    &__avatar {
      width: var(--avatar-width);
      height: var(--avatar-width);
      border-radius: 50%;
    }

    &__meta {
      flex-grow: 1;
      padding: 0 var(--header-padding);

      & > div {
        color: var(--text-color);
        font-size: 32px;
        margin-bottom: 24px;
      }

      & > ul {
        display: flex;
        justify-content: flex-start;

        & > li {
          color: var(--info-color);
          font-size: 24px;
          margin-right:24px;
        }
      }
    }

    &__btn {
      display: block;
      width: var(--avatar-width);
      height: var(--btn-height);
      line-height: var(--btn-height);
      text-align: center;
      background-color: var(--primary-color);
      color: #fff;
      border-radius: 10px;
      font-size: 28px;
    }
  }
}

</style>
