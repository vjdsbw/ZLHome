<template>
	<view class="container">
		<view class="bg">
			<view class="search">
			</view>
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="item in swiperImg" :key="item.goods_id">
					<image :src="item.imgs_url_2" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="info">
			<view class="price">
				￥{{goodsInfo.shop_price}}
			</view>
			<view class="name">
				{{goodsInfo.goods_name}}
			</view>
			<view class="subtitle">
				{{goodsInfo.subtitle}}
			</view>
			<view class="sale">
				<text class="salenum">已售{{goodsInfo.sale_num}}</text>
				<text class="score">评价5.0</text>
				<text class="address">{{fromaddress}}</text>
			</view>
		</view>
		<view class="market">
			<view class="hotsale">
				<text class="cuxiao">促销</text>
				<text class="jieshao">{{goodsInfo.subtitle}}</text>
			</view>
			<view class="express">
				<view class="yunfei">运费</view>
				<view class="express_detail">
					<view class="address">
						<text>{{fromaddress}}</text>至{{toaddress.province_name}}{{toaddress.city_name}}{{toaddress.area_name}}
					</view>
					<view class="times">
						预计付款后{{goodsInfo.delivery_time}}发货
					</view>
					<view class="money">
						运费￥152，送装￥200
					</view>
				</view>
			</view>
		</view>
		<view class="size">
			<view class="canshu">
				<view class="canshu1">
					参数
				</view>
				<view class="canshu2">
					xxxxxxxxxxxxxxxxxxx
				</view>
			</view>
			<view class="caizhi">
				<view class="caizhi1">
					产品材质
				</view>
				<view class="caizhi2">
					头层进口小黄牛皮+俄罗斯落叶松木+E1级环保板材+五金件
				</view>
			</view>
		</view>
		<view class="service">
			<view class="service1">
				服务
			</view>
			<view class="service2">
				<text>售后服务</text><text>极速发货</text><text>贵就赔</text>
			</view>
		</view>
		<goodsdetail_tabs :result="result"></goodsdetail_tabs>
	</view>
</template>

<script>
	import {
		requestGet
	} from "@/common/js/http.js";
	export default {
		data() {
			return {
				swiperImg: [],
				goodsInfo: {},
				fromaddress: '',
				toaddress: '',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 1000,
				goods_id: 0,
				result:{}
			}
		},
		created() {
		this.getGoodDetail()
		},
		onLoad(options) {
			this.goods_id = options.id	
		},
		methods: {
			async getGoodDetail() {
				console.log(this.goods_id)
				let result = await requestGet(
					`/api/api_goods?goods_id=${this.goods_id}`)
				this.swiperImg = result.data.goods_main_image
				this.goodsInfo = result.data.goods_info
				console.log(result.data.goods_info,'22222222222222222222')
				this.fromaddress = result.data.address_name
				this.toaddress = result.data.local_address
				this.attrs = result.data.attr_list
				this.result = result
			  console.log(this.result,"far");
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			//tab切换
			onTabChange(event) {
				console.log(event.detail);
				wx.showToast({
					title: `切换到标签 ${event.detail.name}`,
					icon: 'none',
				});
			},
		},

	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;

		.bg {


			.search {}

			.swiper {
				height: 564rpx;
				width: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.info {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding: 30rpx;

			.price {
				color: red;
				font-size: 52rpx;
				margin-top: 10rpx;
				margin-bottom: 10rpx;
			}

			.name {
				font-size: 16px;
			}

			.subtitle {
				color: red;
				font-size: 28rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
			}

			.sale {
				display: flex;

				.salenum {
					flex: 1;
				}

				.score {
					flex: 1;
					text-align: center;
				}

				.fromaddress {
					flex: 2;
					text-align: end;
				}
			}
		}

		.market {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin: 20rpx 0rpx;
			padding: 30rpx;
			font-size: 28rpx;

			.hotsale {
				display: flex;
				border-bottom: 1px solid lightgray;
				padding-top: 10rpx;
				padding-bottom: 20rpx;

				.cuxiao {
					flex: 2;
					color: gray;
				}

				.jieshao {
					flex: 6;
					color: red;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.express {
				display: flex;
				padding-top: 20rpx;
				padding-bottom: 10rpx;

				.address {
					font-size: 26rpx;
				}

				.yunfei {
					color: gray;
					flex: 2;
				}

				.express_detail {
					flex: 6;

					.times {
						padding-top: 10rpx;
						padding-bottom: 10rpx;
					}

					.money {
						color: red;
					}
				}
			}
		}

		.size {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin: 20rpx 0rpx;
			padding: 30rpx;
			font-size: 28rpx;

			.canshu {
				flex: 1;
				display: flex;
				border-bottom: 1px solid lightgray;
				padding-top: 10rpx;
				padding-bottom: 20rpx;

				.canshu1 {
					color: gray;
					flex: 2;
				}

				.canshu2 {
					flex: 6;

				}
			}

			.caizhi {
				display: flex;
				flex-direction: row;
				padding-top: 20rpx;
				padding-bottom: 10rpx;

				.caizhi1 {
					flex: 2;
					color: gray;
				}

				.caizhi2 {
					flex: 6;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.service {
			display: flex;
			background-color: #fff;
			margin: 20rpx 0rpx;
			padding: 30rpx;
			font-size: 28rpx;

			.service1 {
				color: gray;
				flex: 2;
			}

			.service2 {
				flex: 6;

				text {
					padding-right: 40rpx;
				}
			}
		}
	}
</style>
