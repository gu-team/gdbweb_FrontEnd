import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentPid: -1,
  isAsm: true, // 是否显示汇编
  source_data: [], // 源代码
  assmb_data: [], // 汇编代码
  register_data: [], // 寄存器数据
  breakpoint_data: [], // 断点数据
  examine_data: [], // 查询内存数据
  backtrace_data: [], // 栈帧数据
  input_data: '', // 程序输入数据
  output_data: null, // 程序输出数据
  files: {}, // 用户上传的文件，key为上传的文件名，value为后端接收后返回的文件名
  buttonsDisabled: true,
  loading: false
}

// Vuex的compute属性
const getters = {}

const mutations = {
  updateData(state, data) {
    switch (data.data_flag) {
      case 'source':
        state.source_data = data.data
        break
      case 'assmb':
        // state.assmb_data[data.pid] = data.data
        // console.log(state.assmb_data[data.pid])
        state.assmb_data = data.data
        break
      case 'register':
        state.register_data = data.data
        break
      case 'breakpoint':
        state.breakpoint_data = data.data
        break
      case 'examine':
        state.examine_data = data.data
        break
      case 'backtrace':
        state.backtrace_data = data.data
        break
      default:
        break
    }
  },
  setCurrentPid(state, pid) {
    state.currentPid = pid
  },
  enableButtons(state) {
    state.buttonsDisabled = false
  },
  disableButtons(state) {
    state.buttonsDisabled = true
  },
  setLoading(state, bool) {
    state.loading = bool
  },
  setIsAsm(state, bool) {
    state.isAsm = bool
  },
  addFile(state, file_name, file_name_backend) {
    state.files[file_name] = file_name_backend
  },
  setOutPut(state, output_data) {
    state.output_data = output_data
  },
  setInPut(state, input_data) {
    state.input_data = input_data
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})
