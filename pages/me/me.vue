<template>


	<view class="page">
		<!--- 底部导航栏 -->
		<view class="cu-bar tabbar margin-bottom-xl bg-white bar">
			<view class="action text-gray" @click="navToHome">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add bg-green shadow" @tap="navToMe"></button>
				发布
			</view>

			<view class="action  text-green" @click="navToMe">
				<view class="cuIcon-my">
				</view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			navToHome(){
				uni.redirectTo({
					url: `/pages/index/index`
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

	.bar {
		margin: 0upx;
		position: fixed;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
	}
</style>
