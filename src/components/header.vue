<template>
<div class="bg-light px-2 row h-100">
    <Progress percent="45" status="active" class="col-7"/>
    <ButtonGroup shape="circle" class="mt-1 col-2">
        <Button type="primary" icon="ios-skip-backward"></Button>
        <Button type="primary" icon="ios-skip-forward"></Button>
    </ButtonGroup>
    <ButtonGroup shape="circle" class="mt-1 ml-1 col-2">
        <Button icon="ios-color-wand-outline"></Button>
        <Button icon="ios-sunny-outline"></Button>
        <Button icon="ios-crop"></Button>
        <Button icon="ios-color-filter-outline"></Button>
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
    data() {
        return {
            
        }
    }
}
</script>
