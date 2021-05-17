import Vue from 'vue';
import Vuex from 'vuex';
import mutations from '@/store/mutations';
import state from '@/store/state';
import getters from '@/store/getters';
import actions from '@/store/actions';

Vue.use(Vuex);

const store =  new Vuex.Store ({
  state,
  mutations,
  getters,
  actions
});

export default store;