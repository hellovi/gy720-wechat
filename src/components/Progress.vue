<template>
  <div class="progress">
    <div
      class="progress__inner"
      :class="{success:complete}"
      :style="{ width:`${percent}%` }"
    >
      <span v-if="percent > 12">
        {{percent}}%
      </span>
    </div>
  </div>
</template>

<script>
/**
 * Progress 进度条
 * @author zml
 * @version 2018-01-02
 */

export default {
  name: 'Progress',

  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    // 是否传输完成
    complete() {
      return this.percent === 100
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.progress {
  height: 32px;
  width:98%;
  border-radius: 100px;
  background-color: #E5E5E5;

  &__inner {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 0;
    height: 100%;
    border-radius: 100px;
    transition: all .15s linear;
    background-color: var(--primary-color);

    &.success {
      background-color: var(--success-color)
    }

    & > span {
      color: #fff;
      font-size: 24px;
      margin-right: 25px;
    }
  }
}
</style>
