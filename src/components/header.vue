<template>
<div class="bg-light px-2 row h-100">
    <Progress :percent="45" status="active" class="col-5"/>
    <!-- <ButtonGroup shape="circle" class="mt-1 col-1">
        <Button type="primary" icon="ios-skip-backward"></Button>
        <Button type="primary" icon="ios-skip-forward"></Button>
    </ButtonGroup> -->
    <ButtonGroup shape="circle" class="mt-1 ml-1 col">
        <Button icon="md-cloud-upload" @click="uploadelf" :loading="uploadelf_loading">uploadelf</Button>
        <Button icon="md-arrow-dropright-circle" @click="start" :loading="start_loading">start</Button>
        <!-- <Button icon="ios-crop" @click="getDisassemble">getDisassemble</Button> -->
        <Button icon="ios-skip-forward" @click="next" :loading="next_loading">next</Button>
    </ButtonGroup>
</div>
</template>

<style>
.row {
    margin-right: 0px;
    margin-left: 0px;
}
</style>

<script>
export default {
    props: {
        uploadelf: {
            type: Function,
            required: true
        },
        start: {
            type: Function,
            required: true
        },
        getDisassemble: {
            type: Function,
            required: true
        },
        next: {
            type: Function,
            required: true
        },
        uploadelf_loading: {
            type: Boolean,
            required: true
        },
        start_loading: {
            type: Boolean,
            required: true
        },
        next_loading: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return { 
        }
    }
}
</script>
