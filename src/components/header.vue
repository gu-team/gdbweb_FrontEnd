<template>
  <div class="header-wrapper">
    <Upload action="/api/uploadelf"
      style="display:flex;align-items:center;margin-right:30px"
      :before-upload="handleUpload"
      :show-upload-list="false"
      :on-progress="upload_progress"
      :on-success="upload_success"
      :on-error="upload_error">
      <Button type="primary" icon="md-cloud-upload" :loading="loading" :disabled="uploadDisabled">
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

    <ButtonGroup shape="circle" style="margin-right:30px">
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

    <i-switch 
      style="margin-right:20px"
      size="large"
      :value="isAsm"
      @on-change="switchChange"
      :loading="loading"
      :disabled="buttonsDisabled">
      <span slot="open">汇编</span>
      <span slot="close">源码</span>
    </i-switch>

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
  padding: 0 40px;
}
</style>

<script>
import { mapState } from 'vuex'
import wsManager from '@/api/webSocket.js'
import { upload_elf, set_input, get_ouput } from '@/api/http.js'

export default {
  data() {
    return {
      uploadDisabled: false
    }
  },
  computed: {
    ...mapState([
      'isAsm',
      'source_data',
      'buttonsDisabled',
      'currentPid',
      'loading',
      'files'
    ])
  },
  methods: {
    upload_progress() {
    },
    upload_success() {
    },
    upload_error() {
    },
    handleUpload(file) {
      console.log('handleUpload()')
      const file_name = file.name
      const formData = new FormData()
      formData.append('file', file)
      formData.append('client_id', wsManager.client_id)
      upload_elf(formData).then(res => {
        let data = res.data
        // 返回码不等于0，则表示失败
        if (data.status != 0) {
          this.$Message.error(data.msg)
        } else {
          this.$store.commit('addFile', file_name, data.file_name)
          console.log(data.file_name, this.files)
          this.$Message.success('upload elf file successfully')
          wsManager.sendCommand(this.currentPid, 'file', '', data.file_name) // 执行file命令
          this.uploadDisabled = true
        }
      }).catch(err => {
        this.$Message.error(err)
        console.log(err)
      })
      return false
    },
    // 发送命令后，获取相关信息
    getInfo() {
      wsManager.sendCommand(this.currentPid, 'disassemble', 'assmb')
      wsManager.sendCommand(this.currentPid, 'info registers', 'register')
      wsManager.sendCommand(this.currentPid, 'backtrace', 'backtrace')
      get_ouput(this.currentPid).then(res => {
        let data = res.data
        // 返回码不等于0，则表示失败
        if (data.status != 0) {
          this.$Message.error(data.msg)
        } else {
          console.log(data.data)
          // this.$Message.success(data.msg)
        }
      }).catch(err => {
        this.$Message.error(err)
        console.log(err)
      })
    },
    click_start() {
      console.log('click_start()')
      // 先设置程序输入
      set_input('1 2', this.currentPid).then(res => {
        let data = res.data
        console.log(data)
        // 返回状态码不等于0，则表示失败
        if (data.status != 0) {
          this.$Message.error(data.msg)
        } else {
          // this.$Message.success(data.msg)
          // 再启动程序
          wsManager.sendCommand(this.currentPid, 'start')
          this.getInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error(err)
      })
    },
    switchChange(status) {
      this.$store.commit('setIsAsm', status)
      if (status == false && this.source_data.length == 0) {
        wsManager.sendCommand(this.currentPid, 'set listsize 10000')
        wsManager.sendCommand(this.currentPid, 'list 1', 'source')
      }
    },
    click_run() {
      console.log('click_run()')
      // 先设置程序输入
      set_input('1 2', this.currentPid).then(res => {
        let data = res.data
        console.log(data)
        // 返回状态码不等于0，则表示失败
        if (data.status != 0) {
          this.$Message.error(data.msg)
        } else {
          // this.$Message.success(data.msg)
          // 再启动程序
          wsManager.sendCommand(this.currentPid, 'run')
          this.getInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error(err)
      })
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
