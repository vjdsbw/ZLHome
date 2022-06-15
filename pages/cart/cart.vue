<template>
	<view class="cart">
		<view class="cart-goods">
			<view v-if="flag" class="cart-icon">
				<image src="/static/icon/cart.png" mode=""></image>
				<view class="cart-text">
					您未登录，登录后将同步购物车中的商品
				</view>
				<view class="denglu" @click="tologin">
					登录
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
		requestGet
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				likelist: [],
				flag:true
			}
		},
		created() {
			this.guesslike()
		},
		methods: {
			async guesslike() {
				let result = await requestGet("/api/api/cart/guess_goods?company_id=7194");
				this.likelist = result.data;
				let user = uni.getStorageSync('user')
				this.flag= !this.false;
				console.log(this.flag);
				if (user) {
					this.flag= !this.false;
				} else {
					uni.navigateTo({
						url: '/pages/login/login',
					});
				}
			},
			tologin(){
				uni.navigateTo({
					url: '/pages/login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.cart {
		.cart-goods{
			background-color: white;
			padding-bottom: 10px;
			.cart-icon{
				text-align: center;
				image{
					width: 50px;
					height: 50px;
					margin-top: 20px;					
				}
				.cart-text{
					font-size: 15px;
					color: #999;
					margin-top: 10px;
				}
				.denglu{
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
		}
		.guess{
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
