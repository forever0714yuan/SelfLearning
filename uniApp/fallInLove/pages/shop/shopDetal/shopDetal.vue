<template>
	<view>
		<uv-navbar title="超市商品">
			<template v-slot:left>
				<view class="uv-nav-slot">
					<uv-icon name="arrow-left" size="19" @click="goToBack"></uv-icon>
					<uv-line direction="column" :hairline="false" length="16" margin="0 8px"></uv-line>
					<uv-icon name="home" size="20" @click="goHome"></uv-icon>
				</view>
			</template>
		</uv-navbar>
		<view class="content">
			<view class="content-avatar">
				<uv-image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="400rpx" height="400rpx"></uv-image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goToBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goHome() {
				uni.navigateTo({
					url:'/pages/home/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin flex($direction: row) {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: $direction;
	}

	.uv-nav-slot {
		@include flex;
		align-items: center;
		justify-content: space-between;
		border-width: 0.5px;
		border-radius: 100px;
		border-color: #dadbde;
		padding: 3px 7px;
		opacity: 0.8;
	}
	
	.content {
		margin-top: 64px;
		
			
		&-avatar {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 400rpx;
			
		}
	}
</style>