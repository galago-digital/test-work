import Vue from 'vue';
import Vuex from 'vuex';
import person from './modules/person';

Vue.use(Vuex);

export default new Vuex.Store({
  // можно было приписывать логику тут, но правильнее будет вынести в модуль
  modules: {
    person,
  },
});
