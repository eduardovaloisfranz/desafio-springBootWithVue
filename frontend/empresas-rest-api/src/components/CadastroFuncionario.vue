<template>
  <b-row class="p-3">
    <b-col cols="12" sm="12" md="12" class="d-flex justify-content-center">
      <div>
        <b-form @submit.prevent="cadastrarFuncionario">
          <b-form-group id="input-group-1" label="Informe seu nome: " label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="funcionario.nome"
              type="text"
              required
              placeholder="Informe seu nome"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Informe sua idade: " label-for="input-2">
            <b-form-input
              id="input-2"
              v-model.number="funcionario.idade"
              type="number"
              required
              placeholder="Informe sua idade"
            ></b-form-input>
          </b-form-group>
          <div class="form-group">
            <label>Selecione o cargo</label>
            <select class="form-control" v-model="funcionario.fk_cargo">
              <option v-for="cargo in cargos" :key="cargo.id" :value="cargo.id">{{cargo.nome}}</option>
            </select>
          </div>
          <div class="d-flex justify-content-center">
            <b-button
              :disabled="validarCadastro"
              variant="success"
              type="submit"
            >Cadastrar Funcionario</b-button>
          </div>
        </b-form>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { api } from "@/services";

export default {
  name: "CadastroFuncionario",
  data() {
    return {
      funcionario: {
        nome: "",
        idade: 0,
        fk_cargo: 0
      }
    };
  },
  methods: {
    cadastrarFuncionario() {
      api
        .post("/api/funcionario", this.funcionario)
        .then(response => console.log(response))
        .catch(err => console.log(err));
      this.$store.dispatch("atualizarFuncionarios");
    }
  },
  computed: {
    cargos() {
      return this.$store.state.cargos;
    },
    validarCadastro() {
      return this.funcionario.nome.length < 3 ||
        this.funcionario.idade < 17 ||
        this.funcionario.idade > 129 ||
        this.fk_cargo === 0
        ? true
        : false;
    }
  }
};
</script>

<style>
</style>