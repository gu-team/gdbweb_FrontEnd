<template>
    <div class="homeView">
		<div class="header">
			<head-er></head-er>
		</div>

        <div class="mainView">
			<Split v-model="split">
				<div slot="left" class="codeView">
					<code-view></code-view>
				</div>
				<div slot="right" calss="infoView">
					<register-view></register-view>
				</div>
			</Split>
        </div>
    </div>
</template>

<script>
import header from "@/components/header.vue"
import codeView from "@/components/codeView.vue"
import registerView from "@/components/registerView.vue"

export default {
	name: 'home',
	components: {
		'code-view': codeView,
		'head-er': header,
		'register-view': registerView
	},
	data() {
	return {
		split: 0.6
	}
	}
}
</script>

<style>
/* 宽度小于700px时*/
@media (max-width: 700px) {
}
/* 宽度大于700px时*/
@media (min-width: 700px) {
    .homeView {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
	.header {
		width: 100%;
		height: 40px;
		line-height: 40px;
		overflow: hidden;
	}
	.mainView{
		width: 100%;
		height: 500px;
		border: 1px solid #dcdee2;
		background-color: antiquewhite;
	}
	.codeView{
		height: 100%;
		overflow-x: auto;
		text-align: left;
		font-size: 16px;
	}
	.infoView{
		padding-left: 0.2rem;
	}
}

</style>