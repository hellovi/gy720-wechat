<template>
  <div class="nodata" :style="{marginTop:`${top}px`}">
    <svg class="nodata__svg"><use xlink:href="#helpless"/></svg>
    <div class="nodata__content">{{ content }}</div>
  </div>
</template>

<script>
/**
 * NoData 无数据时的缺省图片
 * @author zml
 * @version 2017-12-29
 */

export default {
  name: 'NoData',

  props: {
    content: {
      type: String,
      default: '暂无数据 ...',
    },
    top: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="postcss">

:root {
  --text-color: #999;
  --svg-width: 100px;
}

.nodata {
  width: 100%;
  min-height: calc(100vmin - 120px);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    margin-left: 20px;
    font-size: 30px;
    color:var(--text-color);
  }

  &__svg {
    width: var(--svg-width);
    height: var(--svg-width);
    fill: var(--text-color);
  }
}

@media screen and (min-width: 640px) {
  .nodata {
    &__content {
      margin-left: 10px;
      font-size: 12px;
    }

    &__svg {
      width: calc(var(--svg-width) * 0.4);
      height: calc(var(--svg-width) * 0.4);
    }
  }
}
</style>
