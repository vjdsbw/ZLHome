<template>
	<view class="cart">
		<view class="cart-goods">
			<view v-show="flag" class="cart-icon">
				<image src="/static/icon/cart.png" mode=""></image>
				<view class="cart-text">
					您未登录，登录后将同步购物车中的商品
				</view>
				<view class="denglu" @click="tologin">
					登录
				</view>
			</view>
			<view v-show="!flag" class="cartshow">
				<view class="cart-text">
					<view class="shop" v-for="(item,index) in goodsList" :key="item.name">
						<view class="shopName">
							<!-- 店铺-->
							<view class="xuanze1" @click="selectedShop(item,index)">
								<checkbox-group>
									<label>
										<checkbox value="" :checked="shopchecked[index]" />
									</label>
								</checkbox-group>
							</view>


							<view class="name">{{item.name}}</view>
						</view>
						<view class="goodsInfo" v-for="(i,idx) in item.list" :key="i.id">


							<!-- 店铺里的商品 -->
							<view class="xuanze2">
								<checkbox-group>
									<label>
										<checkbox value="" :checked="chebrand[i.status]" @onChange="change"
											@click="selectedGoods(i.status)" />
									</label>
								</checkbox-group>
							</view>




							<view class="goodsImg">
								<image :src="i.goods_img_xcx" mode="widthFix"></image>
							</view>
							<view class="goodsDetail">
								<view class="jieshao">
									{{i.goods_name}}
								</view>
								<view class="size">
									<text> 1.8*2米</text>
								</view>
								<view class="jisuan">
									<text class="price">{{i.shop_price}}</text>

									<van-stepper :value="i.goods_num" min="1"
										@minus="delcart(i.goods_num,i.goods_id,i.id)"
										@plus="addcart(i.goods_num,i.goods_id)">
									</van-stepper>

								</view>
							</view>
						</view>
					</view>
					<!-- 结算金额 -->
					<view class="end">
						<view class="end-left">

							<view class="xuanze3">
								<checkbox-group>
									<label>
										<checkbox value="" :checked="quanxuanchecked" @click="selectedAll" />
									</label>
									全选
								</checkbox-group>
							</view>


							<view class="totalmoney">
								合计<text>￥{{totalPrice}}</text>
							</view>
						</view>
						<view class="end-right">
							结算({{totaNum}})
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="guess">
			猜你喜欢
		</view>
		<view class="list">
			<view class="box" v-for="item in likelist" :key="item.goods_name" @click="togoodsdetail(item.goods_id)">
				<view>
					<view class="towBox">
						<image :src="item.goods_img_xcx"></image>
						<view class="text">
							<view class="name">
								{{item.goods_name}}
							</view>
							<view class="price">
								<text>￥{{item.shop_price}}</text>
								<text>已售{{item.sale_total}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		requestPost,
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				likelist: [],
				flag: true,
				stepval: 1,
				cart: {},
				goodsList: [],
				//店铺里面的商品
				goodsInshop: [],
				//全选是否选中
				goodschecked: false,
				shopchecked: [],
				quanxuanchecked: false,
				chebrand: [],
				totalPrice: 0
			}
		},
		onShow() {
			this.guesslike()
		},
		onLoad() {

		},
		methods: {
			change(e) {
				console.log(e)
			},
			compuTotalPrice() {
				this.totalPrice = 0
				this.goodsList.map((item) => {

					item.list.map((i) => {

						if (this.chebrand[i.status] == true) {
							this.totalPrice = this.totalPrice + parseInt(i.shop_price) * parseInt(i
								.goods_num)
						}
					})
				})
			},
			async addcart(num, id) {
				var _this = this
				let user = uni.getStorageSync('user')
				let result = await requestGet(
					`/api/api/cart/guess_goods?company_id=${user.company_id}`);
				if (user) {
					var a = `${id}:1`
					let result = await requestPost(`/api/api/cart?company_id=${user.company_id}`)
					let addcart = await requestPost("/api/api/add_cart", {
						"goods": a,
						"company_id": user.company_id
					});

					if (!num) {
						let addcart1 = await requestPost("/api/api/updateCart", {
							"goods": a,
							"company_id": user.company_id
						});
					}
					let carnum = await requestPost(
						`/api/api/get_cart_num?company_id=${user.company_id}`)
				}
				let newresult = await requestPost(`/api/api/cart?company_id=${user.company_id}`)
				this.goodsList = newresult.data.goods_list
				var aa = 0
				this.goodsList.map((item, idx) => {
					this.shopchecked.push(false)
					item.list.map((i, iiiiii) => {
						this.chebrand.push(false)
						this.goodsList[idx].list[iiiiii].status = aa
						aa++;
					})
					this.goodsInshop = item.list
				})
				this.compuTotalPrice()
			},
			async delcart(num, id, iid) {
				num--;
				let user = uni.getStorageSync('user')
				if (user) {
					var a = `${id}:${num}`
					let addcart1 = await requestPost("/api/api/updateCart", {
						"goods": a,
						"company_id": user.company_id
					})
					let result = await requestPost(`/api/api/cart?company_id=${user.company_id}`)
					this.cart = result.data.goods_list
				}
				let newresult = await requestPost(`/api/api/cart?company_id=${user.company_id}`)
				this.goodsList = newresult.data.goods_list
				var aa = 0
				this.goodsList.map((item, idx) => {
					this.shopchecked.push(false)
					item.list.map((i, iiiiii) => {
						this.chebrand.push(false)
						this.goodsList[idx].list[iiiiii].status = aa
						aa++;
					})
					this.goodsInshop = item.list
				})
				this.compuTotalPrice()
			},
			async guesslike() {
				let result = await requestGet("/api/api/cart/guess_goods?company_id=7194");
				this.likelist = result.data;
				let user = uni.getStorageSync('user')
				if (user) {
					this.flag = !this.flag;
					let result = await requestPost("/api/api/cart?XcxSessKey=%20&company_id=7194");
					this.goodsList = result.data.goods_list
					console.log(this.goodsList)
					var aa = 0
					this.goodsList.map((item, idx) => {
						this.shopchecked.push(false)
						item.list.map((i, iiiiii) => {
							this.chebrand.push(false)
							this.goodsList[idx].list[iiiiii].status = aa
							aa++;
						})
						this.goodsInshop = item.list

					})
					console.log(this.chebrand);
				}
			},
			tologin() {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
			selectedGoods(i) {
				console.log(this.goodsList, "xx");
				var flag = true
				var brand
				var shopindex
				console.log(flag)
				this.chebrand[i] = !this.chebrand[i]
				this.goodsList.map((item) => {
					item.list.map((it) => {
						if (it.status == i) {
							brand = item.name

						}
					})
				})
				this.goodsList.map((item, index) => {
					if (item.name == brand) {
						shopindex = index
						item.list.map((it) => {
							if (this.chebrand[it.status] == false) {
								flag = false
							}
						})
					}

				})
				console.log(flag)
				this.shopchecked[shopindex] = flag
				console.log(brand)

				console.log(this.chebrand);
				this.compuTotalPrice()
			},
			selectedShop(i, index) {
				var length = 0
				this.shopchecked[index] = !this.shopchecked[index]
				this.goodsList.map((item, id) => {
					if (id == index) {
						this.chebrand.map((iii, idx) => {
							if (idx < item.list.length) {
								this.chebrand[idx + length] = this.shopchecked[index]
							}
						})
					}
					length = item.list.length + length

				})
				this.compuTotalPrice()
			},

			selectedAll() {
				this.shopchecked = !this.shopchecked
				this.chebrand.map((item, idx) => {
					this.chebrand[idx] = !this.chebrand[idx]
				})
				console.log("aaa");
				this.compuTotalPrice()
			},

		}
	}
</script>

<style scoped lang="less">
	.cart {
		.cart-goods {
			background-color: white;
			padding-bottom: 10px;

			.cart-icon {
				text-align: center;

				image {
					width: 50px;
					height: 50px;
					margin-top: 20px;
				}

				.cart-text {
					font-size: 15px;
					color: #999;
					margin-top: 10px;
				}

				.denglu {
					color: white;
					width: 100px;
					height: 30px;
					margin: 10px 0;
					margin-left: 140px;
					line-height: 30px;
					background-color: red;
					border-radius: 50px 50px;
				}
			}

			.cartshow {
				background: #eee;

				.cart-text {
					.shop {
						width: 100%;
						min-height: 200rpx;
						height: auto;
						display: flex;
						flex-direction: column;
						padding: 20rpx;
						margin-bottom: 20rpx;
						background: #fff;

						/deep/.shopName {
							flex: 1;
							display: flex;
							justify-content: center;
							margin-left: 20rpx;

							.xuanze1 {
								flex: 1;
							}

							.name {
								flex: 9;
								font-size: 32rpx;
							}
						}

						.goodsInfo {
							flex: 3;
							display: flex;
							margin: 20rpx;

							.xuanze2 {
								flex: 1;
							}

							.goodsImg {
								flex: 2;

								image {
									width: 150rpx;
								}
							}

							.goodsDetail {
								flex: 7;
								display: flex;
								flex-direction: column;
								padding: 20rpx;

								.jieshao {
									font-size: 24rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
								}

								.size {
									height: 40rpx;
									width: 50%;
									font-size: 24rpx;
									border: 1px solid lightgray;
									line-height: 40rpx;
									text-align: center;
									margin: 10rpx 0rpx;
								}

								.jisuan {
									display: flex;

									.price {
										flex: 2;
										color: red;
										font-size: 28rpx;
										padding-top: 20rpx;
									}

									/deep/.num {
										padding-top: 20rpx;
										flex: 1;

										.uni-numbox {
											justify-content: end;
											width: 160rpx;
											height: 40rpx;
											font-size: 20rpx;

											input {
												height: 20rpx;
											}
										}
									}
								}
							}
						}
					}

					.end {
						width: 100%;
						height: 90rpx;
						background-color: #fff;
						position: fixed;
						bottom: 0rpx;
						left: 0rpx;
						display: flex;
						padding-left: 30rpx;
						font-size: 28rpx;

						.end-left {
							flex: 2;
							display: flex;
							line-height: 90rpx;

							.xuanze3 {
								flex: 2;
							}

							.totalmoney {
								flex: 3;
								color: red;
								text-align: center;
							}
						}

						.end-right {
							flex: 1;
							background-color: red;
							text-align: center;
							line-height: 90rpx;
							color: #fff;

						}
					}
				}
			}
		}

		.guess {
			height: 40px;
			text-align: center;
			line-height: 40px;
		}

		.list {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			background-color: #eee;
			margin-bottom: 40px;

			.box {
				width: 48%;
				margin-left: 5px;
				margin-bottom: 5px;
				background-color: #fff;

				.towBox {
					width: 100%;

					image {
						width: 100%;
						height: 150px;
					}

					.text {
						.name {
							margin-left: 7px;
							font-family: "Times New Roman";
							font-size: 14px;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					.price {
						font-size: 12px;
						color: red;
						margin: 15px 10px;

						text:nth-child(2) {
							font-size: 10px;
							color: #999;
							margin-left: 60px;
						}
					}
				}
			}

		}

	}
</style>
