<template>
	<view class="content">
	
		<scroll-view class="scroll" scroll-y 
		@scrolltolower="loadMore">
		
			<view class="scroll-content">
				<view class="introduce-section">
					<text class="title">NO.{{detailData.title}}</text>
					<view class="introduce">
						<text>{{detailData.author}}</text>
						<text>{{detailData.replyCount}} 回复</text>
						<text>{{detailData.time}}</text>
					</view>
					
					<rich-text :nodes="info.data.content"></rich-text>
					<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<view @tap="ViewImage" :data-url="'https://nmbimg.fastmirror.org/image/'+info.data.img+info.data.ext"  v-if="info.data.img"  class="bg-img" :class="isCard?'':'only-img'" :style="'background-image:url(https://nmbimg.fastmirror.org/image/'+info.data.img+info.data.ext+');height:200px;'"></view>
					</view>
					<view class="actions" v-show="loading === false">
						<view class="action-item">
							<text class="yticon icon-dianzan-ash"></text>
							<text>75</text>
						</view>
						<view class="action-item">
							<text class="yticon icon-dianzan-ash reverse"></text>
							<text>6</text>
						</view>
						<view class="action-item">
							<text class="yticon icon-fenxiang2"></text>
							<text>分享</text>
						</view>
						<view class="action-item">
							<text class="yticon icon-shoucang active"></text>
							<text>收藏</text>
						</view>
					</view>
				</view>
				
				<view class="container" v-show="loading === false">
					<!-- 推荐 -->
					<view class="s-header">
						<text class="tit">广告</text>
					</view>
					<view class="rec-section"  >
						<view class="rec-item">
							<view class="left">
								<rich-text :nodes="ad.content">{{ad.content}}</rich-text>
								<view class="bot">
									<text class="author">{{ad.userid}}</text>
									<text class="time">{{ad.now}}</text>
								</view>
							</view>
							<view class="right" v-if="item.images.length > 0">
								<image class="img" :src="item.images[0]" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					
					<!-- 评论 -->
					<view v-if="replyList.length >1" class="s-header">
						<text class="tit">回复</text>
					</view>
					<view class="evalution">
						<view  v-for="(item, index) in  replyList" :key="index"
							class="eva-item"
						>	
							<view v-if="item.userid!=info.data.userid" :class="'cu-avatar lg round image bg-'+item.icon">{{item.iconNumber}}</view>
							<view v-else :class="'cu-avatar lg round image bg-red '">po</view>
							<view class="eva-right">
								<text :style="item.userid==info.data.userid?'color:black':''">{{item.userid}}</text>
								<text>{{item.now}}</text>
								<view class="zan-box">
									<text>{{item.zan}}</text>
									<text class="yticon icon-shoucang"></text>
								</view>
								
								<rich-text class="content" :nodes="item.content"></rich-text>
								<image :data-url="'https://nmbimg.fastmirror.org/image/'+item.img+item.ext" @tap="ViewImage" v-if="item.img"  :mode="'aspectFit'" class="image-ext" :src="'https://nmbimg.fastmirror.org/image/'+item.img+item.ext"></image>
								
							</view>
							
						</view>
					</view>
					<mix-load-more :status="loading"></mix-load-more>
				</view>
				<!-- 加载图标 -->
				<mixLoading class="mix-loading" v-if="loading"></mixLoading>
				
			</view>
		</scroll-view>
		
		<view class="bottom">
			<view class="input-box">
				<text class="yticon icon-huifu"></text>
				<input 
					class="input"
					type="text" 
					placeholder="点评一下把.." 
					placeholder-style="color:#adb1b9;"
				/>
			</view>
			<text class="confirm-btn">提交</text>
		</view>
	</view>
</template>

<script>
	import json from '@/json';
	import mixLoading from '@/components/mix-loading/mix-loading';
	import util from '@/util'
	export default {
		components: {
			mixLoading
		},
		data() {
			return {
				loading: true,
				detailData: {},
				info:{},
				newsList: [],
				evaList: [],
				replyList:[],
				ad:{},
				index:1,
				id:{},
				lastPager:false
			}
		},
		onLoad(options){
			this.detailData = JSON.parse(options.data);
			this.id = this.detailData.title
			this.loadDetail(this.detailData.title,1)
			this.loadNewsList();
		},
		methods: {
			//获取推荐列表
			async loadNewsList(){
				
			},
			 loadDetail(id,page){
				this.$api.getInfo(id,this.index).then((res)=>{
					
					this.info = res
					this.ad = res.data.replys[0];
					for(var i =1 ;i <res.data.replys.length;i++){
						let item = res.data.replys[i];
						item.iconNumber = item.userid.substring(0,1) 
						item.icon = util.getRandomBackground()
						this.replyList.push(item)
					}
					this.loading = false;
					this.index = this.index+1
				})
			},
			loadMore(){
				if(this.loading || this.lastPager){
					return
				}
				this.$api.getInfo(this.id,this.index).then((res)=>{
					
					this.loading = true
					this.info = res
					this.ad = res.data.replys[0];
					if(res.data.replys.length < 20){
						this.lastPager = true
					}
					for(var i =1 ;i <res.data.replys.length;i++){
						let item = res.data.replys[i];
						item.iconNumber = item.userid.substring(0,1) 
						item.icon = util.getRandomBackground()
						this.replyList.push(item)
					}
					
					this.index = this.index+1
					this.loading = false
				})
			},ViewImage(e) {
				console.log(e)
				
				let list = [e.currentTarget.dataset.url]
				console.log(list)
				uni.previewImage({
					urls: list,
					current: e.currentTarget.dataset.url
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.content{
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
	}
	.video-wrapper{
		height: 422upx;
		
		.video{
			width: 100%;
			height: 100%;
		}
	}
	.scroll{
		flex: 1;
		position: relative;
		background-color: #f8f8f8;
		height: 0;
	}
	.scroll-content{
		display: flex;
		flex-direction: column;
	}
	/* 简介 */
	.introduce-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		line-height: 1.5;
		
		.title{
			font-size: 36upx;
			color: #303133;
			margin-bottom: 16upx;
		}
		.introduce{
			display: flex;
			font-size: 26upx;
			color: #909399;
			text{
				margin-right: 16upx;
			}
		}
	}
	/* 点赞等操作 */
	.actions{
		display: flex;
		justify-content: space-around;
		align-items: center;
		line-height: 1.3;
		padding: 10upx 40upx 20upx;
	
		.action-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24upx;
			color: #999;
		}
		.yticon{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 52upx;
			
			&.reverse{
				position: relative;
				top: 6upx;
				transform: scaleY(-1);
			}
			&.active{
				color: #ec706b;
			}
		}
		.icon-fenxiang2{
			font-weight: bold;
			font-size: 36upx;
		}
		.icon-shoucang{
			font-size: 44upx;
		}
	}

	.s-header{
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;
		
		&:before{
			content: '';
			width: 0;
			height: 40upx;
			margin-right: 24upx;
			border-left: 6upx solid #ec706b;
		}
	}
	/* 推荐列表 */
	.rec-section{
		background-color: #fff;
		.rec-item{
			display: flex;
			padding: 20upx 30upx;
			position: relative;
			&:after{
				content: '';
				position: absolute;
				left: 30upx;
				right: 0;
				bottom: 0;
				height: 0;
				border-bottom: 1px solid #eee;
				transform: scaleY(50%);
			}
		}
		.left{
			flex: 1;
			padding-right: 10upx;
			overflow: hidden;
			position: relative;
			padding-bottom: 52upx;
			.title{
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				font-size: 32upx;
				color: #303133;
				line-height: 44upx;
			}
			.bot{
				position: absolute;
				left: 0;
				bottom: 4upx;
				font-size: 26upx;
				color: #909399;
			}
			.time{
				margin-left: 20upx;
			}
		}
		.right{
			width: 220upx;
			height: 140upx;
			flex-shrink: 0;
			position: relative;
			.img{
				width: 100%;
				height: 100%;
			}
			
		}
	}
	/* 评论 */
	.evalution{
		display:flex;
		flex-direction:column;
		background: #fff;
		padding: 20upx 0;
	}
	
	.eva-item{
		display:flex;
		padding: 20upx 30upx;
		position: relative;
		.image{
			width: 70upx;
			height: 70upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 24upx;
		}
		.image-ext{
			width: 100%;
			flex-shrink: 0;
		}
		&:after{
			content: '';
			position: absolute;
			left: 30upx;
			bottom: 0;
			right: 0;
			height: 0;
			border-bottom: 1px solid #eee;
			transform: translateY(50%);
		}
		&:last-child:after{
			border: 0;
		}
		
	}
	.eva-right{
		display:flex;
		flex-direction:column;
		flex: 1;
		font-size: 26upx;
		color: #909399;
		position:relative;
		.zan-box{
			display:flex;
			align-items:base-line;
			position:absolute;
			top: 10upx;
			right: 10upx;
			.yticon{
				margin-left: 8upx; 
			}
		}
		.content{
			font-size: 28upx;
			color: #333;
			padding-top:20upx;
		}
	}
	
	/* 底部 */
	.bottom{
		flex-shrink: 0;
		display: flex;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;
		box-shadow: 0 -1px 3px rgba(0,0,0,.04); 
		position: relative;
		z-index: 1;
		
		.input-box{
			display: flex;
			align-items: center;
			flex: 1;
			height: 60upx;
			background: #f2f3f3;
			border-radius: 100px;
			padding-left: 30upx;
			
			.icon-huifu{
				font-size: 28upx;
				color: #909399;
			}
			.input{
				padding: 0 20upx;
				font-size: 28upx;
				color: #303133;
			}
		}
		.confirm-btn{
			font-size: 30upx;
			padding-left: 20upx;
			color: #0d9fff;
		}
	}
</style>
