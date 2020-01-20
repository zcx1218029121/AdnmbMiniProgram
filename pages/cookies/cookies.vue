<template>
	<view>
		
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			  <radio-group class="block" @change="RadioChange">
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				
			
				<view v-for="(item, index) in cookies" :key="index" class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						
						<text class="text-grey">{{item.name}}</text>
					</view>
					<view class="action">
						<!-- <button class="cu-btn round bg-green shadow">
							<text class="cuIcon-upload"></text> 删除</button> -->
							<radio :value="item.userhash" class="round bg-green shadow"></radio>
					</view>
				</view>
	
				
			
	
			
			</view>
			</radio-group>
	<button class="cu-btn block bg-green margin-tb-sm lg" @tap="showModal" data-target="Modal">
		<text class="cuIcon-add"></text> 添加饼干
	</button>
	<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="addUserHash" data-target="Modal">
		设为默认饼干
	</button>
	
	<view class="cu-modal" :class="modalName=='Modal'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">添加饼干</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-xl">
				<view class="cu-form-group">
					<input :value="name" @input="inputCookiesName" placeholder="饼干名" name="input"></input>
				</view>
				<view class="cu-form-group">
					<input :value="userhash" @input='inputUserHash' placeholder="userhash" name="input"></input>
				</view>
				<button class="cu-btn block bg-green margin-tb-sm lg" @tap="addCookies">
					<text class="cuIcon-add"></text> 确定
				</button>
			</view>
		</view>
	</view>
		</scroll-view>
	</view>
		
			
			
		
	</view>
</template>

<script>
	import cookies from '@/common/cookie.js'
	export default {
		data() {
			return {
				cookies: [],
				modalName: null,
				name: '',
				userhash: '',
				selectUserHash:''
			}
		},
		onLoad() {
			let _this = this
			uni.getStorage({
			    key: 'cookies',
			    success: function (res) {
			        _this.cookies = JSON.parse(res.data)
			    }
			});

		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			addCookies() {

				this.cookies.push({
					'name': this.name,
					'userhash': this.userhash
				})
				uni.setStorage({
					key: 'cookies',
					data: JSON.stringify(this.cookies),
					success() {
						uni.showToast({
							title:"添加成功！"
						})
					}
				})
				this.modalName = null
			},
			getCookies() {
				uni.getStorage({
					key: 'cookies',
					success: function(res) {
						
						this.cookies = JSON.parse(res.data)
						
					}
				});
			},
			inputCookiesName(e) {
				this.name = e.detail.value
			},
			inputUserHash(e) {
				this.userhash = e.detail.value
			},
			RadioChange(evt){
				this.selectUserHash = evt.target.value
			},
			addUserHash(){
				uni.setStorage({
					key: 'cookie',
					data: this.selectUserHash,
					success() {
						uni.showToast({
							title:"添加成功！"
						})
					}
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}
</style>
