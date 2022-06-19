<template>
	<view class="list">
		<view class="box" v-for="item in array" :key="item.goods_name" @click="togoodsdetail(item.goods_id)">
			<view>
				<view class="towBox">
					<image :src="item.goods_img_url"></image>
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
</template>
<!--   -->
<script>
	export default {
		props: ["Goods", "price", "psort"],
		name: "goodList",
		data() {
			return {
				array: []
			};
		},
		updated() {
			// let array = [];
			// for (var m = 0, n = 0; m < this.price.length; m++, n++) {
			// 	array.push(
			// 		Object.assign(this.Goods[n], {
			// 			shop_price: this.price[m].shop_price
			// 		})
			// 	)
			// }
			if(this.price==0){
				console.log("xxxxxxxxxxxxxxxxxx");
			}else{
				this.getgoodlist()
			}
			
		},
		methods: {
			togoodsdetail(id) {
				uni.navigateTo({
					url: `/pages/gooddetail/gooddetail?id=${id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getgoodlist() {
				let array2 = [];
				for (var m= 0, n = 0; m<this.Goods.length; m++, n++) {
					array2.push(
						Object.assign(this.Goods[n], {
							shop_price: this.price[m].shop_price
						})
					)
				}
				this.array = array2
				if (this.psort == 1) {
					this.array.sort((a, b) => {
						return a.shop_price - b.shop_price;
					}) //升序)
				} else if (this.psort == 2) {
					this.array.sort((a, b) => {
						return b.shop_price - a.shop_price;
					}) //升序)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.list {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: #eee;

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
						margin-left: 50px;
					}
				}
			}
		}

	}
</style>
