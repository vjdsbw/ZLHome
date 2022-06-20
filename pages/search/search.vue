<template>

	<view class="search">
		<view class="header">
			<view class="text-search">
				<uni-icons class="iconfont" custom-prefix="iconfont" type="icon-sousuo" size="20"></uni-icons>
				<input class="search-input" @confirm="search"  @input="onKeyInput" placeholder="输入商品分类、名称" :value="value"/>
			</view>
			<view class="header-right" @click="search">搜索</view>
		</view>
		<view class="hot">
			<view class="hot-search">
				热门搜索
			</view>
			<view class="hot-list">
				<view class="text" @click="GoGoodList('chuang','床')">床</view>
				<view class="text" @click="GoGoodList('chuangdian','床垫')">床垫</view>
				<view class="text" @click="GoGoodList('canzhuo','餐桌')">餐桌</view>
				<view class="text" @click="GoGoodList('shafa','沙发')">沙发</view>
				<view class="text" @click="GoGoodList('yigui','衣柜')">衣柜</view>
			</view>			
		</view>
		<view class="history">
			<view class="history-search">
				历史搜索
				<uni-icons @click="clean" class="trash" type="trash" size="20"></uni-icons>
			</view>
			<view class="item" v-for="(item,indx) in searchlist" :key="item.idx">
				{{item}}

			</view>
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
				searchlist: [],
				keywords: '',
				category_list: [],
				type: '',
				value:""
			}
		},
		onLoad(options){
			this.value = options.value
		},
		methods: {
			onKeyInput: function(event) {
				this.keywords = event.detail.value
			},
			clean() {
				this.searchlist = [];
				this.keywords = '';
			},	
			//搜索框功能的实现
			async search() {
				let result = await requestGet(`/api/api/search?keywords=` + this.keywords);	
				this.category_list = result.data.category_list;
				for (let i = 0; i < this.category_list.length; i++) {
					if (this.category_list[i].keywords.match(this.keywords)) {
						this.type = this.category_list[i].pinyin;
					} else {
						for (let j = 0; j < this.category_list[i].item.length; j++) {
							if (this.category_list[i].item[j].keywords.match(this.keywords)) {
								this.type = this.category_list[i].item[j].pinyin
							}
						}
					}
				}
				this.GoGoodList(this.type,this.keywords);
				this.searchlist.push(this.keywords);
			},
			GoGoodList(pinyin,chinese){
		
				uni.navigateTo({
					url: `/pages/good/good?pinyin=${pinyin}&chinese=${chinese}`,
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.search {
		.header {
			height: 50px;
			border-bottom: 1px solid lightgrey;
			background-color: white;
			position: relative;

			.text-search {
				height: 30px;
				line-height: 30px;
				width: 300px;
				position: absolute;
				left: 20px;
				top: 10px;
				border-radius: 30px;
				background-color: #f0f0f0;

				.iconfont {
					float: left;
					margin-left: 10px;
				}

				.search-input {
					margin-top: 3px;
				}
			}

			.header-right {
				position: absolute;
				font-weight: 500;
				left: 330px;
				top: 13px;
			}
		}
		.hot{
			height: 150px;
			border-bottom: 1px solid lightgrey;
			background-color: white;
			margin-top: 3px;
			position: relative;
			.hot-search{
				font-weight: 600;
				padding-left: 15px;
				padding-right: 15px;
				height: 35px;
				line-height: 35px;
				
			}
			.hot-list{
				margin-left: 10px;
				.text{
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					margin:5px 10px ;
					padding: 0 auto;
					background-color: #f0f0f0;
					float: left;
				}
			}
			
		}
		.history {
			margin-top: 10px;
			background-color: white;

			.history-search {
				padding-left: 15px;
				padding-right: 15px;
				height: 35px;
				line-height: 35px;

				.trash {
					float: right;
				}
			}

			.item {
				height: 35px;
				line-height: 35px;
				padding-left: 15px;
				border-top: 1px solid lightgray;
			}
		}
	}

</style>


