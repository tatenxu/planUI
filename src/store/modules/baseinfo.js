import * as types from '../mutation-types'

const state = {
  // ['formManagement','subGantt','subsubGantt']
  keepAliveOptions: [],
};

const getters = {
  keepAliveOptions: state => state.keepAliveOptions,
};

const actions = {
};

const mutations = {
  [types.INFO_KEEPALIVE_OPT_ARR](state, keepAliveOptions) {
    state.keepAliveOptions = keepAliveOptions;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
