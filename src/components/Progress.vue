<template>
  <div class="progress">
    <div class="progress__inner">
      <div class="progress__bg" :class="{success:complete}" :style="{ width:`${percent}%` }">
        <span v-if="percent>12">{{percent}}%</span>
      </div>
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:rgba(0, 0, 0, 0.3);

  &__inner {
    position: absolute;
    top:50%;
    left:50%;
    margin-top:-16px;
    margin-left:-49%;
    height: 32px;
    width:98%;
    border-radius: 100px;
    background-color: #E5E5E5;
  }

  &__bg {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 85%;
    height: 100%;
    border-radius: 100px;
    transition: all .15s linear;
    background-color: var(--primary-color);

    &.success {
      background-color: var(--success-color)
    }

    & > span {
      color: #fff;
      font-size: 12px;
      margin-right: 25px;
    }
  }
}
</style>
