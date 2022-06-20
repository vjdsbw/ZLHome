<template>
	<view>
		<view class="search">
			<view class="fixtransform" @click="tosearch()">
				<uni-icons class="iconfont" custom-prefix="iconfont" type="icon-sousuo" size="20"></uni-icons>
				<input class="search-input" inputBorder="false" @input="onKeyInput" :value="value" />
				<view class="jiaobiao">
					<uni-badge size="small" :text="gws" absolute="rightTop" type="error">
						<uni-icons type="cart" size="30" @click="tocart"></uni-icons>
					</uni-badge>
				</view>
			</view>
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
											
											<view class="choice" @click="showTag">{{flag3?"可多选":(num==0?"可多选":`已选${num}项`)}}</view>
										</view>
										<view class="brand_img" :class="{active:!flag}">
											<button v-for="item in brand" :key="item.brand_id"

												@click="addB(item.brand_id)" :style="{'backgroundColor':(brr.indexOf(item.brand_id)!=-1?'red':'#eee')}">

												<image :src="item.brand_logo_url"></image>
											</button>
										</view>
									</view>
                                    
									<view class="attr_list" v-for="(item,idx) in attr" :key="item.attr_id">

										<view >
											<view class="brand">
											<!-- {{flag2?(currents==idx"可多选":`已选${num1[idx]}项`):false}} -->
												<view class="brand_name">{{item.attr_name}}</view>
											<!-- 	<view class="choice" @click="show1Tag(idx)">{{flag2?'可多选':(currents==idx?`已选${num1[idx]}项`:"可多选")}}</view> -->
												<view class="choice" @click="show1Tag(idx)">{{flag2?'可多选':(currents==idx?(num1[idx]!=0?`已选${num1[idx]}项`:"可多选"):(!num1[idx]?"可多选":(num1[idx]==0?"可多选":`已选${num1[idx]}项`)))}}</view>
											</view>
											
											<view class="attr_text" :class="flag1?(current==idx?'active':'attr_text'):false">
												<button v-for="list in item.attr_list" @click="addA(list.attr_value_id,idx)"
													:key="list.attr_value_id" :style="{'color':(arr.indexOf(list.attr_value_id)!=-1?'red':'#333')}"><text>{{list.attr_value}}</text></button>
											</view>

										</view>
										
									</view>
									<view class="max_price">
										<view class="brand">
											<view class="brand_name">价格</view>
										</view>
										<view class="min_price">
											<input type="text" @input="onminPrice" :value="minvalue" placeholder="最低价">
											<input type="text" @input="onmaxPrice" :value="maxvalue"  placeholder="最高价">
										</view>
									</view>
									<view class="reset">
										<view class="left" @click="reset">重置</view>
										<view class="left" @click="sure">确定</view>
									</view>
								</scroll-view>
							</view>
						</uni-drawer>
					</view>

				</view>

				<view class="last_list" :class="temp==1?'boxStyle':''">
					<view class="last">
						<van-dropdown-menu>


							<van-dropdown-item  class="item" title="品牌">
								<view class="title" v-for="(item,index) in brand" :key="item.brand_id">
									<view class="name" @click="addB(item.brand_id)"
									
										:style="{'color':(brr.indexOf(item.brand_id)!=-1?'red':'#333')}">

										{{item.brand_name}}
									</view>
									<view class="icons" v-show="brr.indexOf(item.brand_id)!=-1? isChoose: noChoose">
										<uni-icons type="checkmarkempty" color="red" size="20"></uni-icons>
									</view>
								</view>

								<view class="set">
									<view class="reset" @click="reset">
										<van-button block>
											重置
										</van-button>
									</view>
									<view class="sure" @click="sure">
										<van-button type="danger" block>
											确认
										</van-button>
									</view>

								</view>

							</van-dropdown-item>
							<van-dropdown-item class="item" v-for="(item,index) in attr" :key="item.attr_id"
								:title="item.attr_name">

								<view class="title" v-for="(att,idx) in item.attr_list" :key="att.attr_value_id">
									<view class="name" @click="addA(att.attr_value_id,index)"
										:style="{'color':(arr.indexOf(att.attr_value_id)!=-1?'red':'#333')}">

										{{att.attr_value}}
									</view>
									<view class="icons" v-show="arr.indexOf(att.attr_value_id)!=-1? isChoose: noChoose">
										<uni-icons type="checkmarkempty" color="red" size="20"></uni-icons>
									</view>
								</view>

								<view class="set">
									<view class="reset" @click="reset">
										<van-button block>
											重置
										</van-button>
									</view>
									<view class="sure" @click="sure">
										<van-button type="danger" block>
											确认
										</van-button>
									</view>
								</view>
							</van-dropdown-item>


						</van-dropdown-menu>
					</view>
				</view>
			</view>
		</view>

		<goodList :Goods="Goods" :price="price" :psort="psort"></goodList>
		<view class="more">
			<uni-load-more v-if="!flagg" :status="'loading'"></uni-load-more>
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
				currents:null,
				current:null,
				num:0,
				num1:[],
				minvalue:"",
				maxvalue:"",
				isChoose: true,
				noChoose: false,
                flagg:true,

				num: null,
				temp: 0,
				myScroll: 0,
				type: '',
				icons: false,
				value: "",
				flag: true,
				flag1: true,
				flage: false,
				flag2:true,
				flag3:true,
				Goods: [],
				brand: [],
				attr: [],
				goods_ids: '',
				price: [],
				brr: [],
				arr: [],
				krr:[[]],
				a: '',
				b: '',
				p: 1,
				pn:'',
				px:'',
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
				gws: 0
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
			this.selectAllComponents(".item").map((item)=>{
				item.toggle(false)
			})
		},
		async onShow() {
			let user = uni.getStorageSync('user');
			let carnum = await requestPost(`/api/api/get_cart_num?company_id=${user.company_id}`)
			this.gws = carnum.data.total
		},
		methods: {
			tosearch() {
				uni.navigateTo({
					url: `/pages/search/search?value=${this.value}`,
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
		    async getgoodsids(){
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
			async getgoodList() {
				//拿到商品列表
				let result = await requestGet(`/api/api/category-` + this.type + `/`, {
					p: this.p,
					a: this.a,
					b: this.b,
					psort: this.psort,
					pn:this.pn,
					px:this.px,
				})
				if (result.data.goods_list.length!=0) {

					//商品第一行分类
					this.brand = result.data.brand_list
					//商品第二行分类
					this.attr = result.data.attr

					for(let k=0;k<result.data.attr.length;k++){
						this.krr[k]=[];
						this.num1[k] = 0;
					}
					//通过第一页的数据比较
					if (result.data.goods_list.length < 32) {
						this.flag = false
					}
					//商品信息
					this.Goods = [...this.Goods, ...result.data.goods_list]

					//把Goods里的goods_id拼接起来，传给goods_ids	
					this.getgoodsids()
				} else {
					uni.showToast({						
						title: '没有更多数据了',
						image: '/static/icon/err.png',
						duration: 2000
					});
				}
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
			show1Tag(idx) {
				this.current = idx;
				this.flag1 = !this.flag1;			
			},
			addA(m,n) {
				this.krr[n].includes(m)?(this.krr[n] = this.krr[n].filter(item => item !== m)):(this.krr[n].push(m))
				this.num1[n] = this.krr[n].length;
				this.arr.includes(m)?(this.arr = this.arr.filter(item => item !== m)):(this.arr.push(m))
				this.currents=n;
				this.flag2 = false;				
			},
			addB(m) {
				this.brr.includes(m)?(this.brr = this.brr.filter(item => item !== m)):(this.brr.push(m))
				this.num=this.brr.length	
				this.flag3 = false;
			},
			reset() {
				this.arr.length=0;
				this.brr.length=0;
				this.a = '';
				this.b = '';
				this.num=0;
				this.num1.forEach((item,idx)=>this.num1[idx]=0)
				this.minvalue='';
				this.maxvalue='';
				this.Goods.length=0;
				this.getgoodList();
				this.flag2 = true;
				this.flag3 = true;
			},
			//确定按钮
			sure() {
				this.arr.forEach(item => this.a = item + '^' + this.a)
				this.brr.forEach(item => this.b = item + '^' + this.b)
				this.pn=this.minvalue;
				this.px=this.maxvalue;
				this.Goods.length=0;
				this.getgoodList();
				this.$refs.showRight.close();
				this.selectAllComponents(".item").map((item)=>{
					item.toggle(false)
				})

			},
			//销量
			currentClick(k) {
				this.flage = !this.flage;
				this.psort = 6
				this.Goods.length=0;
				this.getgoodList();
			},
			open() {

			},
			//全部和最新
			menu(value1) {
				// this.value1=this.value1==0?1:0
				if (this.value1 == 0) {
					this.value1 = 1;
					this.psort = 4
				} else {
					this.value1 = 0;
					this.psort = 0
				}
				this.Goods = [];
				this.getgoodList();

			},
			//价格升降序
			bottomClick(k) {
				k==1 ? this.psort=1:this.psort=2;
				this.Goods.length=0;
				this.price.length=0;
				this.goods_ids = '';
				this.getgoodList();
			},
			//最小
			onminPrice(e){
				this.minvalue=e.detail.value
				console.log(e,e.detail.value);
			},

			onmaxPrice(e){
				this.maxvalue=e.detail.value
				console.log(e,e.detail.value);
			},
			//设置标题栏
			setTitle(name){
				uni.setNavigationBarTitle({
				    title: '【'+name+'】'+name+'品牌_'+name+'价格_'+name+'图片-佐罗优选超值热卖'
				});
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
		async onLoad(options) {
			console.log(options);
			this.num1.length=0;
			(options.name && (!options.pinyin)) ? this.value = options.name: this.value
			if (options.name && !options.v && !options.pinyin) {
				this.setTitle(options.name)
				let result = await requestGet(`/api/api/search/?v=1&keywords=${options.name }`)
				this.Goods = result.data.goods_list
				//把Goods里的goods_id拼接起来，传给goods_ids
				this.getgoodsids()
			}
			if (options.name && options.v) {
				this.setTitle(options.name)
				let result = await requestGet(`/api/api/search/?v=${options.v}&b=${options.b}`);
				console.log(result,"xxxxxxxxxxx111111")
				this.Goods = result.data.goods_list
				//把Goods里的goods_id拼接起来，传给goods_ids
				this.getgoodsids()
			} else if (options.chinese&&options.pinyin) {
				this.type = options.pinyin;
				this.value = options.chinese;
				this.setTitle(options.chinese)
				this.getgoodList();
			}else if(options.chinese&&!options.pinyin){
				this.value = options.chinese;
			}
			else if(options.keywords){
				this.value = options.keywords
				this.setTitle(options.keywords)
				let result = await requestGet("/api/api/search/?v=1&keywords="+options.keywords+"&XcxSessKey=%20&company_id=7194")
				this.Goods=result.data.goods_list
				this.getgoodsids()

			}
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

			.jiaobiao {
				position: absolute;
				top: 0;
				right: -60rpx;
			}

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

								.button-hover {
									border-color: 1px solid #af2e14;
									color: #af2e14;
								}

								.active {
									background-color: #af2e14;
									color: #af2e14;
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


					.van-dropdown-menu {
						width: 100%;
						max-height: 50px;
						line-height: 50px;
						overflow: hidden;
						display: block;

						.van-dropdown-menu__item {
							display: inline-block;
							background-color: #eee;
							width: 23%;
							height: 30px;
							line-height: 30px;
							color: #666;
							border-radius: 5%;
							margin-left: 5px;
							margin-top: 10px;
							position: relative;

							.van-dropdown-menu__title {
								line-height: 30px;
								font-size: 14px;

								&:after {
									right: 10px;
									font-size: 8px
								}
							}
						}
					}



					.title {
						display: flex;
						float: left;
						width: 50%;
						height: 40px;

						.name {
							width: 78%;
							margin-left: 10px;
							font-size: 14px;
						}

						.icons {
							width: 20%;
							text-align: center;
					
						}

						.actives {
							display: block;

						}


					}

					.set {
						width: 100%;
						height: 40px;
						display: flex;
						justify-content: space-around;

						.reset {
							flex: 2;
							height: 40px;
							
						}

						.sure {
							flex: 2;
							height: 40px;
							
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
