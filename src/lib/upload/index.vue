<template>
  <div>
    <a-upload
      name="avatar"
      :showUploadList="showUploadList"
      :list-type="listType"
      class="avatar-uploader"
      :class="addClass"
      :disabled="loading"
      :remove="handleRemove"
      :customRequest="handleUpload"
      :file-list="fileList"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < maxList">
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">
          {{ uploadText }}
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    <div class="upload_tip" v-if="showTip">
      <p class="color-lightgrey">
        {{ typeTip }}
      </p>
      <p class="blue_style_box padding10">
        <a-icon class="color-blue" type="info-circle" theme="filled" />
        上传的图片将向用户展示，请慎重上传！
      </p>
    </div>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name:'wUpload',
  props: {
    uploadApi:{
      type:Function
    },
    showTip: {
      type: Boolean,
      default: true
    },
    showUploadList: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default() {
        return true
      }
    },
    typeTip: {
      type: String,
      default: '图片格式支持：bmp、jpeg、jpg、png，大小不超过2MB'
    },
    borderRadius: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    maxList: {
      type: Number,
      default: 1
    },
    defaultList: {
      type: Array,
      default: () => []
    },
    uploadText: {
      type: String,
      default: '上传照片'
    },
    name: {
      type: String,
      default: null
    }
  },
  computed: {
    addClass() {
      return {
        avatar_radius: this.borderRadius,
        large_size: this.size === 'large',
        small_size: this.size === 'small',
        mini_size: this.size === 'mini'
      }
    }
  },
  data() {
    return {
      fileList: [],
      loading: false,
      previewImage: '',
      previewVisible: false
    }
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('图片格式支持：bmp、jpeg、jpg、png!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleChange(info) {},
    async handleUpload(file) {
      if (this.loading) {
        return
      }
      this.loading = true
      const data = await uploadApi(file, progress => {})
      this.fileList.push({
        uid: file.file.name + this._.random(0, 100),
        name: file.file.name,
        status: 'done',
        url: data.url
      })
      this.loading = false
      console.log(222, this.fileList)
      let params = {
        name: this.name,
        file: file,
        img: data.url
      }
      this.$emit('uploadOk', params)
    }
  }
}
</script>
<style lang="less">
.avatar_radius {
  .ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container,
   .ant-upload-list-picture-card .ant-upload-list-item {
    border-radius: 50%;
    overflow: hidden;
    padding: 0; // 图片和边框的距离
  }
}
.small_size {
  .ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container {
    width: 70px;
    height: 70px;
  }
}
.mini_size {
  .ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container {
    width: 40px;
    height: 40px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    width: 100%;
    height: 100%;
  }
}
</style>
