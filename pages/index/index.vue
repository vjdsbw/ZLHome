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
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				goods_ids:''
			}
		},
		created() {
			this.getSwipers();
		},
		methods: {
			async getSwipers() {
				//因为配置了api代理，所有路径前面需再加上一个/api,写法参考如下
				//传参  Post  接口:/m/index/cate
				// let result = await requestPost("/api/m/index/cate", {
				// 	'biao': 'keting'
				// });

				//无传参 Post 接口:/x/index/index
				let result2 = await requestPost("/api/x/index/index");

				// 传参  Get  接口：https://m.meijiavip.com/api/goods/get_price?goods_ids=125649%2C98194%2C124851%2C90846%2C97279%2C98027%2C98025%2C98024%2C90823%2C97289%2C90838%2C97272%2C90842%2C90854%2C124849%2C90848%2C90828%2C97264%2C97282%2C90843%2C43829%2C97270%2C90856%2C91239%2C97283%2C90851%2C97280%2C97268%2C97290%2C125645%2C101791%2C98196&XcxSessKey=%20&company_id=7194
				let result3 = await requestGet("/api/api/category-xidingdeng/");
				console.log( result3.data.goods_list);
				for(let i=0;i< result3.data.goods_list.length;i++){
					if(i==0){
						 this.goods_ids = result3.data.goods_list[i].goods_id;
					}
				 this.goods_ids = this.goods_ids+`,`+result3.data.goods_list[i].goods_id;
				}
				console.log(this.goods_ids);
				let result4 = await requestGet('/api/api/goods/get_price',{"goods_ids":this.goods_ids})
				console.log(result4);
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
