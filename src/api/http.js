import axios from 'axios'
import Qs from 'qs'

// 上传文件
export const upload_elf = (formData) => {
  return axios.request({
    method: 'post',
    url: '/api/uploadElf',
    data: formData,
    headers: {'Content-Type':'multipart/form-data'},
  })
}

// 设置程序输入
export const set_input = (input_data, pid) => {
  console.log(input_data, pid)
  return axios.request({
    method: 'post',
    url: '/api/setInput',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
    data: {
      input_data,
      pid
    }
  })
}

// 设置程序输出
export const get_ouput = (pid) => {
  return axios.request({
    method: 'get',
    url: '/api/getOutput',
    params: {
      pid
    }
  })
}