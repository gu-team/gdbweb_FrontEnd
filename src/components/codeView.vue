<template>
  <div id="codeView" v-highlight>
    <pre><code v-html="asmStr"></code></pre>
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
      'assmb_data'
    ]),
    asmStr() {
      let asmStr = ""
      let asmStrList = this.assmb_data
      // console.log('asmStrList --->', asmStrList)
      // 如果获取到的assmb是undefined，或者为空数组，那么asmStrList设为默认
      if (asmStrList == undefined || asmStrList.length == 0)
        asmStrList = this.defaultAssemb
      // 将汇编字符串数组拼接成汇编字符串
      for (let i = 0; i < asmStrList.length; i++) {
        asmStrList[i] = asmStrList[i].replace(/\\t/g, "\t")
        asmStrList[i] = asmStrList[i].replace(/\\n/g, "\n")
        asmStr += asmStrList[i]
      }
      // console.log('asmStr --->', asmStr)
      return asmStr
    }
  },
  methods: {
  }
}
</script>