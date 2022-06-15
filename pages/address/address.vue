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
							<view class="picker">请选择:{{region[0]}}，{{region[1]}}，{{region[2]}}</view>
						</picker>
					</uni-forms-item>
					<uni-forms-item label="详细地址">
						<uni-easyinput :inputBorder="false" placeholder="必填"></uni-easyinput>
					</uni-forms-item>
				</uni-forms>
			</view>
			<view>-----------------------------------------</view>
			<view class="delivery">
				配送方式
				<uni-tag text="佐罗优选指定物流" inverted type="error" :circle="true" @click="bindClick" class="uni"></uni-tag>
				<uni-tag text="本店合作物流" inverted circle="true" @click="bindClick"></uni-tag>
				<view class="deli">
					指定物流费用更省,售后服务更好,官方保障,收货请及时检查!
				</view>
			</view>

			<!-- 所购买的商品 -->
			<view class="goods">
				商品占位
			</view>

			<!-- <uni-section :title="'期望发货时间：' + single" type="line"></uni-section> -->
			<view class="changetime">
				<view class="good-time">期望发货时间</view>
				<uni-datetime-picker type="date" :clear-icon="false" v-model="single" :border="false"
					@maskClick="maskClick" />
			</view>
			<view class="tip">建议设置时间为: 2022-7-14 </view>
			
			<view class="price">
				<view class="good-price">商品总金额</view>
				<view class="extra-price">运费</view>
				<view class="extra-price">易碎品费</view>
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
			bindClick(){
				
			},
			change(e) {
				this.single = e;
				console.log("-change事件:", e);
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background-color: #fff;

		.deli {
			color: #666;
			font-size: 12px;
			margin-top: 15px;
			border-bottom: 1px solid #aaa;
			padding-bottom: 15px;
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
		.price{
			.good-price{
				color: #333;
				font-size: 14px;
				margin-top: 15px;
			}
			.extra-price{
				margin-top: 10px;
				color: #333;
				font-size: 14px;
			}
		}

	}
</style>
