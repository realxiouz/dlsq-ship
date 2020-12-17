<template>
	<div>
		<div class="tab-wrap flex justify-around">
			<!-- <div class="flex flex-direction align-center" @click.stop="toggleTab(inx)" v-for="(i, inx) in tabs" :key="inx" style="color:#fff;font-size:8px;">
				<img style="width:60rpx;height:60rpx;margin-top:14rpx" :src="i.img" alt="">
				<div style="line-height:40rpx;">{{i.title}}</div>
				<div class="sj" v-if="inx==curTab"></div>
			</div> -->
			<div class="flex flex-direction align-center" @click.stop="toggleTab(0)" style="color:#fff;font-size:8px;">
				<image style="width:60rpx;height:60rpx;margin-top:14rpx" src="../../static/img/nav0.png" alt="">
				<div style="line-height:40rpx;">正在配送</div>
				<div class="sj" v-if="0==curTab"></div>
			</div>
			<div class="flex flex-direction align-center" @click.stop="toggleTab(1)" style="color:#fff;font-size:8px;">
				<image style="width:60rpx;height:60rpx;margin-top:14rpx" src="../../static/img/nav1.png" alt="">
				<div style="line-height:40rpx;">实时订单</div>
				<div class="sj" v-if="1==curTab"></div>
			</div>
			<div class="flex flex-direction align-center" @click.stop="toggleTab(2)" style="color:#fff;font-size:8px;">
				<image style="width:60rpx;height:60rpx;margin-top:14rpx" src="../../static/img/nav2.png" alt="">
				<div style="line-height:40rpx;">预约订单</div>
				<div class="sj" v-if="2==curTab"></div>
			</div>
			
		</div>
		
		<div class="main-content" :style="{height: `calc(100vh - ${h}px)`}">
			<div v-show="curTab==0" class="flex flex-direction" style="height:100%;padding:0rpx 30rpx 0">
				<map
					class="flex-sub"
					:markers="markers"
					:polyline="polyline"
					:latitude="latitude"
					:longitude="longitude"
					style="width:100%;"
				></map>
				<div style="height:100rpx;background:#5077a8;color:#fff;" class="flex font12">
					<div class="flex-sub flex flex-direction align-center justify-center" @click="onAction(0)">
						<image src="../../static/img/a0.png" style="width:48rpx;height:48rpx;margin-bottom:6rpx;" />
						<div>完成配送</div>
					</div>
					<div class="flex-sub flex flex-direction align-center justify-center" @click="onAction(1)">
						<image src="../../static/img/a1.png" style="width:48rpx;height:48rpx;margin-bottom:6rpx;" />
						<div>联系对方</div>
					</div>
					<div class="flex-sub flex flex-direction align-center justify-center" @click="onAction(2)">
						<image src="../../static/img/a2.png" style="width:48rpx;height:48rpx;margin-bottom:6rpx;" />
						<div>订单信息</div>
					</div>
				</div>
			</div>
			<scroll-view v-if="curTab==1" scroll-y style="height:100%" @scrolltolower="onMore">
				<div v-for="(i,inx) in list" :key="inx">
					<div style="padding: 0 20rpx" class="font12">
						<div class="flex" style="padding: 20rpx 0;">
							<div><span class="text-bold">配送信息：</span>{{'xx毫升桶装水  2桶'}}</div>
							<div class="flex-sub"></div>
							<div><span class="text-bold">状态：</span>{{'进行中'}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/no.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">订单号：</div>
							<div>{{'02549845612587'}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/no.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">收货人：</div>
							<div>{{'02549845612587'}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/phone.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">电话：</div>
							<div>{{'02549845612587'}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/location.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">地址: </div>
							<div>{{'02549845612587'}}</div>
							<div class="flex-sub"></div>
							<div style="line-height:34rpx;border-radius:17rpx;width:120rpx;background:#FFCE50;text-align:center;font-size:10px;">完成配送</div>
						</div>
					</div>
					<div style="height:57rpx;border-top:1rpx solid #868686;border-bottom:1rpx solid #868686;"></div>
				</div>
			</scroll-view>

			<scroll-view v-if="curTab==2" scroll-y style="height:100%" @scrolltolower="onMore">
				<div v-for="(i,inx) in list" :key="inx">
					<div style="padding: 0 20rpx" class="font12">
						<div class="flex" style="padding: 20rpx 0;">
							<div><span class="text-bold">配送信息：</span>{{'xx毫升桶装水  2桶'}}</div>
							<div class="flex-sub"></div>
							<div><span class="text-bold">送达时间：</span>{{'明日12点'}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/no.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">订单号：</div>
							<div>{{'02549845612587'}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/no.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">收货人：</div>
							<div>{{'02549845612587'}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/phone.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">电话：</div>
							<div>{{'02549845612587'}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/location.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">地址: </div>
							<div>{{'02549845612587'}}</div>
							<div class="flex-sub"></div>
							<image src="/static/img/clock.png" style="width:28rpx;height:28rpx;margin-right:8rpx;" alt="">
							<div>开启提醒</div>
						</div>
					</div>
					<div style="height:57rpx;border-top:1rpx solid #868686;border-bottom:1rpx solid #868686;"></div>
				</div>
			</scroll-view>
		</div>

		<!-- <cover-view v-if="curTab==0" class="action flex" :class="{show:showAction}" >
			<cover-view class="flex-sub flex flex-direction align-center justify-center" @click="onAction(0)">
				<cover-image src="/static/img/a0.png" style="width:48rpx;height:48rpx;margin-bottom:6rpx;" />
				<cover-view>完成配送</cover-view>
			</cover-view>
			<cover-view class="flex-sub flex flex-direction align-center justify-center" @click="onAction(1)">
				<cover-image src="/static/img/a1.png" style="width:48rpx;height:48rpx;margin-bottom:6rpx;" />
				<cover-view>联系对方</cover-view>
			</cover-view>
			<cover-view class="flex-sub flex flex-direction align-center justify-center" @click="onAction(2)">
				<cover-image src="/static/img/a2.png" style="width:48rpx;height:48rpx;margin-bottom:6rpx;" />
				<cover-view>订单信息</cover-view>
			</cover-view>
			<cover-view style="width:100rpx;" @click.stop="showAction=!showAction"></cover-view>
		</cover-view> -->
	</div>
</template>

<script>
import dayjs from 'dayjs'
let h = uni.upx2px(125)
const INTERVER = 3
const TABS = [
	{
		img: '/static/img/nav0.png',
		title: '正在配送',
	},
	{
		img: '/static/img/nav1.png',
		title: '实时订单',
	},
	{
		img: '/static/img/nav2.png',
		title: '预约订单',
	},
]
export default {
	onLoad() {
		wx.startLocationUpdateBackground({
			success: _ => {
				this.$toast('开始持续定位')
				console.log('---loc start---')
			},
			fail: e => {
				console.log(e)
			}
		})
		this.upLoadLocation()
		wx.onLocationChange(this.locChange)
	},
	data() {
		return {
			markers: [
				{
					latitude: 40.013305,
					longitude: 118.685713,
					iconPath: '/static/img/loc1.png',
					width: 40,
					height: 40
				}
			],
			polyline: [
				{
					points: [
						{
							latitude: 40.013305,
							longitude: 118.685713,
						},
						{
							latitude: 40.013305,
							longitude: 118.68572,
						},
						{
							latitude: 40.013305,
							longitude: 118.68571,
						}
					],
					color: '#496BA0',
					width: 2
				}
			],
			agentId:0,
			title: 'map', //地图标题
			latitude: 40.013305,  //纬度
			longitude: 118.685713,

			curTab: 0,
			tabs: TABS,
			showAction: true,
			h,

			timer: null,

			list: [1,2,3],
		}
	},
	methods: {
		toggleTab(inx) {
			this.curTab = inx
		},
		upLoadLocation() {
			if (!this.timer) {
				this.timer = setInterval(_ => {
					let d = {
						lat: this.latitude,
						lng: this.longitude,
						store_id: 1,
					}
					this.$post('store/store/location', d)
						.then(r => {
							console.log(r)
						})
						.catch(e => {
							console.log(e)
						})
				}, 1000 * INTERVER)
			}
		},
		onAction(inx) {
			if (inx==1) {
				uni.makePhoneCall({
					phoneNumber: "15912510617"
				})
				return
			} else if (inx == 0) {
				this.stopLoc()
			}
		},
		locChange(res) {
			// console.log(res)
			let {latitude, longitude} = res

			this.latitude = latitude
			this.longitude = longitude
		},
		stopLoc() {
			this.$showModal({
				title: '完成配送',
				content: `完成时间: ${dayjs(new Date()).format('YYYY-MM-DD hh:ss')}`,
				showCancel: true,
				successCb: _ => {
					wx.stopLocationUpdate()
					this.timer && clearInterval(this.timer)
				}
			})
		},
		onMore() {
			console.log(1)
		}
	}
}
</script>

<style lang="less" scoped>
.tab-wrap{
	height: 200rpx;
	background: #5077a8;
}

.action{
	position: fixed;
	height: 120rpx;
	width: 475rpx;
	background: #5077a8;
	bottom: 120rpx;
	left: -425rpx;
	border-radius: 0 60rpx 60rpx 0;
	transition: left .3s;
	font-size: 8px;
	color: #fff;
	
	&.show{
		left: 0rpx;
	}
}

.main-content{
	background: #fff;
	width: 700rpx;
	margin: -75rpx auto 0;
	height: 800rpx;
	box-sizing: border-box;
}

.sj{
	width: 0;
	height: 0;
	border-width: 20rpx;
	border-style: solid;
	border-color: transparent transparent #fff transparent;
	margin-top: -20rpx;
}

.font12{
	font-size: 12px;
	color:#000;
}

.text-bold{
	font-weight: bold;
}
</style>
