<template>
  <div class="photographer">

    <!-- 认证标志 -->
    <div class="photographer__label">
      <span>企业认证</span>
    </div>

    <!-- 头像 -->
    <div class="photographer__avatar">
      <router-link
        to="/mypanos"
        :style="{backgroundImage:`url(${require('@/assets/default.jpg')})`}"
        title="图片说明"
      ></router-link>
    </div>

    <!-- 用户名 -->
    <div class="photographer__name">包着海苔的饭团包着海苔的饭团包着海苔的饭团包着海苔的饭团包着海苔的饭团</div>

    <!-- 用户信息 -->
    <ul class="photographer__meta">
      <li>
        <svg fill="#C2C2C2" class="photographer__meta__icon">
          <use href="#photo"/>
        </svg>
        <span>23</span>
      </li>
      <li>
        <svg fill="#C2C2C2" class="photographer__meta__icon">
          <use href="#eye"/>
        </svg>
        <span>{{ 193324 | visited}}</span>
      </li>
      <li>
        <svg fill="#C2C2C2" class="photographer__meta__icon">
          <use href="#like"/>
        </svg>
        <span>{{ 65421 | visited}}</span>
      </li>
    </ul>

    <!-- 用户作品 -->
    <ul class="photographer__panos">
      <li>
        <div>
          <a href="#"
            :style="{backgroundImage:`url(${require('@/assets/default.jpg')})`}"
            title="图片说明"
          ></a>
        </div>
      </li>
      <li>
        <div>
          <a href="#"
            :style="{backgroundImage:`url(${require('@/assets/default.jpg')})`}"
            title="图片说明"
          ></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Photographer',

  filters: {
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
    padding: 0 14px;
    right: 0;
    top: 0;
    font-size: 24px;
    line-height: 44px;
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
    padding: 0 0 50px 0;
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
