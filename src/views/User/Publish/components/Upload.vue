<template>
  <div class="upload">
    <label class="upload__label">

      <!-- 图片标准说明 -->
      <svg><use xlink:href="#plus"/></svg>
      <p>请上传 <a>2:1</a> 全景图（宽度大于 <a>3000</a> 像素）</p>
      <p><a>50MB</a> 以下、<a>JPG/JPEG</a> 格式</p>

      <!-- file表单 -->
      <input
        type="file"
        hidden
        multiple
        accept='image/jpg,image/jpeg'
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

  methods: {
    // 图片标准校验
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
      // 定义接口地址和提交形式
      xhr.open('POST', '/user/sourcescene/uploadnormal', true)
      // 设置请求头参数
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
      xhr.setRequestHeader('Accept', 'application/json')
      // xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      // 设置提交数据
      xhr.send(formData)

      // 监听回调
      xhr.addEventListener('load', (data) => {
        const resJson = JSON.parse(data.target.response)

        const { result, status: { code, reason } } = resJson
        // console.log(code, reason, result)

        if (code === 0) {
          // 将接口返回的错误信息，如：“图片宽高比例不是2:1” 展示在遮罩层上
          this.$emit('update-scene', +result.upload_id, {
            reason,
          })
          // 发射事件，延时几秒后移除该场景
          this.$emit('remove-scene', +result.upload_id)
        } else {
          // 上传成功后先自定义一个提示，并且将该场景信息更新和补充
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
    flex-direction:column;
    justify-content: center;
    align-items: center;

    & > *{
      pointer-events: none;
    }

    & > svg {
      height: 64px;
      width: 64px;
      fill: var(--upload-color);
      margin-bottom: 30px;
    }

    & > p {
      margin: 0;
      font-size: 26px;
      color: var(--upload-color);
      margin-top: 18px;

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
