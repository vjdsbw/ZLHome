<template>
	<view class="container">
		<van-button type="default">默认按钮</van-button>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="info">信息按钮</van-button>
		<van-button type="warning">警告按钮</van-button>
		<van-button type="danger">危险按钮</van-button>
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
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		created() {
			this.getSwipers();
		},
		methods: {
			async getSwipers() {
				//因为配置了api代理，所有路径前面需再加上一个/api,写法参考如下
				//传参  Post  接口:/m/index/cate
				let result = await requestPost("/api/m/index/cate", {
					'biao': 'keting'
				});

				//无传参 Post 接口:/x/index/index
				let result2 = await requestPost("/api/x/index/index");

				//传参  Get  接口：/api/category-chuang/?v=1&XcxSessKey=%20&company_id=7194
				let result3 = await requestGet("/api/api/category-chuang/?v=1&XcxSessKey=%20&company_id=7194");
				console.log(result, result2, result3);
			},
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
