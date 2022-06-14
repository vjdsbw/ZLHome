<template>
	<view class="ld">
		<view class="left">
			<view v-for="(item,index) in list" :key="index" :class="{active:currentIndex==index}"
				@click="changeactive(index)">{{item.title}}</view>
		</view>
		<view class="right">
			<scroll-view scroll-y="true" style="height: 200px;" :scroll-into-view="doms" scroll-with-animation
				@scroll="scrolls" @scrolltolower="scrolltolower">
				<view v-for="(items,index) in list" :key="index" :id="'po'+index" class="title">
					<view class="titlecolor">{{items.title}}</view>
					<view v-for="(it,index) in items.list" :key="index">{{it}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				list: [{
						title: "中餐",
						list: ['盖饭', '扒饭', '鸡骨头', '鸡肉']
					},
					{
						title: "西餐",
						list: ['牛排', '羊排', '鸡排', '猪排']
					},
					{
						title: "南餐",
						list: ['胡萝卜', '青椒', '炒鸡蛋', '西虹市']
					},
					{
						title: "北餐",
						list: ['锅包肉', '肉包', '杀猪菜', '血肠']
					}
				],
				currentIndex: 0,
				doms: '',
				topList: []
			}
		},
		onLoad() {

		},
		onReady() {
			this.getNodesInfo()
		},
		methods: {
			scrolltolower() {
				setTimeout(() => {
					this.currentIndex = 3
				}, 80)
			},
			scrolls(e) {
				let scrollTop = e.target.scrollTop
				for (let i = 0; i < this.topList.length; i++) {
					// console.log(this.topList.length)
					let h1 = this.topList[i]
					let h2 = this.topList[i + 1]
					if (scrollTop >= h1 && scrollTop < h2) {
						this.currentIndex = i
					}
				}
			},
			getNodesInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.title').boundingClientRect().exec((res) => {
					let nodes = res[0]
					let rel = [];
					nodes.map(item => {
						rel.push(item.top)
					})
					this.topList = rel
				})
			},
			changeactive(index) {
				this.currentIndex = index
				this.doms = 'po' + index
			}
		}
	}
</script>

<style lang="less">
	.ld {
		display: flex;

		.left {
			width: 100px;
			border: 1px solid red;
		}

		.right {
			flex: 1;
		}
	}

	.active {
		background-color: #007aff;
	}

	.titlecolor {
		background-color: red;
	}
</style>
