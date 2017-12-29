<template>
  <div class="publish">
    <form>
      <!-- 图片列表 -->
      <ul class="publish__list list">
        <li v-for="item in 1" :key="item">
          <img v-qiniu-src="''" alt="">
          <div class="publish__list__meta">夕阳西下图</div>
        </li>
      </ul>

      <!-- 上传按钮 -->
      <label class="publish__upload">
        <svg><use href="#plus"/></svg>
        <p>请上传2:1全景图</p>
        <p>目前支持TPG、JPEG格式</p>
        <input type="file" hidden>
      </label>

      <!-- 作品名称 -->
      <div class="publish__cell">
        <svg><use href="#edit"/></svg>
        <div class="publish__cell__input">
          <input
            type="text"
            v-model="form.name"
            placeholder="请输入作品名称"
          >
        </div>
      </div>

      <!-- 发布按钮 -->
      <button
        type="submit"
        class="publish__btn"
      >发 布</button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'Publish',

  data() {
    return {
      form: {
        name: '',
      },
    }
  },

}
</script>

<style lang="postcss">
@import 'vars.css';

:root {
  --btn-height:70px;
  --icon-color: #666;
  --upload-color:#959595;
}

.publish {
  padding: 20px 20px 100px 20px;

  &__list {

    & > li {
      width: 100%;
      height: calc((100vw - 40px) / 2);
      position: relative;
      margin-bottom: 20px;

      & > img {
        width: 100%;
        height: 100%;
      }
    }

    &__meta {
      position: absolute;
      height: 40px;
      line-height: 40px;
      width: 100%;
      padding: 0 10px;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color:#fff;
      font-size: 24px;
    }
  }

  &__upload {
    width: 100%;
    height: calc((100vw - 40px) / 2);
    background-color: #fff;
    border:1px solid #aaa;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom:80px;

    & > svg {
      height: 64px;
      width: 64px;
      fill: var(--upload-color);
      margin-bottom: 20px;
    }

    & > p {
      margin: 0;
      font-size: 26px;
      color: var(--upload-color);
      margin-top: 20px;
    }
  }

  &__btn {
    height: var(--btn-height);
    line-height: var(--btn-height);
    width: 100%;
    background-color: var(--primary-color);
    color: #fff;
    border:0;
    border-radius:10px;
  }

  &__cell {
    padding: 20px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #999;
    margin-bottom: 80px;

    & > svg {
      height: 40px;
      width: 40px;
      fill: var(--icon-color);
    }

    &__input {
      flex:1;
      padding: 0 20px;
      font-size: 30px;

      & input {
        width: 100%;
        border: 0;
        outline: 0;
        background-color: transparent;
        font-size: inherit;
        color: inherit;

        &::placeholder {
          color:#959595;
        }
      }
    }
  }

}
</style>
