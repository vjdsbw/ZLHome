<template>
	<view class="order">
	
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
			this.order();
		},
		methods: {
			async order() {
				let result = await requestGet("/api/api/order_list");
				console.log(result);
			},

		}
	}
</script>

<style>

</style>
