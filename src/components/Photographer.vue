<template>
  <div class="photographer">
    <div class="photographer-avatar">
      <img
        src="https://www-statics.gy720.com/data/avatar/201710/591e65d91ffcb.jpg?imageMogr2/crop/!800x800a0a0"
        alt=""
      >
    </div>

    <div class="photographer-name">包着海苔的饭团</div>

    <ul class="photographer-meta">
      <li>23</li>
      <li>45.6万</li>
      <li>6542</li>
    </ul>

    <ul>
      <li>
        <a href="#">
          <img
            src="https://www-statics.gy720.com/data/pano/l4nevvxqexzd/m8rkznzrkdvo/5918503ecdf9d.jpg"
            alt=""
          >
        </a>
      </li>
      <li>
        <a href="#">
          <img
            src="https://www-statics.gy720.com/data/pano/l4nevvxqexzd/m8rkznzrkdvo/5918503ecdf9d.jpg"
            alt=""
          >
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Photographer',
}
</script>

<style>
.photographer {
  background-color: #fff;
}

.photographer-avatar {
  width: calc(356 / 710 * 100%);
  padding: calc(12 / 710 * 100%);
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #fff;
}

.photographer-avatar img {
  display: block;
  width: 100%;
  border-radius: 50%;
}

.photographer-name {
  text-align: center;
  margin: calc(12 / 16 * 1em) 0;
}

.photographer-meta {
  display: flex;
}
</style>
