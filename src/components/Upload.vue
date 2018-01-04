<template>
  <div class="upload">
    <label class="upload__label">
      <!-- 加号 -->
      <div class="upload__svg">
        <svg><use xlink:href="#plus"/></svg>
      </div>

      <!-- 图片标准说明 -->
      <div class="upload__tips">
        <p>请上传 <a>2:1</a> 全景图</p>
        <p>比例：宽:高= <a>2:1</a> 例如 <a>4000×2000</a> 像素</p>
        <p>格式：格式 <a>JPG/JPEG</a> 格式</p>
        <p>尺寸：宽度大于 <a>3000</a> 像素</p>
        <p>大小：<a>50MB</a> 以下</p>
        <p>一次可以选择多张（<a>20</a> 张以下）图片上传</p>
      </div>

      <!-- file表单 -->
      <input
        type="file"
        hidden
        multiple
        accept='image/*'
        @change="onChange"
      >
    </label>

    <!-- 格式和大小校验 -->
    <p class="upload__error" v-if="imgFormat">
      不符合格式标准或大小标准的图片已被过滤
    </p>
  </div>
</template>

<script>

const defaultFile = {
  upload_id: null, // 随机数id
  name: '暂无图片名称', // 图片名称
  preview: '', // 本地图片预览
  percent: 0, // 上传进度
  ok: false, // 切图完成标志
  reason: '等待上传...', // 文字提示
}

export default {
  name: 'Upload',

  data() {
    return {
      imgFormat: false,
    }
  },

  computed: {
    headers() {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }
    },
  },

  methods: {
    // 图片格式校验
    onChange(event) {
      [...event.target.files].forEach((file) => {
        // 校验图片格式
        const isMatch = /image\/(jpg|jpeg)/.test(file.type)
        // 校验图片大小
        const isLimited = file.size < 50 * 1024 * 1024

        if (!isMatch) {
          this.imgFormat = true
        } else if (!isLimited) {
          this.imgFormat = true
        } else {
          this.imgPreview(file)
        }
      })
    },

    // 处理每张合法图片的预览
    imgPreview(file) {
      // eslint-disable-next-line
      const upload_id = parseInt(10000000 * Math.random())

      // 文件名过滤后缀
      const formatName = file.name.replace(/\.[^.]+$/, '')

      // 文件预览名和 upload_id
      this.$emit('add-scene', {
        ...defaultFile,
        upload_id,
        name: formatName,
      })

      // 读取图片文件
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        // 本地预览图片（base64）
        this.$emit('update-scene', +upload_id, {
          preview: reader.result,
        })

        // 上传图片
        this.imgUpload(upload_id, file)
      })
      reader.readAsDataURL(file)
    },

    // 图片上传逻辑
    imgUpload(upload_id, file) {
      // formData格式
      const formData = new FormData()
      formData.append('upload_id', upload_id)
      formData.append('file', file)
      formData.append('source_scene_category_id', 1)

      // 定义一个XMLHttpRequest对象
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/user/sourcescene/uploadnormal', true)
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
      xhr.setRequestHeader('Accept', 'application/json')
      // xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.send(formData)

      // 监听回调
      xhr.addEventListener('load', (data) => {
        const resJson = JSON.parse(data.target.response)

        const { result, status: { code, reason } } = resJson
        // console.log(code, reason, result)

        if (code === 0) {
          this.$emit('update-scene', +result.upload_id, {
            reason,
          })
          // 先注释移除事件
          this.$emit('remove-scene', +result.upload_id)
        } else {
          this.$emit('update-scene', +result.upload_id, {
            ...result,
            reason: '正在排队中...',
          })
        }
      })

      // 进度条处理
      // xhr.addEventListener('progress', (event) => {
      //   console.log(event)
      // })
    },
  },
}
</script>

<style lang="postcss">
@import 'vars.css';

:root {
  --upload-color:#959595;
}

.upload {
  width: 100%;
  margin-bottom:60px;

  &__label {
    width: 100%;
    height: calc((100vw - 40px) / 2);
    background-color: #fff;
    border:1px solid #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__svg {
    width:22%;
    text-align: center;

    & > svg {
      height: 64px;
      width: 64px;
      fill: var(--upload-color);
      margin-bottom: 20px;
    }
  }

  &__tips {
    width: 78%;

    & > p {
      margin: 0;
      font-size: 24px;
      color: var(--upload-color);
      margin-top: 15px;

      &:first-child {
        margin-top: 0;
      }

      & > a {
        color: var(--primary-color)
      }
    }
  }

  &__error {
    text-align: center;
    margin: 0;
    margin-top: 16px;
    font-size: 28px;
    color: var(--error-color)
  }
}

</style>
