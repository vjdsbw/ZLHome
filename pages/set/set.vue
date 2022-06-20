<template>
	<view class="set">
		<view class="info">
			<view class="username">
				{{username}}
			</view>
			<view class="username2">
				用户名：{{username2}}
			</view>
		</view>
		<view class="address" @click="goAddress">
			收获地址
			<uni-icons class="right" type="right" size="20"></uni-icons>
		</view>
		<view class="button" @click="Out">
			退出登录
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
				username: "",
				username2:'',
			}
		},
		onShow() {
			this.info()
		},
		methods: {
			info() {
				let result = uni.getStorageSync('user');
				result.alias?this.username=result.alias:this.username=reult.user_name
				this.username2 =result.user_name;
			},
			async Out() {
				let result = await requestPost("/api/api/logout");
				if ((result.error === 0)) {
					uni.removeStorageSync('user');
					uni.removeStorageSync('cookie');
					uni.showToast({
						title: `退出登录`
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}, 2000)
				}
			},
			goAddress() {
				uni.navigateTo({
					url: '/pages/address/address',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.set {
		.info {
			background-color: white;
			border-bottom: 1px solid lightgray;	
			.username {
				margin-left: 40px;
				width: 180px;
				font-size: 20px;
				padding-right: 40px;
				padding-top: 10px;
				box-sizing: border-box;
			}
			.username2 {
				margin-left: 40px;
				font-size: 15px;
			}
		}
		.address {
			background-color: white;
			position: relative;
			height: 50px;
			line-height: 50px;
			padding-left: 10px;
			.right {
				position: absolute;
				left: 350px
			}
		}
		.button{
			height: 50px;
			line-height: 50px;
			margin-top: 20px;
			padding-left: 145px;
			background-color: white;
		}
	}
</style>
