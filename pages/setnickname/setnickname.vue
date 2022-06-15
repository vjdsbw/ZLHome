<template>
	<view class="setnickname">
		<view class="set-name">
				<input class="search-input" @input="onKeyInput" :value='keywords'/>
		</view>
		<view class="button" @click="edit">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords: '',
			}
		},
		created() {
			this.show()
		},
		methods: {
			show(){
				this.keywords = uni.getStorageSync('user').user_name;
			},
			onKeyInput: function(event) {
				this.keywords = event.detail.value
			},
			edit(){
				let result = uni.getStorageSync('user');
				result.user_name=this.keywords;
				uni.setStorageSync('user', result);	
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.set-name {
		height: 50px;
		line-height: 50px;
		padding-left: 10px;
		background-color: white;
		.search-input{
			padding-top: 15px;
		}
	}
	.button{
			height: 50px;
			width: 320px;
			line-height: 50px;
			text-align: center;
			background-color: red;
			margin:30px 20px;
	}
</style>
