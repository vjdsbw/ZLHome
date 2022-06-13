<template>
	<view class="index">
		
	</view>
</template>

<script>
	import {
		requestGet,
		requestPost
	} from '@/common/js/http.js'
	export default {
		data() {
			return {	
			}
		},
		created() {
			this.getSwipers();
		},
		methods: {	
			onKeyInput: function(event) {
				this.keywords = event.detail.value	
			},
			async getSwipers(){
				let result2 = await requestGet("/api/api/category-chaji");
				console.log(result2);
			},			
		}
	}
</script>

<style scoped lang="less">

</style>
