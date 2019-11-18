<template>
<div>
  <div style="display:flex;margin-bottom:20px">
    <Input v-model="breakValue" style="margin-right:20px">
      <Select v-model="select" slot="prepend" placeholder="请选择断点类型" style="width:130px;">
        <Option value="1">源代码行号</Option>
        <Option value="2">函数名</Option>
        <Option value="3">汇编十六进制地址</Option>
      </Select>
      <Button slot="append" icon="md-remove-circle" @click="click_break" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="设置断点">
          break
        </Tooltip>
      </Button>
    </Input>
  </div>

  <div style="display:flex;">
    <Input v-model="catchValue" style="margin-right:20px" placeholder="请输入系统调用名称或编号">
      <Button slot="append" icon="md-remove-circle" @click="click_catch" :loading="loading" :disabled="buttonsDisabled">
        <Tooltip content="设置需要监视的系统调用" max-width="100">
          catch syscall
        </Tooltip>
      </Button>
    </Input>
  </div>

  <div style="margin-bottom:20px; font-size:10px; color:#6f6f6fa6">系统调用名(如:write)，或系统调用号(如:2)，注意不同系统间的区别</div>

  <Table
    stripe
    border
    ref="selection"
    style="margin-bottom:20px"
    :columns="columnsName"
    :data="breakpoints">
  </Table>

  <div style="display:flex;justify-content:flex-end;padding-right:20px">
    <Button @click="deleteBreakpoints()" type="success" :disabled="buttonsDisabled">删除已选断点</Button>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import wsManager from '@/api/webSocket.js'

export default {
  data() {
    return {
      select: '',
      breakValue: '',
      catchValue: '',
      columnsName: [{
        type: 'selection',
        width: 50,
        align: 'center'
      },{
        title: 'Num',
        key: 'num',
        width: 70
      }, {
        title: 'Type',
        key: 'type',
        width: 95
      }, {
        title: 'Disp',
        key: 'disp',
        width: 65
      }, {
        title: 'Enble',
        key: 'enble',
        width: 70
      }, {
        title: 'Address',
        key: 'addr',
        width: 160
      }, {
        title: 'What',
        key: 'what',
        minWidth: 150
      }]
    }
  },
  computed: {
    ...mapState([
      'buttonsDisabled',
      'currentPid',
      'loading',
      'breakpoint_data'
    ]),
    breakpoints() {
      let breakpoints = []
      let data = this.breakpoint_data
      // console.log(data)
      for (let i = 2; i < data.length; i++) {
        // console.log(data[i])
        let temp = data[i].replace(/\s+/g, ' ').split(' ')
        // console.log(temp[0].match(/^\d+/g))
        if (temp[0].match(/^\d+/g) == null) continue
        let what = ''
        for (let j = 5; j < temp.length; j++) {
          what += temp[j] + ' '
        }
        // console.log(what.match(/\\n/g))
        what = what.replace(/\\n/g, '')
        // console.log(what)
        breakpoints.push({
          num: temp[0],
          type: temp[1],
          disp: temp[2],
          enble: temp[3],
          addr: temp[4],
          what: what
        })
      }
      return breakpoints
    }
  },
  methods: {
    click_break() {
      console.log('click_break()')
      // console.log(this.select, this.breakValue)
      let command = 'break main'
      switch (this.select) {
        case '1':
        case '2':
          command = 'break ' + this.breakValue
          break
        case '3':
          command = 'break *' + this.breakValue
          break
        default:
          break
      }
      wsManager.sendCommand(this.currentPid, command)
      wsManager.sendCommand(this.currentPid, 'info breakpoints', 'breakpoint')
    },
    click_catch() {
      console.log('click_break()')
      let command = 'catch syscall ' + this.catchValue
      wsManager.sendCommand(this.currentPid, command)
      wsManager.sendCommand(this.currentPid, 'info breakpoints', 'breakpoint')
    },
    deleteBreakpoints() {
      let selected = this.$refs.selection.getSelection()
      console.log(selected)
      for (let i = 0; i < selected.length; i++) {
        wsManager.sendCommand(this.currentPid, 'delete ' + selected[i].num)
        wsManager.sendCommand(this.currentPid, 'info breakpoints', 'breakpoint')
      }
    }
  }
}
</script>

<style>
</style>
