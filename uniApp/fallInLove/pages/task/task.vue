<template>
	<view class="content">
		<view class="header-swiper">
			<uv-swiper height="200" :list="list"></uv-swiper>
		</view>
		<view class="scoreboard">
			<header class="score-board-title">未完成</header>
		
			<view class="score">
				<view class="score-item">
					<view class="avatar">
						<img class="avatar-img" src="/static/avatar/1.jpg" alt="" />
					</view>
					<view class="score-item-content">
						<view class="title">减肥券</view>
						<view class="desc">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈减肥了</view>
						<view class="tag">
							<uv-tags text="标签" plain size="mini" type="warning"></uv-tags>
							<uv-tags text="标签" plain size="mini" type="warning"></uv-tags>
						</view>
						<view class="price">19</view>
					</view>
				</view>
				<view class="score-item">
					<view class="avatar">
						<img class="avatar-img" src="/static/avatar/1.jpg" alt="" />
					</view>
					<view class="score-item-content">
						<view class="title">减肥券</view>
						<view class="desc">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈减肥了</view>
						<view class="tag">
							<uv-tags text="标签" plain size="mini" type="warning"></uv-tags>
							<uv-tags text="标签" plain size="mini" type="warning"></uv-tags>
						</view>
						<view class="price">19</view>
					</view>
				</view>
			</view>
		
		</view>
		
		<uv-tabbar :value="value" @change="tabBarChange" :circular="true">
			<uv-tabbar-item text="任务" icon="file-text"></uv-tabbar-item>
			<uv-tabbar-item text="商城" icon="empty-coupon"></uv-tabbar-item>
			<uv-tabbar-item text="首页" icon="home"></uv-tabbar-item>
			<uv-tabbar-item text="仓库" icon="shopping-cart"></uv-tabbar-item>
			<uv-tabbar-item text="我的" icon="account"></uv-tabbar-item>
		</uv-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:0,
				list: [
					"/static/image/home1.jpg",
					"/static/image/home2.jpg",
					"/static/image/home3.jpg",
				],
			}
		},
		methods: {
			tabBarChange(index) {
				this.value = index
				if(index === 4) {
					uni.reLaunch({
						url:"/pages/user/user"
					})
				}
				if(index === 2) {
					uni.reLaunch({
						url:"/pages/home/index"
					})
				}
				if(index === 1) {
					uni.reLaunch({
						url:"/pages/shop/shop"
					})
				}
				if(index === 0) {
					uni.reLaunch({
						url:"/pages/task/task"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.content {
		width: 100%;
		height: 100%;

		.header-swiper {
			width: 750rpx;
			height: 400rpx;
		}

		.scoreboard {
			padding: 0 8rpx;

			.score-board-title {
				font-size: 36rpx;
				font-weight: 700;
				margin: 32rpx 0;
			}


			.score {
				.score-item {
					margin-bottom: 32rpx;
					display: flex;
					align-items: center;

					.avatar {
						width: 200rpx;
						height: 200rpx;
						border-radius: 24rpx;
						overflow: hidden;


						.avatar-img {
							width: 200rpx;
							height: 200rpx;
						}
					}

					.score-item-content {
						margin-left: 16rpx;
						font-size: 28rpx;

						.title {
							font-weight: 700;
						}

						.desc {
							margin: 12rpx 0;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							width: 500rpx;
						}

						.tag {
							display: flex;
						}

						.price {
							margin-top: 20rpx;
							font-size: 28rpx;
							font-weight: 700;
						}
					}

				}
			}
				
			.welcome {
				font-size: 36rpx;
				font-weight: 700;
				margin: 32rpx 0;
			}
		}
	}
</style>
