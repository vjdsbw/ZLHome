<template>
	<view class="container">
		<view class="addtocart">
			<van-goods-action>
				<radio-group name="delall" @click="changeall">
					<radio :checked="allchecked" />全选
				</radio-group>
				<van-goods-action-button text="删除" type="warning" @click="delchoose" />
				<van-goods-action-button text="加入购物车" @click="addtocart" />
			</van-goods-action>
		</view>
		<view class="itemgoods" v-for="(item,idx) in col" :key="idx">
			<view class="brandname" @click="tosearch(item.data.brand_name)">
				<uni-list>
					<uni-list-item :title="item.data.brand_name" rightText="更多">
					</uni-list-item>
				</uni-list>
			</view>
			<view class="goodsinfo">
				<view class="goodsname">
					<uni-swipe-action>
						<uni-swipe-action-item>
							<view class="">
								<radio-group name="sex" @change="radioChange" @click="changche(idx)">
									<radio :checked="cheflag[idx]" />
								</radio-group>
							</view>
							<view class="goodsname1" @click="todetail(item.data.goods_info.goods_id)">
								<image :src="item.data.goods_info.goods_img_url" mode=""></image>
								<text class="gname">{{item.data.goods_info.goods_name}}</text>
							</view>
							<template v-slot:right>
								<view class="delbtn" @click="delCol(idx)"><text>删除</text></view>
							</template>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
				<view class="goodsprice">
					￥{{item.data.goods_info.shop_price}}
				</view>
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
				col: [],
				cheflag: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				cc: [],
				allchecked: false,
				addcart2req:true
			}
		},
		onShow() {
			this.showcCol()
		},
		methods: {
			changeall() {
				this.allchecked = !this.allchecked;
				this.cheflag.forEach((item, idx) => {
					this.cheflag[idx] = this.allchecked
				})
			},
			delchoose() {
				console.log("???");
				let cc = this.cheflag
				let len = cc.length;
				for (var i = 0; i < len; i++) {
					if (cc[i]) {
						this.delCol(i)
						i = -1; //这里重新把i赋值-1，是因为调用delcol后，会删除遍历的数组，把下表调回开头就可以重新开始遍历，不会遗漏
					}
				}
			},
			async addtocart() {
				var _this = this
				this.cheflag.forEach(async (item, idx) => {
					if (item) {
						let user = uni.getStorageSync('user')
						let result = await requestGet(
							`/api/api/cart/guess_goods?company_id=${user.company_id}`);
						if (user) {
							var flaghhh = true
							var a = `${_this.col[idx].data.goods_info.goods_id}:1`
							let result = await requestPost(`/api/api/cart?company_id=${user.company_id}`)
							let addcart = await requestPost("/api/api/add_cart", {
								"goods": a,
								"company_id": user.company_id
							});
							let newr = result.data.goods_list
							let brandn = _this.col[idx].data.brand_name
							let gid = _this.col[idx].data.goods_info.goods_id
							if (newr) {
								let newr2 = newr.filter((item) => {
									if (item.name == brandn) {
										return item
									}
								})
	
								if (newr2.length != 0) {
									let newr3 = newr2[0].list
									let newr4 = newr3.filter((item) => {
										if (item.goods_id == gid) {
											return item
										}
									})
									if (newr4) {
										_this.addcart2req = false
									}
								}
							}
							if (_this.addcart2req) {
								let addcart1 = await requestPost("/api/api/updateCart", {
									"goods": a,
									"company_id": user.company_id
								});
							}
							let carnum = await requestPost(
								`/api/api/get_cart_num?company_id=${user.company_id}`)
						}
					}
				})

			},
			async tosearch(name) {

				uni.navigateTo({
					url: `/pages/good/good?name=${name}`,
				});
			},
			todetail(id) {
				console.log(id);
				uni.navigateTo({
					url: `/pages/gooddetail/gooddetail?id=${id}`,
				});
			},
			delCol(idx) {
				this.col.splice(idx, 1)
				this.cheflag.splice(idx, 1)
				let user = uni.getStorageSync('user');
				let result = uni.getStorageSync(`col${user.user_id}`)
				var newresult = result.split(',')
				console.log(newresult, "newresult");
				var nnresult = newresult.splice(0, newresult.length - 1)
				console.log(nnresult, "nnresult");
				nnresult.splice(idx, 1)
				var ns = nnresult.join(",")
				console.log(ns, "ns");
				uni.setStorageSync(`col${user.user_id}`, `${ns},`)
			},
			changche(idx) {
				this.cheflag[idx] = !this.cheflag[idx]

			},
			radioChange(detail) {

			},
			showcCol() {
				let user = uni.getStorageSync('user');
				let result = uni.getStorageSync(`col${user.user_id}`)
				var newresult = result.split(',')
				newresult.forEach(async (item) => {
					if (item) {
						this.cheflag.push(false)
						let result2 = await requestGet(`/api/api_goods?goods_id=${item}`)
						this.col.push(result2)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		.addtocart {
			position: fixed;
			bottom: 0;
			z-index: 11111111111;
		}

		.itemgoods {
			border: 1px solid lightgray;
			margin-bottom: 100rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;

			.brandname {
				font-size: 30rpx;
			}

			/deep/.goodsinfo {

				.goodsname {
					display: flex;

					.delbtn {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						padding: 0 20px;
						background-color: #ff5a5f;

					}

					.goodsname1 {
						display: flex;

						.gname {
							margin-top: 10rpx;
							flex: 4;
							font-size: 26rpx;
						}

						image {
							flex: 2;
							width: 200rpx;
							height: 150rpx;
							margin-top: 10rpx;
							margin-right: 10rpx;
						}
					}

				}

			}
		}
	}
</style>
