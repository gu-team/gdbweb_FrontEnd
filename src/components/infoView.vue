<template>
<div id="infoView">
  <Collapse v-model="panelOpen">
    <Panel name="registers">
      Registers
      <register-list slot="content"/>
    </Panel>
    <Panel name="breakpoints">
      Breakpoints & Catchpoints
      <breakpoints slot="content"/>
    </Panel>
    <Panel name="memory">
      Memory
      <memory slot="content"/>
    </Panel>
    <Panel name="backtrace">
      Backtrace
      <backtrace slot="content"/>
    </Panel>
  </Collapse>
</div>
</template>

<script>
import registerList from '@/components/registerList.vue'
import breakpoints from '@/components/breakpoints.vue'
import memory from '@/components/memory.vue'
import backtrace from '@/components/backtrace.vue'

export default {
  name: "infoViewew",
  components: {
    registerList,
    breakpoints,
    memory,
    backtrace
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
