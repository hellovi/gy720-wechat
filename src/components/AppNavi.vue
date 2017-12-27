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
            <svg viewBox="0 0 68 68" fill="#444"><use :href="`#${item.icon}`"/></svg>
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <button
      class="app-menu__btn"
      @click="switchNav"
    >
      <svg viewBox="0 0 68 68">
        <path d="M56.333,9.661 C50.100,3.431 41.817,-0.000 33.003,-0.000 C24.188,-0.000 15.902,3.431 9.670,9.661 C3.435,15.893 -0.000,24.182 -0.000,33.000 C-0.000,41.820 3.435,50.107 9.667,56.339 C15.900,62.569 24.186,66.000 33.000,66.000 C41.814,66.000 50.100,62.569 56.331,56.339 C62.568,50.105 66.003,41.815 66.000,32.998 C66.003,24.180 62.570,15.893 56.333,9.661 L56.333,9.661 ZM50.000,35.000 L35.000,35.000 L35.000,49.000 C35.000,50.309 34.304,51.942 33.003,51.942 C31.701,51.942 31.000,50.309 31.000,49.000 L31.000,35.000 L17.000,35.000 C15.699,35.000 14.144,34.307 14.144,33.000 C14.144,31.693 15.699,31.000 17.000,31.000 L31.000,31.000 L31.000,16.000 C31.000,14.693 31.701,14.057 33.003,14.057 C34.304,14.057 35.000,14.693 35.000,16.000 L35.000,31.000 L49.000,31.000 C50.304,31.000 51.861,31.693 51.861,33.000 C51.861,33.745 51.303,35.000 50.000,35.000 L50.000,35.000 Z"/>
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

