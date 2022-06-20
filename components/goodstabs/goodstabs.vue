<template>
	<view class="container" >
		<view class="tabs">
			<view v-for="(item,index) in titles" :class="{active: isActive === index}" @click="move(index)">
				{{item.name}}{{item.index}}
			</view>
		</view>
		
		<scroll-view scroll-y="true" :scroll-into-view="intoView" scroll-with-animation="true">
			<view :id='text(0)'>
				<view class="" v-for="item in goodsImg" :key="item.img_id">
					<image :src="item.img_url_url"></image>
				</view>
			</view>
			
			<view :id="text(1)">
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
			</view>
			
			<view :id='text(2)'>
				<view class="img" v-for="item in serviceInfo" :key="item.id">
					<image :src="item.image_url" mode="widthFix"></image>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import {
		requestGet,
		requestPost
	} from '@/common/js/http.js';
	import { ref } from 'vue';
	export default {
		 setup() {
		    const activeName = ref('a');
		    return { activeName };
		  },
		name: "goodsdetail_tabs",
		props: ['result'],
		data() {
			return {
				active: 0,
				isActive: 0,
				goodsImg: [],
				goodsCanshu: [],
				serviceInfo: [],
				titles:[
					{name:'商品详情'},
					{name:'规格参数'},
					{name:'服务保障'}
					],
				intoView: ''
			}
		},
		onLoad(){
			
		},
		created() {

		},
		updated() {
			this.getGoodImg()
		},
		methods: {
			async getGoodImg() {
				this.goodsImg = this.result.data.goods_gallery
				this.goodsCanshu = this.result.data.group_attr_list
				this.serviceInfo = this.result.data.config_detail_list
			},
			text(idx){
				return `text${idx}`
			},
			move(num) {
				this.$nextTick(()=> {
					this.isActive = num;
					this.intoView = "text" + num
				})
			}
		
		},
		
	}
</script>

<style lang="less" scoped>
	.active {
		color: red;
	}
	.tabs {
		width: 100%;
		height: 100rpx;
		display: flex;
		position: sticky;
		top: 0;
		background-color: #fff;
		view {
			flex: 1;
			line-height: 100rpx;
			text-align: center;
		}
	}
	scroll-view {
		width: 100%;
		height: 92vh;
		image {
			width: 100%;
			height: 700rpx;
		}
		.title2 {
			font-size: 28rpx;
			height: 60rpx;
			line-height: 60rpx;
			padding: 20rpx;
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
					font-size: 24rpx;
				}
			}
		}
	}
	.img {
		width: 100%;
	}

</style>