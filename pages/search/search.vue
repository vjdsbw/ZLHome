<template>
	<view>
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<input class="uni-input" @input="onKeyInput" placeholder="输入品牌或产品型号" />
				<button class="searchbar" @click="search">搜索</button>
	
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
				keywords: '',
				category_list: [],
				type: '',
				info: [],
				current: 0,
				mode: 'round',
				bed: [],
				goodsthing: [],
				newbrands: []
			}
		},
		methods: {
			onKeyInput: function(event) {
				this.keywords = event.detail.value
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
				let result2 = await requestGet(`/api/api/category-` + this.type +
					`v=1&XcxSessKey=%20&company_id=7194`);
					console.log(result2);
			}
		}
	}
</script>

<style>

</style>
