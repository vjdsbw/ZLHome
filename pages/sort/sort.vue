<template>
	<view class="container d-flex h-100">
		<!-- 左边列表 -->
		<scroll-view class="left-scroll flex-1 border-right" scroll-y="true" :scroll-top="leftScrollTop">
			<view :class="['left-scroll-item',{active:currentIndex===idx}]" v-for="(item,idx) in title" :key="item.id"
				@click="leftClick(idx,item)">
				{{item.desc}}
			</view>
		</scroll-view>
		<!-- 右边内容 -->
		<scroll-view class="right-scroll flex-3" scroll-y="true" :scroll-top="rightScrollTop" scroll-with-animation
			@scroll="onRightScroll">
			<view class="right-scroll-item" v-for="(item,index) in lists" :key="item.id">
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
			}
		},
		created() {
			this.getList()
			this.getListContent()
			this.getData()
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this);
			// 点击左边菜单，右边滑动到相应区块
			// 拿到左右节点的top值
			query.selectAll('.left-scroll-item').boundingClientRect(data => {
				this.leftDomsTop = data.map(v => v.top)
				console.log('左边top：', this.leftDomsTop)
			}).exec();
			query.selectAll('.right-scroll-item').boundingClientRect(data => {
				this.rightDomsTop = data.map(v => v.top)
				console.log('右边top：', this.rightDomsTop)
			}).exec();

			// 当右边滚动超过左边相应范围时，左边内容跟着滑动
			query.selectAll('.left-scroll-item').fields({
				size: true, // 尺寸
				rect: true // 布局信息
			}, data => {
				this.cateItemHeight = data.map(v => {
					this.cateItemHeight = v.height
					return v.top
				})
			}).exec();
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
				// 右边scroll-view滚动到对应区块
				this.rightScrollTop = this.rightDomsTop[idx]
				// console.log(this.rightScrollTop)
			},
			// 假数据
			getData() {
				for (let i = 0; i < 12; i++) {
					this.title.push({
						name: '分类' + i
					})
					this.lists.push({
						name: `—— 产品分类${i} ——`,
						lists: []
					})
				}
				for (let i = 0; i < this.lists.length; i++) {
					for (let j = 0; j < 24; j++) {
						this.lists[i].lists.push({
							name: `分类${i}-商品${j}`
						})
					}
				}
			},
			// 滑动右边菜单，左边相应菜单项actived
			// 监听右边滚动事件
			async onRightScroll(e) {
				// 匹配当前scrollTop所处的索引
				this.rightDomsTop.forEach((v, k) => {
					if (v < e.detail.scrollTop + 3) {
						this.currentIndex = k
						return false
					}
				})
			},
		},
		wacth: {
			currentIndex(newValue, oldValue) {
				// 获取左边scroll-view的高度，top值
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('#leftScroll').fields({
					size: true,
					scrollOffset: true, // 滚动状态
				}, data => {
					let H = data.height
					let ST = data.scrollTop
					// 下边
					if ((this.leftDomsTop[newValue] + this.cateItemHeight) > (H + ST)) {
						return this.leftScrollTop = this.leftDomsTop[newValue] + this.cateItemHeight - H
					}
					// 上边
					if (ST > this.cateItemHeight) {
						this.leftScrollTop = this.leftDomsTop[newValue]
					}
				})
			}
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
