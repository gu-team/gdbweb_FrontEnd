<template>
<div id="registerView">
    <div class="title">整数寄存器</div>
    <Table stripe :columns="columnsName" :data="registers" size="small"></Table>
</div>
</template>

<style>
.title {
    font-size: 14px;
    background-color: #03b4f475;
    text-align: left;
    padding: 2px 15px;
}
</style>

<script>
export default {
    name: "codeViregisterViewew",
    data() {
        return {
            submenus: [
                {
                    name: 1,
                    title: "整数寄存器"
                },
                {
                    name: 2,
                    title: "浮点数寄存器"
                },
                {
                    name: 3,
                    title: "标志码"
                }
            ],
            registers: [
                {
                    name: "rip",
                    valueHex: "0x0",
                    valueDec: 0
                },
                {
                    name: "rax",
                    valueHex: "0x0",
                    valueDec: 0
                },
                {
                    name: "rbx",
                    valueHex: "0x0",
                    valueDec: 0
                },
                {
                    name: "rsp",
                    valueHex: "0x0",
                    valueDec: 0
                },
                {
                    name: "rbp",
                    valueHex: "0x0",
                    valueDec: 0
                }
            ],
            columnsName: [
                {
                    title: 'Name',
                    key: 'name',
                    width: 70
                },
                {
                    title: 'ValueHex',
                    key: 'valueHex'
                },
                {
                    title: 'ValueDec',
                    key: 'valueDec'
                }
            ]
        }
    },
    methods: {
    }
}
</script>
