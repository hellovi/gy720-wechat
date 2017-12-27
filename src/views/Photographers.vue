<template>
  <div>
    <FilterBar />
    <ul class="photographer-list">
      <li>
        <Photographer/>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Photographers',
}
</script>

<style>
.photographer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
