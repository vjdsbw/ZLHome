<template>
	<view>

		<view class="search">
			<view class="fixtransform" @click="tosearch()">
				<uni-icons class="iconfont" custom-prefix="iconfont" type="icon-sousuo" size="20"></uni-icons>
				<input class="search-input" inputBorder="false" @input="onKeyInput" :placeholder="placeholder" />
			</view>
			<uni-icons class="cart" type="cart" size="30" @click="tocart"></uni-icons>
		</view>
		<view class="goods">
			<view class="head_list">
				<view class="first_list">
					<view class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item @change="menu(value1)" :value="value1" :options="option1" />
						</van-dropdown-menu>
					</view>
					<view class="sales" @click="currentClick(value6)" :class="{current:flage}">销量</view>
					<view class="sales1">价格
						<view class="icon_xia">
							<!-- <uni-icons custom-prefix="iconfont" type="icon-xiajiantou" size="8"></uni-icons> -->
							<uni-icons @click="bottomClick(1)" type="bottom" size="8"></uni-icons>
						</view>
						<view class="icon_shang">
							<!-- <uni-icons custom-prefix="iconfont" type="icon-shangjiantou" size="8"></uni-icons> -->
							<uni-icons @click="bottomClick(2)" type="top" size="8"></uni-icons>
						</view>
					</view>
					<view class="sales2">
						<view @click="showDrawer">筛选
							<uni-icons custom-prefix="iconfont" type="icon-shaixuan" size="14"></uni-icons>
						</view>
						<uni-drawer ref="showRight" mode="right" width="320" :mask-click="true">
							<view class="scroll-view">
								<scroll-view class="scroll-view-box" scroll-y="true">
									<view class="screen">
										<view class="brand">
											<view class="brand_name">品牌</view>
											<view class="choice" @click="showTag">{{flag?"可多选":"查看全部"}}</view>
										</view>
										<view class="brand_img" :class="{active:!flag}">
											<button v-for="item in brand" :key="item.brand_id">
												<image :src="item.brand_logo_url"></image>
											</button>
										</view>
									</view>
									<view class="attr_list" v-for="(item,idx) in attr" :key="item.attr_id">
										<view class="brand">
											<view class="brand_name">{{item.attr_name}}</view>
											<view class="choice" @click="show1Tag">{{flag1?"可多选":"查看全部"}}</view>
										</view>
										<view class="attr_text" :class="{active:!flag1}">
											<button v-for="list in item.attr_list"
												:key="list.attr_value_id"><text>{{list.attr_value}}</text></button>
										</view>
									</view>
									<view class="max_price">
										<view class="brand">
											<view class="brand_name">价格</view>
										</view>
										<view class="min_price">
											<input type="text" placeholder="最低价">
											<input type="text" placeholder="最高价">
										</view>
									</view>
									<view class="reset">
										<view class="left">重置</view>
										<view class="left">确定</view>
									</view>
								</scroll-view>
							</view>
						</uni-drawer>
					</view>

				</view>

				<view class="last_list" :class="temp==1?'boxStyle':''">
					<view class="last">
						<van-dropdown-menu>
							<van-dropdown-item id="item" title="品牌">
								<view class="title" v-for="(item,index) in brand" :key="item.brand_id" @click="iconClick(index)">
									<view class="name">
										{{item.brand_name}}
									</view>
									<view class="icons" :class="{actives:index==num}">
										<uni-icons type="checkmarkempty" color="red" size="20"></uni-icons>
									</view>
								</view>
								<view style="padding: 5px 16px;">
									<van-button type="danger" block>
										确认
									</van-button>
								</view>
							</van-dropdown-item>
							<van-dropdown-item id="item" v-for="item in attr" :key="item.attr_id" :title="item.attr_name">
								<view class="title" v-for="(att,idx) in item.attr_list" @click="thenClick(idx)">
									<view class="name">
										{{att.attr_value}}
									</view>
									<view class="icons" :class="{actives:idx==num}">
										<uni-icons type="checkmarkempty" color="red" size="20"></uni-icons>
									</view>
								</view>
								<view class="button">
									<van-button type="danger" block>
										确认
									</van-button>
								</view>
							</van-dropdown-item>
							

						</van-dropdown-menu>
					</view>
				</view>
			</view>
		</view>

		<goodList :Goods="Goods" :price="price"></goodList>
		<view class="more">
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'noMore'"></uni-load-more>
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
				num:null,
				temp: 0,
				myScroll: 0,
				type: '',
				placeholder: "",
				icons:false,
				flag: false,
				flag1: true,
				flage: false,
				Goods: [],
				brand: [],
				attr: [],
				goods_ids: '',
				price: [],
				p: 1,
				flag: true,
				option1: [{
						text: '综合',
						value: 0
					},
					{
						text: '最新',
						value: 1
					},
				],
				value1: 0,
				//综合
				psort: 0,

			}
		},
		//品牌导航条固定在顶部
		onLoad() {
			uni.createSelectorQuery().select('.second_list').boundingClientRect(res => {
				this.myScroll = res.top;
			}).exec();
		},
		onPageScroll(e) {
			if (e.scrollTop > this.myScroll) {
				this.temp = 1
			} else {
				this.temp = 0
			}
		},
		created() {
			this.getgoodList()
		},
		methods: {
			tosearch() {
				uni.navigateTo({
					url: '/pages/search/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			tocart() {
				uni.navigateTo({
					url: '/pages/cart/cart',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async getgoodList() {
				console.log(this.type);
				//拿到商品列表
				// let result = await requestGet(`/api/api/category-` + this.type + `/`, {
				// 	p: this.p
				// })
				let result = await requestGet(`/api/api/category-chuang/?p=${this.p}&psort=${this.psort}`)
				//商品第一行分类
				this.brand = result.data.brand_list

				//商品第二行分类
				this.attr = result.data.attr
		


				//通过第一页的数据比较
				if (result.data.goods_list.length < 32) {
					this.flag = false
				}

				//商品信息
				this.Goods = [...this.Goods, ...result.data.goods_list]

				//把Goods里的goods_id拼接起来，传给goods_ids		
				for (var i = 0; i < this.Goods.length; i++) {
					if (i == 0) {
						this.goods_ids = this.goods_ids + this.Goods[i].goods_id
					}
					this.goods_ids = this.goods_ids + `,` + this.Goods[i].goods_id
				}

				//通过goods-ids拿到价格
				let result2 = await requestGet("/api/api/goods/get_price", {
					goods_ids: this.goods_ids
				})
				this.price = result2.data

			},
			//筛选里的打开
			showDrawer() {
				this.$refs.showRight.open();
			},
			//筛选里的关闭
			closeDrawer() {
				this.$refs.showRight.close();
			},
			showTag() {
				this.flag = !this.flag;
			},
			show1Tag() {
				this.flag1 = !this.flag1;
			},
			currentClick(k) {
				this.flage = !this.flage;
				this.psort = 6
				this.Goods = [];
				this.getgoodList();
			},
			open() {
				console.log("xxx")
			},
			//全部和最新
			menu(value1) {
				console.log(this.value1)
			},
			//价格
			bottomClick(k) {
				console.log(k);
				if (k == 1) {
					this.psort = 1
					console.log("价格升序")
				} else {
					this.psort = 2
					console.log("价格降序")
				}
				this.Goods = [];
				this.price = [];
				this.getgoodList();
			},
			iconClick(index){
				this.num=index	
			},
			thenClick(idx){
				this.num=idx;
			}


		},
		//上拉刷新
		onReachBottom() {
			if (this.flag) {
				this.p++;
				this.getgoodList();
				this.goods_ids = '';
			}
		},
		onLoad(options) {
			console.log(options, "xxxxxxxxxxxx");
			this.type = options.pinyin;
			this.placeholder = options.chinese;
			this.getgoodList();
		},
	}
</script>

<style lang="less" scoped>
	.search {
		height: 50px;
		box-shadow: 0 2px 12px hsla(210, 1%, 40%, 0.12);
		background-color: #fff;

		.fixtransform {
			height: 30px;
			line-height: 30px;
			width: 300px;
			position: absolute;
			left: 20px;
			top: 10px;
			border-radius: 30px;
			background-color: #f0f0f0;

			.iconfont {
				float: left;
				margin-left: 10px;
			}

			.search-input {
				margin-top: 3px;
			}
		}

		.cart {
			float: right;
			margin-top: 10px;
			margin-right: 10px;
		}
	}

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

				.sales {
					text-align: center;
					color: #323233;
					width: 25%;
					height: 50px;
					line-height: 50px;
					float: left;
				}

				.current {
					color: red;
				}


				.sales1 {
					text-align: center;
					color: #323233;
					width: 25%;
					height: 50px;
					line-height: 50px;
					float: left;
					position: relative;

					.icon_shang {
						position: absolute;
						width: 8px;
						height: 8px;
						left: 70px;
						bottom: 48px;
					}

					.icon_xia {
						position: absolute;
						width: 8px;
						height: 8px;
						top: 5px;
						left: 70px;
					}
				}

				.sales2 {
					text-align: center;
					color: #323233;
					width: 25%;
					height: 50px;
					line-height: 50px;
					float: left;

					.scroll-view {
						width: 320px;
						height: 100%;
						flex: 1;

						.scroll-view-box {
							flex: 1;
							position: absolute;
							top: 0;
							right: 0;
							bottom: 0;
							left: 0;


							.screen {
								width: 100%;
								margin-right: 15px;

								.brand {
									height: 50px;
									margin-right: 26px;

									.brand_name {
										float: left;
										font-size: 16px;
										margin-left: 14px;
									}

									.choice {
										float: right;
										font-size: 16px;
										color: #888;
									}
								}

								.brand_img {
									width: 100%;
									max-height: 110px;
									overflow: hidden;

									button {
										width: 30%;
										height: 50px;
										float: left;
										padding: 7px;
										margin: 0;
										border-radius: 0%;
										box-sizing: none;
										margin-left: 8px;
										margin-bottom: 5px;

										image {
											width: 100%;
											height: 100%;
										}
									}
								}

								.active {
									height: auto;
									overflow: visible;
								}
							}

							.attr_list {
								width: 100%;
								margin-right: 15px;

								.brand {
									height: 50px;
									margin-right: 26px;

									.brand_name {
										float: left;
										font-size: 16px;
										margin-left: 14px;
									}

									.choice {
										float: right;
										font-size: 16px;
										color: #999;
									}
								}

								.attr_text {
									width: 100%;
									max-height: 86px;
									overflow: hidden;

									button {
										width: 30%;
										height: 35px;
										line-height: 35px;
										float: left;
										margin: 0;
										border-radius: 0%;
										box-sizing: none;
										margin-left: 8px;
										margin-bottom: 8px;
										background-color: #eee;

										text {
											text-align: center;
											font-size: 14px;
										}
									}
								}

								.active {
									height: auto;
									overflow: visible;
								}
							}

							.max_price {
								width: 100%;
								margin-right: 15px;

								.brand {
									height: 50px;
									margin-right: 26px;

									.brand_name {
										float: left;
										font-size: 16px;
										margin-left: 14px;
									}
								}

								.min_price {
									width: 100%;
									display: flex;
									justify-content: space-around;
									margin-bottom: 50px;

									input {
										width: 40%;
										height: 35px;
										line-height: 35px;
										background-color: #eee;
										font-size: 12px;
									}
								}
							}

							.reset {
								width: 100%;
								height: 40px;
								display: flex;
								background-color: white;
								justify-content: center;
								border-top: 1px solid #ccc;
								position: fixed;
								bottom: 0;
								left: 0;

								.left {
									flex: 2;
									width: 50%;
									height: 40px;
									line-height: 40px;
									text-align: center;
									color: #323233;
									font-size: 14px;

									&:nth-child(2) {
										background-color: red;
										color: #fff;
									}
								}
							}
						}
					}
				}
			}

			.last_list {
				width: 100%;
				height: 50px;
				border-top: 1px solid #ddd;
				background-color: #fff;

				/deep/.last {
					width: 100%;
					max-height: 50px;
					line-height: 50px;
					overflow: hidden;

					.van-dropdown-menu__item {
						background-color: #eee;
						width: 80px;
						height: 30px;
						font-size: 14px;
						color: #666;
						border-radius: 5%;
						margin-left: 5px;
						margin-top: 10px;	
						}
						.title {
							display: flex;
							float: left;
							width: 50%;
							height: 40px;
							.name{
								width: 78%;
								margin-left: 10px;
								font-size: 14px;
							}
							.icons{
								width: 20%;
								text-align: center;
								display: none;
							}
							.actives{
								display: block;

							}

					}
				}
			}

			.boxStyle {
				position: fixed;
				top: 0;
				left: 0;
			}
		}
	}
</style>
