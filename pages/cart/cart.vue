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
							<view class="goodsImg" @click="togoodsdetail(i.goods_id)">
								<image :src="i.goods_img_xcx" mode="widthFix"></image>
							</view>
							<view class="goodsDetail">
								<view class="jieshao" @click="togoodsdetail(i.goods_id)">
									{{i.goods_name}}
								</view>
								<view class="size" v-if="i.goods_attr.length!=0&&i.goods_attr[0].value">
									<text
										@click="showMotaikuang(i.goods_id,i.id,i.url)">{{i.goods_attr[0].value}}</text>
									<uni-icons type="bottom" size="10"></uni-icons>
								</view>
								<!-- 模态框 -->
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
										<view class="sure" @click="cartreplace()">确定</view>
									</view>
								</view>
								<!-- 模态框 -->
								<view class="jisuan">
									<text class="price">￥{{i.shop_price}}</text>
									<van-stepper :value="i.goods_num" min="1"
										@minus="delcart(i.goods_num,i.goods_id,i.id)"
										@plus="addcart(i.goods_num,i.goods_id)" @blur="stpchange(i.goods_id)"
										@change="changes">
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
						<view class="end-right" @click="toaddress(ids)">
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
				num: 0,
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
				totalPrice: 0,
				totaNum: 0,
				ids: '',
				isActive: 0,
				showmotai: false,
				img: '',
				price: '',
				goodsNum: '',
				goodsAttr: [],
				goodsAttrId: '',
				cartid: '',
				tempval: 0
			}
		},
		onShow() {
			this.guesslike()
		},
		updated() {
			var flag = true
			this.shopchecked.map((item) => {
				if (item == false) {
					flag = false

				}
			})
			this.chebrand.map((item) => {
				if (item == false) {
					flag = false

				}
			})
			this.quanxuanchecked = flag
		},
		methods: {
			changes(e) {
				this.tempval = e.detail
				console.log(e, e.detail, this.tempval);
			},
			async stpchange(id) {
				console.log(id, this.tempval);
				let user = uni.getStorageSync('user')
				if (user) {
					var a = `${id}:${this.tempval}`
					let addcart1 = await requestPost("/api/api/updateCart", {
						"goods": a,
						"company_id": user.company_id
					})
					let result = await requestPost(`/api/api/cart?company_id=${user.company_id}`)
					this.cart = result.data.goods_list
				}
				let newresult = await requestPost(`/api/api/cart?company_id=${user.company_id}`)
				this.goodsList = newresult.data.goods_list
				this.compuTotalPrice()
			},
			change(e) {
				console.log(e)
			},
			compuTotalPrice() {
				this.totalPrice = 0
				this.totaNum = 0
				this.ids = ''
				this.goodsList.map((item) => {
					item.list.map((i) => {
						if (this.chebrand[i.status] == true) {
							this.totalPrice = this.totalPrice + parseInt(i.shop_price) * parseInt(i
								.goods_num)
							this.totaNum = this.totaNum + parseInt(i.goods_num)
							this.ids = i.id + `,` + this.ids
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
				this.compuTotalPrice()
			},
			async guesslike() {
				let result = await requestGet("/api/api/cart/guess_goods?company_id=7194");
				this.likelist = result.data;
				let user = uni.getStorageSync('user')
				if (user) {
					this.flag = false;
					let result = await requestPost("/api/api/cart?XcxSessKey=%20&company_id=7194");
					this.goodsList = result.data.goods_list
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
				} else {
					this.flag = true;
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
				this.shopchecked[shopindex] = flag
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
				this.quanxuanchecked = !this.quanxuanchecked
				this.shopchecked.map((item, idx) => {
					this.shopchecked[idx] = this.quanxuanchecked
				})
				this.chebrand.map((item, idx) => {
					this.chebrand[idx] = this.quanxuanchecked
				})
				this.compuTotalPrice()
			},
			async showMotaikuang(goods_id, id, url) {
				let url2 = url.split("-")[1].split("/")[0]
				this.showmotai = true
				this.cartid = id
				let result = await requestGet(
					`/api/api_goods?category_pinyin=${url2}&goods_id=${goods_id}&XcxSessKey=%20&company_id=7194`)
				this.goodsAttr = result.data.goods_attr.goods
				this.img = result.data.goods_info.goods_img_url
				this.price = result.data.goods_info.shop_price
				this.goodsNum = result.data.goods_info.goods_sn
			},
			exitMotaikuang() {
				this.showmotai = false
			},
			changeClass(i) {
				this.isActive = i;
				this.img = this.goodsAttr[i].goods_img_url
				this.price = this.goodsAttr[i].shop_price
				this.goodsNum = this.goodsAttr[i].goods_sn
				this.goodsAttrId = this.goodsAttr[i].id
			},
			togoodsdetail(goods_id) {
				console.log(goods_id);
				uni.navigateTo({
					url: `/pages/gooddetail/gooddetail?id=${goods_id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async cartreplace() {
				this.goodsList.length = 0;
				let result4 = await requestPost("/api/api/cart_replace", {
					"cart_id": this.cartid,
					"goods_id": this.goodsAttrId
				});
				let result5 = await requestPost("/api/api/cart?XcxSessKey=%20&company_id=7194")
				this.goodsList = result5.data.goods_list;
				this.compuTotalPrice()
				this.exitMotaikuang()
			},
			toaddress(id) {
				uni.navigateTo({
					url: `/pages/address/address?cart_id=${id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			}
		},
		async onLoad(order_id) {
			console.log(order_id);
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
								padding: 0 10px 10px 10px;
								background-color: #fff;

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
									text-align: center;
									width: 70%;
									font-size: 24rpx;
									background-color: #dddddd;
									border: 1px solid lightgray;
									line-height: 40rpx;
									text-align: center;
									margin: 10rpx 0rpx;
								}

								.motaikuang {
									width: 100%;
									position: fixed;
									position: relative;
									bottom: 0px;
									left: 0px;
									z-index: 99999;

									.mask {
										width: 100%;
										height: auto;
										position: fixed;
										top: 0px;
										bottom: 0px;
										left: 0px;
										right: 0px;
										margin: 0px auto;
										background: rgba(115, 115, 115, 0.2);

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
												width: 150px;
												border: 1px solid lightgrey;
												margin: 10rpx;
												padding: 20rpx;
												float: left;
												font-size: 15px;

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
										// margin-bottom: 42px;

										.sure {
											width: 100%;
											text-align: center;
											color: #fff;
											height: 80rpx;
											line-height: 80rpx;
											background: #E31D1A;
											letter-spacing: 3px;
										}
									}
								}
								.jisuan {
									display: flex;

									/deep/ van-stepper {
										.van-stepper__input {
											position: relative;
											z-index: 111;
										}
									}

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
						z-index: 9999;

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
