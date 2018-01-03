<template>
  <div class="publish">
    <form>
      <!-- 图片列表 -->
      <ul class="publish__list list">
        <li v-for="scene in scenes" :key="scene.upload_id">
          <!-- 图片预览 -->
          <img :src="scene.preview">
          <!-- 遮罩组件 -->
          <img-mask :scene="scene"></img-mask>
          <!-- 作品信息 -->
          <div class="publish__list__meta">{{ scene.name }}</div>
        </li>
      </ul>

      <!-- 上传组件 -->
      <Upload
        @add-scene="addScene"
        @update-scene="updateScene"
      ></Upload>

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

      timer: null, // 存放检查切图进度的定时器

      scenes: [],
    }
  },

  computed: {
    source_scene_ids() {
      return this.scenes
        .map(scene => !scene.ok && scene.source_scene_id)
        .filter(source_scene_id => source_scene_id)
    },
  },

  methods: {
    addScene(scene) {
      this.scenes.push(scene)
    },

    updateScene(id, data) {
      debugger
      const index = this.scenes.findIndex(({ upload_id }) => upload_id === id)
      this.$set(this.scenes, index, {
        ...this.scenes[index],
        ...data,
      })
    },

    checkOk() {
      this.timer = setInterval(() => {
        const { source_scene_ids } = this
        if (source_scene_ids.length) {
          this.$http.post('/user/sourcescene/vtourprocess', { source_scene_ids })
            .then(({ result }) => {
              result.forEach(({ id, vtour_status, message }) => {
                if (vtour_status === 30) {
                  console.log('ok', id, vtour_status, message)
                  this.updateScene(id, {
                    reason: message,
                    ok: true,
                  })
                } else {
                  console.log('nook', id, vtour_status, message)
                  this.updateScene(id, {
                    reason: message,
                  })
                }

                // this.updateScene(id, {
                //   reason: message,
                //   ok: vtour_status === 30,
                // }, true)
              })
              // console.log(result)
            })
        }
      }, 5000)
    },
  },

  mounted() {
    this.checkOk()
  },

  beforeDestroy() {
    clearInterval(this.timer)
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
      position: relative;
      width: 100%;
      height: calc((100vw - 40px) / 2);
      margin-bottom: 20px;
      background-color:rgb(251,251,251);
      text-align:center;
      overflow: hidden;

      & > img {
        // width: 100%;
        height: 100%;
      }
    }

    &__meta {
      position: absolute;
      bottom: 0;
      height: 40px;
      width: 100%;
      padding: 0 10px;
      text-align:left;
      line-height: 40px;
      background-color: rgba(0, 0, 0, 0.5);
      color:#fff;
      font-size: 24px;
    }
  }

  &__btn {
    height: var(--btn-height);
    line-height: var(--btn-height);
    font-size: 36px;
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
          color:var(--upload-color);
        }
      }
    }
  }

}
</style>

