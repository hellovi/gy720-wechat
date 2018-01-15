<template>
  <div
    v-show="!hideNav"
    class="app-menu max-box"
    :class="{open}"
  >
    <nav class="app-menu__nav max__nav">
      <ul class="list">
        <li
          v-for="item in items"
          :key="item.name"
        >
          <div
            class="app-menu__item max__item"
            @click="routeSkip(item.to)"
          >
            <svg fill="#444"><use :xlink:href="`#${item.icon}`"/></svg>
            <span>{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </nav>
    <button
      class="app-menu__btn max__btn"
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
    // 判断当前路由是否设置了该路由不显示该组件
    hideNav() {
      return this.$route.meta.hideNav
    },
  },

  watch: {
    // 路由变化的时候重置导航栏
    $route() {
      this.open = false
    },
  },

  methods: {
    // 展开/收回导航栏
    switchNav() {
      this.open = !this.open
    },

    // 菜单跳转
    routeSkip(to) {
      if (to === '/panos') {
        this.open = false
      }
      this.$router.push(to)
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
  pointer-events: none;

  &.open {
    & .app-menu__nav {
      transform: rotate(0) scale(1);
    }
    & .app-menu__btn {
      transform: translateX(-50%) rotate(315deg);
    }
  }
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
  pointer-events: auto;

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
  pointer-events: auto;
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
    max-width: 100%;
    max-height: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
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
  top: 25%;
  left: 7%;
}

:nth-child(2) > .app-menu__item {
  top: 4%;
  left: 50%;
  transform: translateX(-50%);
}

:last-child > .app-menu__item {
  top: 25%;
  right: 7%;
}

@media screen and (min-width: 640px) {
  .app-menu {
    width: calc(var(--nav-size) * 0.8);
    height: calc(210px * 0.8);

    .app-menu__btn {
      width: calc(var(--circle-size) * 0.8);
      height: calc(var(--circle-size) * 0.8);
    }

    .app-menu__nav {
      height: calc(var(--nav-size) * 0.8);
    }

    .app-menu__item {
      width: calc(var(--circle-size) * 0.8);
      height: calc(var(--circle-size) * 0.8);
      font-size: 18px;

      & span {
        margin-top: 6px;
      }
    }
  }
}


@media screen and (min-width: 750px) {
  .app-menu {
    width: calc(var(--nav-size) * 0.6);
    height: calc(210px * 0.6);

    .app-menu__btn {
      width: calc(var(--circle-size) * 0.6);
      height: calc(var(--circle-size) * 0.6);
    }

    .app-menu__nav {
      height: calc(var(--nav-size) * 0.6);
    }

    .app-menu__item {
      width: calc(var(--circle-size) * 0.6);
      height: calc(var(--circle-size) * 0.6);
      font-size: 14px;

      & span {
        margin-top: 4px;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .app-menu {
    &.max-box {
      width: var(--nav-size);
      height: 210px;
    }

    .app-menu__btn {
      &.max__btn {
        width: var(--circle-size);
        height: var(--circle-size);
      }
    }

    .app-menu__nav {
      &.max__nav {
        height: var(--nav-size);
      }
    }

    .app-menu__item {

      &.max__item {
        width: var(--circle-size);
        height: var(--circle-size);
        font-size: 14px;

        & span {
          margin-top: 10px;
        }
      }
    }
  }
}

</style>

