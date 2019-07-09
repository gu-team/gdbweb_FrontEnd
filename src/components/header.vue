<template>
  <div class="header-wrapper">
    <Upload action="//jsonplaceholder.typicode.com/posts/" style="display: flex;align-items: center;" :show-upload-list="false">
      <Button type="primary" icon="md-cloud-upload" :loading="uploadelf_loading">
        UPLOAD ELF
      </Button>
    </Upload>

    <Input v-model="elf_info" disabled style="width:30%;margin-right:20px"></Input>

    <!-- <Button icon="md-power" @click="click_start" :loading="start_loading" shape="circle" style="margin-right:20px">start</Button> -->

    <!-- <ButtonGroup shape="circle" style="margin-right:20px">
      <Button icon="md-remove-circle" @click="click_next" :loading="next_loading">break</Button>
      <Button icon="md-fastforward" :loading="false">continue</Button>
    </ButtonGroup> -->

    <ButtonGroup shape="circle">
      <Button icon="md-power" @click="click_start" :loading="start_loading">start</Button>
      <Button icon="md-remove-circle" :loading="next_loading">break</Button>
      <Button icon="md-fastforward" :loading="false">continue</Button>
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
  padding: 0 20px;
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
      elf_info: 'Please upload elf firstly',
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
