<template>
	<view class="login">
		<view class="loginhome">
			<view class="youxuan">
				优选
			</view>
			<view class="home">
				Home
			</view>
		</view>
		<uni-section>
			<view class="example">
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item required name="username">
						<uni-easyinput v-model="customFormData.username" placeholder="请输入手机号码" />
					</uni-forms-item>
					<uni-forms-item required name="password">
						<uni-easyinput type="password" v-model="customFormData.password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<view class="button">
					<button type="primary" @click="submit('customForm')">登录</button>
				</view>

			</view>
		</uni-section>
	</view>
</template>

<script>
	import {
		requestGet,
		requestPost,
		requestPostLogin
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				customFormData: {
					username: '',
					password: '',
				},
				customRules: {
					username: {
						rules: [{
							pattern: '^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$',
							errorMessage: '请输入正确的手机号'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					},
				}
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					this.login();
				}).catch(err => {
					console.log('err', err);
				})
			},
			async login() {
				let result = await requestPostLogin("/api/api/ajax_login", {
					"username": this.customFormData.username,
					"password": this.customFormData.password
				});
				console.log(result);
				let result2= await requestPost("/api/getUserRole");
				if (result.error === 0) {
					uni.setStorageSync('user', result2.data)
					uni.showToast({
						title: `登录成功`
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 2000)
				} else {
					uni.showToast({
						title: result.message
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.login {
		position: relative;
		/deep/.example {
			.button {
				width: 347px;
				height: 46px;
				padding: 0px !important;
				margin-left: 15px;
			}
		}
		.loginhome{
			margin-left: 130px;
			.youxuan {
				margin-left: 15px;
				font-size: 40px;
			}
			
			.home {
				font-size: 40px;
			}
		}		
	}
</style>
