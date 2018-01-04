<template>
  <div
    class="mask"
    v-if="!scene.ok"
  >
    <!-- 进度条 -->
    <Progress
      v-if="scene.percent > 0"
      :percent="scene.percent"
    />

    <!-- 提示信息 -->
    <span v-else >{{scene.reason}}</span>
  </div>
</template>

<script>
export default {

  props: {
    scene: {
      type: Object,
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    font-size: 30px;
    color: #fff;
  }
}

</style>
