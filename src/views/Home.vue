<template>
  <div class="wrapper">
    <div class="header">
      <head-er :setDisassemble='setDisassemble'/>
    </div>

    <div class="main">
      <Split v-model="split">
        <div slot="left" class="code-view">
          <code-view :assemb="assemb"></code-view>
        </div>
        <!-- code view -->

        <div slot="right" class="info-view">
          <info-view></info-view>
        </div>
        <!-- info view -->
      </Split>
    </div>
  </div>
</template>

<style>
@import './home.css';
</style>

<script>
import headEr from '@/components/header'
import codeView from "@/components/codeView.vue"
import infoView from "@/components/infoView.vue"
import { getDisassemble } from '@/api/api.js'

export default {
  name: 'home',
  components: {
    headEr,
    codeView,
    infoView
  },
  data() {
    return {
      assemb: [],
      split: 0.6
    }
  },
  methods: {
    setDisassemble() {
      getDisassemble('main').then(resp => {
        console.log('getDisassemble --->', resp.data);
        this.assemb = resp.data.message;
      }).catch(error => {
        console.log(error);
        this.error(error);
      });
    }
  }
}
</script>
