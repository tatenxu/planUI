import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';
import baseinfo from './modules/baseinfo';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// store可以理解为一个容器，包含着应用中的state等
export default new Vuex.Store({
  state: {},
  getters,
  actions: actions,
  modules: {
    baseinfo,
  },
  // strict: debug,
  plugins: [createLogger()]
})
