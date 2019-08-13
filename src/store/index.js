import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentPid: -1,
  assmb_data: [], // 汇编代码
  buttonsDisabled: true,
  loading: false
}

// Vuex的compute属性
const getters = {}

const mutations = {
  updateData(state, data) {
    switch (data.data_flag) {
      case 'assmb':
        // state.assmb_data[data.pid] = data.data
        // console.log(state.assmb_data[data.pid])
        state.assmb_data = data.data
        break;
      default:
        break;
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
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})
