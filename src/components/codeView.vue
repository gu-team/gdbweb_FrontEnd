<template>
<div id="codeView" v-highlight>
  <pre><code v-html="getAsmStr()"></code></pre>
</div>
</template>

<style>
pre{
  margin-top: 0;
}
</style>

<script>
export default {
  name: "codeView",
  props: {
    assemb: Array
  },
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
  methods: {
    getAsmStr() {
      let asmStr = "";
      let asmStrList = [];
      console.log(this.assemb);
      // 如果父组件传进来的assmb是undefined，或者为空数组，那么asmStrList设为默认
      if (this.assemb == undefined || this.assemb.length == 0)
        asmStrList = this.defaultAssemb;
      else
        asmStrList = this.assemb;
      console.log('asmStrList --->', asmStrList);
      // 将汇编字符串数组拼接成汇编字符串
      for (let i = 0; i < asmStrList.length; i++) {
        asmStrList[i] = asmStrList[i].replace(/\\t/g, "\t");
        asmStrList[i] = asmStrList[i].replace(/\\n/g, "\n");
        asmStr += asmStrList[i];
      }
      console.log('asmStr --->', asmStr);
      return asmStr;
    }
  }
}
</script>