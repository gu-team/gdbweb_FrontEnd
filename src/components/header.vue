<template>
  <div class="header-wrapper">
    <Upload action="//jsonplaceholder.typicode.com/posts/" style="display: flex;align-items: center;"
    :before-upload="handleUpload"
    :show-upload-list="false"
    :on-progress="upload_progress"
    :on-success="upload_success"
    :on-error="upload_error">
      <Button type="primary" icon="md-cloud-upload" :loading="loading" @click="upload">
        UPLOAD ELF
      </Button>
    </Upload>

    <Input v-model="elf_info" disabled style="width:30%;margin-right:20px"></Input>

    <!-- <Button icon="md-power" @click="click_start" :loading="start_loading" shape="circle" style="margin-right:20px">start</Button> -->

    <!-- <ButtonGroup shape="circle" style="margin-right:20px">
      <Button icon="md-remove-circle" @click="click_next" :loading="next_loading">break</Button>
      <Button icon="md-fastforward" :loading="false">continue</Button>
    </ButtonGroup> -->

    <ButtonGroup shape="circle">
      <Button icon="md-power" @click="click_start" :loading="loading" :disabled="buttonsDisabled">start</Button>
      <!-- <Button icon="md-play" @click="click_run" :loading="loading" :disabled="buttonsDisabled">run</Button> -->
      <Button icon="md-remove-circle" @click="click_break" :loading="loading" :disabled="buttonsDisabled">break</Button>
      <Button icon="md-fastforward" @click="click_continue" :loading="loading" :disabled="buttonsDisabled">continue</Button>
      <Button icon="md-arrow-round-forward" @click="click_next" :loading="loading" :disabled="buttonsDisabled">next</Button>
      <Button icon="md-redo" @click="click_step" :loading="loading" :disabled="buttonsDisabled">step</Button>
    </ButtonGroup>
  </div>
</template>

<style>
.header-wrapper {
  height: 100%;
  background-color: #DCDFE6;
  z-index: 999;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>

<script>
// import { start, next } from '@/api/api.js'
// import { next } from '@/api/api.js'
import { mapState } from 'vuex'
import wsManager from '@/api/webSocket.js'

export default {
  data() {
    return {
      elf_info: 'Please upload elf firstly'
    }
  },
  computed: {
    ...mapState([
      'buttonsDisabled',
      'currentPid',
      'loading'
    ])
  },
  methods: {
    upload_progress() {
    },
    upload_success() {
    },
    upload_error() {
    },
    handleUpload() {
      return false
    },
    upload() {
      console.log('upload()')
      wsManager.sendCommand(0, 'uploadelf')
    },
    // 发送命令，获取相关信息
    getInfo() {
      wsManager.sendCommand(this.currentPid, 'disassemble', 'assmb')
      wsManager.sendCommand(this.currentPid, 'info registers', 'register')
    },
    click_start() {
      console.log('click_start()')
      wsManager.sendCommand(this.currentPid, 'start')
      this.getInfo()
    },
    click_run() {
      console.log('click_run()')
      wsManager.sendCommand(this.currentPid, 'run')
      this.getInfo()
    },
    click_break() {
      console.log('click_break()')
      wsManager.sendCommand(this.currentPid, 'break main')
    },
    click_next() {
      console.log('click_next()')
      wsManager.sendCommand(this.currentPid, 'next')
      this.getInfo()
    },
    click_continue() {
      console.log('click_continue()')
      wsManager.sendCommand(this.currentPid, 'continue')
      this.getInfo()
    },
    click_step() {
      console.log('click_step()')
      wsManager.sendCommand(this.currentPid, 'step')
      this.getInfo()
    }
  }
}
</script>
