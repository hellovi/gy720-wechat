<template>
  <div class="filter-bar">
    <div class="filter-content">
      <div class="filter-bar__left">
        <div class="filter" @click="swtichVisible" v-clickoutside="closeVisible">
          <span>{{ leftName }}</span>
          <ul
            v-show="visible"
            class="filter__list"
            @click.stop
          >
            <li
              class="filter__item"
              v-for="list in leftTagData"
              :class="{active: checkedTag.id === list.id}"
              :key="list.id"
              @click="checkHandle(list)"
            >{{ list.name }}</li>
          </ul>
        </div>
        <!-- 当前选中 -->
        <span class="filter-bar__left-checked" v-if="checkedTag">{{ checkedTag.name }}</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'FilterBar',

  props: {
    leftName: {
      type: String,
      default: '作品标签',
    },

    leftTagData: {
      type: Array,
      default: () => ([]),
    },

    tagField: {
      type: String,
      default: 'tag_id',
    },
  },

  data() {
    return {
      visible: false,
      filterSort: false,
    }
  },

  computed: {
    checkedTag() {
      const tagFieldId = this.$route.query && +this.$route.query[this.tagField]
      return tagFieldId ? this.leftTagData.find(item => item.id === tagFieldId) || { name: '' } : { name: '全部' }
    },
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

    checkHandle(item) {
      this.visible = false
      this.$emit('tag-update', item)
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.filter-bar {
  position: relative;
  height: 100px;
  background-color: #ebebeb;
  font-size: 28px;
  padding: 20px;
  z-index: 10;

  & .filter-content {
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: 100%;
    padding: 0 calc(16 / 710 * 100%);
  }

  &__left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &-checked {
      margin-left: 10px;
      background: transparent;
      color: #8b8b8b;
    }
  }
}

.filter {
  display: flex;
  align-items: center;

  &::after {
    content: "";
    border-width: 10px 10px 0 10px;
    border-style: solid;
    border-color: currentColor transparent transparent;
    margin-left: calc(6 / 14 * 1em);
  }
}

.filter__list {
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  line-height: 58px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 10px;
  font-size: 24px;
  color: #333;
  text-align: center;
  cursor: pointer;

  &.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: #fff;
  }
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

@media screen and (min-width: 640px) {
  .filter-bar {
    font-size: 20px;
    padding: 16px;
    height: 80px;

    .filter {
      &::after {
        content: "";
        border-width: 8px 8px 0 8px;
      }
    }

    .filter__list {
      width: 80%;
      padding: 16px;

      .filter__item {
        width: calc((100% - 64px) / 4);
        height: 40px;
        line-height: 38px;
        font-size: 16px;
        margin: 8px;
      }
    }
  }
}

@media screen and (min-width: 750px) {
  .filter-bar {
    font-size: 16px;
    padding: 14px;

    .filter {
      &::after {
        content: "";
        border-width: 6px 6px 0 6px;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .filter-bar {
    font-size: 12px;
    padding: 10px;
    height: 60px;

    .filter {
      &::after {
        content: "";
        border-width: 4px 4px 0 4px;
      }
    }
  }
}

</style>
