<template>
  <div class="photographer">

    <!-- 认证标志 -->
    <div
      v-if="data.is_certificate"
      class="photographer__label"
    >
      <span>{{data.certificate_type_name}}</span>
    </div>

    <!-- 头像 -->
    <div class="photographer__avatar">
      <!-- 跳转摄影师作品页 -->
      <router-link
        :to="`/author/${data.hash_user_id}`"
        :title="`${data.nickname}`"
      >
        <img v-qiniu-src="data.avatar" :alt="`${data.nickname}`">
      </router-link>
    </div>

    <!-- 用户名 -->
    <div class="photographer__name">{{data.nickname}}</div>

    <!-- 用户信息 -->
    <ul class="list photographer__meta">
      <li>
        <svg class="photographer__meta__icon">
          <use xlink:href="#photo"/>
        </svg>
        <span>{{ data.panoramas }}</span>
      </li>
      <li>
        <svg class="photographer__meta__icon">
          <use xlink:href="#eye"/>
        </svg>
        <span>{{ data.popular | visited }}</span>
      </li>
      <li>
        <svg class="photographer__meta__icon">
          <use xlink:href="#like"/>
        </svg>
        <span>{{ data.stargazers | visited }}</span>
      </li>
    </ul>

    <!-- 用户作品 -->
    <ul class="list photographer__panos">
      <li v-for="(pano,index) in panos" :key="index">
        <div>
          <a
            :href="`/pano/view/${pano.hash_pano_id}`"
            :title="pano.name"
          >
            <img v-qiniu-src="pano.thumb" :alt="pano.name">
          </a>
        </div>
      </li>
      <!-- 缺省图片 -->
      <li v-for="index in (2 - panos.length)" :key="index">
        <div>
          <a title="暂无更多作品">
            <img v-qiniu-src alt="暂无更多作品">
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

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

:root {
  --avatar-width: 356px;
  --border-color: #BFBFBF;
  --icon-width: 30px;
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

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
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
    margin: 30px 0;
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
      fill: var(--icon-color);
    }
  }

  &__panos {
    padding: 0 0 40px 0;
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

          & > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 640px) {
  .photographer {
    padding: 16px;

    &__label {
      padding: 0 10px;
      line-height: 32px;
      font-size: 20px;
    }

    &__avatar {
      width: calc(var(--avatar-width) * 0.8);
      height: calc(var(--avatar-width) * 0.8);
      margin-top: 20px;
    }

    &__name {
      font-size: 20px;
      margin: 16px 0;
    }

    &__meta {
      margin: 20px 0;

      &>li {
        font-size: 10px;
        line-height: calc(var(--icon-width) * 0.8);
      }

      &__icon {
        margin-right: 8px;
        width: calc(var(--icon-width) * 0.8);
        height: calc(var(--icon-width) * 0.8);
      }
    }

    &__panos {
      padding-bottom: 16px;

      li {
        &:first-child {
          margin-right: 16px;
        }
      }
    }
  }
}

@media screen and (min-width: 750px) {
  .photographer {
    padding: 14px;

    &__label {
      padding: 0 8px;
      line-height: 24px;
      font-size: 14px;
    }

    &__avatar {
      width: calc(var(--avatar-width) * 0.4);
      height: calc(var(--avatar-width) * 0.4);
    }

    &__name {
      font-size: 16px;
    }

    &__meta {
      margin: 14px 0;

      & > li {
        line-height: calc(var(--icon-width) * 0.5);
      }

      &__icon {
        margin-right: 8px;
        width: calc(var(--icon-width) * 0.5);
        height: calc(var(--icon-width) * 0.5);
      }
    }

    &__panos {
      padding-bottom: 14px;

      li {
        &:first-child {
          margin-right: 14px;
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .photographer {
    padding: 10px;

    &__label {
      padding: 0 6px;
      line-height: 18px;
      font-size: 10px;
    }

    &__avatar {
      width: calc(var(--avatar-width) * 0.3);
      height: calc(var(--avatar-width) * 0.3);
    }

    &__name {
      font-size: 12px;
    }

    &__meta {
      margin: 10px 0;

      & > li {
        font-size: 8px;
        line-height: calc(var(--icon-width) * 0.4);
      }

      &__icon {
        margin-right: 8px;
        width: calc(var(--icon-width) * 0.4);
        height: calc(var(--icon-width) * 0.4);
      }
    }

    &__panos {
      padding-bottom: 10px;

      li {
        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
