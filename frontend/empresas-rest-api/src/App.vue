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
        .get("api/cargos")
        .then(response => this.$store.dispatch("addCargos", response.data));
    }
  },
  created() {
    this.fetchCargos();
    setInterval(() => {
      this.$store.dispatch("atualizarFuncionarios");
    }, 1500);
  }
};
</script>

<style>
</style>
