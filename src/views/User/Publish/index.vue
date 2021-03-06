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
        @remove-scene="removeScene"
      ></Upload>

      <!-- 作品名称 -->
      <div class="publish__cell">
        <svg><use xlink:href="#pencil"/></svg>
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
        type="button"
        :disabled="disabled"
        class="publish__btn"
        @click="beforeSubmit"
      >发 布</button>

    </form>

    <!-- 提示信息 -->
    <toast
      :message = "toast.msg"
      :iconClass = "toast.class"
      :toastShow.sync = "toast.visible"
    ></toast>

    <!-- 底部标记 -->
    <div ref="footerTag"></div>

  </div>
</template>

<script>

import ImgMask from './components/ImgMask'
import Upload from './components/Upload'

export default {
  name: 'Publish',

  components: {
    ImgMask,
    Upload,
  },

  data() {
    return {
      form: {
        name: '', // 作品名称
        thumb: '', // 封面，默认取第一个场景的封面
        pano_category_id: 1, // 选择默认场景
        tag_id: [], // 作品标签
      },

      timer: null, // 存放检查切图进度的定时器

      scenes: [], // 场景数据

      toast: {
        class: 'success', // 提示框图标样式
        visible: false, // 提示框显示
        msg: '', // 提示框信息
      },

      disabled: false, // 提交按钮的状态
    }
  },

  computed: {
    // 查出已经上传成功 & 未切图成功的场景的ids
    source_scene_ids() {
      return this.scenes
        .map(scene => !scene.ok && scene.source_scene_id)
        .filter(source_scene_id => source_scene_id)
    },

    // 过滤出可供表单提交的场景数据
    submitScenes() {
      return this.scenes
        .filter(scene => scene.ok)
        .map(({ source_scene_id, thumb, name }) => ({
          source_scene_id,
          thumb,
          name,
        }))
    },

  },

  methods: {
    // 添加场景
    addScene(scene) {
      this.scenes.push(scene)
      this.$refs.footerTag.scrollIntoView()
    },

    // 自动删除不符合标准的场景
    removeScene(id) {
      const index = this.scenes
        .findIndex(({ upload_id }) => upload_id === id)
      // 延时三秒删除该场景
      setTimeout(() => {
        this.scenes.splice(index, 1)
      }, 3000)
    },

    // 更新场景信息
    updateScene(id, data) {
      // 找到我上传时提交的随机数，或者是存储到数据库的真正id
      const index = this.scenes
        .findIndex(({ upload_id, source_scene_id }) => (source_scene_id === id || upload_id === id))
      // 更新数据
      this.$set(this.scenes, index, {
        ...this.scenes[index],
        ...data,
      })
    },

    // 轮询场景是否切图成功
    checkOk() {
      this.timer = setInterval(() => {
        const { source_scene_ids } = this
        if (source_scene_ids.length) {
          this.$http.post('/user/sourcescene/vtourprocess', { source_scene_ids })
            .then(({ result }) => {
              // 注意，这里的id是最终保存到数据库的id，source_scene_id
              result.forEach(({ id, vtour_status, message }) => {
                if (vtour_status === 30) {
                  // console.log('ok', id, vtour_status, message)
                  this.updateScene(id, {
                    reason: message,
                    ok: true,
                  })
                } else {
                  // console.log('nook', id, vtour_status, message)
                  this.updateScene(id, {
                    reason: message,
                  })
                }
              })
            })
        }
      }, 5000)
    },

    // 发布作品前的校验
    beforeSubmit() {
      // 校验作品名称长度
      const namMatch = this.form.name.length >= 3 && this.form.name.length <= 30
      // 校验是否有符合标准的场景
      const sceneMatch = this.submitScenes.length > 0

      if (!namMatch) {
        this.openToast('warning', '作品名称长度应在3到30个字符之间')
      } else if (!sceneMatch) {
        this.openToast('warning', '请先上传全景图片')
      } else {
        this.form = {
          ...this.form,
          thumb: this.submitScenes[0].thumb,
          scenes: this.submitScenes,
        }
        this.submit()
      }
    },

    // 表单提交
    submit() {
      this.disabled = true
      this.$http.post('/user/pano', this.form)
        .then(() => {
          this.openToast('success', '发布成功')
          // 跳转到个人中心
          setTimeout(() => {
            this.$router.push('/user/mypanos')
          }, 2000)
        })
        .then(() => {
          this.disabled = false
        })
    },

    // 打开toast
    openToast(type, msg) {
      this.toast.class = type
      this.toast.msg = msg
      this.toast.visible = true
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
  --meta-height: 40px;
  --padding: 20px;
}

.publish {
  padding: var(--padding);
  padding-bottom: 0;

  & > form {
    padding-bottom: 300px;
  }

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
        height: 100%;
      }
    }

    &__meta {
      position: absolute;
      bottom: 0;
      height: var(--meta-height);
      width: 100%;
      padding: 0 10px;
      text-align:left;
      line-height: var(--meta-height);
      background-color: rgba(0, 0, 0, 0.5);
      color:#fff;
      font-size: 24px;
    }
  }

  &__btn {
    display: block;
    text-align: center;
    height: var(--btn-height);
    line-height: var(--btn-height);
    font-size: 36px;
    width: 100%;
    background-color: var(--primary-color);
    color: #fff;
    border-radius:10px;
    border: 0;

    &:disabled {
      background-color: var(--upload-color);
    }
  }

  &__cell {
    padding: var(--padding);
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
      padding: 0 var(--padding);
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

