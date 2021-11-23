import Vue from 'vue'
import Vuex from 'vuex'
import Rules from './modules/rules'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rules: Rules
  }
})
