<template>
  <div
    v-show="!hideNav"
    class="app-menu"
    :class="{open}"
  >
    <nav class="app-menu__nav">
      <ul class="list">
        <li
          v-for="item in items"
          :key="item.name"
        >
          <router-link
            class="app-menu__item"
            :to="item.to"
          >
            <svg fill="#444"><use :xlink:href="`#${item.icon}`"/></svg>
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <button
      class="app-menu__btn"
      @click="switchNav"
    >
      <svg>
        <use xlink:href="#plus-circled"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  name: 'AppNavi',

  data() {
    return {
      items: [
        {
          name: '看全景',
          to: '/panos',
          icon: 'eye-outline',
        },
        {
          name: '发布',
          to: '/user/publish',
          icon: 'airplane',
        },
        {
          name: '我的',
          to: '/user/mypanos',
          icon: 'avatar',
        },
      ],

      open: false,
      show: true,
    }
  },

  computed: {
    // 返回当前path
    currentRouter() {
      return this.$route.path
    },

    // 判断当前路由是否设置了该路由不显示该组件
    hideNav() {
      return this.$route.meta.hideNav
    },
  },

  watch: {
    // 路由变化的时候重置导航栏
    currentRouter() {
      this.open = false
    },
  },

  methods: {
    // 展开/收回导航栏
    switchNav() {
      this.open = !this.open
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

:root {
  --nav-size: 350px;
  --circle-size: 68px;
}

.app-menu {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: var(--nav-size);
  height: 210px;
  overflow: hidden;
  transition: transform 0.3s;
  font-size: 18px;
}

.app-menu__btn {
  position: absolute;
  left: 50%;
  bottom: 12px;
  width: var(--circle-size);
  height: var(--circle-size);
  padding: 0;
  border: 0;
  border-radius: 50%;
  background-color: transparent;
  font-size: inherit;
  transform: translateX(-50%);
  transition: inherit;

  &:focus {
    outline: none;
  }

  & svg {
    width: 100%;
    height: 100%;
    zoom: 0.75;
    fill: var(--primary-color);
  }
}

.app-menu__nav {
  width: 100%;
  height: var(--nav-size);
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  transform: rotate(315deg) scale(0);
  transition: inherit;
}

.app-menu__item {
  position: absolute;
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
  background-color: #fff;
  text-decoration: none;
  font-size: 24px;

  & svg {
    height: 70%;
    position: absolute;
    left: 34px;
    top: 34px;
    transform: translate(-50%, -50%);
  }

  & span {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 7px;
    color: #fff;
    white-space: nowrap;
  }
}

:first-child > .app-menu__item {
  top: 88px;
  left: 21px;
}

:nth-child(2) > .app-menu__item {
  top: 17px;
  left: 50%;
  transform: translateX(-50%);
}

:last-child > .app-menu__item {
  top: 88px;
  right: 21px;
}

.open {
  & .app-menu__btn {
    transform: translateX(-50%) rotate(315deg);
  }
  & .app-menu__nav {
    transform: rotate(0) scale(1);
  }
}
</style>

