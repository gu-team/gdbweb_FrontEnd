// 接口定义的状态码
var STATUS_CODE = {
  SUCCESS: 0,
  ERROR: 1,
  FAIL: 2
}
// 全局Vue对象的引用
var Vue = null

export default {
  // WebSocket路由
  WS_URL: 'ws://119.3.93.95:8080/ws/gdb/',
  ws: null, // WebSocket对象的引用
  // 初始化
  initWebSocket(vue) {
    console.log('init websocket')
    Vue = vue
    // generate random client id
    let client_id = Math.random().toString(36).slice(-8)
    // connect to backend via websocket
    this.ws = new WebSocket(this.WS_URL + client_id)
    this.ws.onopen = this.websocketOpen
    this.ws.onclose = this.websocketClose
    this.ws.onerror = this.websocketError
    this.ws.onmessage = this.websocketOnMessage
  },
  // call on websocket connected
  websocketOpen() {
    console.log('websocket connected')
  },
  // call on websocket disconnected
  websocketClose(msg) {
    console.log('websocket disconnected', msg)
  },
  // call on websocket error
  websocketError(e) {
    console.log('websocket error', e)
  },
  // call on receive message
  websocketOnMessage(msg) {
    let res = JSON.parse(msg.data)
    console.log(res)
    if (res.pid == -1) {
      Vue.$Message.error('Error: pid is -1!')
    } else if (res.status_code != STATUS_CODE.SUCCESS) {
      Vue.$Message.error(res.msg)
    } else {
      Vue.$store.commit('updateData', res)
      Vue.$store.commit('setCurrentPid', res.pid)
      if (Vue.$store.state.buttonsDisabled) {
        Vue.$store.commit('enableButtons')
      }
    }
    Vue.$store.commit('setLoading', false)
  },
  // 发送websocket
  sendCommand(pid, cmd, flag='') {
    Vue.$store.commit('setLoading', true)
    console.log(pid, cmd)
    this.ws.send(JSON.stringify({
      'pid': pid,
      'command_line': cmd,
      'data_flag': flag
    }))
  }
}