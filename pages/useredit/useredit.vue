<template>
	<view class="useredit">
		<view class="picture">
			头像上传
		
			<uni-icons class="right" type="right" size="20"></uni-icons>
		</view>
		<view class="nickname" @click="gosetnickname">
			昵称			
			<uni-icons class="right" type="right" size="20"></uni-icons>
			<view class="name">
				{{username}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:""
			}
		},
		onShow() {
			this.showname()
		},
		methods: {
			showname(){
				let result = uni.getStorageSync('user')
				this.username = result.alias;
			},
			gosetnickname(){
				uni.navigateTo({
					url: '/pages/setnickname/setnickname'
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.useredit {
		.picture {			
			height: 70px;
			line-height: 70px;
			padding-left: 10px;
			background-color: white;
			border-bottom: 1px solid #cbcbcb;
			.right{
				float: right;
				padding-right: 10px;
			}
		}
		.nickname{
			height: 50px;
			line-height: 50px;
			padding-left: 10px;
			background-color: white;
			.name{
				float: right;
			}
			.right{
				float: right;
				padding-right: 10px;
			}
		}
	}
</style>
