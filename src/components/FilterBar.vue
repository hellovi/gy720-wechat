<template>
  <div class="filter-bar">
    <div class="filter-bar__left">
      <div
        class="filter"
        @click="swtichVisible"
        v-clickoutside="closeVisible"
      >
        <span>标签</span>
        <ul v-show="visible" class="filter__list" @click.stop>
          <li class="filter__item" v-for="i in 18" :key="i">全部</li>
        </ul>
      </div>
      <button class="filter-bar__left-hand" :class="{active: isHandpick}">精选</button>
    </div>
    <div
      class="filter"
      @click="swtichSort"
      v-clickoutside="closeSort"
    >
      <span>排序</span>
      <ul
        v-show="filterSort"
        class="filter-sort"
        @click.stop
      >
        <li
          class="filter-sort__item"
          v-for="i in 3"
          :key="i"
        >
          <a href="">全部</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterBar',

  data() {
    return {
      visible: false,
      filterSort: false,
      isHandpick: false,
    }
  },

  methods: {
    swtichVisible() {
      this.visible = !this.visible
    },

    swtichSort() {
      this.filterSort = !this.filterSort
    },

    closeVisible() {
      this.visible = false
    },

    closeSort() {
      this.filterSort = false
    },
  },
}
</script>

<style lang="postcss">
.filter-bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 60px;
  min-height: 40px;
  max-height: 60px;
  padding: 0 calc(16 / 710 * 100%);
  margin-bottom: 20px;
  background-color: #fff;
  font-size: 28px;

  &__left {
    display: flex;
    justify-content: flex-start;

    &-hand {
      margin-left: 10px;
      border: 0;
      background: transparent;
      color: #8b8b8b;
    }
  }
}

@media (min-width: 600px) {
  .filter-bar {
    font-size: 16px;
  }
}

.filter {
  display: flex;
  align-items: center;
}

.filter::after {
  content: "";
  border-width: 10px 10px 0 10px;
  border-style: solid;
  border-color: currentColor transparent transparent;
  margin-left: calc(6 / 14 * 1em);
}

.filter__list {
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 468px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 1px 0 0;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  z-index: 10;
}

.filter__item {
  width: 120px;
  height: 60px;
  line-height: 60px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 10px;
  font-size: 24px;
  color: #333;
  text-align: center;
  cursor: pointer;
}

.filter-sort {
  list-style: none;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 1px 0 0;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  z-index: 10;

  &__item {
    font-size: 24px;

    a {
      display: block;
      padding: 10px 30px;
      color: #8b8b8b;
      position: relative;

      &:after {
        position: absolute;
        right: 8px;
        bottom: 0;
        left: 8px;
        height: 1px;
        content: '';
        background-color: #f3f3f3;
      }
    }

    &:last-child {
      a:after {
        height: 0;
      }
    }
  }
}

.app-filter-bar {
  margin: 20px;
}
</style>
