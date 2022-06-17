<template>
	<van-tabs active="{{ active }}" :change="onChange">
		<van-tab title="全部">
			<view class="order" v-for="(item,index) in list" :key="item" @click="goOrderdtail(item.order_sn)" >
				<view class="customer-info">
					<view class="nameinfo">{{item.consignee}} {{item.tel}}</view>
					<view class="order-status">{{item.order_status_string}}</view>
				</view>
				<view class="good-details">
					<view class="tools">
						<view class="goods" v-for="(item1,) in item.all_goods" :key="item1" >
							<!-- 单件商品 -->
							<view class="good-del" v-if="item.all_goods.length == 1">
								<view class="good-left">
									<image :src="item1.goods_thumb_url" class="img"></image>
									<view class="good-name">{{item1.goods_name}} ×{{item1.whereabouts}}</view>
								</view>
								<view class="price">￥{{item1.goods_price}}</view>
							</view>
							<!-- 多件商品 -->
							<view class="goods-del" v-else="item.all_goods.length != 1">
								<image :src="item1.goods_thumb_url" class="imgs"></image>
							</view>
						</view>
					</view>

					<view class="good-bottom">{{item.order_add_time}} 订单号：{{item.order_sn}}</view>
					<view class="goods-totals">共{{length[index]}}件 合计：￥{{item.order_wholesale_total_price}}</view>
					<button class="buyagain" @click="goCart">再次购买</button>
				</view>

			</view>
		</van-tab>
		<van-tab title="待付款"></van-tab>
		<van-tab title="待发货"></van-tab>
		<van-tab title="待收货"></van-tab>
		<van-tab title="已完成"></van-tab>
	</van-tabs>
</template>

<script>
	import {
		requestGet,
		requestPost
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				list: [],
				length:[],
			}
		},
		created() {
			this.order();
		},
		methods: {
			async order() {
				let result = await requestPost("/api/api/order_list?XcxSessKey=%20&company_id=7194");
				this.list = result.data.list
				console.log(this.list);
				this.list.forEach(item=>this.length.push(item.all_goods.length))
		
			},
			goCart() {
				uni.navigateTo({
					url: '/pages/cart/cart'
				})
			},
			goOrderdtail(order_sn){
				uni.navigateTo({
					url:`/pages/orderdetail/orderdetail?order_sn=${order_sn}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.order {
		background-color: #fff;

		.customer-info {
			display: flex;
			height: 50px;
			line-height: 50px;
			background-color: snow;
			border-bottom: 2px solid #eee;
			margin-top: 10px;

			.nameinfo {
				margin-left: 10px;
			}

			.order-status {
				flex: 1;
				text-align: right;
				margin-right: 10px;
			}
		}

		.good-details {
			height: 190px;

			.tools {
				height: 100px;
				.goods {

					// 单件商品
					.good-del {
						display: flex;
						padding-top: 10px;

						.good-left {
							display: flex;

							.img {
								width: 70px;
								height: 50px;
								padding-left: 10px;
							}

							.good-name {
								color: #666;
								font-size: 12px;
								width: 200px;
								padding-left: 10px;
							}
						}

						.price {
							flex: 1;
							text-align: right;
							font-size: 12px;
						}
					}

					// 多件商品
					.goods-del {

						.imgs {
							width: 42px;
							height: 35px;
							float: left;
							padding-left: 10px;
							margin-bottom: 10px;
							padding-top: 10px;
						}
					}
				}
			}



			.good-bottom {
				height: 20px;
				color: #666;
				font-size: 12px;
				margin-top: 10px;
				margin-left: 10px;
				border-bottom: 1px solid #eee;
				padding-bottom: 15px;
			}

			.goods-totals {
				color: #666;
				font-size: 12px;
				text-align: right;
				margin-top: 10px;
			}

			.buyagain {
				font-size: 14px;
				width: 90px;
				background-color: #fff;
				text-align: center;
				border-radius: 5px;
				margin-right: 10px;
				margin-top: 10px;
			}
		}

	}
</style>
