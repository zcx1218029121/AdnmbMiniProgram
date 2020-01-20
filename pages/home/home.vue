<template>
	<view class="pager-content">

		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabBars" :key="item.id" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>

		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="200" @refresh="onPulldownReresh"
		 @setEnableScroll="setEnableScroll">
			<!-- 内容部分 -->
			<swiper id="swiper" class="swiper-box" :duration="30" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">

						<view v-for="(item, index) in tabItem.newsList" :key="index" class="cu-card dynamic" @click="navToDetails(item)">
							<view class="cu-item shadow">
								<view class="cu-list menu-avatar">
									<view class="cu-item">
										<view :class="'cu-avatar lg round bg-'+item.bg"> {{item.icon}}</view>

										<view class="content flex-sub">
											<view>{{item.userid}}</view>
											<view class="text-gray text-sm flex justify-between" v-html="item.now">

											</view>
										</view>
									</view>
								</view>
								<view class="text-content" style=" white-space: pre-wrap;">
									<rich-text :nodes="item.content"></rich-text>
									<!-- {{item.content}} -->
								</view>
								<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
									<view v-if="item.img" class="bg-img" :class="isCard?'':'only-img'" :style="'background-image:url(https://nmbimg.fastmirror.org/thumb/'+item.img+item.ext+');'">
									</view>
								</view>
								<view class="text-gray text-sm text-right padding">
									<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.replyCount}}
								</view>


							</view>
						</view>
						<!-- 上滑加载更多组件 -->
						<mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		<!-- 底部导航栏 -->


	</view>


</template>

<script>
	import json from '@/json'
	import util from '@/util'
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		components: {
			mixPulldownRefresh,
			mixLoadMore,
		},
		data() {
			return {
				isCard: false,
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				tabBars: [],

			}
		},
		computed: {

		},
		onReady() {
			// 获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
			this.loadTabbars();

		},
		methods: {
			// 生成头像随机方法

			/**
			 * 数据处理方法在vue和nvue中通用，可以直接用mixin混合
			 * 这里直接写的
			 * mixin使用方法看index.nuve
			 */
			//获取分类
			loadTabbars() {
				this.loading = false;
				let tabList = json.tabList
				tabList.forEach(item => {
					item.newsList = [];
					item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
					item.refreshing = 0;
					item.index = 0
				})
				this.tabBars = tabList;
				this.loadNewsList('add');

			},
			//新闻列表
			loadNewsList(type) {
				let tabItem = this.tabBars[this.tabCurrentIndex];
				if (type === 'add') {
					if (tabItem.loadMoreStatus === 2) {
						return;
					}
					tabItem.loadMoreStatus = 1;
				} else if (type === 'refresh') {
					tabItem.refreshing = true;
					tabItem.index = 0
				}
				tabItem.index = tabItem.index + 1
				this.$api.main(tabItem.id, tabItem.index).then((res) => {
					let list = res.data;
					if (type === 'refresh') {
						tabItem.newsList = []; //刷新前清空数组
					}
					list.forEach(item => {
						item.icon = item.userid.substring(0, 1)
						item.bg = util.getRandomBackground()
						tabItem.newsList.push(item);

					})
					//下拉刷新 关闭刷新动画
					if (type === 'refresh') {
						this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
						// #ifdef APP-PLUS
						tabItem.refreshing = false;
						// #endif
						tabItem.loadMoreStatus = 0;
					}
					//上滑加载 处理状态

					tabItem.loadMoreStatus = tabItem.newsList.length < 20

				})


			},
			navToMe() {

				uni.redirectTo({
					url: `/pages/me/me`
				})
			},
			//新闻详情
			navToDetails(item) {
				let data = {
					id: item.id,
					title: item.id,
					author: item.userid,
					time: item.time,
					replyCount: item.replyCount
				}
				let url = item.videoSrc ? 'videoDetails' : 'details';

				uni.navigateTo({
					url: `/pages/details/${url}?data=${JSON.stringify(data)}`
				})

				// uni.navigateTo({
				// 	url: `/pages/me/me`
				// })
			},

			//下拉刷新
			onPulldownReresh() {
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore() {
				this.loadNewsList('add');
			},
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable;
				}
			},

			//tab切换
			async changeTab(e) {

				if (scrollTimer) {
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if (typeof e === 'object') {
					index = e.detail.current
				}
				if (typeof tabBar !== 'object') {
					tabBar = await this.getElSize("nav-bar")
					console.log(tabBar)
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if (i === index) {
						nowWidth = result.width;
					}
				}
				if (typeof e === 'number') {
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index;
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(() => {
					if (width - nowWidth / 2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
					} else {
						this.scrollLeft = 0;
					}
					if (typeof e === 'object') {
						this.tabCurrentIndex = index;
					}
					this.tabCurrentIndex = index;


					//第一次切换tab，动画结束后需要加载数据
					let tabItem = this.tabBars[this.tabCurrentIndex];
					if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
						this.loadNewsList('add');
						tabItem.loaded = true;
					}
				}, 300)

			},
			//获得元素的size
			getElSize(id) {
				return new Promise((res, rej) => {
					// 修改 查询控件的范围为自定义插件
					let el = uni.createSelectorQuery().in(this).select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	.pager-content {
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 150upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;

			&:after {
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

		.current {
			color: #007aff;

			&:after {
				width: 50%;
			}
		}
	}

	.swiper-box {
		height: 100%;
	}

	.panel-scroll-box {
		height: 100%;

		.panel-item {
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
</style>
