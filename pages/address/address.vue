<template>
	<view class="container">
		<scroll-view class="address" scroll-y="true">
			<view class="info">
				<uni-forms border>
					<uni-forms-item label="收货人">
						<uni-easyinput :inputBorder="false" placeholder="必填"></uni-easyinput>
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
							<view class="picker">请选择：{{region[0]}} {{region[1]}} {{region[2]}}</view>
						</picker>
					</uni-forms-item>
					<uni-forms-item label="详细地址">
						<uni-easyinput :inputBorder="false" placeholder="必填"></uni-easyinput>
					</uni-forms-item>
				</uni-forms>
				<!-- 选择收货地址 -->
				<view class="add-address" @click="changeAddress">
					<uni-icons type="location-filled" size="30"></uni-icons>
					<view class="address-tip">选择收获地址</view>
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
			</view>
			<view class="tip">建议设置时间为: 2022-7-14 </view>

			<view class="price" :class="{active:flag}">
				<view class="good-price">商品总金额</view>
				<view class="extra-price">运费</view>
				<view class="extra-price">易碎品费</view>
			</view>

			<!-- <van-action-sheet show="{{ show }}" title="标题" >
				<view>内容</view>
			</van-action-sheet> -->

			<view>
				<button @click="open">打开弹窗</button>
				<uni-popup ref="popup" type="bottom"  background-color="#fff">底部弹出 Popup</uni-popup>
			</view>

		</scroll-view>
	</view>
</template>


<script>
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
			}
		},
		onLoad() {
			this.bindRegionChange()
		},
		methods: {
			bindRegionChange(event) {
				// console.log(event.detail.value)
				this.region = event.detail.value
				console.log(this.region)
			},
			changeAddress() {

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
			}
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
				height: 80px;
				border-left: 1px solid #eee;
				position: relative;
				top: -270px;
				left: 270px;
				background-color: #fff;

				.address-tip {
					color: #666;
					font-size: 14px;
					margin-top: 5px;
					text-align: center;
				}

				/deep/.uni-icons {
					text-align: center;
					margin-left: 33px
				}
			}

			.picker {
				line-height: 38px;
				color: #333;
				font-size: 14px;
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
