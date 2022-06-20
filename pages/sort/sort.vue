<template>
	<!-- 搜索 -->
	<view class="header">
		<view class="search" @click="tosearch">
			<uni-search-bar placeholder="输入商品分类、名称" :radius="100" @confirm="search" cancelButton="none">
			</uni-search-bar>
		</view>
		<view class="jiaobiao">
			<uni-badge size="small" :text="gws" absolute="rightTop" type="error">
				<uni-icons type="cart" size="30" @click="tocart"></uni-icons>
			</uni-badge>
		</view>

	</view>
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
					<view class="content" v-for="(item1,index1) in item.cat_list" :key="item1.id"
						@click="goGood(item1.url_type,item1.name)">
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
		requestGet,
		requestPost
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				title: [],
				lists: [],
				currentIndex: 0,
				doms: '',
				topList: [],
				gws: 0
			}
		},
		created() {
			this.getList()
			this.getListContent().then(() => {
				this.getNodesInfo()
			})
		},
		onLoad() {

		},
		async onShow() {
			let user = uni.getStorageSync('user');
			let carnum = await requestPost(`/api/api/get_cart_num?company_id=${user.company_id}`)
			this.gws = carnum.data.total
		},
		onReady() {

		},
		methods: {
			tocart(){
				uni.navigateTo({
					url: '/pages/cart/cart',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async getList() {
				let result = await requestGet("/api/m/index/cate_list")
				this.title = result.data
			},
			async getListContent() {
				let result = await requestGet("/api/m/index/cate_list?XcxSessKey=%20&company_id=7194")
				this.lists = result.data
			},
			goCart(){
				uni.navigateTo({
					url:'/pages/cart/cart'
				})
			},
			//跳转商品
			goGood(pinyin, chinese) {
				pinyin = pinyin.split("-")[1].split("/")[0];

				uni.navigateTo({
					url: `/pages/good/good?pinyin=${pinyin}&chinese=${chinese}`,

				});
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

				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.header {
		display: flex;
		background-color: #fff;

		.jiaobiao {
			position: absolute;
			right: 50rpx;
			top: 30rpx;
		}

		.search {
			/deep/.uni-searchbar {
				width: 290px;

				.uni-searchbar__box {
					height: 30px;
					justify-content: left;

					.uni-searchbar__box-icon-search {
						width: 10px;
					}

					.uni-searchbar__text-placeholder {
						font-size: 14px;
					}
				}
			}
		}

		.cart {
			position: relative;
			top: 5px;
			right: -10px;
		}
	}


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
					// width: 255px;
					flex-wrap: wrap;

					.content {
						width: 160rpx;
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
