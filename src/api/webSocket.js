// 接口定义的状态码
var STATUS_CODE = {
  SUCCESS: 0,
  ERROR: 1,
  FAIL: 2
}
// 全局Vue对象的引用
var Vue = null

// 回调函数，解决websocket接收信息后的异步问题，供websocketOnMessage()接受信息后调用
// 为什么不写在wsManager对象中呢？
// 因为，websocketOnMessage()函数是由WebSocket对象调用的，所以在websocketOnMessage()中使用this.callback()时，会调用WebSocket对象中的callback()，而不是wsManager对象中的。
var callback = undefined;

var wsManager = {
  // WebSocket路由
  WS_URL: 'ws://dev2.dounine.live:8080/ws/gdb/',
  // WebSocket对象的引用
  ws: null,
  // 用户标识
  client_id: null,
  // 初始化
  initWebSocket(vue) {
    console.log('init websocket')
    Vue = vue
    // generate random client id
    this.client_id = Math.random().toString(36).slice(-8)
    // connect to backend via websocket
    this.ws = new WebSocket(this.WS_URL + this.client_id)
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
    Vue.$store.commit('setLoading', false)
  },
  // call on websocket error
  websocketError(e) {
    console.log('websocket error', e)
    Vue.$store.commit('setLoading', false)
  },
  /**
   * call on receive message.
   * websocket接收信息函数
   * @param {*} msg WebSocket库接收信息后调用websocketOnMessage()函数，同时将信息作为参数传入
   */
  websocketOnMessage(msg) {
    let res = JSON.parse(msg.data)
    console.log("websocketOnMessage():", res)
    if (res.pid == undefined || res.pid == -1) {
      Vue.$Message.warning('Please upload elf firstly')
      Vue.$store.commit('disableButtons')
    } else if (res.status_code != STATUS_CODE.SUCCESS) {
      Vue.$Message.error(res.msg)
    } else {
      Vue.$store.commit('updateData', res) // 保存返回数据
      Vue.$store.commit('setCurrentPid', res.pid) // 保存返回的gdb进程号
      if (Vue.$store.state.buttonsDisabled) {
        Vue.$store.commit('enableButtons') // 开启所有按钮
      }
      // console.log("websocketOnMessage():", typeof(callback))
      if (typeof(callback) == "function") {
        callback() // 执行回调函数
      }
    }
    Vue.$store.commit('setLoading', false)
  },
  /**
   * websocket发送信息函数
   * @param {int} pid gdb子进程进程号
   * @param {string} cmd 执行的gdb命令
   * @param {string} flag 数据标识。由于不管什么命令都返回相同结构的数据，所以需要标识放入数据中进行区别。该标识后端并不会处理，原样返回。
   * @param {string} file_name 执行file命令时，指定的文件名
   * @param {function} callback 接收信息后的回调函数
   */
  sendCommand(pid, cmd, flag='', file_name='', _callback=undefined) {
    Vue.$store.commit('setLoading', true)
    callback = _callback // 设置回调函数，供接收信息后调用
    // console.log("sendCommand():", typeof(callback))
    console.log(pid, cmd)
    this.ws.send(JSON.stringify({
      'pid': pid,
      'command_line': cmd,
      'data_flag': flag,
      'file_name': file_name
    }))
  }
}

export default wsManager;