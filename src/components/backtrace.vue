<template>
  <Table
    stripe
    border
    :columns="columnsName"
    :data="backtrace">
  </Table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      columnsName: [{
        title: '栈帧',
        key: 'backtrace',
        minWidth: 200,
        align: 'center'
      }]
    }
  },
  computed: {
    ...mapState([
      'backtrace_data'
    ]),
    backtrace() {
      let backtrace = []
      let data = this.backtrace_data
      for (let i = 1; i < data.length; i++) {
        backtrace.push({
          backtrace: data[i]
        })
      }
      return backtrace
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
