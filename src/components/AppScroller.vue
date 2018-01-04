/*
 * scroller组件封装（基于vue-scroller）
 * @Author: chenliangshan
 * @Date: 2018-01-04 17:27:12
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2018-01-04 18:15:20
 */

<template>
  <scroller
      :on-refresh="onRefresh"
      :on-infinite="onInfinite"
      :ref="name"
      class="list-scroller"
      :class="className"
      :min-content-height="minContentHeight"
    >
    <slot></slot>
    <NoData v-if="dataEmpty" />
  </scroller>
</template>

<script>
export default {
  name: 'app-scroller',

  props: {
    name: {
      type: String,
      default: 'scrollerList',
    },
    className: {
      type: String,
      default: '',
    },
    // 下拉刷新
    onRefresh: {
      type: Function,
      default: () => {},
    },
    // 上拉加载
    onInfinite: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      dataEmpty: false,
      minContentHeight: 0,
    }
  },

  watch: {
    dataEmpty(newValue) {
      this.minContentHeight = newValue ? 120 : 0
    },
  },

  methods: {
    triggerPullToRefresh() {
      this.$refs[this.name].triggerPullToRefresh()
    },
  },
}
</script>

<style lang="postcss" scoped>
.list-scroller {
  padding-top: 100px;

  .no-data-text {
    font-size: 24px;
  }
}
</style>

