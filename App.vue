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
					// 自行处理消息点击事件  
					let {payload} = message;  
					console.log( message );
					this.$showModal({
						content: message
					}) 
			};  
			const _handlePushReceive = message => {  
					// 消息接收事件，手动创造本地通知信息  
					plus.push.createMessage(message.content, message.payload, {  
							title: message.title  
					})  
			};  
			plus.push.addEventListener('click', _handlePushClick);    
			plus.push.addEventListener('receive', _handlePushReceive);    
			// APPUpdate();  
			// #endif

			var info = plus.push.getClientInfo();
			alert( JSON.stringify( info ) );
			console.log(info)
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
