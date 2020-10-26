import axios from '@/utils/request/index'
export const oss = () => {
  return axios.request({
    url: '/oss/auth',
    method: 'get'
  })
}

export const getImageMeta = url => {
  return axios.request({
    url: url + '?x-oss-process=image/info',
    method: 'get'
  })
}
export const postObject = async ({ oss: ossData, key, file, onProgress }) => {
  const data = new FormData()
  data.append('OSSAccessKeyId', ossData.OSSAccessKeyId)
  data.append('success_action_status', 200)
  data.append('policy', ossData.policy)
  data.append('Signature', ossData.Signature)
  data.append('key', key)
  data.append('file', file)
  let url = 'https://pic1.baobaohehu.com/'
  await axios.request({
    url,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: onProgress || null,
    data
  })
  url = url + key
  let meta
  console.log(333, file, file.type)
  if (file.type.indexOf('image') > -1) {
    meta = await getImageMeta(url)
  } else if (file.type.indexOf('video') > -1) {
    meta = {
      ...file.videoMeta,
      size: file.size
    }
  } else if (file.type.indexOf('audio') > -1) {
    meta = {
      size: file.size,
      type: file.type
    }
  } else {
    throw new Error(
      '当前上传的类型不是image或者video；当前上传的类型是' + file.type
    )
  }
  return {
    url,
    meta: meta
  }
}
// 获取文件后缀名
export const extname = filename => {
  if (!filename || typeof filename !== 'string') {
    return false
  }
  const a = filename
    .split('')
    .reverse()
    .join('')
  const b = a
    .substring(0, a.search(/\./))
    .split('')
    .reverse()
    .join('')
  return b
}
/**
 * 封装下oss获取跟上传
 * @param file
 * @param onProgress
 * @returns {Promise.<*>}
 */
export const upload = async (file, onProgress) => {
  const File = file.file
  console.log('file===', File)
  const { data } = await oss()
  const random = Math.floor(Math.random() * (100 - 1)) + 1
  let fileName = new Date().getTime()
  const fileType = extname(File.name)
  fileName = fileName + random + '.' + fileType
  const key = `${data.path}${data.prefix}/${fileName}`
  const res = await postObject({ oss: data, key, file: File, onProgress })
  return res
}
