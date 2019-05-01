<template>
<div id="codeView" v-highlight>
    <pre><code v-html="getAsmStr()"></code></pre>
</div>
</template>

<style>
pre{
    margin-bottom: 0;
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
                "0x0000000000400da0 <+0>:     push   %rbx\n",
                "0x0000000000400da1 <+1>:     cmp    $0x1,%edi\n",
                "0x0000000000400da4 <+4>:     jne    0x400db6 <main+22>\n",
                "0x0000000000400da6 <+6>:     mov    0x20299b(%rip),%rax\n",
                "0x0000000000400dad <+13>:    mov    %rax,0x2029b4(%rip)\n",
                "0x0000000000400db4 <+20>:    jmp    0x400e19 <main+121>\n",
                "0x0000000000400db6 <+22>:    mov    %rsi,%rbx\n",
                "0x0000000000400db9 <+25>:    cmp    $0x2,%edi\n",
                "0x0000000000400dbc <+28>:    jne    0x400df8 <main+88>\n",
                "0x0000000000400dbe <+30>:    mov    0x8(%rsi),%rdi\n",
                "0x0000000000400dc2 <+34>:    mov    $0x4022b4,%esi\n",
                "0x0000000000400dc7 <+39>:    callq  0x400c10 <fopen@plt>\n",
                "0x0000000000400dcc <+44>:    mov    %rax,0x202995(%rip)\n",
                "0x0000000000400da0 <+0>:     push   %rbx\n",
                "0x0000000000400da1 <+1>:     cmp    $0x1,%edi\n",
                "0x0000000000400da4 <+4>:     jne    0x400db6 <main+22>\n",
                "0x0000000000400da6 <+6>:     mov    0x20299b(%rip),%rax\n",
                "0x0000000000400dad <+13>:    mov    %rax,0x2029b4(%rip)\n",
                "0x0000000000400db4 <+20>:    jmp    0x400e19 <main+121>\n",
                "0x0000000000400db6 <+22>:    mov    %rsi,%rbx\n",
                "0x0000000000400db9 <+25>:    cmp    $0x2,%edi\n",
                "0x0000000000400dbc <+28>:    jne    0x400df8 <main+88>\n",
                "0x0000000000400dbe <+30>:    mov    0x8(%rsi),%rdi\n",
                "0x0000000000400dc2 <+34>:    mov    $0x4022b4,%esi\n",
                "0x0000000000400dc7 <+39>:    callq  0x400c10 <fopen@plt>\n",
                "0x0000000000400dcc <+44>:    mov    %rax,0x202995(%rip)"
            ]
        }
    },
    methods: {
        getAsmStr() {
            var asmStr = "";
            var asmStrList = [];

            console.log(this.assemb);
            // 如果父组件传进来的assmb是undefined，或者为空数组，那么asmStrList设为默认
            if (this.assemb == undefined || this.assemb.length == 0) asmStrList = this.defaultAssemb;
            else asmStrList = this.assemb;
            console.log('asmStrList --->', asmStrList);

            // 将汇编字符串数组拼接成汇编字符串
            for (let i = 0; i < asmStrList.length; i++) {
                // asmStr += i;
                // if (i >= 100 && i < 1000) {
                //     asmStr += " ";
                // } else if (i >= 10) {
                //     asmStr += "  ";
                // } else {
                //     asmStr += "   ";
                // }
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
