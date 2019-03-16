<template>
<div id="registerView">
    <Collapse class="text-left" v-model="panelOpen">
        <Panel name="1">
            整数寄存器
            <Table slot="content" stripe :columns="columnsName" :data="registers" size="small"></Table>
        </Panel>
        <Panel name="2">
            浮点数寄存器
            <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
        </Panel>
        <Panel name="3">
            标志码
            <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
        </Panel>
    </Collapse>
</div>
</template>

<style>
</style>

<script>
export default {
    name: "codeViregisterViewew",
    data() {
        return {
            panelOpen: ['1','2','3'],
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
