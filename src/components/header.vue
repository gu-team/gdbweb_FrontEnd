<template>
  <div class="header-wrapper">
    <Input v-model="elfInfo" style="width:30%;margin-right:10px">
      <span slot="prepend">
        <Button type="primary" icon="md-cloud-upload" @click="click_uploadelf" :loading="uploadelf_loading">
          uploadelf
        </Button>
      </span>
    </Input>

    <ButtonGroup shape="circle">
      <Button icon="md-power" @click="click_start" :loading="start_loading">start</Button>
      <Button icon="md-play" @click="click_next" :loading="next_loading">next</Button>
      <Button icon="md-skip-forward" :loading="false">step</Button>
    </ButtonGroup>
  </div>
</template>

<style>
.header-wrapper {
  height: 100%;
  background-color: #DCDFE6;
  z-index: 999;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>

<script>
import { uploadelf, start, next } from '@/api/api.js'

export default {
  props: {
    setDisassemble: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      elfInfo: 'please upload elf firstly',
      uploadelf_loading: false,
      start_loading: false,
      next_loading: false
    }
  },
  methods: {
    click_uploadelf() {
      this.uploadelf_loading = true;
      uploadelf().then(resp => {
        console.log('uploadelf --->', resp.data);
        this.uploadelf_loading = false;
      }).catch(error => {
        console.log(error);
        this.error(error);
        this.uploadelf_loading = false;
      });
    },
    click_start() {
      this.start_loading = true;
      start().then(resp => {
        console.log('start --->', resp.data);
        this.setDisassemble();
        this.start_loading = false;
      }).catch(error => {
        console.log(error);
        this.error(error);
        this.start_loading = false;
      });
    },
    click_next() {
      this.next_loading = true;
      next().then(resp => {
        console.log('next --->', resp.data);
        this.setDisassemble();
        this.next_loading = false;
      }).catch(error => {
        console.log(error);
        this.error(error);
        this.next_loading = false;
      });
    },
    error (error) {
      this.$Message.error(error);
    }
  }
}
</script>
