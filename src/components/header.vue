<template>
<div id="header" class="bg-light px-2 row">
    <div class="col-8 row">
        <Progress percent="45" status="active" class="col-7"/>
        <ButtonGroup shape="circle" class="mt-1 col-2">
            <Button type="primary" icon="ios-skip-backward"></Button>
            <Button type="primary" icon="ios-skip-forward"></Button>
        </ButtonGroup>
        <ButtonGroup shape="circle" class="mt-1 ml-3">
            <Button icon="ios-color-wand-outline"></Button>
            <Button icon="ios-sunny-outline"></Button>
            <Button icon="ios-crop"></Button>
            <Button icon="ios-color-filter-outline"></Button>
        </ButtonGroup>
    </div>
</div>
</template>

<style>
.row {
    margin-right: 0px;
    margin-left: 0px;
}
#header {
    height: 40px;
    line-height: 40px;
    flex: 0 0 auto;
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
