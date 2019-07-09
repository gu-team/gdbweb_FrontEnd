import axios from 'axios'

// 携带cookie，怎么配置都无效，绝了
// axios.defaults.withCredentials = true;

// 上传文件
export const uploadelf = () => {
  return axios.request({
    method: 'post',
    url: '/api/uploadelf'
  })
}

// 开始
export const start = () => {
  return axios.request({
    method: 'get',
    url: '/api/start'
  })
}

// 设置断点
export const setBreak = (type, data) => {
  return axios.request({
    method: 'post',
    url: '/api/break',
    data: {
      type,
      data
    }
  })
}

// 继续
export const gdbContinue = () => {
  return axios.request({
    method: 'get',
    url: '/api/continue'
  })
}

// 下一步
export const next = () => {
  return axios.request({
    method: 'get',
    url: '/api/next'
  })
}

// 获取汇编
export const getDisassemble = (funName = 'main') => {
  return axios.request({
    method: 'post',
    url: '/api/disassemble',
    data: {
      funName
    }
  })
}