<template>
	<view class="login">
		<image class="login-img" src="/static/img/logo.png" mode="widthFix" />
		<view class="form">
			<view class="form-item"><input class="text" type="number" v-model="form.account" placeholder="请输入手机号" /></view>
			<view class="form-item" style="align-items:center;">
				<input class="text" :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="请输入密码" />
				<image @click="showPassword=!showPassword" src="/static/img/eye.png" style="width:32rpx;height:32rpx;" alt="">
			</view>
			<div></div>
			<div class="btn" :class="{ok}" @click="submit">登 录</div>
			<div class="flex align-center" style="color:#282828;font-size:10px;" @click="toggleCheck">
				<div :class="checked?'color-primary icon-check':'icon-uncheck color-gray'" style="font-size:24rpx;margin-right:12rpx"></div>
				<div>下次自动登录</div>
			</div>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			form: {
				account: '18687910066',
				password: '123456',
			},
			showPassword: false,
			checked: false,
		};
	},
	onLoad() {
		let user = uni.getStorageSync('userInfo') || {};
		let autologin = uni.getStorageSync('autologin');
		if (user.token && autologin) {
			this.$go('/pages/map/index', 'switch')
		}
	},
	methods: {
		submit() {
			if (!this.ok) {
				return;
			}
			this.$post('/user/accountLogin', {
					account: this.form.account,
					password: this.form.password
				})
				.then(res => {
					uni.setStorageSync('userInfo', res.data.userinfo);
					uni.setStorageSync('token', res.data.userinfo.token);
					this.$go('/pages/map/index', 'switch')
				}).catch(e => {
					this.$toast(e)
				})
		},
		toggleCheck() {
			this.checked = !this.checked
			uni.setStorageSync('autologin', this.checked)
		}
	},
	computed: {
		ok() {
			return /^1\d{10}$/.test(this.form.account) && !!this.form.password
		}
	}
};
</script>

<style>
	@import "../../colorui/main.css";
	@import '../../utils/css/icon.css'
</style>
<style lang="less" scoped>
.login {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #fff;
	padding-top: 300rpx;
	.login-img {
		width: 400rpx;
		height: 400rpx;
	}

	.form {
		width: 500rpx;
	}

	.form-item {
		margin-top: 32rpx;
		padding: 16rpx 0;
		position: relative;
		display: flex;
		border-bottom: 1rpx solid #b1b1b1;
		.text {
			padding: 0 12rpx;
			font-size: 28rpx;
			flex: 1;
		}
	}

	.btn{
		font-size: 14px;
		line-height: 66rpx;
		height: 68rpx;
		box-sizing:border-box;
		text-align: center;
		border-radius: 10rpx;
		color: #4C4C4C;
		background: #f4f4f4;
		border: 1rpx solid #dbdbdb;
		margin-bottom: 20rpx;
		margin-top: 50rpx;
		&.ok{
			background: #5077a9;
			color: #fff;
			border-color: #5077a9;;
		}
	}

	.color-primary{
		color: #5077a9;
	}
}
</style>
