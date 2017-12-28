<template>
  <div class="author">

    <div class="author__header">
      <!-- 头像 -->
      <img
        v-qiniu-src="avatar"
        class="author__header__avatar"
        :alt="nickname"
      >
      <!-- 用户信息 -->
      <div class="author__header__meta">
        <div>{{nickname}}</div>
        <ul class="list">
          <li>作品：{{ panoramas }}</li>
          <li>人气：{{ popular | visited }}</li>
          <li>赞：{{ stargazers | visited }}</li>
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
      <li v-for="(item,index) in 3" :key="item">
        <a
          :href="`/pano/view/${index}`"
          class="author__list__img"
        >
          <img v-qiniu-src="''" alt="">
        </a>
      </li>
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

  computed: {
    isMyPanos() { // 是否是 “我的作品” 路由
      return this.$route.path === '/user/mypanos'
    },

    id() { // 摄影师 hash_user_id
      return this.$route.params.id || null
    },

    avatar() { // 头像链接
      return this.isMyPanos ? this.userInfo.avatar : this.$route.query.avatar
    },

    nickname() { // 用户名
      return this.isMyPanos ? this.userInfo.nickname : this.$route.query.nickname
    },

    popular() { // 人气
      return this.isMyPanos ? this.userInfo.popular : this.$route.query.popular
    },

    stargazers() { // 点赞
      return this.isMyPanos ? this.userInfo.stargazers : this.$route.query.stargazers
    },

    panoramas() { // 作品数
      return this.isMyPanos ? this.userInfo.panoramas : this.$route.query.panoramas
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
}

.author {
  &__list {
    padding: 0 20px;

    & > li {
      margin-top: 20px;
      width: 100%;
      background-color: #fff;
    }

    &__img {
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
  }

  &__header{
    background-color: #fff;
    width:100%;
    padding: 0 var(--header-padding);
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;

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
