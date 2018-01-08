<template>
  <div id="app">
    <router-view/>
    <!-- 底部导航 -->
    <AppNavi />
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
@import 'global.css';

#app {
  font-family: Microsoft YaHei, OpenSans, Helvetica Neue, Hiragino Sans GB, WenQuanYi Micro Hei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
