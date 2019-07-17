import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const gdbState = {
  // key is pid
  gdbs: {}
}

const getters = {}

const mutations = {
  newGdb(state, payload) {
    state['gdbs'][payload.pid] = payload
  }
}

export default new Vuex.Store({
  state: gdbState,
  mutations: mutations,
  getters: getters
})
