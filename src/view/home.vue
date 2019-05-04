<template>
<div class="homeView">
	<div class="header">
		<head-er
		:uploadelf="click_uploadelf"
		:start="click_start"
		:getDisassemble="click_getDisassemble"
		:next="click_next"
		:uploadelf_loading="uploadelf_loading"
		:start_loading="start_loading"
		:next_loading="next_loading"
		></head-er>
	</div>
	<!-- header -->

	<div class="mainView">
		<Split v-model="split">
			<div slot="left" class="codeView">
				<code-view :assemb="assemb"></code-view>
			</div>
			<!-- code view -->

			<div slot="right" class="infoView">
				<info-view></info-view>
			</div>
			<!-- info view -->
		</Split>
	</div>
	<!-- main view -->
</div>
</template>

<style>
@import './home.css';
</style>

<script>
import header from "@/components/header.vue"
import codeView from "@/components/codeView.vue"
import infoView from "@/components/infoView.vue"
import {uploadelf, start, getDisassemble, next} from '../api/api'

export default {
	name: 'home',
	components: {
		'code-view': codeView,
		'head-er': header,
		'info-view': infoView
	},
	data() {
		return {
			split: 0.6,
			assemb: [],
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
				this.click_getDisassemble();
				this.start_loading = false;
			}).catch(error => {
				console.log(error);
				this.error(error);
				this.start_loading = false;
			});
		},
		click_getDisassemble() {
			getDisassemble('main').then(resp => {
				console.log('getDisassemble --->', resp.data);
				this.assemb = resp.data.message;
			}).catch(error => {
				console.log(error);
				this.error(error);
			});
		},
		click_next() {
			this.next_loading = true;
			next().then(resp => {
				console.log('next --->', resp.data);
				this.click_getDisassemble();
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
	},
	beforeCreate() {
	}
}
</script>