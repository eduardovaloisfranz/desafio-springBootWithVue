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
        .get("api/Cargos")
        .then(response => this.$store.dispatch("addCargos", response.data));
    }
  },
  created() {
    this.fetchCargos();    
  }
};
</script>

<style>
</style>
