<template>
  <div class="wrapper">
    <div class="header">
      <head-er :setDisassemble='setDisassemble'/>
    </div>

    <div class="main">
      <Split v-model="split">
        <div slot="left" class="code-view">
          <code-view 
          :assemb="assemb">
          </code-view>
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

<style>
/* 宽度大于700px时*/
@media (min-width: 760px) {
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .header {
    width: 100%;
    height: 6%;
  }
  .main {
    width: 100%;
    height: 94%;
    border-top: 1px solid #ffffff;
    background-color: antiquewhite;
  }
  .code-view {
    height: 100%;
    font-size: 16px;
  }
  .info-view {
    padding-left: 0.2rem;
    overflow: auto;
  }
}

/* 宽度小于700px时*/
@media (max-width: 760px) {
}
</style>
