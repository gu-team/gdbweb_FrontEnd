import axios from 'axios'

// 携带cookie，怎么配置都无效，绝了
// axios.defaults.withCredentials = true;

export const uploadelf = () => {
    return axios.request({
        method: 'post',
        url: '/api/uploadelf'
    })
}

export const start = () => {
    return axios.request({
        method: 'get',
        url: '/api/start'
    })
}

export const setBreak = (type, message) => {
    return axios.request({
        method: 'post',
        url: '/api/break',
        data: {
            type,
            message
        }
    })
}

export const gdbContinue = () => {
    return axios.request({
        method: 'get',
        url: '/api/continue'
    })
}

export const next = () => {
    return axios.request({
        method: 'get',
        url: '/api/next'
    })
}

export const getDisassemble = (funName = 'main') => {
    return axios.request({
        method: 'post',
        url: '/api/disassemble',
        data: {
            funName
        }
    })
}