<template>
  <div class="header-wrapper">
    <!-- <Upload action="/api/uploadelf"
      style="display:flex;align-items:center;margin-right:30px"
      :before-upload="handleUpload"
      :show-upload-list="false"
      :on-progress="upload_progress"
      :on-success="upload_success"
      :on-error="upload_error">
      <Button type="primary" icon="md-cloud-upload" :loading="loading" :disabled="uploadDisabled">
        UPLOAD ELF
      </Button>
    </Upload> -->
    <!-- upload button -->
    <Dropdown
      trigger="click"
      style="display:flex;align-items:center;margin-right:30px">
      <Button type="primary" :disabled="uploadDisabled">
        SELECT
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem><span @click="select_elf('helloworld')">示例一：helloworld</span></DropdownItem>
        <DropdownItem><span @click="select_elf('demo')">示例二：demo</span></DropdownItem>
        <DropdownItem><span @click="select_elf('bomb')">示例三：bomb</span></DropdownItem>
        <DropdownItem divided>
          <Upload action="/api/uploadelf"
            style="display:flex;align-items:center;margin-right:30px"
            :before-upload="handleUpload"
            :show-upload-list="false"
            :on-progress="upload_progress"
            :on-success="upload_success"
            :on-error="upload_error">
              upload my ELF
          </Upload>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <ButtonGroup shape="circle" style="margin-right:30px">
      <Button icon="md-power" @click="dialogVisible = true;command_temp = 'start'" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="运行程序，并在main函数入口处停止">
          start
        </Tooltip>
      </Button>

      <Button icon="md-play" @click="dialogVisible = true;command_temp = 'run'" :loading="loading" :disabled="buttonsDisabled">
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
    <!-- start run continue button -->

    <el-dialog title="请填写程序输入" :visible.sync="dialogVisible">
      <Input v-model="input_data" type="textarea" :autosize="{minRows: 6, maxRows: 8}" placeholder="Enter progame input..." />
      <div slot="footer" class="dialog-footer">
        <Button type="warning" @click="start_or_run" :loading="loading" :disabled="buttonsDisabled" style="margin-right:30px;">该程序无输入</Button>
        <Button type="primary" @click="start_or_run" :loading="loading" :disabled="buttonsDisabled">确 定</Button>
      </div>
    </el-dialog>
    <!-- click start/run button then appear -->

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
        <Tooltip content="汇编代码执行下一步，并进入函数">
          stepi
        </Tooltip>
      </Button>
    </ButtonGroup>
    <!-- next step netxi stepi button -->

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
    <!-- switch -->

    <Tooltip content="ELF文件信息" style="margin-left:auto">
      <Button icon="md-alert" type="info" :loading="loading" :disabled="buttonsDisabled">
        ELF INFO
      </Button>
    </Tooltip>
    <!-- elf info button -->
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
      dialogVisible: false,
      uploadDisabled: false,
      input_data: '',
      command_temp: ''
    }
  },
  computed: {
    ...mapState([
      'isAsm',
      'source_data',
      'buttonsDisabled',
      'currentPid',
      'loading'
    ])
  },
  methods: {
    select_elf(file_name) {
      console.log(file_name)
      switch (file_name) {
        case 'helloworld':
          this.input_data = ''
          break;
        case 'demo':
          this.input_data = '1 2'
          break;
        case 'bomb':
          this.input_data = 'Border relations with Canada have never been better.\n'
            + '1 2 4 8 16 32\n'
            + '0 207\n'
            + '7 0\n'
            + 'ionefg\n'
            + '4 3 2 1 6 5\n'
          break;
        default:
          this.$Message.error('error')
          return
      }
      this.$store.commit('addFile', file_name, file_name)
      // 执行file命令，在gdb中加载该程序。然后，启动该程序
      wsManager.sendCommand(this.currentPid, 'file', '', file_name, () => {
        // console.log('congratulations')
        this.uploadDisabled = true
        this.command_temp = 'start'
        this.start_or_run()
      })
      // console.log("select_elf():", typeof(wsManager.callback), wsManager.ws, wsManager)
    },
    /**
     * 上传文件等函数，由Upload组件调用
     */
    upload_progress() {},
    upload_success() {},
    upload_error() {},
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
    /**
     * 发送命令后，获取相关信息函数
     */
    getInfo() {
      wsManager.sendCommand(this.currentPid, 'disassemble', 'assmb') // 获取新的汇编代码
      wsManager.sendCommand(this.currentPid, 'info registers', 'register') // 获取新的寄存器值
      wsManager.sendCommand(this.currentPid, 'backtrace', 'backtrace') // 获取新的栈帧
      // 获取新的输出
      get_ouput(this.currentPid).then(res => {
        let data = res.data
        // 返回码不等于0，则表示失败
        if (data.status != 0) {
          this.$Message.error(data.msg)
        } else {
          console.log(data.data)
          this.$store.commit('setOutPut', data.data)
        }
      }).catch(err => {
        this.$Message.error(err)
        console.log(err)
      })
    },
    /**
     * 在输入对话框中，点击确定
     */
    start_or_run() {
      console.log('start_or_run()')
      // 先设置程序输入
      this.$store.commit('setInPut', this.input_data)
      set_input(this.input_data, this.currentPid).then(res => {
        let data = res.data
        // console.log(data)
        // 返回状态码不等于0，则表示失败
        if (data.status != 0) {
          this.$Message.error(data.msg)
        } else {
          // 再启动程序
          wsManager.sendCommand(this.currentPid, this.command_temp)
          this.getInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error(err)
      })
      this.dialogVisible = false
    },
    click_next() {
      console.log('click_next()')
      wsManager.sendCommand(this.currentPid, 'next', '', '', () => {
        this.getInfo()
      })
    },
    click_continue() {
      console.log('click_continue()')
      wsManager.sendCommand(this.currentPid, 'continue', '', '', () => {
        this.getInfo()
      })
    },
    click_step() {
      console.log('click_step()')
      wsManager.sendCommand(this.currentPid, 'step', '', '', () => {
        this.getInfo()
      })
    },
    click_nexti() {
      console.log('click_nexti()')
      wsManager.sendCommand(this.currentPid, 'nexti', '', '', () => {
        this.getInfo()
      })
    },
    click_stepi() {
      console.log('click_stepi()')
      wsManager.sendCommand(this.currentPid, 'stepi', '', '', () => {
        this.getInfo()
      })
    },
    /**
     * 源码和汇编代码切换按钮
     */
    switchChange(status) {
      this.$store.commit('setIsAsm', status)
      if (status == false && this.source_data.length == 0) {
        wsManager.sendCommand(this.currentPid, 'set listsize 10000')
        wsManager.sendCommand(this.currentPid, 'list 1', 'source')
      }
    }
  }
}
</script>
