<template>
	<view class="content">
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
				value:4,
			}
		},
		methods: {
			tabBarChange(index) {
				this.value = index
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
	}
</style>