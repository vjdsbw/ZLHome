<template>

	<view class="me">
		<view class="herder">

			<view class="portrait" @click="judget">
				<image v-if="neverchange == true" src="@/static/icon/me.png" mode=""></image>
				<image v-else :src="imgpath"></image>
			</view>
			<view class="login" @click="gologin">{{username}}</view>
			<uni-icons @click="goSet" class="set" type="gear-filled" size="30" color="white"></uni-icons>
		</view>
		<view class="body">
			<view class="order" @click="goOrder">
				<uni-icons class="icon" custom-prefix="iconfont" type="icon-ziwopingjia" size="20"></uni-icons>
				客户订单
				<uni-icons class="right" type="right" size="20"></uni-icons>
			</view>
			<view class="shoucang" @click="goCollection">
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
				neverchange: true,
				imgpath: ""
			}
		},
		created() {
			this.show()
		},
		updated() {
			let result = uni.getStorageSync('user');
			if(result){
				let result1 = uni.getStorageSync(`img${result.user_id}`);
				if (result1) {
					this.imgpath = result1
					this.neverchange = false
				}
			} else {
				this.imgpath = ""
				this.neverchange = true
			}

		},
		onShow() {
			this.show()
		},
		methods: {
			judget() {
				let result = uni.getStorageSync('user');
				if (result) {
					this.changeImage()
				} else {
					uni.navigateTo({
						url: '/pages/login/login',
					});
				}
			},
			changeImage() {
				// 调用下面的函数时会丢失this，这里保存当前的this
				var _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album'],
					success: function(res) {
						let result = uni.getStorageSync('user');
						_this.neverchange = "false";
						_this.imgpath = res.tempFilePaths[0];
						uni.setStorageSync(`img${result.user_id}`, _this.imgpath)
					}
				})
			},
			gologin() {
				let result = uni.getStorageSync('user')
				if (result) {
					uni.navigateTo({
						url: '/pages/useredit/useredit',
					});
				} else {
					this.imgpath = "";
					this.neverchange = true
					uni.navigateTo({
						url: '/pages/login/login',
					});
				}
			},
			show() {
				let result = uni.getStorageSync('user')
				result?(result.alias?this.username=result.alias:this.username=reult.user_name):this.username='请先登录'				
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
			},
			goOrder() {
				let result = uni.getStorageSync('user')
				if (result) {
					uni.navigateTo({
						url: '/pages/order/order',
					});
				} else {
					uni.showToast({
						title: '请先登录',
						image:'/static/icon/err.png',
						duration: 2000
					});
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login',
						})
					}, 2000)
				}

			},
			goCollection(){
				let result = uni.getStorageSync('user')
				if (result) {
					uni.navigateTo({
						url: '/pages/mycollection/mycollection',
					});
				} else {
					uni.showToast({
						title: '请先登录',
						image:'/static/icon/err.png',
						duration: 2000
					});
					setTimeout(()=>{
						uni.navigateTo({
							url: '/pages/login/login',
						})
					},2000)					
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.file-picker__box-content {
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
					width: 100%;
					border-radius: 50% 50%;
					height: 100%;
					position: absolute;
					left: -50rpx;
					top: -50rpx;
					object-fit: cover;
				}
			}

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
</style>
