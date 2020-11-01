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
          <div class="d-flex justify-content-between">
            <b-button
              :disabled="validarCadastro"
              variant="success"
              type="submit"
            >Cadastrar Funcionario</b-button>
            <b-button
            class="ml-2"            
            variant="outline-success"  
            @click="exibirModalNovoCargo = true"          
            >                         
            Cadastrar Novo Cargo    
            </b-button>            
          </div>
        </b-form>
      </div>
    </b-col>
    <b-modal
     v-model="exibirModalNovoCargo" hide-footer centered title="Cadastrar novo Cargo">
     <div>
        <label for="input-live">Nome:</label>
    <b-form-input
      id="input-live"
      v-model="novoCargo.nome"
      :state="validarCargo"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Digite o Nome"      
    ></b-form-input>    
    <b-form-invalid-feedback id="input-live-feedback">
      Informe o Nome do Cargo
    </b-form-invalid-feedback>    
    <b-form-text id="input-live-help">Nome do Cargo.</b-form-text>
     </div>
     <div class="d-flex justify-content-end">        
       <div class="d-flex justify-content-between">
          <b-button
          :disabled="!validarCargo"
          @click="handleAddCargo"
          variant="success"
          >
          Salvar
          </b-button>
          <b-button
          class="ml-2"
          variant="danger"
          @click="exibirModalNovoCargo = false">
          Fechar</b-button>
       </div>
     </div>     
    </b-modal>
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
      },
      novoCargo: {
        nome: ""
      },
      exibirModalNovoCargo: false
    };
  },
  methods: {
    async cadastrarFuncionario() {
      let obj = {
        nome: this.funcionario.nome,
        idade: this.funcionario.idade,
        cargo: {
          id: this.funcionario.fk_cargo
        }
      }
      await api
        .post("/api/Funcionario", obj)
        .then(() => {           
          this.$store.dispatch("atualizarFuncionarios");          
          })
        .catch(err => console.log(err));
    },
    handleAddCargo(){
        api
          .post("/api/Cargo", this.novoCargo)
            .then(() => {
              this.$store.dispatch("atualizarCargos")
            })
            .finally(() => {
              this.exibirModalNovoCargo = false;
            })
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
    },
    validarCargo(){
      return this.novoCargo.nome.length > 5 ? true : false
    }

  }
};
</script>

<style>
</style>