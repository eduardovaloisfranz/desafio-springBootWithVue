import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { api } from "@/services";

export default new Vuex.Store({
  state: {
    funcionarios: null,
    cargos: null,
  },
  mutations: {
    ADD_FUNCIONARIO(state, payload) {
      state.funcionarios = payload;
    },
    ADD_CARGO(state, payload) {
      state.cargos = payload;
    },
  },
  actions: {
    addFuncionario(context, payload) {
      context.commit("ADD_FUNCIONARIO", payload);
    },
    addCargos(context, payload) {
      context.commit("ADD_CARGO", payload);
    },
    atualizarFuncionarios(context) {      
      api
        .get("api/Funcionario")
        .then((r) => context.commit("ADD_FUNCIONARIO", r.data))
        .catch((res) => console.log(res));
    },
    atualizarCargos(context){      
      api
        .get("api/Cargo")
        .then(res => {
          context.commit("ADD_CARGO", res.data)
        })
    }
  },
});
