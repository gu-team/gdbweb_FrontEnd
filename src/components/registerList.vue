<template>
  <Table
    stripe
    :columns="columnsName"
    :data="registers">
  </Table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      columnsName: [{
        title: 'Name',
        key: 'name'
      }, {
        title: 'Hex',
        key: 'Hex'
      }, {
        title: 'Dec',
        key: 'Dec'
      }]
    }
  },
  computed: {
    ...mapState([
      'register_data'
    ]),
    registers() {
      let registers = []
      let data = this.register_data
      // console.log(data)
      // 从第二项开始
      let name, hex_num, dec_num, temp
      // 遍历数据，提取成寄存器信息列表
      for (let i = 1; i < data.length; i++) {
        // 略过换行符
        if (data[i] == '\\n') continue
        // console.log(data[i])

        temp = data[i].match(/0x\w+/g) // 匹配十六进制
        // 若未匹配到十六进制，则可能是包含十进制的字符串，如'/t12343'类型
        if (temp == null) {
          temp = data[i].match(/\d+/g) // 匹配十进制

          // 若也未匹配到十进制，则说明是eflages寄存器：'\t[ PF IF ]'
          if (temp == null)
            dec_num = parseInt(hex_num, 16) // 将字符串以十六进制规则转换成整型
          else
            dec_num = parseInt(temp[0], 10) // 将字符串以十进制规则转换成整型

          this.addRegister(registers, name, hex_num, dec_num)
        // 若匹配到十六进制
        } else {
          hex_num = temp[0]
          temp = data[i].replace(/0x.+$/g, '').match(/[0-9a-z]+/g)[0] // 先提取非十六进制部分，再匹配数字和字母(寄存器名字)

          // 若是't'，则字符串是'/t0x123213'类型，中不包含名字
          if (temp == 't') {
            dec_num = parseInt(hex_num, 16) // 将字符串以十六进制规则转换成整型
            this.addRegister(registers, name, hex_num, dec_num)
          } else {
            name = temp
          }
        }
      }
      return registers
    }
  },
  methods: {
    addRegister(registers, name, hex_num, dec_num) {
      if (name == 'rip') {
        registers.unshift({
          name,
          Hex: hex_num,
          Dec: dec_num
        })
      } else if (name[0] == 'k') {
        return
      } else{
        registers.push({
          name,
          Hex: hex_num,
          Dec: dec_num
        })
      }
    }
  }
}
</script>

<style>
</style>
