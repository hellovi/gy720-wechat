<template>
  <div
    v-if="visible"
    class="confirm"
    @click="onCancel"
  >
    <div class="confirm__mask"></div>

    <div class="confirm__dialog">

      <div class="confirm__title">
        <strong>{{title}}</strong>
      </div>

      <div class="confirm__content">
        <slot><div>{{content}}</div></slot>
      </div>

      <div class="confirm__footer" @click="onCancel">
        <a href="javascript:;">
          取消
        </a>
        <a href="javascript:;" @click="onOk">
          确定
        </a>
      </div>
    </div>

  </div>
</template>

<script>
export default {

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '提示',
    },
    content: {
      type: String,
      default: '是否确认?',
    },
  },

  methods: {
    onOk() {
      this.$emit('on-ok')
    },

    onCancel() {
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

:root {
  --border-color:#D5D5D6;
  --text-color:rgb(153, 153, 153);
}

.confirm {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;

  &__mask {
    position: absolute;
    background-color:rgba(0, 0, 0, 0.5);
    width:100%;
    height: 100%;
    z-index: 21;
  }

  &__dialog {
    width: 80%;
    max-width: 600px;
    border-radius: 16px;
    background-color: #fff;
    text-align: center;
    z-index: 22;
  }

  &__title {
    padding: 40px 0 16px 0;
    line-height: 1.6;

    & > strong {
      font-weight: 400;
      font-size:36px;
    }
  }

  &__content {
    min-height: 104px;
    font-size: 30px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: var(--text-color);
    padding: 0px 48px 24px;
  }

  &__footer {
    position: relative;
    line-height: 96px;
    display: flex;

    & > a {
      position: relative;
      display: block;
      flex: 1;

      &:last-child {
        color: var(--primary-color);

        &::before {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          bottom: 0;
          border-left: 1px solid var(--border-color);
          color: var(--border-color);
          transform-origin: 0 0;
          transform: scaleX(0.5);
        }
      }
    }

    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid var(--border-color);
      color: var(--border-color);
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }
}
</style>
