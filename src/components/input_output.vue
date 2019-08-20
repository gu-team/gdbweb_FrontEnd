<template>
<div>
  <Card style="margin-bottom:20px">
    <h3 slot="title">Input</h3>
    <pre style="font-size:15px; flex-wrap:wrap">{{ input_data }}</pre>
  </Card>

  <Card>
    <h3 slot="title">Output</h3>
    <pre style="font-size:15px; flex-wrap:wrap">{{ output_data }}</pre>
  </Card>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'currentPid',
      'input_data',
      'output_data'
    ])
  },
  methods: {
  }
}
</script>

<style>
</style>
