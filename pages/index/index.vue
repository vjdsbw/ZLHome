<template>

	<view class="container">
		<!--如果isFixed为true的话，就添加class is_fixed 设置固定定位-->
		<view id="boxFixed" v-if="is_fixed == true" class="topfixed">

			<view class="fixtransform" @click="tosearch()">
				<uni-easyinput disabled prefixIcon="search" placeholder="输入品牌或产品型号" inputBorder="false">
				</uni-easyinput>
			</view>
		</view>
		<view class="header">
			<h2 class="title">优选Home</h2>
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view class="fixtransform" @click="tosearch()">
						<uni-easyinput disabled prefixIcon="search" placeholder="输入品牌或产品型号" inputBorder="false">
						</uni-easyinput>
					</view>
					<view class="jiaobiao">
						<uni-badge size="small" :text="gws" absolute="rightTop" type="error">
							<uni-icons type="cart" size="30" @click="tocart"></uni-icons>
						</uni-badge>
					</view>
					
				</view>
			</view>
			<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change" circular="true">
					<swiper-item v-for="item in info" :key="item.id">
						<view class="swiper-item">
							<image :src="item.image_xcx" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="body">
			<view class="bed" v-for="item in bed" :key="item.id" @click="tosearchDetail(item.desc,item.url_type)">
				<image :src="item.image_xcx" mode=""></image><br>{{item.desc}}
			</view>
		</view>
		<view class="transition">

		</view>

		<!-- 精选好物 -->
		<view class="goodChoice">
			<view class="goodsheader">
				<text class="t1">精选好物</text>
				<text class="a" :class="{active:currentIndex===4}" @click='jumpTo(4)' id="s4">灯饰</text>
				<text class="a" :class="{active:currentIndex===3}" @click='jumpTo(3)' id="s3">儿童房</text>
				<text class="a" :class="{active:currentIndex===2}" @click='jumpTo(2)' id="s2">餐厅</text>
				<text class="a" :class="{active:currentIndex===1}" @click='jumpTo(1)' id="s1">卧室</text>
				<text class="a" :class="{active:currentIndex===0}" @click='jumpTo(0)' id="s0">客厅</text>
			</view>

			<scroll-view scroll-x="true" show-scrollbar="false" :scroll-into-view="viewto" @scroll="scroll"
				scroll-with-animation="true">
				<view class="newimage">
					<view class="addition" v-for="(item,index) in goodsthing" :key="index" :id="`s${index}`">
						<view v-for=" i  in  item.sub_list" @click="todetail(i.goods_id)" :key="i.id">
							<image :src="i.image_xcx"></image>
							<view class="brand">
								{{i.brand}}
							</view>
							<view class="goodsdesc">
								<span> {{i.goods_desc}} </span>
								<h1 class="as1">￥{{i.shop_price}}</h1>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>


		<!-- 新品上新 -->
		<view class="newbrands">
			<uni-list>
				<uni-list-item title="品牌上新" link="reLaunch" to="/pages/brand/brand" rightText="更多"></uni-list-item>
			</uni-list>
			<scroll-view scroll-x="true">
				<view class="newimage">
					<view v-for="item in newbrands" :key="item.id" @click="tosearchDetail2(item.desc)">
						<image :src="item.image_xcx"></image>
						<view class="tips">
							{{item.desc}} &nbsp;{{item.desc_t}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>


		<!-- 现在品牌 -->
		<view class="modernbrands">

			<view v-for="(item,index) in brandlists" :key="index">
				<view class="bgview">
					<view class="m1">
						{{item.desc.split("|").join("")}}
					</view>
					<view class="m2">
						{{item.desc_t}}
					</view>

					<view class="showbrandfar">
						<view class="showbrand" v-for="j in item.goods.goods_list" @click="todetail(j.goods_id)"
							:key="j.id">
							<image :src="j.image_xcx_702" mode="">

							</image>
							<view class="brand">
								{{j.brand}}
							</view>
							<view class="showtext">
								{{j.desc_t}}
							</view>
							<view class="showprice">
								￥{{j.shop_price}}
							</view>
						</view>
					</view>
				</view>

				<view class="transition">
				</view>
				&nbsp; &nbsp;{{item.brand.tab_name}}
				<scroll-view scroll-x="true">
					<view class="newimage">
						<view v-for="i in item.brand.list" :key="i.id" @click="tosearchDetail2(i.desc)">
							<image class="i1" :src="i.image_xcx"></image>
							<image class="i2" :src="i.image_2_xcx"></image>
							<view class="tips">
								{{i.desc_t}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

		</view>


		<!-- 分类 -->
		<view class="cate">
			<scroll-view scroll-x="true">
				<view class="catescroll" :class="{fiexdtop:cate_fixed == true}">
					<view v-for="(item,idx) in catelist" :key="item.id">
						<view class="title" :class="{cateactive:currentIndex2===idx}" @click="choosecate(idx)">
							<view class="t1">
								{{item.desc}}
							</view>
							<view class="t2">
								{{item.desc_t}}
							</view>
							<view class="dot">
							</view>
						</view>
					</view>
				</view>
			</scroll-view>


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
		requestGet,
		requestPost
	} from '@/common/js/http.js'

	export default {
		data() {

			return {
				keywords: '',
				category_list: [],
				type: '',
				info: [],
				current: 0,
				mode: 'round',
				bed: [],
				goodsthing: [],
				newbrands: [],
				viewto: "",
				currentIndex: 0,
				currentIndex2: 0,
				brandlists: [],
				catelist: [],
				is_fixed: false,
				cate_fixed: false,
				Goods: [],
				brand: [],
				attr: [],
				p: 1,
				flag: true,
				choosebrandlist: ["keting", "woshi", "canting", "ertongfang", "shufang", "jiancai", "dengshi", "weiyu",
					"jiafang", "jiashi"
				],
				price: [],
				brand_url: [],
				gws:0

			}
		},
		created() {
			this.getSwipers();
			this.getgoodList();
		
		},
		 async onShow(){
			let user = uni.getStorageSync('user');
			let carnum = await requestPost(`/api/api/get_cart_num?company_id=${user.company_id}`)
			this.gws = carnum.data.total
		},
		onReachBottom() {
			if (this.flag) {
				this.p++;
				this.getgoodList();
			}
			console.log(this.p);
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
			scroll(event) {
				//距离每个边界距离
				if (event.detail.scrollLeft < 860) {
					this.currentIndex = 0;
				} else if (event.detail.scrollLeft < 1720) {
					this.currentIndex = 1;
				} else if (event.detail.scrollLeft < 2580) {
					this.currentIndex = 2;
				} else if (event.detail.scrollLeft < 3440) {
					this.currentIndex = 3;
				} else {
					this.currentIndex = 4;
				}
			},
			todetail(id) {

				uni.navigateTo({
					url: `/pages/gooddetail/gooddetail?id=${id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async getgoodList() {
				var temp = this.choosebrandlist[this.currentIndex2]
				let result = await requestGet(`/api/api/category-${temp}/`, {
					p: this.p
				})
				this.brand_url = result
				if (result) {
					this.brand = result.data.brand_list
					this.attr = result.data.attr
					if (result.data.goods_list.length < 32) {
						this.flag = false
					} else {
						this.Goods = result.data.goods_list
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
					}

				} else {
					this.Goods = []
				}
			},
			choosecate(id) {
				this.currentIndex2 = id;
				this.getgoodList()

			},
			jumpTo(id) {

				this.viewto = "s" + id
				this.currentIndex = id
			},
			change(e) {
				this.current = e.detail.current;
			},
			tosearch() {
				uni.navigateTo({
					url: '/pages/search/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			tosearchDetail(name, pinyin) {
				if (pinyin.length > 10) {
					var newp = pinyin.split("-")[1].substring(0, pinyin.split("-")[1].length - 1)
				} else {
					newp = "quanbufenlei"
				}
				uni.navigateTo({
					url: `/pages/good/good?pinyin=${newp}&chinese=${name}`,
				});
			},
			async tosearchDetail2(name) {
				var tempurl;
				var nurl
				this.brand_url.data.brand_list.forEach((item) => {
					if (name == item.brand_name) {
						tempurl = item.url
					}
				})
				console.log(this.brand_url.data.brand_list);
				tempurl ? nurl = tempurl.split("?")[1] : nurl = ""
				console.log(nurl);
				uni.navigateTo({
					url: `/pages/good/good?${nurl}&name=${name}`,
				});
			},
			async getSwipers() {
				//因为配置了api代理，所有路径前面需再加上一个/api,写法参考如下
				//传参  Post  接口:/m/index/cate
				//无传参 Post 接口:/x/index/index
				let result2 = await requestPost("/api/x/index/index");
				//传参  Get  接口：/api/category-chuang/?v=1&XcxSessKey=%20&company_id=7194
				let result3 = await requestGet("/api/api/category-chuang/?v=1&XcxSessKey=%20&company_id=7194");
				let brandlist = await requestPost("/api/x/index/index_two")
				this.bed = result2.data.cate;
				this.info = result2.data.banner;
				this.goodsthing = result2.data.goodsthing;
				this.newbrands = result2.data.newbrands;
				this.brandlists = brandlist.data.style_manage;
				this.catelist = brandlist.data.cat_tab
			},
		},
		onPageScroll(res) {
			if (res.scrollTop >= 100) {
				this.is_fixed = true;
			} else {
				this.is_fixed = false
			}


			if (res.scrollTop >= 6800) {

				this.cate_fixed = true;
			} else {
				this.cate_fixed = false
			}
		},

	}
</script>


<style lang="less" scoped>
	/deep/ .is-input-border {
		border-radius: 50rpx;
	}

	.active {
		border-bottom: 2px solid red;
	}

	.container {
		background-color: white;
		;

		.topfixed {
			width: 100%;
			height: 150rpx;
			display: inline-block;
			position: fixed;
			display: flex;
			align-items: center;
			/*所有子元素都垂直居中了*/
			z-index: 1000000000000000;
			background: -webkit-radial-gradient(center, circle, rgba(230, 42, 41, 1), rgba(235, 80, 52, 1));

			/deep/ .uni-easyinput {
				width: 500rpx;
				height: 60rpx;
				margin-left: 30rpx;
			}
		}

		.header {
			height: 500rpx;
			width: 100%;
			position: relative;
			background: -webkit-radial-gradient(center, circle, rgba(230, 42, 41, 1), rgba(235, 70, 42, 0.8));
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;

			/deep/ .uni-easyinput {
				width: 620rpx;
				height: 40rpx;
				margin-left: 30rpx;
				margin-right: 20rpx;

			}

			.title {
				padding-left: 20rpx;
				padding-top: 50rpx;
				color: white;

			}

			.uni-form-item {
				margin-top: 50rpx;
				display: flex;

				.uni-input {
					flex: 3;
					border-radius: 10px;
					background-color: white;
					margin-left: 10rpx;
					color: lightgray;
				}


			}

			.swiper-box {
				margin-top: 50rpx;
				margin-left: 40rpx;

				image {
					box-shadow: 10px 10px 10px #888;
				}
			}
		}

		.body {
			display: flex;
			margin-top: 70rpx;

			.bed {
				flex: 1;

				text-align: center;

				image {
					width: 100rpx;
					height: 100rpx;

				}
			}
		}

		.transition {
			width: 100%;
			height: 20rpx;
			background-color: lightgray;
			margin-top: 70rpx;
			margin-bottom: 30rpx;
		}

		.goodChoice {
			scroll-view ::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
				display: none;
			}

			.goodsheader {
				text-align: center;

				.t1 {
					margin-left: 30rpx;
					float: left;
					font-size: 40rpx;
				}

				.a {
					margin-right: 10rpx;
					color: gray;
					float: right;
				}
			}

			.newimage {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: gray;
				height: 300rpx;

				.addition {
					display: flex;
					align-items: center;

					image {
						flex: 1;
						width: 400rpx;
						height: 300rpx;
						margin-left: 30rpx;
						border-radius: 20rpx;
					}

					.brand {

						width: 200rpx;
						height: 40rpx;
						background-color: rgb(60, 120, 100);
						color: white;
						text-align: center;
						font-size: 24rpx;
						border-bottom-right-radius: 30rpx;
						border-top-right-radius: 30rpx;
						position: relative;
						left: 30rpx;
						bottom: 70rpx;
					}

					.goodsdesc {
						margin-left: 30rpx;

						.as1 {
							margin-top: 10rpx;
							color: black;
							font-weight: bold;
						}
					}
				}

			}
		}

		.modernbrands {
			margin-top: 120rpx;
			margin-left: 30rpx;

			.bgview {
				background-image: url("https://img003.tianyingmeijia.com/upload/page/20200924/1600932320VEKxteLfdq/cmVzaXplLHdfNzUw/93fdf5880fc9a7c0439524186198454e.jpg");

			}

			.m1 {
				font-size: 48rpx;
				margin-top: 40rpx;
				margin-bottom: 20rpx;
			}

			.m2 {
				font-size: 20rpx;
				color: gray;
				margin-bottom: 20rpx;
			}

			.showbrandfar {
				display: flex;
				flex-wrap: wrap;

				:first-child {
					image {
						width: 700rpx;
						border-radius: 20rpx;
					}

					.showtext {
						position: absolute;
						left: 0;
						color: white;
						bottom: 80rpx;
						font-size: 28rpx;
						overflow: hidden;
						/* 文本不换行 */
						white-space: nowrap;
					}

					.showprice {
						position: absolute;
						left: 0;
						color: white;
						bottom: 40rpx;

					}
				}

				:nth-child(2n+1) {
					margin-right: 10rpx;
				}

				:not(:first-child) {
					image {
						width: 340rpx;
						height: 300rpx;
						border-radius: 20rpx;
					}

					.showtext {
						width: 12em;
						overflow: hidden;
						/* 显示省略符号来代表被修剪的文本。 */
						text-overflow: ellipsis;
						/* 文本不换行 */
						white-space: nowrap;
						font-size: 28rpx;
						color: gray;
						margin-bottom: 20rpx;


					}
				}

			}

			.showbrand {
				position: relative;

				.brand {
					color: gray;
					background-color: green;
					display: inline-block;
					position: absolute;
					left: 0;
					bottom: 150rpx;
					width: 150rpx;
					height: 40rpx;
					background-color: rgb(60, 120, 100);
					text-align: center;
					font-size: 24rpx;
					color: white;
					border-bottom-right-radius: 30rpx;
					border-top-right-radius: 30rpx;
				}

			}

			.newimage {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: gray;
				height: 320rpx;

				.i1 {
					width: 200rpx;
					height: 150rpx;
					margin-left: 20rpx;
				}

				.i2 {
					width: 200rpx;
					height: 80rpx;
					margin-left: 20rpx;
				}

				.tips {
					margin-left: 20rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

			}
		}

		.cate {
			display: flex;
			text-align: center;

			scroll-view ::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
				display: none;
			}

			.catescroll {
				white-space: nowrap;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				height: 300rpx;

				&.fiexdtop {
					width: 100%;
					overflow-x: auto;
					position: fixed;
					top: 80rpx;
					background-color: white;
					height: 200rpx;

					.title {
						.t2 {
							display: none;
						}
					}
				}
			}

			.title {
				text-align: center;
				vertical-align: middle;
				margin: 10rpx 30rpx;

				.t1 {
					font-size: 30rpx;
				}

				.t2 {
					font-size: 20rpx;
					color: #888;
				}

			}

			.cateactive {
				.t1 {
					font-size: 40rpx;
					color: red;
				}

				.t2 {
					color: red;
				}

				.dot {
					width: 10rpx;
					height: 10rpx;
					background-color: red;
					border-radius: 10rpx;
					position: relative;
					left: 50%;
				}
			}

		}

		.newbrands {
			height: 350rpx;
			background-color: white;
			margin-top: 30rpx;

			.newimage {
				display: flex;
				align-items: center;

				image {
					flex: 1;
					width: 400rpx;
					height: 300rpx;
					margin-left: 30rpx;
					border-radius: 20rpx;
				}

				.tips {
					font-size: 28rpx;
					color: gray;
					text-align: center;
				}
			}

		}
	}
</style>
