import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const gdbState = {
  currentPid: -1,
  // key is pid
  gdbs: {},
  buttonsDisabled: true
}

const getters = {}

const mutations = {
  updateGdb(state, payload) {
    state['gdbs'][payload.pid] = payload
  },
  setCurrentPid(state, pid) {
    state['currentPid'] = pid
  },
  enableButtons(state) {
    state['buttonsDisabled'] = false
  }
}

export default new Vuex.Store({
  state: gdbState,
  mutations: mutations,
  getters: getters
})
