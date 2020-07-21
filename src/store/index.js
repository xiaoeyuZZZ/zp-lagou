import Vue from 'vue'
import Vuex from 'vuex'
import {getters} from './getters'
import user from './user'
import permission from './user/permission'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    permission,
  },
  getters
});
