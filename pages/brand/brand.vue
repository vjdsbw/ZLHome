<template>
	<view class="container">
		<view class="title">
			<view class="pinpaiguan">
				品牌馆
			</view>
			<view class="jingxuan">
				<text>—</text>
				<text class="haohuo">精选大牌好货</text>
				<text>—</text>
			</view>
		</view>
		<view>
			<view class="brandlist" v-for="item in brandList" :key="item.brand_id">
				<image class="img" :src="item.image_tv_url" mode="widthFix"></image>
				<view class="brandname">
					<image class="logo"  :src="item.brand_logo_url" mode="widthFix"></image>
					<view class="name"> {{item.brand_name}} </view>
					<view class="desc"> {{item.desc_t}} </view>
					<button>进入品牌</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestGet
	} from "@/common/js/http.js";
	export default {
		data() {
			return {
				brandList:[],
			}
		},
		created(){
			this.getBrands()
		},
		methods: {
			async getBrands(){
				let result = await requestGet("/api/api/brand_list?XcxSessKey=%20&company_id=7194")
				this.brandList=result.data
			}
		}
	}
</script>

<style scoped lang="less">
	.title {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		letter-spacing: 6rpx;
		.pinpaiguan {
			font-size: 48rpx;
			font-weight: 700;
			margin-bottom: 10rpx;
		}
		.jingxuan{
			color: gray;
			font-size: 28rpx;
		}
		.haohuo {
			padding: 8rpx;
		}
	}
	.brandlist {
		width: 100%;
		height: 340rpx;
		display: flex;
		margin: 40rpx;
		
		.img{
			flex: 2;
		}
		.brandname {
			height: 315rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: center;
			box-shadow: 4rpx 4rpx 4px 6rpx lightgray;
			margin-right: 60rpx;
			.logo {
				width: 160rpx;
				height: 70rpx;
				margin-top: 10rpx;
				margin-left: 40rpx;
			}
			.name {
				font-size: 32rpx;
				margin-top: 10rpx;
			}
			.desc {
				color: gray;
				font-size: 24rpx;
				margin: 10rpx 0rpx;
			}
			button {
				font-size: 24rpx;
				width: 200rpx;
				border-radius: 40rpx;
				border: #ccc;
			}
		}
	}

</style>
