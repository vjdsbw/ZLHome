<template>
	<view class="container">
		<van-tabs :active="active" v-bind:change="onChange" class="tabs">
			<van-tab title="商品详情" class="img">
				<view class="" v-for="item in goodsImg" :key="item.img_id">
					<image :src="item.img_url_url"></image>
				</view>
			</van-tab>
			<van-tab title="规格参数">
				<view class="title">
					规格参数
				</view>
				<view class="" v-for="item in goodsCanshu" :key="item.attr_group_id">
					<view class="title2">
						{{item.attr_group_name}}
					</view>
					<view class="baseinfo">
						<view v-for="i in  item.attr_lis" :key="i.name" class="content">
							<text class="name1">{{i.name}}</text>
							<text class="value1">{{i.value}}</text>
						</view>
					</view>

				</view>
			</van-tab>
			<van-tab title="服务保障" class="">
				<view class="title">
					服务保障
				</view>
				<view class="img" v-for="item in serviceInfo" :key="item.id">
					<image :src="item.image_url" mode="widthFix"></image>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import {
		requestGet,
		requestPost
	} from '@/common/js/http.js'
	export default {
		name: "goodsdetail_tabs",
		props: ['result'],
		data() {
			return {
				active: 0,
				activeKey: 0,
				goodsImg: [],
				goodsCanshu: [],
				serviceInfo: [],
			}
		},
		created() {

		},
		updated() {

			this.getGoodImg()
		},
		methods: {
			onTabChange(event) {
				console.log(event.detail);
			},
			async getGoodImg() {


				this.goodsImg = this.result.data.goods_gallery
				this.goodsCanshu = this.result.data.group_attr_list
				this.serviceInfo = this.result.data.config_detail_list
			},
		},
	}
</script>

<style lang="less" scoped>
	.tabs {
		width: 100%;

		image {
			width: 100%;
			height: 700rpx;
		}

		.title {
			background-color: #fff;
			width: 100%;
			height: 100rpx;
			margin: 20rpx 0rpx;
			line-height: 100rpx;
			padding-left: 30rpx;
		}

		.title2 {
			padding-left: 30rpx;
			font-size: 28rpx;
			height: 60rpx;
			line-height: 60rpx;
		}

		.baseinfo {
			.content {
				display: flex;
				background-color: #fff;
				padding: 20rpx;
				border-bottom: 1px solid lightgray;
				font-size: 28rpx;

				.name1 {
					flex: 2;
					color: gray;
				}

				.value1 {
					flex: 3;
				}
			}
		}

		.img {
			width: 100%;

		}
	}
</style>
