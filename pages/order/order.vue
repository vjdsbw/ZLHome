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
				// https://m.meijiavip.com/getUserRole
				let result = await requestPost("/api/getUserRole",{
					"store_id":0,
					"PHPSESSID":'31su9tq82e36shnq07iafvmp7t',
					"user_name":233,
					"user_id":24507,
					"real_ipd":'180.113.61.252',
					"company_id":7194
				});
				// let result = await requestGet("/api/api/order_list");
				console.log(result);
			},

		}
	}
</script>

<style>

</style>
