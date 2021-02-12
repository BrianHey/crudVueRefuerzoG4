import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    instrumentos: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    GET_INSTRUMENTS(state, instrumentos) {
      state.instrumentos = instrumentos;
    },
  },
  actions: {
    get_Instruments({ commit }) {
      axios
        .get(
          "https://us-central1-crud-vue-firebase-3af18.cloudfunctions.net/instrument/instruments"
        )
        .then((respuesta) => {
          const { data: instrumentos } = respuesta;
          commit("GET_INSTRUMENTS", instrumentos);
        });
    },

    new_Product({ dispatch }, instrument) {
      axios
        .post(
          "https://us-central1-crud-vue-firebase-3af18.cloudfunctions.net/instrument/instrument",
          instrument
        )
        .then((data) => {
          dispatch("get_Instruments");
        })
        .catch((e) => console.log(e));
    },

    update_Product({ dispatch }, { instrument, id }) {
      axios
        .put(
          `https://us-central1-crud-vue-firebase-3af18.cloudfunctions.net/instrument/instrument/${id}`,
          instrument
        )
        .then(() => {
          dispatch("get_Instruments");
        });
    },

    delete_Product({ dispatch }, id) {
      axios
        .delete(
          `https://us-central1-crud-vue-firebase-3af18.cloudfunctions.net/instrument/instrument/${id}`
        )
        .then(() => {
          dispatch("get_Instruments");
        })
        .catch((e) => console.log(e));
    },
  },
  getters: {
    instrumentsData: (state) => {
      return state.instrumentos.map((i) => {
        return {
          ...i.data,
          id: i.id,
        };
      });
    },

    getInstrumentById: (state) => (id) => {
      return state.instrumentos.find((i) => i.id == id);
    },
  },

  plugins: [createPersistedState()],
});
