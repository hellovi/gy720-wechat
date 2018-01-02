<template>
  <label class="upload">
    <svg><use href="#plus"/></svg>
    <p>请上传2:1全景图</p>
    <p>目前支持 JPG、JPEG格式</p>
    <input
      type="file"
      hidden
      multiple
      accept='image/*'
      @change="onChange"
     >
  </label>
</template>

<script>

const defaultFile = {
  upload_id: null,
  name: '暂无图片名称',
  preview: '',
  percent: 0,
  ok: false,
  message: '等待上传...',
}

export default {
  name: 'Upload',

  data() {
    return {

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
    onChange(event) {
      [...event.target.files].forEach((file) => {
        // 取随机数作为 upload_id
        // eslint-disable-next-line
        const upload_id = parseInt(100000 * Math.random())

        // 文件预览名和 upload_id
        this.$emit('add-scene', {
          ...defaultFile,
          upload_id,
          name: file.name,
        })
        // 读取文件
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          // 本地预览图片（base64）
          this.$emit('update-scene', upload_id, {
            preview: reader.result,
          })
          // 上传图片
          this.imgUpload(upload_id, file)
        })
        reader.readAsDataURL(file)
      })
    },

    imgUpload(upload_id, file) {
      // formData格式
      const formData = new FormData()
      formData.append('upload_id', upload_id)
      formData.append('file', file)
      formData.append('source_scene_category_id', 1)

      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/user/sourcescene/uploadnormal', true)
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
      xhr.setRequestHeader('Accept', 'application/json')
      // xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.send(formData)

      // console.log(xhr)

      xhr.addEventListener('load', () => {
        // console.log(res)
      })

      xhr.addEventListener('progress', (event) => {
        // const percentComplete = event.loaded / event.total
        console.log(event)
      })

      xhr.addEventListener('error', (res) => {
        console.log(res)
      })
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

</style>
