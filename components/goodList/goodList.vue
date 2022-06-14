<template>
	<view class="list">
		<view class="box" v-for="item in Goods" :key="item.goods_name">
			<view class="towBox">
				<image :src="item.goods_img_url"></image>
				<view class="text">
					<view class="name">
						{{item.goods_name}}
					</view>
					<view class="price">
						<text>价格：</text>
						<text>已售{{item.sale_total}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>	
	export default {
		props:["Goods"],
		name:"goodList",
		data() {
			return {
				
			};
		},
		methods:{
			
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
							margin-left: 85px;
						}
					}
				}
			}
		}
</style>