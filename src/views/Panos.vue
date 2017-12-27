<template>
  <div>
    <FilterBar/>

    <ul class="panos">
      <li
        class="pano"
        v-for="i in 10"
        :key="i"
      >
        <div class="pano__image">
          <img src="https://www-statics.gy720.com/data/pano/l4nevvxqexzd/m8rkznzrkdvo/5918503ecdf9d.jpg" alt="">
        </div>
        <div class="pano__info">
          <img
            class="pano__avatar"
            src="https://www-statics.gy720.com/data/avatar/201710/591e65d91ffcb.jpg?imageMogr2/crop/!800x800a0a0"
            alt=""
          >
          <span>房子客厅大门</span>
        </div>
      </li>
    </ul>

    <AppNavi />
  </div>
</template>

<script>
export default {
  name: 'Panos',
}
</script>

<style>
.panos {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  margin: 0 20px;
}

.pano {
  width: 346px;
  max-width: 346px;
  margin-bottom: 20px;
}

.pano__image::before {
  content: "";
  float: left;
  width: 1px;
  margin-top: 100%;
  margin-left: -1px;
}

.pano__image img {
  display: block;
  width: 100%;
  height: 100%;
}

.pano__info {
  display: flex;
  align-items: center;
  height: calc(50 / 750 * 100vw);
  min-height: 30px;
  max-height: 50px;
  background-color: #fff;
  font-size: 24px;
}

.pano__avatar {
  width: calc(54 / 345 * 100%);
  min-width: 35px;
  margin-left: calc(8 / 345 * 100%);
  margin-right: calc(14 / 345 * 100%);
  border-radius: 50%;
  transform: translateY(-22%);
}

@media (min-width: 751px) {
  .panos {
    margin-right: -20px;
  }

  .pano {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
