<template>
	<view class="me">
		<view class="herder">
			<view class="portrait">
				<uni-file-picker disable-preview :del-icon="false" return-type="object">
					<image src="@/static/icon/me-active.png"></image>
				</uni-file-picker>		
			</view>			
			<view class="login" @click="gologin">{{username}}</view>
			<uni-icons @click="goSet" class="set" type="gear-filled" size="30" color="white"></uni-icons>
		</view>
		<view class="body">
			<view class="order">
				<uni-icons class="icon" custom-prefix="iconfont" type="icon-ziwopingjia" size="20"></uni-icons>
				客户订单
				<uni-icons class="right" type="right" size="20"></uni-icons>
			</view>
			<view class="shoucang">
				<uni-icons class="icon" custom-prefix="iconfont" type="icon-shoucang" size="20"></uni-icons>
				我的收藏
				<uni-icons class="right" type="right" size="20"></uni-icons>
			</view>
			<view class="pingjia">
				<uni-icons class="icon" custom-prefix="iconfont" type="icon-ziwopingjia" size="20"></uni-icons>
				评价晒单
				<uni-icons class="right" type="right" size="20"></uni-icons>
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
				username: "",
				imageValue: [],
				imageStyles: {
					border: {
						radius: '50%'
					}
				},
			}
		},
		created() {
			this.show()
		},
		onShow() {
			this.show()
		},
		methods: {
			gologin() {
				let result = uni.getStorageSync('user')
				if (result) {
					uni.navigateTo({
						url: '/pages/useredit/useredit',
					});
				} else {
					uni.navigateTo({
						url: '/pages/login/login',
					});
				}
			},
			show() {
				let result = uni.getStorageSync('user')
				if (result) {
					this.username = result.user_name;
				} else {
					this.username = '点击登录'
				}
			},
			goSet() {
				let result = uni.getStorageSync('user')
				if (result) {
					uni.navigateTo({
						url: '/pages/set/set',
					});
				} else {
					uni.navigateTo({
						url: '/pages/login/login',
					});
				}

			}
		}
	}
</script>

<style scoped lang="less">
	.file-picker__box-content{
		width: 200px;
		height: 200px;
	}
	.me {
		/deep/.herder {
			width: 100vh;
			height: 300rpx;
			background-color: red;
			position: relative;

			.portrait {
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				left: 50rpx;
				top: 50rpx;
				background-color: gainsboro;
				box-sizing: border-box;
				border-radius: 50% 50%;

				image {
					width: 100rpx;
					height: 100rpx;
					margin: 25px 25px;
					background-size: 100% 100%;
				}
			}

			.login {
				font-size: 20px;
				color: white;
				text-decoration: underline;
				position: absolute;
				top: 60px;
				left: 130px;
			}

			.set {
				position: absolute;
				top: 10px;
				left: 330px;
			}
		}

		.body {
			margin-top: 10px;
			background-color: white;

			.order {
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid lightgray;
				position: relative;

				.icon {
					padding: 6px;
				}

				.right {
					position: absolute;
					left: 350px
				}
			}

			.shoucang {
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid lightgray;
				position: relative;

				.icon {
					padding: 6px;
				}

				.right {
					position: absolute;
					left: 350px
				}
			}

			.pingjia {
				height: 50px;
				line-height: 50px;
				position: relative;

				.icon {
					padding: 6px;
				}

				.right {
					position: absolute;
					left: 350px
				}
			}
		}

	}
</style>
