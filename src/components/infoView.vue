<template>
<div id="infoView">
  <Collapse v-model="panelOpen">
    <Panel name="registers">
      Registers
      <register-list slot="content"/>
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
import registerList from '@/components/registerList.vue'

export default {
  name: "infoViewew",
  components: {
    registerList
  },
  data() {
    return {
      panelOpen: []
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
