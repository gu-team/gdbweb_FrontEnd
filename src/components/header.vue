<template>
  <div class="header-wrapper">
    <Upload action="//jsonplaceholder.typicode.com/posts/" style="display: flex;align-items: center;"
    :show-upload-list="false"
    :on-progress="upload_progress"
    :on-success="upload_success"
    :on-error="upload_error">
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
      <Button icon="md-remove-circle" :loading="false">break</Button>
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
import { start, next } from '@/api/api.js'

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
    api_handle(api, loading, succ_msg, err_msg) {
      loading = true;
      api().then(resp => {
        console.log(resp.data);
        this.setDisassemble();
        this.$Message.success(succ_msg);
        loading = false;
      }).catch(error => {
        console.log(error);
        this.$Message.error(err_msg);
        loading = false;
      });
    },
    click_start() {
      console.log('=============click_start=============');
      this.api_handle(start, this.start_loading, 'start!', 'start fail!');
    },
    click_next() {
      console.log('=============click_next=============');
      this.api_handle(next, this.next_loading, 'next 1!', 'next fail!');
    },
    upload_progress() {
    },
    upload_success() {
    },
    upload_error() {
    }
  }
}
</script>
