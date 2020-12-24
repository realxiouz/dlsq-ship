<template>
	<view class="login">
		<image class="login-img" src="/static/img/logo.png" mode="widthFix" />
		<view class="form">
			<view class="form-item"><input class="text" type="text" v-model="form.account" placeholder="请输入手机号" /></view>
			<view class="form-item">
				<input class="text" :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="请输入密码" />
				<u-icon class="icon" :name="showPassword ? 'eye-fill' : 'eye-off'" @click="showPassword = !showPassword"></u-icon>
			</view>
			<view class="form-item"><view class="btn" @click="submit">登 录</view></view>
			<!-- <view class="form-info"><u-checkbox v-model="form.checked">下次自动登录</u-checkbox></view> -->
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
				checked: true
			},
			showPassword: false
		};
	},
	onLoad() {
		let user = uni.getStorageSync('userInfo') || {};
		let autologin = uni.getStorageSync('autologin');
		// if (user.token && autologin) {
		// 	this.$go('/pages/map/index', 'switch')
		// }
	},
	methods: {
		check() {
			if (this.form.account == '') {
				this.$toast('请输入用户名')
				return false;
			}
			if (this.form.password == '') {
        this.$toast('请输入密码！')
				return false;
			}
			return true;
		},
		submit() {
			if (!this.check()) {
				return;
			}
			this.$post('/user/accountLogin', {
					account: this.form.account,
					password: this.form.password
				})
				.then(res => {
					uni.setStorageSync('userInfo', res.data.userinfo);
					uni.setStorageSync('token', res.data.userinfo.token);
					uni.setStorageSync('autologin', this.form.checked);
					this.$go('/pages/map/index', 'switch')
				});
		}
	}
};
</script>

<style lang="less" scoped>
.login {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 180rpx;

	.login-img {
		width: 400rpx;
		height: 400rpx;
	}

	.form {
		width: 660rpx;
	}

	.form-item {
		padding: 20rpx 0;
		position: relative;
		display: flex;

		.text,
		.btn {
			flex: 1;
			height: 86rpx;
			line-height: 86rpx;
			border: 1px solid #ccc;
			border-radius: 16rpx;
			background: none;
			outline: none;
		}

		.text {
			padding: 0 30rpx;
			font-size: 28rpx;
		}

		.btn {
			text-align: center;
			font-size: 32rpx;
		}

		.icon {
			position: absolute;
			padding: 26rpx;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			font-size: 40rpx;
			color: #999;
		}
	}

	.form-info {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.-r {
			font-size: 26rpx;

			text:nth-child(2) {
				margin: 0 12rpx;
			}
		}
	}

	.u-btn--default {
		background: none !important;
		border-color: #cccccc !important;
	}
}
</style>
