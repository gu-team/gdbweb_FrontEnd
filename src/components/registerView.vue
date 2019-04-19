<template>
<div id="registerView">
    <Collapse class="text-left" v-model="panelOpen">
        <Panel name="1">
            整数寄存器
            <Table slot="content" stripe :columns="columnsName" :data="registers" size="small"></Table>
        </Panel>
        <Panel name="2">
            浮点数寄存器
            <p slot="content"></p>
        </Panel>
        <Panel name="3">
            标志码
            <p slot="content"></p>
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
                    Hex: "0x0",
                    Dec: 0
                },
                {
                    name: "rax",
                    Hex: "0x0",
                    Dec: 0
                },
                {
                    name: "rbx",
                    Hex: "0x0",
                    Dec: 0
                },
                {
                    name: "rsp",
                    Hex: "0x0",
                    Dec: 0
                },
                {
                    name: "rbp",
                    Hex: "0x0",
                    Dec: 0
                }
            ],
            columnsName: [
                {
                    title: 'Name',
                    key: 'name',
                    width: 70
                },
                {
                    title: 'Hex',
                    key: 'Hex'
                },
                {
                    title: 'Dec',
                    key: 'Dec'
                }
            ]
        }
    },
    methods: {
    }
}
</script>
