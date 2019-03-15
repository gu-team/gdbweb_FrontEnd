<template>
  <div id="app">
    <head-er></head-er>
    <code-view></code-view>
  </div>
</template>

<script>
import header from "./components/header.vue";
import codeView from "./components/codeView.vue";

export default {
  name: 'app',
  components: {
    'head-er': header,
    'code-view': codeView
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
