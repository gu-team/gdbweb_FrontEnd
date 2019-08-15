<template>
<div>
  <Form :model="formItem" label-position="top">
    <FormItem label="内存单元个数">
      <Input v-model="formItem.count" placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem label="每个单元的显示方式">
      <Select v-model="formItem.type">
        <Option value="x">十六进制</Option>
        <Option value="d">十进制</Option>
        <Option value="u">十进制无符号</Option>
        <Option value="o">八进制</Option>
        <Option value="t">二进制</Option>
        <Option value="i">指令地址形式</Option>
        <Option value="c">字符形式</Option>
        <Option value="f">浮点数形式</Option>
      </Select>
    </FormItem>
    <FormItem label="每个单元的字节长度">
      <Select v-model="formItem.len">
        <Option value="b">1字节</Option>
        <Option value="h">2字节</Option>
        <Option value="w">4字节</Option>
        <Option value="g">8字节</Option>
      </Select>
    </FormItem>
    <FormItem label="内存地址">
      <Input v-model="formItem.address" placeholder="示例: 0x72032FF,  $rsp"></Input>
      <span style="font-size:10px; color:#6f6f6f">请输入十六进制地址(如:0x72032FF)，或$+寄存器名字(如:$rsp)</span>
    </FormItem>
  </Form>

  <div style="display:flex;justify-content:flex-end;padding-bottom:20px">
    <Button @click="examine()" type="success" :disabled="buttonsDisabled">查询内存信息</Button>
  </div>

  <Card>
    <h3 slot="title">查询结果</h3>
    <pre style="font-size:15px; flex-wrap:wrap">{{ get_examine_data }}</pre>
  </Card>
</div>
</template>

<script>
import { mapState } from 'vuex'
import wsManager from '@/api/webSocket.js'

export default {
  data() {
    return {
      formItem: {
        count: '',
        type: '',
        len: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapState([
      'buttonsDisabled',
      'currentPid',
      'examine_data'
    ]),
    get_examine_data() {
      let ret_str = ''
      let data = this.examine_data
      for (let i = 1; i < data.length; i++) {
        console.log(data[i])
        ret_str += data[i]
          .replace(/\\n/g, '\n\n')
          .replace(/\\t/g, '\n\t')
          .replace(/:/g, ':\n')
      }
      console.log(ret_str)
      return ret_str
    }
  },
  methods: {
    examine() {
      let command = 'x/' +
        this.formItem.count +
        this.formItem.type +
        this.formItem.len +
        ' ' + this.formItem.address
      console.log(command)
      wsManager.sendCommand(this.currentPid, command, 'examine')
    }
  }
}
</script>

<style>
</style>
