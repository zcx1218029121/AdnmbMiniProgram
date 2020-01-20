<template>
	<view>
		<scroll-view class="page">
			<!-- <view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round bg-red">A</view>
					<view class="content">
						<view class="text-grey">ATM</view>
					</view>

				</view>
			</view>
 -->
			<view class="cu-list menu" style="margin-top: 20upx;">
				<view class="cu-item" @tap="navToCookies">
					<view class="content">
						<text class="cuIcon-settings text-grey"></text>
						<text class="text-grey">管理饼干</text>
					</view>

				</view>
				<view class="cu-item"  @tap="navToCollecton">
					<view class="content">
						<text class="cuIcon-favorfill text-grey"></text>
						<text class="text-grey">收藏串</text>
					</view>
				</view>

				<view class="cu-item menuArrow">
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">反馈问题</text>
					</button>
				</view>

			</view>



		</scroll-view>
	</view>


</template>

<script>
	export default {

		methods: {
			navToCookies() {
				uni.navigateTo({
					url: '/pages/cookies/cookies'
				})

			},
			navToCollecton(){
				uni.showToast({
					title:"功能开发中"
				})
			}
		},
		onShow() {
			console.log("12313213213"+getCookies())
			// uni.login({
			//   provider: 'weixin',
			//   success: function (loginRes) {
			//     console.log(loginRes.authResult);
			//   }
			// });
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
