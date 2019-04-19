<template>
  <div id="app">
    <head-er>
      header
    </head-er>

    <div class="demo-split">
      <Split v-model="split">
        <div slot="left">
          <code-view></code-view>
        </div>
        <div slot="right" calss="right-split">
          <register-view></register-view>
        </div>
      </Split>
    </div>
  </div>
</template>

<script>
import header from "./components/header.vue"
import codeView from "./components/codeView.vue"
import registerView from "./components/registerView.vue"

export default {
  name: 'app',
  components: {
    'code-view': codeView,
    'head-er': header,
    'register-view': registerView
  },
  data() {
    return {
      split: 0.6
    }
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
.demo-split{
  height: 700px;
  overflow: auto;
  border: 1px solid #dcdee2;
  background-color: antiquewhite;
}
.right-split{
  padding-left: 0.2rem;
}
</style>
