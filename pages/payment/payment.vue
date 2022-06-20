<template>
	<view class="container">
		<view class="pays">
			<view class="pay-total">
				<view class="pay">应付金额</view>
				<view class="money">￥{{order_wholesale_total_price}}</view>
			</view>
		</view>
		<view class="paydetails">
			<view class="order">
				<view class="order-number">订单号</view>
				<view class="number">{{order_sn}}</view>
			</view>
			<view class="order-totals">
				<view class="totals">订单总金额</view>
				<view class="totals-money">￥{{order_wholesale_total_price}}</view>
			</view>
		</view>
		<view class="footer">
			<view class="payfooter">暂未开通支付功能</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_sn: "",
				order_wholesale_total_price: "",
			}
		},
		onLoad(options) {
			console.log();
			this.order_sn=options.order_sn;
			this.order_wholesale_total_price =options.order_wholesale_total_price
			options.order_wholesale_total_price?(this.order_wholesale_total_price =options.order_wholesale_total_price):(this.order_wholesale_total_price=options.order_total_price)
			console.log(options.order_sn);
			console.log(options.order_wholesale_total_price);
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.pays {
		height: 100px;
		background-color: #fff;
		margin-top: 10px;
		border-bottom: 1px solid #ddd;

		.pay-total {
			height: 100px;
			width: 200px;
			margin: 0 auto;

			.pay {
				text-align: center;
				padding-top: 20px;

			}

			.money {
				text-align: center;
				padding-top: 10px;
				font-size: 24px;
			}
		}

	}

	.paydetails {
		height: 70px;
		background-color: #fff;
		color: #333;
		font-size: 12px;

		.order {
			display: flex;
			padding-top: 10px;

			.order-number {
				text-align: left;
			}

			.number {
				flex: 1;
				text-align: right;
			}
		}

		.order-totals {
			display: flex;
            margin-top: 10px;
			.totals {
				text-align: left;
			}

			.totals-money {
				flex: 1;
				text-align: right;
			}
		}
	}

	.footer {
		height: 60px;
		width: 100%;
		background-color: #fff;
		position: absolute;
		bottom: 0;
		border-top: 1px solid #ddd;

		.payfooter {
			height: 40px;
			width: 340px;
			line-height: 40px;
			margin: 0 auto;
			color: #fff;
			background-color: red;
			border-radius: 20px;
			text-align: center;
			margin-top: 10px;
		}
	}
</style>
