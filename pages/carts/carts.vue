<template>
	<view class="container">
		<!-- v-if="show==false" -->
		<view class="empty" v-if="show==false">
			<view class="emptytext">空空如也的购物~~</view>
			<view class="emptybutton" @click="goshopping">去选购</view>
		</view>
		<!-- v-if="show==true" -->
		<view class="carts">
			
		</view>
		
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				//购物车有无商品
				show:true,
				//全选是否选中
				allchecked:true,
				checked:true,
			}
		},
		methods: {
			goshopping(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		.empty{
			padding: 100rpx;
			text-align: center;
			display: flex;
			align-items: center;
			flex-direction: column;
			.emptytext{
			color: orange;
			margin-bottom: 50rpx;
			font-size: 36rpx;
			}
			.emptybutton{
			width: 300rpx;
			height: 90rpx;
			color:orange;
			border: 1rpx solid orange;
			text-align: center;
			line-height: 90rpx;
			border-radius: 48rpx;
			}		
		}
	}
</style>
