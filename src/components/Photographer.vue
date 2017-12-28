<template>
  <div class="photographer">

    <!-- 认证标志 -->
    <div
      v-if="data.is_certificate"
      class="photographer__label"
    >
      <span>企业认证</span>
    </div>

    <!-- 头像 -->
    <div class="photographer__avatar">
      <router-link
        :to="`/author/${data.hash_user_id}`"
        :style="{backgroundImage:`url(${imgFormat(data.avatar)})`}"
        :title="`${data.nickname}`"
      ></router-link>
    </div>

    <!-- 用户名 -->
    <div class="photographer__name">{{data.nickname}}</div>

    <!-- 用户信息 -->
    <ul class="photographer__meta">
      <li>
        <svg fill="#C2C2C2" class="photographer__meta__icon">
          <use href="#photo"/>
        </svg>
        <span>{{ data.panoramas }}</span>
      </li>
      <li>
        <svg fill="#C2C2C2" class="photographer__meta__icon">
          <use href="#eye"/>
        </svg>
        <span>{{ data.popular | visited}}</span>
      </li>
      <li>
        <svg fill="#C2C2C2" class="photographer__meta__icon">
          <use href="#like"/>
        </svg>
        <span>{{ data.stargazers | visited}}</span>
      </li>
    </ul>

    <!-- 用户作品 -->
    <ul class="photographer__panos">
      <li v-for="(pano,index) in panos" :key="index">
        <div>
          <a
            :href="`${hostName}/pano/view/${pano.hash_pano_id}`"
            :style="{backgroundImage:`url(${imgFormat(pano.thumb)})`}"
            :title="pano.name"
          ></a>
        </div>
      </li>
      <!-- 缺省图片 -->
      <li v-for="index in (2 - panos.length)" :key="index">
        <div>
          <a
            :style="{backgroundImage:`url(${imgFormat('')})`}"
            title="图片说明"
          ></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import defaultImg from '@/assets/default.jpg'

export default {
  name: 'Photographer',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {

    }
  },

  computed: {
    panos() {
      return this.data.panorama
    },

    imgHead() {
      return process.env.NODE_ENV === 'production' ?
      'https://www-statics.gy720.com/' : 'https://l-statics.gy720.com/'
    },

    hostName() {
      return process.env.NODE_ENV === 'production' ?
      'https://l.gy720.com/' : 'https://www.gy720.com/'
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
    // 如果作品或者头像为空的时候，显示默认图片
    imgFormat(value) {
      if (value === '') {
        return defaultImg
      }
      return `${this.imgHead}${value}`
    },
  },
}
</script>

<style lang="postcss">

:root {
  --avatar-width: 356px;
  --border-color: #BFBFBF;
  --icon-width:30px;
  --icon-color: #C2C2C2;
  --text-color: #504F4F;
  --label-color: #FF8A00;
}

.photographer {
  position: relative;
  background-color: #fff;
  overflow: hidden;
  padding: 0 25px;

  &__label {
    position: absolute;
    padding: 8px 16px;
    right: 0;
    top: 0;
    font-size: 28px;
    color: #fff;
    background-color: var(--label-color);
  }

  &__avatar {
    width: var(--avatar-width);
    height: var(--avatar-width);
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 38px;

    & > a {
      display: block;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      background-color: #eeeeee;
    }

  }

  &__name {
    margin: 25px 0;
    text-align: center;
    font-size: 32px;
    color: var(--text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__meta {
    list-style: none;
    margin: 30px 0;
    padding: 0;
    display: flex;

    &>li {
      line-height: 34px;
      flex: 1;
      font-size: 28px;
      color: #888;
      display: flex;
      align-item: center;
      justify-content: center;
    }

    &__icon {
      margin-right: 14px;
      width: var(--icon-width);
      height: var(--icon-width);
    }
  }

  &__panos {
    list-style: none;
    padding: 0 0 40px 0;
    margin: 0;
    display: flex;

    & li {
      flex: 1;

      &:first-child {
        margin-right: 25px;
      }

      & > div {
        position: relative;
        width: 100%;
        padding-bottom: 100%;

        & > a {
          position: absolute;
          display: block;
          height: 100%;
          width: 100%;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          background-color: #eeeeee;
        }
      }
    }
  }
}
</style>
