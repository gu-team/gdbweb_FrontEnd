<template>
<div id="codeView">
    <pre v-highlight>
        <code class="armasm" :class="codeStyle[3]">{{getAsmCode()}}</code>
    </pre>
</div>
</template>

<style>
#codeView {
    top: -48px;
    position: relative;
}
pre code {
    text-align: left;
    font-size: 18px;
    overflow-y: auto;
    height: 40rem;
}
</style>

<script>
export default {
    name: "codeView",
    data() {
        return {
            codeStyle: [
                "solarized-dark",
                "github",
                "Monokai",
                "mono-blue"
            ],
            assemb: [
                "0x0000000000400da0 <+0>:     push   %rbx",
                "0x0000000000400da1 <+1>:     cmp    $0x1,%edi",
                "0x0000000000400da4 <+4>:     jne    0x400db6 <main+22>",
                "0x0000000000400da6 <+6>:     mov    0x20299b(%rip),%rax",
                "0x0000000000400dad <+13>:    mov    %rax,0x2029b4(%rip)",
                "0x0000000000400db4 <+20>:    jmp    0x400e19 <main+121>",
                "0x0000000000400db6 <+22>:    mov    %rsi,%rbx",
                "0x0000000000400db9 <+25>:    cmp    $0x2,%edi",
                "0x0000000000400dbc <+28>:    jne    0x400df8 <main+88>",
                "0x0000000000400dbe <+30>:    mov    0x8(%rsi),%rdi",
                "0x0000000000400dc2 <+34>:    mov    $0x4022b4,%esi",
                "0x0000000000400dc7 <+39>:    callq  0x400c10 <fopen@plt>",
                "0x0000000000400dcc <+44>:    mov    %rax,0x202995(%rip)",
                "0x0000000000400da0 <+0>:     push   %rbx",
                "0x0000000000400da1 <+1>:     cmp    $0x1,%edi",
                "0x0000000000400da4 <+4>:     jne    0x400db6 <main+22>",
                "0x0000000000400da6 <+6>:     mov    0x20299b(%rip),%rax",
                "0x0000000000400dad <+13>:    mov    %rax,0x2029b4(%rip)",
                "0x0000000000400db4 <+20>:    jmp    0x400e19 <main+121>",
                "0x0000000000400db6 <+22>:    mov    %rsi,%rbx",
                "0x0000000000400db9 <+25>:    cmp    $0x2,%edi",
                "0x0000000000400dbc <+28>:    jne    0x400df8 <main+88>",
                "0x0000000000400dbe <+30>:    mov    0x8(%rsi),%rdi",
                "0x0000000000400dc2 <+34>:    mov    $0x4022b4,%esi",
                "0x0000000000400dc7 <+39>:    callq  0x400c10 <fopen@plt>",
                "0x0000000000400dcc <+44>:    mov    %rax,0x202995(%rip)"
            ]
        }
    },
    methods: {
        getAsmCode() {
            var asmCode = "";
            for (let i = 0; i < this.assemb.length; i++) {
                asmCode += i;
                if (i >= 100 && i < 1000) {
                    asmCode += " ";
                } else if (i >= 10) {
                    asmCode += "  ";
                } else {
                    asmCode += "   ";
                }
                asmCode += "|" + this.assemb[i] + "\r";
            }
            console.log(asmCode);
            return asmCode;
        }
    }
}
</script>
