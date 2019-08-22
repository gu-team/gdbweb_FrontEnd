<template>
<div id="infoView">
  <Collapse v-model="panelOpen">
    <Panel name="input_output">
      Input & Output
      <input-output slot="content"/>
    </Panel>
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
import inputOutput from '@/components/input_output.vue'

export default {
  name: "infoViewew",
  components: {
    registerList,
    breakpoints,
    memory,
    backtrace,
    inputOutput
  },
  data() {
    return {
      panelOpen: ['input_output']
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
