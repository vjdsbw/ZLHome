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
				<view class="canshu2" @click="showMotaikuang">
					请选择产品尺寸
				</view>

				<!-- 模态框-->
				<view class="motaikuang" v-if="showmotai" :mask-close-able="true">
					<view class="mask" @click="exitMotaikuang"></view>
					<view class="bottomPopup">
						<view class="close" @click="exitMotaikuang">x</view>
						<view class="popupHead">
							<view class="headImg">
								<image :src="img" mode="widthFix"></image>
							</view>
							<view class="text">
								<view class="headPrice">
									￥{{price}}
								</view>
								<view class="headNum">
									商品编号：{{goodsNum}}
								</view>
							</view>
						</view>
						<view class="guige">规格</view>
						<view class="motaikuangsize" @click="chooseSize">
							<view class="sizevalue" v-for="(item,index) in goodsAttr" :key="item.id"
								:class="{active: isActive === index}" @click="changeClass(index)">
								{{item.size}}
							</view>
						</view>
					</view>
					<view class="queding">
						<view class="sure" @click="otherdetails()">确定</view>
					</view>
				</view>
				<!-- 模态框 -->

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

		<goodstabs :result="result"></goodstabs>
		<view class="uni-container">
			<view class="goods-carts">
				<view class="jiaobiao">
					<uni-badge size="small" :text="gws" absolute="rightTop" type="error">
					</uni-badge>
				</view>
				<uni-goods-nav :options="optionsgwc" :fill="true" :button-group="buttonGroup" @click="onClick"
					@buttonClick="buttonClick" />
			</view>
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
				result: {},
				swiperImg: [],
				goodsInfo: {},
				fromaddress: '',
				toaddress: '',
				goodsId: '',
				goodsAttr: [],
				img: '',
				price: '',
				goodsNum: '',
				brandname: '',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 1000,
				showmotai: false,
				isActive: 0,
				goods_id: 0,
				result: {},
				optionsgwc: [{
					icon: 'chat',
					text: '佐罗优选'
				}, {
					icon: 'list',
					text: '分类',
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'star',
					text: '收藏',
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {

					icon: 'cart',
					text: '购物车',
				}],
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}],
				gws: 1,
				addcart2req: true
			}
		},
		created() {

		},
		onLoad(options) {
			this.goods_id = options.id
		},
		async onShow() {
			this.getGoodDetail()
			let user = uni.getStorageSync('user');
			let result = uni.getStorageSync(`col${user.user_id}`)
			let carnum = await requestPost(`/api/api/get_cart_num?company_id=${user.company_id}`)
			var newresult = result.split(',')
			var nnresult = newresult.splice(0, newresult.length - 1)
			this.gws = carnum.data.total
			nnresult.forEach((item) => {
				if (item == this.goods_id) {
					this.optionsgwc[2].icon = "star-filled"
					this.optionsgwc[2].text = "已收藏"
				}
			})
		},
		methods: {
			async buttonClick(e) {
				// 添加购物车的时候会发送三个请求 api/add_cart   api/updateCart api/get_cart_num
				// 其中，第二个请求只有该商品不在购物车时，添加会发送，若已经有该商品在购物车里，就不需要再发送第二个请求
				let user = uni.getStorageSync('user')
				let result = await requestGet(`/api/api/cart/guess_goods?company_id=${user.company_id}`);
				if (user) {
					var flaghhh = true
					var a = `${this.goodsId}:1`
					let result = await requestPost(`/api/api/cart?company_id=${user.company_id}`)
					let addcart = await requestPost("/api/api/add_cart", {
						"goods": a,
						"company_id": user.company_id
					});
					let newr = result.data.goods_list
					let brandn = this.brandname
					let gid = this.goodsId
					if (newr) {
						let newr2 = newr.filter((item) => {
							if (item.name == brandn) {
								return item
							}
						})
						console.log(newr2);
						if (newr2.length != 0) {
							let newr3 = newr2[0].list
							let newr4 = newr3.filter((item) => {
								if (item.goods_id == gid) {
									return item
								}
							})
							if (newr4) {
								flaghhh = false
							}
						}
					}
					this.addcart2req = flaghhh
					if (this.addcart2req) {
						let addcart1 = await requestPost("/api/api/updateCart", {
							"goods": a,
							"company_id": user.company_id
						});
					}
					let carnum = await requestPost(`/api/api/get_cart_num?company_id=${user.company_id}`)
					this.gws = carnum.data.total
				}
			},
			onClick(e) {
				let user = uni.getStorageSync('user')
				if (user) {
					if (e.index == 3) {
						uni.navigateTo({
							url: '/pages/cart/cart'
						})
					}
					if (e.index == 2) {
						if (this.optionsgwc[e.index].icon == "star") {
							this.optionsgwc[e.index].icon = "star-filled"
							this.optionsgwc[e.index].text = "已收藏"
							this.shoucang()
						} else {
							this.optionsgwc[e.index].icon = "star"
							this.optionsgwc[e.index].text = "收藏"
							this.delCol()
						}
					}
				} else {
					uni.showToast({
						title: '请先登录',
						image: '/static/icon/err.png',
						duration: 2000
					});
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login',
						})
					}, 2000)
				}
			},
			delCol() {
				let user = uni.getStorageSync('user');
				let result = uni.getStorageSync(`col${user.user_id}`)
				var newresult = result.split(',')
				var nnresult = newresult.splice(0, newresult.length - 1)
				nnresult.forEach((item, idx) => {
					if (item == this.result.data.goods_info.goods_id) {
						nnresult.splice(idx, 1)
					}
				})
				var ns = nnresult.join(",")
				uni.setStorageSync(`col${user.user_id}`, `${ns},`)
			},
			shoucang() {
				// 点击收藏将商品id存到对应用户的col中
				let user = uni.getStorageSync('user');
				let result = uni.getStorageSync(`col${user.user_id}`)
				var aaa = Object.values(this.result.data)
				if (result) {
					var newresult = result.split(',')
					for (var i = 0; i < newresult.length - 1; i++) {
						if (aaa[8].goods_id == newresult[i]) {
							return
						}
					}
					result = `${result}${aaa[8].goods_id},`
					uni.setStorageSync(`col${user.user_id}`, result)
				} else {
					var new1 = `${aaa[8].goods_id},`;
					uni.setStorageSync(`col${user.user_id}`, new1)
				}
			},
			async getGoodDetail() {
				let result = await requestGet(`/api/api_goods?goods_id=${this.goods_id}`)
				this.swiperImg = result.data.goods_main_image
				this.goodsInfo = result.data.goods_info
				this.fromaddress = result.data.address_name
				this.toaddress = result.data.local_address
				this.goodsId = result.data.goods_info.goods_id
				this.attrs = result.data.attr_list
				this.result = result
				this.brandname = result.data.brand_name
				this.goodsAttr = result.data.goods_attr.goods
				this.img = result.data.goods_info.goods_img_url
				this.price = result.data.goods_info.shop_price
				this.goodsNum = result.data.goods_info.goods_sn

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
				wx.showToast({
					title: `切换到标签 ${event.detail.name}`,
					icon: 'none',
				});
			},


			// 模态框
			showMotaikuang() {
				this.showmotai = true
			},
			exitMotaikuang() {
				this.showmotai = false
			},
			changeClass(i) {
				this.isActive = i;
				this.img = this.goodsAttr[i].goods_img_url
				this.price = this.goodsAttr[i].shop_price
				this.goodsNum = this.goodsAttr[i].goods_sn
				this.goodsId = this.goodsAttr[i].id
			},

			otherdetails() {
				console.log(this.goodsId);
				uni.navigateTo({
					url: `/pages/gooddetail/gooddetail?id=${this.goodsId}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			}
		},

	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;

		.uni-container {
			width: 100%;
			position: fixed;
			bottom: 0;
			z-index: 10000000000;

			.goods-carts {
				position: relative;

				.jiaobiao {
					position: absolute;
					left: 425rpx;
					top: -12rpx;
					z-index: 999999999999999999;
				}
			}
		}

		.active {
			color: red;
			border-color: #E31D1A;
		}

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

				.motaikuang {
					width: 100%;
					height: 100%;
					position: fixed;
					bottom: 0px;
					left: 0px;
					z-index: 999;

					.mask {
						width: 100%;
						height: auto;
						position: fixed;
						top: 0px;
						bottom: 0px;
						left: 0px;
						right: 0px;
						margin: 0px auto;
						background: rgba(0, 0, 0, 0.4);
						z-index: 1000;
					}

					.bottomPopup {
						width: 100%;
						height: 70%;
						position: fixed;
						bottom: 0px;
						left: 0px;
						right: 0px;
						z-index: 1001;
						background: #fff;
						border-radius: 5px 5px 0px 0px;

						.close {
							position: absolute;
							top: 0rpx;
							right: 20rpx;
							font-size: 50rpx;
							color: #999;
							z-index: 1002;
						}

						.popupHead {
							width: 94%;
							height: auto;
							margin: 0px auto;
							border-bottom: 1px #eee solid;
							display: flex;
							flex-direction: row;
							padding: 20rpx 0px;

							.headImg {
								image {
									width: 280rpx;
									margin-top: -100rpx;
								}
							}

							.text {
								.headPrice {
									color: red;
									font-size: 44rpx;
								}

								.headNum {
									color: #999;
									font-size: 24rpx;
								}
							}
						}

						.guige {
							color: #999;
						}

						.motaikuangsize {
							.sizevalue {
								width: 30%;
								border: 1px solid lightgrey;
								margin: 10rpx;
								padding: 20rpx;
								float: left;
							}
							.active {
								color: red;
								border-color: #E31D1A;
							}
						}
					}

					.queding {
						width: 100%;
						display: flex;
						position: fixed;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 1003;

						.sure {
							width: 100%;
							text-align: center;
							color: #fff;
							height: 100rpx;
							line-height: 100rpx;
							background: #E31D1A;
							letter-spacing: 3px;
							margin-bottom: 50px;
						}
					}
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

		.goods-carts {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			left: var(--window-left);
			right: var(--window-right);
			/* #endif */
			bottom: 0;
		}
	}
</style>
