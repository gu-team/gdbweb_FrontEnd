<template>
<div id="header" class="bg-light px-2 row">
    <Progress percent="45" status="active" class="col-4"/>
    <ButtonGroup shape="circle" class="mt-1">
        <Button type="primary" icon="ios-skip-backward"></Button>
        <Button type="primary" icon="ios-skip-forward"></Button>
    </ButtonGroup>
    <ButtonGroup shape="circle" class="mt-1 ml-2">
        <Button icon="ios-color-wand-outline"></Button>
        <Button icon="ios-sunny-outline"></Button>
        <Button icon="ios-crop"></Button>
        <Button icon="ios-color-filter-outline"></Button>
    </ButtonGroup>
</div>
</template>

<style>
#header {
    height: 40px;
    line-height: 40px;
    flex: 0 0 auto;
    z-index: 999;
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
