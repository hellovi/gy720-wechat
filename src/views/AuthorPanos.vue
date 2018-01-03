<template>
  <div class="author">

    <!-- 头部 -->
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

    <!-- 滚动区域 -->
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="scrollerList"
      class="author__scroller"
    >
      <!-- 作品列表 -->
      <ul class="list author__list">
        <li v-for="(item,index) in data" :key="index">
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
            <!-- 作品名 -->
            <p>{{item.name}}</p>
            <!-- 删除按钮 -->
            <a
              v-if="isMyPanos"
              @click="openConfirm(item.id,item.name)"
              class="author__list__meta__click"
            >
              <svg class="author__list__svg"><use href="#trash"/></svg>
            </a>
          </div>
        </li>
      </ul>
    </scroller>

    <!-- 确认弹窗 -->
    <confirm
      :visible.sync="pano.confirm"
      @on-ok="deletePano"
    >
      是否删除作品 <span class="author__confirm">{{pano.name}}</span>
    </confirm>

    <!-- 提示信息 -->
    <toast
      :message = "toast.msg"
      :iconClass = "toast.class"
      :toastShow.sync = "toast.visible"
    ></toast>

  </div>
</template>

<script>
import { scroller, weixinsdk } from '@/mixins'

export default {
  name: 'AuthorPanos',

  mixins: [scroller, weixinsdk],

  props: {
    userInfo: {
      type: Object,
    },
  },

  data() {
    return {
      data: [], // 列表数据

      pano: {
        id: null, // 作品id
        confirm: false, // 确认弹窗显示
        name: '', // 作品名
      },

      toast: {
        class: 'success', // 提示框图标样式
        visible: false, // 提示框显示
        msg: '', // 提示框信息
      },
    }
  },

  computed: {
    isMyPanos() { // 是否是 “我的作品” 路由
      return this.$route.path === '/user/mypanos'
    },

    id() { // 摄影师 hash_user_id
      return this.$route.params.id || null
    },

    confirmText() {
      return `是否删除作品《 ${this.pano.name} 》 ？`
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

    // 打开确认弹窗
    openConfirm(id, name) {
      this.pano.id = id
      this.pano.name = name
      this.pano.confirm = true
    },

    // 删除作品
    deletePano() {
      this.$http.delete(`/user/pano/${this.pano.id}`)
        .then(() => {
          this.data = this.data.filter(pano => pano.id !== this.pano.id)
          this.toast.msg = '删除成功'
          this.toast.visible = true
          this.pano.confirm = false
        })
    },

    // 获取作品信息
    getListData(qs, status = false) {
      const api = this.isMyPanos ?
      `/wechatapi/userpano?page=${this.page}${qs}` :
      `/wechatapi/authorpano/${this.id}?page=${this.page}${qs}`

      return this.$http.get(api)
        .then(({ result: { panoramas } }) => {
          this.lastPage = panoramas.last_page
          this.data = status ? [...this.data, ...panoramas.data] : [...panoramas.data]
          return panoramas
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
  --meta-height:80px;
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
      padding: 0 0 0 20px;
      display: flex;
      font-size: 30px;
      justify-content: space-between;
      align-items: center;

      & > p {
        margin: 0;
        padding: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

     & > a {
        display: flex;
        height: var(--meta-height);
        width: var(--meta-height);
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
      }
    }

    &__svg {
      fill:var(--icon-color);
      width: 48px;
      height: 48px;
    }
  }

  &__header{
    position: relative;
    display: flex;
    align-items: center;
    z-index: 10;
    width:100%;
    height: var(--header-height);
    padding: 0 var(--header-padding);
    background-color: #fff;

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

  &__scroller {
    padding-top: var(--header-height);
  }

  &__confirm {
    color:var(--error-color);
  }
}

</style>
