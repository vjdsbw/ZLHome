<template>
	<view>
		<view class="goods">
			<view class="head_list">
				<view class="first_list">
					<view class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item :value="value1" :options="option1" />
						</van-dropdown-menu>
					</view>
					<view class="sales">销量</view>
					<view class="sales">价格</view>
					<view class="sales">
						<view @click="showDrawer">筛选
							<uni-icons custom-prefix="iconfont" type="icon-shaixuan" size="16"></uni-icons>
						</view>
						<uni-drawer ref="showRight" mode="right" width="320" :mask-click="false">
							<scroll-view style="height: 100%;" scroll-y="true">
								<view @click="closeDrawer" class="close">关闭</view>
								<view class="shaixuan">
									<view class="brand" >
										<uni-card title="品牌" :extra="value_name">
											<button v-for="item in brand" :key="item.brand_id"><image :src="item.brand_logo_url"></image></button>
										</uni-card>
									</view>
								</view>
							</scroll-view>
						</uni-drawer>
					</view>

				</view>
				<view class="second_list">

				</view>
			</view>
			<goodList :Goods="Goods"></goodList>
			<view class="more">
				<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
				<uni-load-more v-else :status="'noMore'"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestGet
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				Goods: [],
				brand: [],
				attr: [],
				p: 1,
				flag: true,
				option1: [{
						text: '综合',
						value: 0
					},
					{
						text: '最新',
						value: 1
					}
				],
				value1: 0,
				value_name:"可多选"

			}
		},
		created() {
			this.getgoodList()
		},
		methods: {
			async getgoodList() {
				let result = await requestGet("/api/api/category-woshi/", {
					p: this.p
				})
				this.brand = result.data.brand_list
				this.attr = result.data.attr
				if (result.data.goods_list.length < 32) {
					this.flag = false
				} else {
					this.Goods = [...this.Goods, ...result.data.goods_list]
				}

			},
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			}
		},
		onReachBottom() {
			if (this.flag) {
				this.p++;
				this.getgoodList();
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods {
		width: 100%;

		.more {
			text-align: center;
		}

		.head_list {
			.first_list {
				border-top: 1px solid #ddd;
				background-color: #fff;
				box-shadow: 0 2px 12px hsla(210, 1%, 40%, 0.12);
				width: 100%;
				height: 50px;

				/deep/ .dropdown {
					width: 25%;
					float: left;

					.van-dropdown-menu {
						box-shadow: none;
						background-color: transparent;
					}
				}

				/deep/.sales {
					text-align: center;
					color: #323233;
					width: 25%;
					height: 50px;
					line-height: 50px;
					float: left;
				}
			}
		}

	}
</style>
