<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
				}
			})

			// #ifdef APP-PLUS  
			const _handlePushClick = message => {
					this.$store.commit('user/setTab', 2)
					this.$go(`/pages/map/index`, 'switch')
			};  
			const _handlePushReceive = message => {  
					plus.push.createMessage(
						'您有新的订单...'
					)  
			};  
			plus.push.addEventListener('click', _handlePushClick);    
			plus.push.addEventListener('receive', _handlePushReceive);    
			// APPUpdate();  
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	/* @import "colorui/main.css";
	@import "colorui/icon.css"; */
</style>
