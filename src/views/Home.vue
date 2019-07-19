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
  created(){
    window.vue = this
    // create websocket when page created
    this.initWebSocket()
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
    },
    initWebSocket(){
      // generate random client id
      this.client_id = Math.random().toString(36).slice(-8)
      // connect to backend via websocket
      this.ws = new WebSocket(`ws://192.168.2.120:8000/ws/gdb/${this.client_id}`)
      this.ws.onopen = this.websocketOpen
      this.ws.onclose = this.websocketClose
      this.ws.onerror = this.websocketError
      this.ws.onmessage = this.websocketOnMessage
    },
    // call on websocket connected
    websocketOpen(){
      console.log('websocket connected')
    },
    // call on websocket disconnected
    websocketClose(msg){
      console.log('websocket disconnected', msg)
    },
    // call on websocket error
    websocketError(e){
      console.log('websocket error', e)
    },
    // call on receive message
    websocketOnMessage(msg){
      let res = JSON.parse(msg.data)
      console.log(res)
      if (!res.hasOwnProperty('pid')) {
        res.pid = -1
      }
      this.$store.commit('updateGdb', res)
      this.$store.commit('setCurrentPid', res.pid)
      if (res.pid != -1){
        this.$store.commit('enableButtons')
      }
    },
    sendCommand(pid, cmd) {
      console.log(pid, cmd)
      this.ws.send(JSON.stringify({
        'pid': pid,
        'command_line': cmd
      }))
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
