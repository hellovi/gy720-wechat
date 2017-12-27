<template>
  <div>
    <!-- 顶部导航 -->
    <FilterBar />

    <!-- 摄影师列表 -->
    <ul class="photographer-list">
      <li>
        <Photographer/>
      </li>
    </ul>

    <!-- 底部导航 -->
    <AppNavi />
  </div>
</template>

<script>

export default {
  name: 'Photographers',
}
</script>

<style>
.photographer-list {
  padding: 0 20px;
  list-style: none;
  margin: 0;
}
</style>
