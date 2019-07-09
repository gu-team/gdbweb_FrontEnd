<template>
<div id="infoView">
  <Collapse v-model="panelOpen">
    <Panel name="registers">
      Registers
      <Table slot="content" stripe :columns="columnsName" :data="registers" size="small"></Table>
    </Panel>
    <Panel name="breakpoints">
      Breakpoints
    </Panel>
    <Panel name="memory">
      Memory
    </Panel>
    <Panel name="syscall">
      Syscall
    </Panel>
  </Collapse>
</div>
</template>

<script>
export default {
  name: "infoViewew",
  data() {
    return {
      panelOpen: ['registers', 'breakpoints', 'memory', 'syscall'],
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

<style>
</style>
