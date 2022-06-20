<template>
	<view class="container">
		<scroll-view class="address" scroll-y="true">
			<view class="info" v-if="addressList?isAddress:isShow">
				<uni-forms border ref="form" :modelValue="formData">
					<uni-forms-item label="收货人" required name="name">
						<uni-easyinput :inputBorder="false" placeholder="必填" v-model="formData.name"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="手机号码" required name="phone">
						<uni-easyinput :inputBorder="false" placeholder="必填" v-model="formData.phone"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="备用号码" name="bphone">
						<uni-easyinput :inputBorder="false" v-model="formData.bphone"></uni-easyinput>
					</uni-forms-item>
					<!-- value="{{region}}"  -->
					<uni-forms-item label="所在地区" name="region">
						<picker mode="region" @change="bindRegionChange" value="{{region}}"

							custom-item="{{customItem}}">
							<view class="picker">{{show2}}{{region}}
								<uni-icons type="right" size="20"></uni-icons>
							</view>
						</picker>
					</uni-forms-item>

					<uni-forms-item label="详细地址" name="address" >
						<uni-easyinput :inputBorder="false" placeholder="必填" v-model="formData.address"></uni-easyinput>

					</uni-forms-item>
				</uni-forms>
				<!-- 选择收货地址 -->
				<view class="add-address">
					<button @click="open" class="address">
						<uni-icons type="location-filled" size="30"></uni-icons>
						<view class="address-tip">选择收获地址</view>
					</button>

				</view>
			</view>
			<!-- 收获地址 -->
			<uni-popup ref="popup" type="bottom" background-color="#fff">
				<scroll-view scroll-y="true">
					<view class="addbox">
						<view class="add">选择收获地址
							<uni-icons type="closeempty" size="30" @click="close"></uni-icons>
						</view>
						<!--  -->
						<view class="address" v-for=" (item,index) in addressList" :key="item.id">
							<view @click="address(item.id)">
								<view class="towAdd">
									<view class="addName">{{item.name}}</view>
									<view class="addPhone">{{item.phone}}</view>
								</view>
								<view class="addAddress">
									{{item.region}}{{item.address}}
								</view>
							</view>

							<view class="checkbox" v-show="noShow">
								<uni-data-checkbox v-model="value" :localdata="range">
								</uni-data-checkbox>
								<view class="icon">
									<uni-icons type="compose" size="22" @click="exitAddress(item.id)"></uni-icons>
									<uni-icons type="trash" size="22" @click="deleteAddress(item.id)"></uni-icons>
								</view>

							</view>


						</view>
						<button class="newadd" @click="goAddress">创建新地址</button>
					</view>
				</scroll-view>
			</uni-popup>


			<!-- 已有收货地址 -->
			<view class="isAddress" v-if="addressList?isShow:isAddress" @click="addr">
				<view class="address">
					<view class="towAdd">
						<view class="addName">{{addressList[0].name}}</view>
						<view class="addPhone">{{addressList[0].phone}}</view>
					</view>
					<view class="addAddress">
						{{addressList[0].region}}{{addressList[0].address}}
						<text class="bPhone"
							v-show="addressList[0].bphone?isflag:noflag">备用电话：{{addressList[0].bphone}}</text>
					</view>
				</view>
			</view>

			<!-- 修改地址 -->
			<uni-popup ref="exit" type="bottom" background-color="#eee">
				<view class="box">
					<view class="add">
						<uni-icons type="closeempty" size="18" @click="addClose"></uni-icons>
						选择收获地址
						<view class="save" @click="save">保存</view>
					</view>
					<view class="exitInfo">
						<uni-forms border ref="form" :modelValue="formData">
							<uni-forms-item label="收货人" required name="name">
								<uni-easyinput :inputBorder="false" v-model="formData.name">
								</uni-easyinput>
							</uni-forms-item>
							<uni-forms-item label="手机号码" required name="phone">
								<uni-easyinput :inputBorder="false" v-model="formData.phone">
								</uni-easyinput>
							</uni-forms-item>
							<uni-forms-item label="备用号码" name="bphone">
								<uni-easyinput :inputBorder="false" v-model="formData.bphone"></uni-easyinput>
							</uni-forms-item>
							<!-- value="{{region}}"  -->
							<uni-forms-item label="所在地区" name="region">
								<picker mode="region" @change="bindRegionChange" value="{{region}}"
									custom-item="{{customItem}}">
									<view class="picker">{{show2}}{{region}}
									</view>
								</picker>
							</uni-forms-item>
							<uni-forms-item label="详细地址" name="address">
								<uni-easyinput :inputBorder="false" v-model="formData.address">
								</uni-easyinput>
							</uni-forms-item>
						</uni-forms>
					</view>
					<view class="checkbox">
						<uni-data-checkbox v-model="value" :localdata="range">
						</uni-data-checkbox>
					</view>
					<view class="deleteAdderss" @click="deleteAddress">删除地址</view>
				</view>
			</uni-popup>
			<!-- 地址 -->
			<view>-----------------------------------------</view>
			<view class="delivery">
				配送方式
				<uni-tag text="佐罗优选指定物流" :inverted="inverted" type="error" :circle="true" @click="setInverted" />
				<uni-tag text="本店合作物流" :inverted="!inverted" type="error" :circle="true" @click="setInver" />
				<view class="deli">
					指定物流费用更省,售后服务更好,官方保障,收货请及时检查!
				</view>
			</view>

			<!-- 所购买的商品 -->
			<view class="goods">
				商品占位
			</view>

			<view class="changetime">
				<view class="good-time">期望发货时间</view>
				<uni-datetime-picker type="date" :clear-icon="false" v-model="single" :border="false"
					@maskClick="maskClick" />
				<view class="icon">
					<uni-icons type="right" size="20"></uni-icons>
				</view>
			</view>
			<view class="tip">建议设置时间为: 2022-7-14 </view>

			<view class="price" :class="{active:flag}">
				<view class="good-price">商品总金额</view>
				<view class="extra-price">运费</view>
				<view class="extra-price">易碎品费</view>
			</view>

		</scroll-view>
		<view class="button">

			<view class="sumbit">
				<button @click="submit">提交表单</button>
			</view>
			<view class="text">共{{num}}件，应付￥2990.00</view>

		</view>

	</view>
</template>


<script>
	import {
		requestGet,
		requestPost,
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				isflag: true,
				noflag: false,
				isAddress: true,
				isShow: false,
				noShow: true,
				// 加入的新地址列表
				formdataList: [],
				// stroage中拿的地址信息
				addressList: [],
				formData: {
					name: "",
					phone: "",
					bphone: "",
					address: "",
					region: ""
				},
				rules: {
					phone: {
						rules: [{
							required: true,
							errorMessage: '电话栏不能为空'
						}]
					}
				},
				value: "",
				range: [{
					"value": 0,
					"text": "设为默认地址"
				}],
				region: '',
				num: 1,
				customItem: "全部",
				single: '',
				type: "default",
				inverted: false,
				flag: false,
				show: false,
				show2: '请选择',
				// 表单数据
				formData: {
					consignee: '',
					tel: '',
					mobile: '',
					province: '',
					city:'',
					district:'',
				},

			}
		},
		onLoad(options) {
			this.formData.id = 'testId';
			this.checkout(options.cart_id)
		},
		created() {
			uni.getStorageSync('address') ? (this.addressList = uni.getStorageSync('address')) : (this.addressList = []);
			console.log(this.addressList, "aaaaaaaaaa");
			this.submit();

		},
		methods: {
			bindRegionChange(event) {
				console.log(event)
				this.region = event.detail.value[0] + event.detail.value[1] + event.detail.value[2]
				this.show2 = ''
				console.log(this.region)

			},
			change(e) {
				this.single = e;
				console.log("-change事件:", e);

			},
			setInverted() {
				this.inverted = !this.inverted;
				this.flag = false;
			},
			setInver() {
				this.inverted = !this.inverted;
				this.flag = true;
			},
			onClose(e) {
				console.log(e)
			},
			open() {
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			},
			goAddress() {
				this.close()
				this.isShow = false;
				this.isAddress = true;
				
			},
			//提交表单
			submit() {
				// this.$refs.form.validate().then(formData => {
				// 	console.log('表单数据信息：', formData);
				// }).catch(err => {
				// 	console.log('表单错误信息：', err);
				// })
				this.$refs.form.validate(["id"], (err, formData) => {
					if (!err) {
						console.log('success', formData)
					}
				})
				this.noShow = true;
				this.formdataList[this.formdataList.length+1].push({
					name: this.formData.name,
					phone: this.formData.phone,
					bphone: this.formData.bphone,
					address: this.formData.address,
					region: this.region,
					id: Date.now()
				})
				console.log(this.formdataList,"xxxxxxxxxxxxxxxxxxxxx")
				uni.setStorageSync('address', this.formdataList);
			},
			address() {
				this.isAddress = false;
				this.isShow = true;
			},
			addr() {
				this.$refs.popup.open();
			},
			//编辑地址
			exitAddress(id) {
				this.$refs.exit.open()
				if (this.addressList.length != 0) {
					var index = this.addressList.findIndex((item) => item.id == id)
					this.formData.name = this.addressList[index].name;
					this.formData.phone = this.addressList[index].phone;
					this.formData.bphone = this.addressList[index].bphone;
					this.formData.address = this.addressList[index].address;
					this.region = this.addressList[index].region
					this.show2 = ''
				}

			},
			//删除地址
			deleteAddress(id) {

				let newaddressList = this.addressList.filter(item => {
					return item.id != id
				})
				this.addressList = newaddressList;
			},
			//关闭修改地址
			addClose() {
				this.$refs.exit.close()
			},
			// 保存修改地址
			save() {
				this.$refs.exit.close();
				// this.submit()
			},
			async checkout(m){
				let result = await requestPost(`/api/api/flow/check_out?cart_id=`+m+`XcxSessKey=%20&company_id=7194`);
				console.log(result,"xxxxxxxxxxxxx");
			}

		}
	}
</script>

<style lang="less" scoped>
	.container {
		background-color: #fff;

		.info {
			height: 280px;

			.add-address {
				width: 100px;
				height: 103px;
				position: relative;
				top: -280px;
				left: 270px;
				background-color: #fff;

				.address {
					padding-left: 0px;
					padding-right: 0px;
					background-color: #fff;
					border-radius: 0px;
					font-size: 14px;
					color: #666;
					line-height: 2.0;

					.address-tip {
						color: #666;
						font-size: 14px;
						text-align: center;
						padding-bottom: 15px;
					}

					/deep/.uni-icons {
						text-align: center;
						margin-left: 8px
					}
				}



			}

			.picker {
				line-height: 38px;
				color: #333;
				font-size: 14px;

				/deep/.uni-icons {
					position: relative;
					left: 220px;
					top: 3px;
				}
			}
		}

		.addbox {
			height: 400px;

			.add {
				text-align: center;
				letter-spacing: 2px;
				font-size: 18px;
				font-weight: bold;
				color: #333;
				border-bottom: 1px solid #eee;
				padding-bottom: 10px;
				padding-top: 5px;

				/deep/.uni-icons {
					position: relative;
					top: 5px;
					left: 90px;
				}
			}

			.address {
				width: 95%;
				margin-left: 10px;
				border-bottom: #ddd 1px solid;

				.towAdd {
					height: 30px;
					width: 100%;

					.addName {
						height: 30px;
						float: left;
					}

					.addPhone {
						margin-left: 20px;
						height: 30px;
						float: left;
					}
				}

				/deep/.checkbox {
					width: 100%;
					height: 50px;
					line-height: 50px;
					position: relative;

					.checklist-box {
						margin-top: 20px;
					}

					.icon {
						height: 50px;
						position: absolute;
						top: 0;
						right: 0;

					}
				}
			}

			.newadd {
				width: 350px;
				height: 36px;
				margin-top: 200px;
				background-color: #fff;
				border-radius: 18px;
				color: red;
				border: 1px solid red;
				font-size: 14px;
				text-align: center;
				letter-spacing: 2px;
			}
		}

		.isAddress {
			width: 100%;

			.address {
				margin-left: 7px;
				width: 100%;

				.towAdd {
					width: 100%;
					height: 30px;
					line-height: 30px;
					font-size: 14px;

					.addName {
						height: 30px;
						float: left;
					}

					.addPhone {
						margin-left: 20px;
						height: 30px;
						float: left;
					}
				}

				.addAddress {
					margin-top: 10px;
					font-size: 12px;
				}
			}

		}

		.box {
			height: 604px;

			.add {
				width: 100%;
				height: 30px;
				text-align: center;
				letter-spacing: 2px;
				font-size: 18px;
				font-weight: bold;
				color: #333;
				border-bottom: 1px solid #eee;
				padding-bottom: 10px;
				padding-top: 5px;
				position: relative;

				/deep/.uni-icons {
					position: absolute;
					top: 10px;
					left: 10px;
				}

				.save {
					font-size: 16px;
					font-weight: 400;
					position: absolute;
					top: 10px;
					right: 10px;
				}

			}

			.exitInfo {
				background-color: #fff;
			}

			/deep/.checkbox {
				height: 50px;
				margin-top: 5px;
				margin-bottom: 5px;
				background-color: #fff;

				.checklist-box {
					margin-top: 20px;
				}
			}

			.deleteAdderss {
				width: 100%;
				height: 50px;
				line-height: 50px;
				text-align: center;
				color: red;
				font-size: 16px;
				background-color: #fff;
			}
		}

		.deli {
			color: #666;
			font-size: 12px;
			margin-top: 15px;
			border-bottom: 1px solid #aaa;
			padding-bottom: 15px;
		}

		/deep/.uni-tag {
			margin-right: 5px;
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

			.icon {
				/deep/.uni-icons {
					position: relative;
					top: 10px;
					left: 23px;
				}
			}
		}

		.tip {
			color: #666;
			font-size: 12px;
			height: 20px;
			line-height: 20px;
			background-color: #eee;
		}

		.active {
			height: 35px;
			overflow: hidden;
		}

		.price {
			.good-price {
				color: #333;
				font-size: 14px;
				margin-top: 15px;
			}

			.extra-price {
				margin-top: 10px;
				color: #333;
				font-size: 14px;
			}
		}

		.button {
			width: 100%;
			height: 45px;
			background-color: white;
			position: fixed;
			left: 0;
			bottom: 0;
			position: relative;


			.sumbit {
				width: 100px;
				height: 35px;
				position: absolute;
				bottom: 0;
				right: 0;
				float: right;

				button {
					width: 100px;
					height: 35px;
					font-size: 14px;
					background-color: red;
					color: white;
					border-radius: 17px;

				}
			}

			.text {
				height: 45px;
				line-height: 45px;
				font-size: 12px;
				text-align: center;

			}


		}




	}
</style>
