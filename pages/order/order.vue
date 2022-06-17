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
			this.order()
		},
		methods: {
			async order() {
				let result = await requestPost("/api/api/order_list?XcxSessKey=%20&company_id=7194");
				console.log(result);
			},
		}
	}
</script>

<style>

</style>
