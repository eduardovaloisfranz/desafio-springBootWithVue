<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { api } from "@/services";

export default {
  name: "App",
  components: {},
  methods: {
    fetchCargos() {
      api
        .get("api/Cargo")
        .then(response => this.$store.dispatch("addCargos", response.data));
    }
  },
  created() {
    this.fetchCargos();    
    this.$store.dispatch("atualizarFuncionarios")
  }
};
</script>

<style>
</style>
