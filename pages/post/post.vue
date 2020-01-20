<template>
	<view>
		<!-- !!!!! placeholder 在ios表现有偏移 建议使用 第一种样式 -->
		<view class="cu-form-group margin-top">
			<textarea maxlength="-1"  :show-confirm-bar=false :disabled="modalName!=null" @input="textareaAInput" placeholder="期待你每一次友善的发言!"></textarea>
		</view>
		
		<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					<text class="text-df margin-right-sm">水印</text>
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
	//postString=(content,id,imge,water)
	import json from '@/json'
	export default {
		data() {
			return {
				index:-1,
				picker:[],
				noWater:true,
				imgList: [],
				imgFile:[],
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
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {

							this.imgList = res.tempFilePaths
							this.imgFile = res.tempFiles
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
				this.noWater = !this.noWater
				console.log(this.noWater)
			},doPost(){
				uni.showToast({
					title:"正在发串..."
				})
				if(this.index===-1){
					uni.showToast({
						title:"请选择板块"
					})
					return
				}
				if(!this.content && this.imgList.length ==0){
					uni.showToast({
						title:"串必须有内容"
					})
					return
				}
				if(this.imgList.length ==0){
					this.$api.postString(this.content,this.picker[this.index].id,true).then((res)=>{
						if(res.data.search("成功")){
							uni.navigateBack();
						}else if(res.data.search("饼干")){
							
							uni.showToast({
								title:"没有饼干"
							})
							}
							
					})
				}else{
					uni.uploadFile({
					           url: 'https://nmb.fastmirror.org/Home/Forum/doPostThread.html', //仅为示例，非真实的接口地址
					           filePath: this.imgList[0],
					           name: 'image',
									header:{
										'Cookie':'userhash='+uni.getStorageSync('cookie')
									},
					           formData: {
					               'content':this.content,
					               'fid':this.picker[this.index].id,
					               'water':false
					           },
					           success: (uploadFileRes) => {
					              // uni.hideLoading()({
					              // 	title:"正在发串..."
					              // })
								  uni.navigateBack();
					           }
					       });
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
