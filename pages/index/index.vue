<template>
	<view class="container">
		<view class="header">
			<h2 class="title">优选Home</h2>
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view class="uni-input" @click="tosearch">输入品牌或产品型号</view>
					<uni-icons type="cart" size="30"></uni-icons>
				</view>
			</view>
			<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="item in info" :key="item.id">
						<view class="swiper-item">
							<image :src="item.image_xcx" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="body">
			<view class="bed" v-for="item in bed" :key="item.id" @click="toBed">
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

			<scroll-view scroll-x="true" show-scrollbar="false" :scroll-into-view="viewto" scroll-with-animation="true">
				<view class="newimage">
					<view class="addition" v-for="(item,index) in goodsthing" :key="index" :id="`s${index}`">
						<view v-for=" i  in  item.sub_list" :key="i.id">
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
					<view v-for="item in newbrands" :key="item.id">
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
				<view class="m1">
					{{item.desc.split("|").join("")}}
				</view>
				<view class="m2">
					{{item.desc_t}}
				</view>

				<view class="showbrandfar">
					<view class="showbrand" v-for="j in item.goods.goods_list" :key="j.id">
						<image :src="j.image_xcx_702" mode=""></image>
						<view class="showtext">
							{{j.desc_t}}
						</view>
						<view class="showprice">
							￥{{j.shop_price}}
						</view>
					</view>
				</view>
				<view class="transition">
				</view>
				&nbsp; &nbsp;{{item.brand.tab_name}}
				<scroll-view scroll-x="true">
					<view class="newimage">
						<view v-for="i in item.brand.list" :key="i.id">
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
			}
		},
		created() {
			this.getSwipers();
		},
		methods: {
			choosecate(id) {
				console.log(id);
				this.currentIndex2 = id
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
			toBed() {
				uni.navigateTo({
					url: '/pages/search/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async getSwipers() {
				//因为配置了api代理，所有路径前面需再加上一个/api,写法参考如下
				//传参  Post  接口:/m/index/cate
				let result = await requestPost("/api/m/index/cate", {
					'biao': 'keting'
				});

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

				this.catelist = brandlist.data.cat_tab.slice(0, 5);
				console.log(this.catelist);
			},
			onKeyInput: function(event) {
				this.keywords = event.detail.value
			},

			//搜索框功能的实现
			async search() {
				let result = await requestGet(`/api/api/search?keywords=` + this.keywords);

				this.category_list = result.data.category_list;

				for (let i = 0; i < this.category_list.length; i++) {
					if (this.category_list[i].keywords.match(this.keywords)) {
						this.type = this.category_list[i].pinyin;
					} else {
						for (let j = 0; j < this.category_list[i].item.length; j++) {
							if (this.category_list[i].item[j].keywords.match(this.keywords)) {
								this.type = this.category_list[i].item[j].pinyin
							}
						}
					}
				}
				let result2 = await requestGet(`/api/api/category-` + this.type +
					`v=1&XcxSessKey=%20&company_id=7194`);
			}
		}
	}
</script>

<style lang="less" scoped>
	.active {
		border-bottom: 2px solid red;
	}

	.container {
		background-color: white;
		;

		.header {
			height: 500rpx;
			width: 100%;
			position: relative;
			background-color: rgb(230, 42, 41);
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;

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
					}

					.brand {

						width: 200rpx;
						height: 40rpx;
						background-color: green;
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
					}
				}

				:nth-child(2n+1) {
					margin-right: 10rpx;
				}

				:not(:first-child) {
					image {
						width: 330rpx;
						height: 300rpx;
					}
				}

			}

			.showbrand {
				background-image: url("https://img001.tianyingmeijia.com/upload/page/20200924/1600932293EAc4bq7mNy/cmVzaXplLHdfNzUw/2fe316c24c098de31903f4cccc8129bf.jpg");

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
            .title{
			
				margin: 10rpx 30rpx;
				.t1{
						font-size: 30rpx;
				}
				.t2{
					font-size: 20rpx;
					color: #888;
				}
			
			}
			.cateactive{
			.t1{
					font-size: 40rpx;
					color: red;
			}
			.t2{
				color: red;
			}
			.dot{
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
