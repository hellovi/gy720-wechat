<template>
  <div
    class="app-menu"
    :class="{open}"
  >
    <nav class="app-menu__nav">
      <ul>
        <li
          v-for="item in items"
          :key="item.name"
        >
          <router-link
            class="app-menu__item"
            :to="item.to"
          >
            <svg fill="#444"><use :href="`#${item.icon}`"/></svg>
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
        <use href="#plusmenu"></use>
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
          to: '/',
          icon: 'eye-outline',
        },
        {
          name: '发布',
          to: '/',
          icon: 'publish',
        },
        {
          name: '我的',
          to: '/',
          icon: 'user',
        },
      ],
      open: false,
    }
  },

  methods: {
    switchNav() {
      this.open = !this.open
    },
  },
}
</script>

<style lang="postcss">
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
    fill: #439ffa;
  }
}

.app-menu__nav {
  width: 100%;
  height: var(--nav-size);
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  transform: rotate(315deg) scale(0);
  transition: inherit;

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

.app-menu__item {
  position: absolute;
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
  background-color: #fff;
  text-decoration: none;

  & svg {
    width: 70%;
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

