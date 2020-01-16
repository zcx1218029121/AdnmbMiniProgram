<template>
	<view class="pager-content">
		<home v-if="index == 1"></home>
		<me v-if="index==2"></me>
		<!-- 顶部选项卡 -->
		<view class="cu-bar tabbar margin-bottom-xl bg-white bottom">
			<view :class="'action '+ current(1)"  @click="navToHome">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add bg-green shadow" ></button>
				发布
			</view>
			
			<view :class="'action '+ current(2)" @click="navToMe">
				<view class="cuIcon-my">
				</view>
				我的
			</view>
		</view>
		</view>
	
</template>

<script>
	import json from '@/json'
	import util from '@/util'
	import home from '@/pages/home/home'
	import me from '@/pages/me/me'
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	export default {
		components: {
			mixPulldownRefresh,
			mixLoadMore,
			home,
			me
		},
		data() {
			return {
				index:1
			}
		},methods:{
			navToMe(){
				this.index = 2
			},current(i){
				if(this.index === i){
				return "text-green"
				}else{
					return "text-gray"
				}
			},navToHome(){
				this.index = 1
			}
		}
		}
</script>

<style lang='scss'>
	
	page{
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}
	.pager-content{
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
		background-color: #fff;
		.nav-item{
			display: inline-block;
			width: 150upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		.current{
			color: #007aff;
			&:after{
				width: 50%;
			}
		}
	}
	.bottom{
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: 0px;
	}

	.swiper-box{
		height: 100%;
	}

	.panel-scroll-box{
		height: 100%;
		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	
	
	
	
</style>
