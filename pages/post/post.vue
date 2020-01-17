<template>
	<view>
		<!-- !!!!! placeholder 在ios表现有偏移 建议使用 第一种样式 -->
		<view class="cu-form-group margin-top">
			<textarea maxlength="-1"  :disabled="modalName!=null" @input="textareaAInput" placeholder="期待你每一次友善的发言!"></textarea>
		</view>
		
		<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					<text class="text-df margin-right-sm">去水印</text>
					<switch @change="setWater" :class="noWater?'checked':''" color="#39B54A"></switch>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			
			<view class="cu-form-group margin-top">
				<view class="title"></view>
				<picker @change="PickerChange" :value="index" :range-key="'name'" :range="picker">
					<view class="picker">
						{{index>-1?picker[index].name:'请选择板块'}}
					</view>
				</picker>
			</view>
			
			<button class="cu-btn bg-green lg btn-post" @click="doPost">发布新串</button>
			
		</form>
		
	</view>
</template>

<script>
	import json from '@/json'
	export default {
		data() {
			return {
				index:-1,
				picker:[],
				noWater:true,
				imgList: [],
				modalName: null,
				textareaAValue: '',
				textareaBValue: '',
				content:''
			}
		},
		onLoad() {
			this.picker = json.tabList
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
			
				this.imgList.splice(e.currentTarget.dataset.index, 1)		
				
			},setWater(){
				
			},doPost(){
				if(this.index===-1){
					uni.showToast({
						title:"请选择板块"
					})
					return
				}
				console.log(''==false)
				if(!this.content && this.imgList.length ==0){
					uni.showToast({
						title:"串必须有内容"
					})
					return
				}
			},
			textareaAInput(e){
				this.content =e.detail.value
			}
			}
		}
</script>

<style>
.btn-post{
	width: 100%;
	margin-top: 20rpx;
}
</style>
