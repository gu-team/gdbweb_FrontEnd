<template>
  <div class="header-wrapper">
    <Upload action="//jsonplaceholder.typicode.com/posts/"
      style="display:flex;align-items:center;margin-right:30px"
      :before-upload="handleUpload"
      :show-upload-list="false"
      :on-progress="upload_progress"
      :on-success="upload_success"
      :on-error="upload_error">
      <Button type="primary" icon="md-cloud-upload" :loading="loading" @click="upload">
        UPLOAD ELF
      </Button>
    </Upload>

    <!-- <Input v-model="elf_info" disabled style="width:30%;margin-right:20px"></Input> -->

    <ButtonGroup shape="circle" style="margin-right:30px">
      <Button icon="md-power" @click="click_start" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="运行程序，并在main函数入口处停止">
          start
        </Tooltip>
      </Button>

      <Button icon="md-play" @click="click_run" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="运行程序">
          run
        </Tooltip>
      </Button>

      <Button icon="md-fastforward" @click="click_continue" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="执行到下一个断点处">
          continue
        </Tooltip>
      </Button>
    </ButtonGroup>

    <ButtonGroup shape="circle" style="">
      <Button icon="md-arrow-round-forward" @click="click_next" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="源代码执行下一步">
          next
        </Tooltip>
      </Button>

      <Button icon="md-redo" @click="click_step" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="源代码执行下一步，并进入函数">
          step
        </Tooltip>
      </Button>

      <Button icon="md-arrow-round-forward" @click="click_nexti" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="汇编代码执行下一步">
          nexti
        </Tooltip>
      </Button>

      <Button icon="md-redo" @click="click_stepi" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="源代码执行下一步，并进入函数">
          stepi
        </Tooltip>
      </Button>
    </ButtonGroup>

    <Tooltip content="ELF文件信息" style="margin-left:auto">
      <Button icon="md-alert" type="info" :loading="loading" :disabled="buttonsDisabled">
        ELF INFO
      </Button>
    </Tooltip>
  </div>
</template>

<style>
.header-wrapper {
  height: 100%;
  background-color: #DCDFE6;
  z-index: 999;
  display: flex;
  align-items: center;
  padding: 0 50px;
}
</style>

<script>
import { mapState } from 'vuex'
import wsManager from '@/api/webSocket.js'

export default {
  data() {
    return {
      select: '',
      value: '',
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
      // wsManager.sendCommand(this.currentPid, 'info breakpoints')
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
    },
    click_nexti() {
      console.log('click_nexti()')
      wsManager.sendCommand(this.currentPid, 'nexti')
      this.getInfo()
    },
    click_stepi() {
      console.log('click_stepi()')
      wsManager.sendCommand(this.currentPid, 'stepi')
      this.getInfo()
    }
  }
}
</script>
