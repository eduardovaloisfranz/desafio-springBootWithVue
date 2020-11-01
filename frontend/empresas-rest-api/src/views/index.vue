<template>
  <b-container fluid class="pt-3">
    <CadastroFuncionario />
    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" class="d-flex justify-content-end">
        
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" sm="12" md="12">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Indice</th>
              <th scope="col">Nome</th>              
              <th scope="col">Id Cargo</th>
              <th scope="col">Nome do cargo</th>
              <th scope="col">Ações</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(funcionario, idx) in funcionarios" :key="funcionario.id + idx">
              <th scope="row">{{idx}}</th>
              <td>{{funcionario.nome}}</td>              
              <td>{{funcionario.cargo.id}}</td>
              <td>{{funcionario.cargo.nome}}</td>
              <td>
                <b-button variant="danger" @click.prevent="handleDelete(funcionario)">Remover</b-button>
              </td>
              <td>
                <b-button variant="info" @click.prevent="handleEdit(funcionario)">Editar</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-modal v-model="openModal" title="Editar Funcionario">
      <b-container>
        <b-row class="p-3">
          <b-col cols="12" sm="12" md="12" class="d-flex justify-content-center">
            <div>
              <b-form @submit.prevent="editarFuncionario">
                <b-form-group
                  id="input-group-1"
                  label="Informe seu novo nome: "
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="novoFuncionario.nome"
                    type="text"
                    :value="funcionarioSelecionado.nome"
                    required
                    placeholder="Informe seu novo nome"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-2"
                  label="Informe sua nova idade: "
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model.number="novoFuncionario.idade"
                    :value="funcionarioSelecionado.idade"
                    type="number"
                    required
                    placeholder="Informe sua nova idade"
                  ></b-form-input>
                </b-form-group>
                <div class="form-group">
                  <label>Selecione o novo cargo</label>
                  <select class="form-control" v-model="novoFuncionario.fk_cargo">
                    <option v-for="cargo in cargos" :key="cargo.id" :value="cargo.id">{{cargo.nome}}</option>
                  </select>
                </div>
                <div class="d-flex justify-content-center">
                  <b-button
                    :disabled="validarCadastro"
                    variant="success"
                    type="submit"
                  >Editar Funcionario</b-button>
                </div>
              </b-form>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import CadastroFuncionario from "@/components/CadastroFuncionario";
import { api } from "@/services";

export default {
  name: "index",
  data() {
    return {
      funcionarioSelecionado: {},
      openModal: false,
      novoFuncionario: {
        id: 0,
        nome: "",
        idade: 0,
        fk_cargo: 0
      }
    };
  },
  computed: {
    ...mapState(["funcionarios", "cargos"]),
    validarCadastro() {
      return this.novoFuncionario.nome.length < 3 ||
        this.novoFuncionario.idade < 17 ||
        this.novoFuncionario.idade > 129 ||
        this.novoFuncionario.fk_cargo === 0
        ? true
        : false;
    }
  },
  methods: {
    async handleDelete(funcionario) {
      this.funcionarioSelecionado = funcionario;
      let confirm = "";
      await this.$bvModal
        .msgBoxConfirm("Por favor, confirme se quiser deletar este registro", {
          title: "Por favor Certifique-se",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Sim",
          cancelTitle: "Não",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          confirm = value;
        })
        .catch(err => {
          // An error occurred
          console.log(err);
        });
      if (confirm === true) {
        await api
         .delete(`api/Funcionario/${this.funcionarioSelecionado.id}`)
          .then(() =>{
             
            this.$store.dispatch("atualizarFuncionarios");
             
             })
          .catch(err => console.log(err));
      } else {
        alert("Registro não apagado!");
      }
    },
    handleEdit(funcionario) {
      this.funcionarioSelecionado = funcionario;
      this.openModal = true;
    },
    async editarFuncionario() {
      
      let { nome, idade, fk_cargo } = this.novoFuncionario;

      let body = {
        nome,
        idade,
        cargo: {
          id: fk_cargo
        }
      };
      
      await api
        .put(`api/Funcionario/${this.funcionarioSelecionado.id}`, body)
        .then(() =>{         
        this.$store.dispatch("atualizarFuncionarios");
        })
        .catch(r => console.log(r));
      this.openModal = false;
    }
  },
  components: {
    CadastroFuncionario
  }
};
</script>

<style>
</style>