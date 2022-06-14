<template>
	<view class="container d-flex h-100">
		<!-- 左边列表 -->
		<scroll-view class="left-scroll" scroll-y="true">
			<view :class="['left-scroll-item',{active:currentIndex===idx}]" v-for="(item,idx) in title" :key="item.id"
				@click="leftClick(idx,item)">
				{{item.desc}}
			</view>
		</scroll-view>
		<!-- 右边内容 -->
		<scroll-view class="right-scroll" scroll-y="true" scroll-with-animation :scroll-into-view="doms"
			@scroll="scrolls" @scrolltolower="scrolltolower">
			<view class="right-scroll-item" v-for="(item,index) in lists" :key="index" :id="'po'+index">
				<view class="title-lists">——{{item.desc}}——</view>
				<view class="lists">
					<view class="content" v-for="(item1,index1) in item.cat_list" :key="item1.id">
						<image class="img" :src="item1.image_url"></image>
						<view class="list-title">{{item1.desc_three}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		requestGet
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				title: [],
				lists: [],
				currentIndex: 0,
				doms: '',
				topList: []
			}
		},
		created() {
			this.getList()
			this.getListContent().then(()=>{
				this.getNodesInfo()
			})
		},
		onLoad() {
		
		},
		onReady() {
			
		},
		methods: {
			async getList() {
				let result = await requestGet("/api/m/index/cate_list")
				this.title = result.data
			},
			async getListContent() {
				let result = await requestGet("/api/m/index/cate_list?XcxSessKey=%20&company_id=7194")
				this.lists = result.data
			},
			// 点击左边导航栏
			leftClick(idx, item) {
				this.currentIndex = idx;
				this.doms = 'po' + idx
			},
			scrolltolower() {
				setTimeout(() => {
					this.currentIndex = 11
				}, 500)
			},
			scrolls(e) {
				let scrollTop = e.target.scrollTop
				for (let i = 0; i < this.topList.length; i++) {
					// console.log(this.topList.length)
					let h1 = this.topList[i]
					let h2 = this.topList[i + 1]
					if (scrollTop >= h1 && scrollTop < h2) {
						this.currentIndex = i
					}
				}
			},
			getNodesInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.right-scroll-item').boundingClientRect().exec((res) => {
				let nodes = res[0]
					let rel = [];
					nodes.map(item => {
						rel.push(item.top)
					})
					this.topList = rel
					console.log(rel,"9999999999999999999999999")
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		background-color: #fff;

		.left-scroll {
			width: 230rpx;
			height: 100vh;
			text-align: center;
			background-color: #eee;

			.left-scroll-item {
				height: 120rpx;
				line-height: 120rpx;
				border-bottom: 1px solid #fff;

				&.active {
					border-left: 2px solid red;
					background-color: #fff;
				}
			}
		}

		.right-scroll {
			flex: 1;
			overflow: hidden;
			height: 100vh;

			.right-scroll-item {
				margin-bottom: 20px;

				.title-lists {
					text-align: center;
				}

				.lists {
					display: flex;
					width: 244px;
					flex-wrap: wrap;

					.content {
						width: 170rpx;
						margin-left: 5px;

						.img {
							width: 170rpx;
							height: 170rpx;
						}

						.list-title {
							text-align: center;
							color: #666;
							font-size: 12px;
						}
					}
				}

			}
		}

	}
</style>
