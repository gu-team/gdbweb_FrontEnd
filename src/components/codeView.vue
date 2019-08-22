<template>
  <div id="codeView" v-highlight>
    <pre><code v-html="code"></code></pre>
  </div>
</template>

<style>
#codeView {
  text-align: left;
}
pre {
  margin-top: 0;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  name: "codeView",
  data() {
    return {
      defaultAssemb: [
        "example:\n",
        "0x0000000000400da0 <+0>:     push   %rbx\n",
        "0x0000000000400da1 <+1>:     cmp    $0x1,%edi\n",
        "0x0000000000400da4 <+4>:     jne    0x400db6 <main+22>\n"
      ]
    }
  },
  computed: {
    ...mapState([
      'assmb_data',
      'isAsm',
      'source_data'
    ]),
    code() {
      let code = ""
      if (this.isAsm) {
        code = this.getAsm(this.assmb_data)
      } else {
        code = this.getSource(this.source_data)
      }
      return code
    }
  },
  methods: {
    getSource(source_data) {
      let source = ''
      for (let i = 1; i < source_data.length; i++) {
        source += source_data[i]
          .replace(/^\d+\\t/g, i + ' ')
          .replace(/\\n$/g, '\n')
          .replace(/\\/g, '')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
      }
      // console.log(source)
      return source
    },
    getAsm(asmStrList) {
      let asm = ''
      // console.log('asmStrList --->', asmStrList)
      // 如果获取到的assmb是undefined，或者为空数组，那么asmStrList设为默认
      if (asmStrList == undefined || asmStrList.length == 0)
        asmStrList = this.defaultAssemb
      // 将汇编字符串数组拼接成汇编字符串
      for (let i = 0; i < asmStrList.length; i++) {
        asmStrList[i] = asmStrList[i].replace(/\\t/g, "\t")
        asmStrList[i] = asmStrList[i].replace(/\\n/g, "\n")
        asm += asmStrList[i]
      }
      return asm
    }
  }
}
</script>