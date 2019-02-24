import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      gamesPlayed: [],
  },
  mutations: {
      saveGame (state, game) {
        state.gamesPlayed.push(game)
      }
  },
  actions: {
      saveGame (state, game) {
        state.commit('saveGame', game)
      }
  }
});
