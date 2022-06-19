<template>
	<view class="container">
		<scroll-view class="address" scroll-y="true">
			<view class="info">
				<uni-forms border>
					<uni-forms-item label="收货人">
						<uni-easyinput :inputBorder="false" v placeholder="必填"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="手机号码">
						<uni-easyinput :inputBorder="false" placeholder="必填"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="备用号码">
						<uni-easyinput :inputBorder="false" placeholder=""></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="所在地区">
						<picker mode="region" @change="bindRegionChange" value="{{region}}"
							custom-item="{{customItem}}">
							<!-- <uni-easyinput :inputBorder="false" placeholder="请选择"></uni-easyinput> -->
							<view class="picker">{{show2}}{{region[0]}} {{region[1]}} {{region[2]}}
								<uni-icons type="right" size="20"></uni-icons>
							</view>
						</picker>
					</uni-forms-item>
					<uni-forms-item label="详细地址">
						<uni-easyinput :inputBorder="false" placeholder="必填"></uni-easyinput>
					</uni-forms-item>
				</uni-forms>
				<!-- 选择收货地址 -->
				<view class="add-address">
					<button @click="open" class="address">
						<uni-icons type="location-filled" size="30"></uni-icons>
						<view class="address-tip">选择收获地址</view>
					</button>

					<uni-popup ref="popup" type="bottom" background-color="#fff">
						<view class="addbox">
							<view class="add">选择收获地址
								<uni-icons type="closeempty" size="30" @click="close"></uni-icons>
							</view>
							<button class="newadd" @click="goAddress">创建新地址</button>
						</view>
					</uni-popup>
				</view>
			</view>
			<view>-----------------------------------------</view>
			<view class="delivery">
				配送方式
				<uni-tag text="佐罗优选指定物流" :inverted="inverted" type="error" :circle="true" @click="setInverted" />
				<uni-tag text="本店合作物流" :inverted="!inverted" type="error" :circle="true" @click="setInver" />
				<view class="deli">
					指定物流费用更省,售后服务更好,官方保障,收货请及时检查!
				</view>
			</view>

			<!-- 所购买的商品 -->
			<view class="goods">
				商品占位
			</view>

			<view class="changetime">
				<view class="good-time">期望发货时间</view>
				<uni-datetime-picker type="date" :clear-icon="false" v-model="single" :border="false"
					@maskClick="maskClick" />
				<view class="icon">
					<uni-icons type="right" size="20"></uni-icons>
				</view>
			</view>
			<view class="tip">建议设置时间为: 2022-7-14 </view>

			<view class="price" :class="{active:flag}">
				<view class="good-price">商品总金额</view>
				<view class="extra-price">运费</view>
				<view class="extra-price">易碎品费</view>
			</view>

		</scroll-view>
	</view>
</template>


<script>
	import {
		requestGet,
		requestPost,
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				customItem: "全部",
				region: [],
				single: '',
				type: "default",
				inverted: false,
				flag: false,
				show: false,
				show2: '请选择',
				
			}
		},
		onLoad(options) {
			this.checkout(options.cart_id)
		},
		methods: {
			async checkout(id){	
				console.log(id,"ggggggggggggggggggg");
				let result = await requestPost("/api/api/flow/check_out",{
					"cart_id":id,
					"company_id":7194,
				})
				console.log(result,"111111111111111111111");
			},
			bindRegionChange(event) {
				// console.log(event.detail.value)
				this.region = event.detail.value
				this.show2 = ''
				console.log(this.region)
			},
			change(e) {
				this.single = e;
				console.log("-change事件:", e);
			},
			setInverted() {
				this.inverted = !this.inverted;
				this.flag = false;
			},
			setInver() {
				this.inverted = !this.inverted;
				this.flag = true;
			},
			onClose(e) {
				console.log(e)
			},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			},
			goAddress() {
				this.close()
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background-color: #fff;

		.info {
			height: 280px;

			.add-address {
				width: 100px;
				height: 103px;
				// border-left: 1px solid #eee;
				position: relative;
				top: -280px;
				left: 270px;
				background-color: #fff;

				.address {
					padding-left: 0px;
					padding-right: 0px;
					background-color: #fff;
					border-radius: 0px;
					font-size: 14px;
					color: #666;
					line-height: 2.0;

					.address-tip {
						color: #666;
						font-size: 14px;
						text-align: center;
						padding-bottom: 15px;
					}

					/deep/.uni-icons {
						text-align: center;
						margin-left: 8px
					}
				}

				.addbox {
					height: 300px;

					.add {
						text-align: center;
						letter-spacing: 2px;
						font-size: 18px;
						font-weight: bold;
						color: #333;
						border-bottom: 1px solid #eee;
						padding-bottom: 10px;
						padding-top: 5px;

						/deep/.uni-icons {
							position: relative;
							top: 5px;
							left: 90px;
						}
					}

					.newadd {
						width: 350px;
						height: 36px;
						margin-top: 200px;
						background-color: #fff;
						border-radius: 18px;
						color: red;
						border: 1px solid red;
						font-size: 14px;
						text-align: center;
						letter-spacing: 2px;
					}
				}

			}

			.picker {
				line-height: 38px;
				color: #333;
				font-size: 14px;

				/deep/.uni-icons {
					position: relative;
					left: 220px;
					top: 3px;
				}
			}
		}
		.deli {
			color: #666;
			font-size: 12px;
			margin-top: 15px;
			border-bottom: 1px solid #aaa;
			padding-bottom: 15px;
		}

		/deep/.uni-tag {
			margin-right: 5px;
		}

		.changetime {
			margin-top: 10px;
			border-top: 5px solid #eee;
			display: flex;

			.good-time {
				color: #333;
				font-size: 14px;
				margin-right: 15px;
				height: 42px;
				line-height: 42px;
			}

			.icon {
				/deep/.uni-icons {
					position: relative;
					top: 10px;
					left: 23px;
				}
			}
		}

		.tip {
			color: #666;
			font-size: 12px;
			height: 20px;
			line-height: 20px;
			background-color: #eee;
		}

		.active {
			height: 35px;
			overflow: hidden;
		}

		.price {
			.good-price {
				color: #333;
				font-size: 14px;
				margin-top: 15px;
			}

			.extra-price {
				margin-top: 10px;
				color: #333;
				font-size: 14px;
			}
		}

	}
</style>
