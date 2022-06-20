<template>
	<van-tabs active="{{ active }}" :change="onChange">
		<van-tab title="全部">
			<view class="order" v-for="(item,index) in list" :key="item">
				<view class="order_status_string" v-if="item.order_status_string == '已取消'">
					<view class="customer-info">
						<view class="nameinfo">{{item.consignee}} {{item.tel}}</view>
						<view class="order-status">{{item.order_status_string}}</view>
					</view>
					<view class="good-details">
						<scroll-view scroll-x="true">
							<view class="tools" @click="goOrderdtail(item.order_sn)">
								<view class="goods" v-for="(item1,) in item.all_goods" :key="item1">
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
										<scroll-view class="scroll-goods" scroll-x="true">
											<view class="scroll-imgs">
												<image :src="item1.goods_thumb_url" class="imgs"></image>
											</view>
										</scroll-view>
									</view>

								</view>
							</view>

						</scroll-view>
						<view class="good-bottom">{{item.order_add_time}} 订单号：{{item.order_sn}}</view>
						<view class="goods-totals">共{{length[index]}}件 合计：￥{{item.order_wholesale_total_price}}</view>
						<button class="buyagain" @click="goCart">再次购买</button>
					</view>
				</view>

				<view class="order_status_string" v-if="item.order_status_string == '未付款'">
					<view class="customer-info">
						<view class="nameinfo">{{item.consignee}} {{item.tel}}</view>
						<view class="order-status2">{{item.order_status_string}}</view>
					</view>
					<view class="good-details">
						<scroll-view scroll-x="true">
							<view class="tools" @click="goOrderdtail(item.order_sn)">
								<view class="goods" v-for="(item1,) in item.all_goods" :key="item1">
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
										<scroll-view class="scroll-goods" scroll-x="true">
											<view class="scroll-imgs">
												<image :src="item1.goods_thumb_url" class="imgs"></image>
											</view>
										</scroll-view>
									</view>
								</view>

							</view>
						</scroll-view>
						<view class="good-bottom">{{item.order_add_time}} 订单号：{{item.order_sn}}</view>
						<view class="goods-totals">共{{length[index]}}件 合计：￥{{item.order_wholesale_total_price}}</view>
						<view class="buttons">
							<button class="cancels" @click="open">取消订单</button>
							<uni-popup ref="popups" type="center">
								<view class="tip">
									<view class="title">提示操作</view>
									<view class="content">确定要取消这个订单吗?</view>
									<view class="buts">
										<button class="cancel" @click="close">取消</button>
										<button class="sure" @click="del(item.order_sn)">确定</button>
									</view>
								</view>
							</uni-popup>
							<button class="buyagains" @click="goCart">再次购买</button>
							<button class="pays" @click="pay">付款</button>
						</view>
					</view>
				</view>
			</view>
		</van-tab>

		<van-tab title="待付款">
			<view class="order" v-for="(item,index) in list" :key="item">
				<view class="order_status_string" v-if="item.order_status_string == '未付款'">
					<view class="customer-info">
						<view class="nameinfo">{{item.consignee}} {{item.tel}}</view>
						<view class="order-status2">{{item.order_status_string}}</view>
					</view>
					<view class="good-details">
						<scroll-view scroll-x="true">
							<view class="tools" @click="goOrderdtail(item.order_sn)">
								<view class="goods" v-for="(item1,) in item.all_goods" :key="item1">
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
										<scroll-view class="scroll-goods" scroll-x="true">
											<view class="scroll-imgs">
												<image :src="item1.goods_thumb_url" class="imgs"></image>
											</view>
										</scroll-view>
									</view>
								</view>
							</view>
						</scroll-view>
						<view class="good-bottom">{{item.order_add_time}} 订单号：{{item.order_sn}}</view>
						<view class="goods-totals">共{{length[index]}}件 合计：￥{{item.order_wholesale_total_price}}</view>
						<view class="buttons">
							<button class="cancels" @click="open">取消订单</button>
							<uni-popup ref="popups" type="center">
								<view class="tip">
									<view class="title">提示操作</view>
									<view class="content">确定要取消这个订单吗?</view>
									<view class="buts">
										<button class="cancel" @click="close">取消</button>
										<button class="sure" @click="del(item.order_sn)">确定</button>
									</view>
								</view>
							</uni-popup>
							<button class="buyagains" @click="goCart">再次购买</button>
							<button class="pays"
								@click="pay(item.order_sn,item.order_wholesale_total_price)">付款</button>
						</view>

					</view>
				</view>
			</view>
		</van-tab>
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
				length: [],
				newlist:[],
			}
		},
		created() {
			this.order()
		},
		methods: {
			async order() {
				
				let result = await requestPost("/api/api/order_list?XcxSessKey=%20&company_id=7194");
				this.list = result.data.list
				console.log(result.data.list)
				this.list.forEach(item => this.length.push(item.all_goods.length))

			},
			goCart(order_id) {
				uni.navigateTo({
					url: `/pages/cart/cart?order_id=${order_id}`
				})
			},
			goOrderdtail(order_sn) {
				uni.navigateTo({
					url: `/pages/orderdetail/orderdetail?order_sn=${order_sn}`
				})
			},
			open() {
				this.$refs.popups[0].open()
			},
			close() {
				this.$refs.popups[0].close()
			},
			// 删除订单
			async del(id){
				console.log(id);
				let result = await requestPost("/api/api/order/order_cancel",{
					'order_sn':id,
					'company_id':7194
				});
				let result2 = await requestPost("/api/api/order_list?XcxSessKey=%20&company_id=7194");
				this.list.length =0;
				this.list = result2.data.list
				this.close()	
			},
			pay(order_sn, order_wholesale_total_price) {
				uni.navigateTo({
					url: `/pages/payment/payment?order_sn=${order_sn}&order_wholesale_total_price=${order_wholesale_total_price}`
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
			width: 375px;

			.tools {

				height: 60px;
				display: flex;
				margin-left: 5px;


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
						align-items: center;

						.scroll-goods {
							width: 100%;

							.scroll-imgs {
								.imgs {
									width: 70px;
									height: 50px;
									margin-left: 5px;
									margin-top: 10px;
								}
							}
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

	.buttons {
		display: flex;

		.buyagains {
			font-size: 14px;
			width: 90px;
			background-color: #fff;
			text-align: center;
			border-radius: 5px;
			margin-right: 10px;
			margin-top: 10px;
		}

		.cancels {
			font-size: 14px;
			width: 90px;
			background-color: #fff;
			text-align: center;
			border-radius: 5px;
			margin-right: 10px;
			margin-top: 10px;
		}

		.pays {
			font-size: 14px;
			width: 90px;
			background-color: red;
			text-align: center;
			border-radius: 5px;
			margin-right: 10px;
			margin-top: 10px;
			color: #fff;
		}

	}

	.order-status2 {
		color: red;
		flex: 1;
		text-align: right;
		margin-right: 10px;
	}

	.tip {
		height: 120px;
		width: 250px;
		background-color: #333;
		border-radius: 5px;

		.title {
			text-align: center;
			color: #fff;
			font-size: 16px;
			font-weight: bold;
			padding-top: 20px;
			letter-spacing: 2px;
		}

		.content {
			color: #999;
			text-align: center;
			font-size: 12px;
			padding-top: 10px;
			border-bottom: 1px solid #666;
			padding-bottom: 20px;
		}

		.buts {
			display: flex;

			.cancel {
				color: #eee;
				font-size: 14px;
				height: 40px;
				width: 50%;
				background-color: #333;
				border-right: 1px solid #666;
			}

			.sure {
				color: lightblue;
				font-size: 14px;
				height: 40px;
				width: 50%;
				background-color: #333;
			}
		}

	}
</style>
