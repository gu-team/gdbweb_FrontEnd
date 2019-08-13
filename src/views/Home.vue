<template>
  <div class="wrapper">
    <div class="header">
      <head-er/>
    </div>

    <div class="main">
      <Split v-model="split">
        <div slot="left" class="code-view">
          <code-view/>
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
import wsManager from '@/api/webSocket.js'

export default {
  name: 'home',
  components: {
    headEr,
    codeView,
    infoView
  },
  created() {
    // 配置消息提示
    this.$Message.config({
      top: 50,
      duration: 3
    })
    // create websocket when page created
    wsManager.initWebSocket(this)
  },
  data() {
    return {
      split: 0.6
    }
  },
  methods: {
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
    overflow: auto;
  }
  .info-view {
    height: 100%;
    padding-left: 0.2rem;
    overflow: auto;
  }
}

/* 宽度小于700px时*/
@media (max-width: 760px) {
}
</style>
