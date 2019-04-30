import axios from 'axios'

export const uploadelf = () => {
    return axios.request({
        method: 'post',
        url: 'http://dev3.airdb.io:8080/api/uploadelf'
    })
}

export const start = () => {
    return axios.request({
        method: 'get',
        url: 'http://dev3.airdb.io:8080/api/start'
    })
}

export const setBreak = (type, message) => {
    return axios.request({
        method: 'post',
        url: 'http://dev3.airdb.io:8080/api/break',
        data: {
            type,
            message
        }
    })
}

export const gdbContinue = () => {
    return axios.request({
        method: 'get',
        url: 'http://dev3.airdb.io:8080/api/continue'
    })
}

export const next = () => {
    return axios.request({
        method: 'get',
        url: 'http://dev3.airdb.io:8080/api/next'
    })
}

export const getDisassemble = (func_name = 'main') => {
    return axios.request({
        method: 'post',
        url: 'http://dev3.airdb.io:8080/api/disassemble',
        data: {
            func_name
        }
    })
}