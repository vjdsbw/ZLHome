<template>
	<view class="container">
		<view class="sort">
			排序
		</view>
		<view class="shaixuan">
			筛选
		</view>
		<view class="goods" >
			<view v-for="item in goodsList" :key="item.goods_id" class="gooditem" mode="widthFix" @click="goGoodsDetailById(item.goods_id)">
				<image :src="item.goods_img_url" ></image>
				<view class="content">
					<view class="text">
						{{item.goods_name}}
					</view>
					<view class="title">
						<text class="price">￥{{}}</text>
						<text class="sale">已售{{item.sale_total}}</text>
					</view>
				</view>	
			</view>	
		</view>
		<view class="">
			  抱歉没有更多商品了~
			
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
				goodsList:{},
				brandName:"",
			}
		},
		created(){
			this.goGoodsDetailById()
		},
		onLoad(options){
			this.brandName=options.keywords;
		},
		onReady(){
			this.getGoods()
			
		},
		methods: {
			async getGoods(){
				// 用上一个页面传来的参数作为请求参数
				let result = await requestGet("/api/api/search/?v=1&keywords="+this.brandName+"&XcxSessKey=%20&company_id=7194")
				this.goodsList=result.data.goods_list
			},
			goGoodsDetailById(goodsId){
				// 跳转下一页面并传参
				uni.navigateTo({
					url: "/pages/gooddetail/gooddetail?goods_id="+goodsId ,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		
	}
</script>

<style scoped lang="less">
	.sort{
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		border-bottom: 1px solid gray;
		border-top: 1px solid gray;
	}
	.shaixuan{
		width: 100%;
		height: 100rpx;
		background-color: #fff;
	}
	.goods {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: lightgray;
		.gooditem {
			margin: 8rpx;
			width: 358rpx;
			height: 500rpx;
			background-color: #fff;
			image {
				width: 100%;
				height: 350rpx;	
			}
			.content{
				padding: 20rpx;
				.text {
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.title{
					display: flex;
					padding-top: 20rpx;
					.price {
						flex: 3;
						color: red;
					}
					.sale {
						flex: 2;
						margin-left: 10rpx;
						font-size: 24rpx;
						color: gray;
					}
				}			
			}			 
		}
	}
</style>
