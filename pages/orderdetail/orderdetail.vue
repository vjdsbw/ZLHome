<template>
	<view class="orderdetails">
		<view class="order_info">
			<view class="status">
				{{order_info.order_status_string}}
			</view>
			<view class="consignee">
				{{order_info.consignee_abbr}} {{order_info.tel}}
				<view class="address">
					{{order_info.address}}
				</view>
			</view>
		</view>
		<view class="install">
			配送方式:佐罗优选指定物流
		</view>
		<view class="order_goods" v-for="item in order_goods_info" :key="item.name">
			<view class="list">
				<uni-icons class="shop" type="shop" size="30"></uni-icons>
				<view class="name">
					{{item.name}}
				</view>
				<view class="brand_address">
					{{item.brand_address}}
				</view>
			</view>
			<view class="thum" v-for="itm in item.list" :key="itm.goods_name">
				<image class="goods_thumb_url" :src="itm.goods_thumb_url"></image>
				<view class="customer">
					<view class="goodsname">
						{{itm.goods_name}}
					</view>
					<view class="price">
						￥{{itm.goods_price}}
					</view>
					<view class="number">
						×{{itm.goods_number}}
					</view>
					<view class="yunfei">
						运费：￥{{itm.customer_long_shipping_price}}
					</view>
				</view>
			</view>
		</view>
		<view class="liu">
			给卖家留言：{{}}
		</view>
		<view class="dingdan">
			<view class="ordersn">
				<view class="sn">
					订单编号：
				</view>
				<view class="sn2">
					{{order_info.order_sn}}
				</view>
			</view>
			<view class="ordersn">
				<view class="sn">
					下单时间：
				</view>
				<view class="sn2">
					{{order_info.add_time}}
				</view>
			</view>
			<view class="ordersn">
				<view class="sn">
					期望到货时间：
				</view>
				<view class="sn2">
					{{order_info.plan_send_time}}
				</view>
			</view>
			<view class="ordersn">
				<view class="sn">
					配送安装：
				</view>
				<view class="sn2">
					{{order_info.install_type_name}}
				</view>
			</view>
		</view>
		<view class="amount">
			<view class="ordersn">
				<view class="sn">
					商品总金额：
				</view>
				<view class="sn2-red">
					￥{{order_info.goods_wholesale_amount}}
				</view>
			</view>
			<view class="ordersn">
				<view class="sn">
					运费：
				</view>
				<view class="sn2">
					￥{{order_info.settlement_wuliu_price}}
				</view>
			</view>
			<view class="ordersn">
				<view class="sn">
					易碎品费：
				</view>
				<view class="sn2">
					￥{{order_info.customer_breakage_fee}}
				</view>
			</view>
			<view class="ordersn">
				<view class="sn">
					配送安装费：
				</view>
				<view class="sn2">
					￥{{order_info.customer_install_price}}
				</view>
			</view>
			<view class="ordersn2">
				<view class="sn3">
					订单总金额：
				</view>
				<view class="sn4">
					￥{{order_info.order_total_price}}
				</view>
			</view>
		</view>

		<view class="again" v-if="order_info.order_status_string == '已取消'">
			<view class="button" @click="goCart(order_info.order_id)">
				再次购买
			</view>
		</view>
		<view class="again1" v-else="order_info.order_status_string == '未付款'">
				<button class="cancel" @click="cancel(order_info.order_sn)">取消订单</button>
				<button class="buyagain" @click="goCart">再次购买</button>
				<button class="payment"  @click="goPayment(order_info.order_sn,order_info.order_total_price)">付款</button>
		</view>
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
				order_sn: "",
				order_info: {},
				order_goods_info: [],
				flag: true,
			}
		},
		onLoad(options) {
			this.order_sn=options.order_sn
			this.orderdetails()
		},
		methods: {
			async orderdetails() {
				let result = await requestPost("/api/api/user/order_detail", {
					"order_sn": this.order_sn
				});
				this.order_info = result.data.order_info;
				this.order_goods_info = result.data.order_goods_info
			},
			goCart(order_id){
				uni.navigateTo({
					url:`/pages/cart/cart?order_id=${order_id}`
				})
			},
			goPayment(order_sn,order_total_price){
				uni.navigateTo({
					url:`/pages/payment/payment?order_sn=${order_sn}&order_total_price=${order_total_price}`
				})
			},
			async cancel(id) {
				let result2 = await requestPost("/api/api/order/order_cancel",{
					'order_sn':id,
					'company_id':7194
				});
				this.orderdetails()
			},
		}
	}
</script>

<style scoped lang="less">
	.orderdetails {
		.order_info {
			height: 180px;
			background-color: red;

			.status {
				font-size: 20px;
				color: white;
				margin-left: 20px;
				padding-top: 10px;
			}

			.consignee {
				margin-top: 20px;
				margin-left: 15px;
				padding-left: 20px;
				padding-top: 15px;
				font-size: 20px;
				height: 100px;
				width: 320px;
				border-radius: 20px 20px;
				background-color: white;

				.address {
					font-size: 15px;
					font-weight: 200;
					padding-top: 20px;
				}
			}
		}

		.install {
			height: 50px;
			line-height: 50px;
			font-weight: 500;
			padding-left: 16px;
			font-size: 17px;
		}

		.order_goods {
			background-color: white;
			border-top: 1px solid #b3b3b3;
			padding-left: 10px;
			padding-bottom: 10px;

			.list {
				height: 40px;
				line-height: 40px;

				.shop {
					float: left;
					padding-left: 10px;
				}

				.name {
					float: left;
					font-size: 18px;
				}

				.brand_address {
					float: left;
					margin-left: 10px;
					font-size: 15px;
					font-weight: 300;
				}
			}
			.thum{
				height: 100px;
				width: 365px;
				display: flex;
				margin-bottom: 10px;
				.goods_thumb_url{
					width: 100px;
					height: 60px;
					padding-left: 5px;
				}
				.customer{
					margin-left: 5px;
					.goodsname{
						font-size: 12px;
						letter-spacing: 1px;
					}
					.price{
						color: red;
						font-size: 14px;
						margin-top: 10px;
					}
					.number{
						width: 283.225px;
						color: #666;
						font-size: 12px;
						text-align: right;
						position: relative;
						bottom: 20px;
						right: 5px;
					}
					.yunfei{
						color: #666;
						font-size: 12px;
					}
				}
			}
		}


		.liu {
			background-color: white;
			height: 30px;
			font-size: 12px;
			padding-left: 15px;
			line-height: 30px;
		}

		.dingdan {
			background-color: white;
			height: 150px;
			margin-top: 10px;
			padding-left: 15px;
			padding-right: 8px;
			font-size: 15px;
			color: #333;

			.ordersn {
				height: 30px;
				line-height: 30px;
				padding-top: 5px;

				.sn {
					float: left;
				}

				.sn2 {
					float: right;
					color: black;
				}
			}
		}

		.amount {
			background-color: white;
			height: 170px;
			margin-top: 10px;
			padding-left: 15px;
			padding-right: 8px;
			font-size: 15px;
			color: #333;
			margin-bottom: 70px;

			.ordersn {
				height: 30px;
				line-height: 30px;
				padding-top: 5px;

				.sn {
					float: left;
				}

				.sn2 {
					float: right;
				}
				.sn2-red {
					float: right;
					color: red;
				}
			}
			.ordersn2 {
				height: 30px;
				line-height: 30px;
				padding-top: 5px;
			
				.sn3 {
					float: left;
				}
			
				.sn4 {
					float: right;
					color: black;
					font-weight: 700;
				}
			}
		}

		.again {
			height: 50px;
			width: 100%;
			border-top: 1px solid #919191;
			background-color: #fff;
			position: fixed;
			bottom: 0px;

			.button {
				float: right;
				margin-right: 10px;
				height: 30px;
				width: 80px;
				border-radius: 5px 5px;
				line-height: 30px;
				text-align: center;
				background-color: #fff;
				border: 1px solid #ddd;
				margin-top: 6px;
				margin-bottom: 5px;
			}
		}
		.again1{
			height: 50px;
			width: 100%;
			border-top: 1px solid #919191;
			background-color: #fff;
			position: fixed;
			bottom: 0px;
			display: flex;
			.cancel{
				background-color: #fff;
				height: 35px;
				line-height: 35px;
				width: 90px;
				font-size: 14px;
				margin-top: 10px;
			}
			.buyagain{
				background-color: #fff;
				height: 35px;
				line-height: 35px;
				width: 90px;
				font-size: 14px;
				margin-top: 10px;
			}
			.payment{
				background-color: red;
				color: #fff;
				height: 35px;
				width: 90px;
				line-height: 35px;
				font-size: 14px;
				margin-top: 10px;
			}
		}
	}
</style>
