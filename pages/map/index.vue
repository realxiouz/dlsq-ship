<template>
	<div>
		<div class="tab-wrap flex justify-around">
			<div class="flex flex-direction align-center" @click.stop="toggleTab(inx)" v-for="(i, inx) in tabs" :key="inx" style="color:#fff;font-size:8px;">
				<image style="width:60rpx;height:60rpx;margin-top:14rpx" :src="i.img" alt="">
				<div style="line-height:40rpx;">{{i.title}}</div>
				<div class="sj" v-if="inx==curTab"></div>
			</div>
		</div>
		
		<div class="main-content" :style="{height: `calc(100vh - ${h}px)`}">
			<div v-show="curTab==0&&isShip" class="flex flex-direction" style="height:100%;padding:0rpx 0rpx 0">
				<map
					class="flex-sub"
					:markers="markers"
					:polyline="polyline"
					:latitude="latitude"
					:longitude="longitude"
					:include-points="allPoints"
					style="width:100%;"
					@markertap="onMark"
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
			<div v-if="curTab==0&&!isShip" class="flex flex-direction align-center justify-center" style="height:100%;">
				<image style="width:280rpx;height:280rpx;" src="/static/img/empty.png" alt="">
				<div style="margin-top:40rpx;">暂无配送订单</div>
			</div>
			<scroll-view v-if="curTab==1&&list.length" scroll-y style="height:100%" @scrolltolower="onMore">
				<div v-for="(i,inx) in list" :key="inx">
					<div style="padding: 0 20rpx" class="font12">
						<div class="flex" style="padding: 20rpx 0;">
							<div class="flex-sub" style="margin-right:8rpx;"><span class="text-bold">配送信息：</span>{{getGoodsDesc(i.item)}}</div>
							<div><span class="text-bold">状态：</span>{{i.status_name}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/no.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">订单号：</div>
							<div>{{i.order_sn}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/clock.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">下单时间：</div>
							<div>{{i.createtime}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/no.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">收货人：</div>
							<div>{{i.consignee}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/phone.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">电话：</div>
							<div>{{i.phone}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/location.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">地址: </div>
							<div class="flex-sub" style="width: 0;">{{i.address}}</div>
							<div
								style="line-height:34rpx;border-radius:17rpx;width:120rpx;background:#FFCE50;text-align:center;font-size:10px;"
								:style="{background:i.status_name == '待配送'?'#FFCE50':'#5677AB', color:i.status_name == '待配送'?'#000':'#fff'}"
								@click="onOrder(i)"
							>
								{{i.status_name == '待配送' ? '开始配送' : '查看详情'}}
							</div>
						</div>
					</div>
					<div style="height:57rpx;border-top:1rpx solid #868686;border-bottom:1rpx solid #868686;"></div>
				</div>
			</scroll-view>
			<div v-if="curTab==1&&!list.length" class="flex flex-direction align-center justify-center" style="height:100%;">
				<image style="width:280rpx;height:280rpx;" src="/static/img/empty.png" alt="">
				<div style="margin-top:40rpx;">暂无配送订单</div>
			</div>

			<scroll-view v-if="curTab==2&&list.length" scroll-y style="height:100%" @scrolltolower="onMore">
				<div v-for="(i,inx) in list" :key="inx">
					<div style="padding: 0 20rpx" class="font12">
						<div class="flex" style="padding: 20rpx 0;">
							<div><span class="text-bold">配送信息：</span>{{getGoodsDesc(i.item)}}</div>
							<div class="flex-sub"></div>
							<div><span class="text-bold">送达时间：</span>{{getExpTime(i.item)}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/no.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">订单号：</div>
							<div>{{i.order_sn}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/clock.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">下单时间：</div>
							<div>{{i.createtime}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/no.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">收货人：</div>
							<div>{{i.consignee}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/phone.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">电话：</div>
							<div>{{i.phone}}</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;">
							<image src="/static/img/location.png" style="width:24rpx;height:24rpx;margin-right:8rpx;" alt="">
							<div class="text-bold">地址: </div>
							<div class="flex-sub" style="width: 0;">{{i.address}}</div>
							<image src="/static/img/clock.png" style="width:28rpx;height:28rpx;margin-right:8rpx;" alt="">
							<div>开启提醒</div>
						</div>
						<div class="flex align-center" style="margin-bottom:20rpx;" v-if="show(i.item)">
							<div class="flex-sub" style="width: 0;"></div>
							<div
								style="line-height:34rpx;border-radius:17rpx;width:120rpx;background:#FFCE50;text-align:center;font-size:10px;"
								:style="{background:i.status_name == '待配送'?'#FFCE50':'#5677AB', color:i.status_name == '待配送'?'#000':'#fff'}"
								@click="onOrder(i)"
							>
								{{i.status_name == '待配送' ? '开始配送' : '查看详情'}}
							</div>
						</div>
					</div>
					<div style="height:57rpx;border-top:1rpx solid #868686;border-bottom:1rpx solid #868686;"></div>
				</div>
			</scroll-view>
			<div v-if="curTab==2&&!list.length" class="flex flex-direction align-center justify-center" style="height:100%;">
				<image style="width:280rpx;height:280rpx;" src="/static/img/empty.png" alt="">
				<div style="margin-top:40rpx;">暂无配送订单</div>
			</div>
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
const INTERVER = 10
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
		this.getShippingData()
		// #ifdef APP-PLUS
		this.subNVue = uni.getSubNVueById('popup')
		this.subNVue.hide()
		uni.$on('close', _ => {
			this.subNVue.hide()
		})
		// #endif
	},
	data() {
		return {
			allPoints: [],
			markers: [],
			polyline: [
				{
					points: [],
					color: '#496BA0',
					width: 12
				}
			],
			latitude: '',
			longitude: '',
			isShip: false,
			orderId: '', // 配送id
			curTab: 0,
			tabs: TABS,
			showAction: true,
			h,

			timer: null,

			list: [],

			orderInfo: {

			},
			subNVue: null,
		}
	},
	methods: {
		toggleTab(inx) {
			if (this.curTab != inx) {
				this.curTab = inx
				switch(this.curTab) {
					case 0:
						// this.getShippingData()
						break
					case 1:
						this.getOrderList(true)
						break
					case 2:
						this.getOrderList(true)
						break
				}
				this.subNVue.hide()
			}
		},
		upLoadLocation() {
			if (!this.timer) {
				this.timer = setInterval(_ => {
					uni.getLocation({
						type: 'gcj02',
						success: ({latitude, longitude}) => {
							this.polyline[0].points.push({
								latitude,
								longitude
							})
							this.$forceUpdate()
							let d = {
								lat: latitude,
								lng: longitude,
								// store_id: 1,
								order_id: this.orderId,
							}
							this.$post('store/store/location', d)
								.then(r => {
									console.log(r)
								})
								.catch(e => {
									console.log(e)
								})
						},
						fail: e => {
							console.log(e)
							this.$toast(e)
						}
					})
				}, 1000 * INTERVER)
			}
		},
		onAction(inx) {
			if (inx==1) {
				uni.makePhoneCall({
					phoneNumber: this.orderInfo.phone
				})
				return
			} else if (inx == 0) {
				this.stopLoc()
			} else if (inx == 2) {
				uni.$emit('info', this.orderInfo)
				this.subNVue.show();  
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
				content: `订单${this.orderInfo.order_sn}已完成.完成时间: ${dayjs(new Date()).format('YYYY-MM-DD hh:ss')}`,
				showCancel: true,
				successCb: _ => {
					this.$put('store/order/confirm', {
						// store_id: 1,
						id: this.orderId
					}).then(r => {
						this.isShip = false
						this.timer && clearInterval(this.timer)
						this.timer = null
						this.orderId = null
						this.$toast('配送完成~~~')
					})
				}
			})
		},
		onMore() {
			if (this.isLoading || this.isEnd) {
				return
			}
			this.page++
			this.getOrderList()
		},
		mockShip() {
			let d = {
				id: this.orderId,
				// store_id: 1
			}
			this.$get('store/order/detail', d)
				.then(r => {
					this.orderInfo = r.data
					uni.getLocation({
						type: 'gcj02',
						success: ({latitude, longitude}) => {
							this.latitude = latitude
							this.longitude = longitude
							this.markers = [
								{
									id: 0,
									latitude,
									longitude,
									iconPath: '/static/img/loc0.png',
									width: 40,
									height: 40
								},
								{
									id: 1,
									latitude: this.orderInfo.latitude || 24.88554,
									longitude: this.orderInfo.longitude || 102.82147,
									iconPath: '/static/img/loc1.png',
									width: 40,
									height: 40
								}
							]
							this.$nextTick(_ => {
								this.isShip = true
								this.$forceUpdate()
							})
						},
						fail: e => {
							console.log(e)
							this.$toast('定位失败！请打开GPS后重试！')
						}
					})
				})
			this.markers = []
			this.allPoints = []
			// uni.getLocation({
			// 	type: 'gcj02',
			// 	success: ({latitude, longitude}) => {
			// 		this.latitude = latitude
			// 		this.longitude = longitude
			// 		this.markers = [
			// 			{
			// 				latitude,
			// 				longitude,
			// 				iconPath: '/static/img/loc0.png',
			// 				width: 40,
			// 				height: 40
			// 			},
			// 			{
			// 				latitude: 24.88554,
			// 				longitude: 102.82147,
			// 				iconPath: '/static/img/loc1.png',
			// 				width: 40,
			// 				height: 40
			// 			}
			// 		]
			// 		// this.polyline = [
			// 		// 	{
			// 		// 		points: [
			// 		// 			{latitude, longitude}
			// 		// 		],
			// 		// 		color: '#496BA0',
			// 		// 		width: 4
			// 		// 	}
			// 		// ]

			// 		// this.allPoints = [
			// 		// 	{
			// 		// 		latitude,
			// 		// 		longitude,
			// 		// 	},
			// 		// 	{
			// 		// 		latitude: 24.88554,
			// 		// 		longitude: 102.82147,
			// 		// 	}
			// 		// ]
			// 		// this.upLoadLocation()
			// 		this.$nextTick(_ => {
			// 			this.isShip = true
			// 			this.$forceUpdate()
			// 		})
			// 	},
			// 	fail: e => {
			// 		console.log(e)
			// 		this.$toast('定位失败！请打开GPS后重试！')
			// 	}
			// })
			
		},
		getOrderList(reset = false) {
			if (reset) {
				this.list = []
				this.page = 1
				this.isEnd = false
			}
			let d = {
				page: this.page,
				type: 'noconfirm', // 'nosend',
				// store_id: 1,
				order_type: 'delivery',
				reservation: this.curTab - 1,
			}
			this.isLoading = true
			this.$get('store/order/index', d)
				.then(r => {
					let {data = [], last_page} = r.data.result
					if (this.page >= last_page) {
						this.isEnd = true
					}
					this.list.push(...data)
				})
				.finally(_ => {
					this.isLoading = false
				})
		},
		onOrder(i) {
			if (i.status_name == '待配送') {
				// if (this.isShip) {
				// 	this.$toast('当前还有订单配送中,必须完成订单才能重新配送~~~')
				// 	return
				// }
				this.$showModal({
					content: '确定开始配送么?',
					showCancel: true,
					successCb: _ => {
						let d = {
							// store_id: '1',
							id: i.id
						}
						this.$put('store/order/send', d)
							.then(r => {
								this.orderId = i.id
								// this.mockShip()
								// this.upLoadLocation()
								this.$showModal({
									content: '开始配送~~~',
									successCb: _ => {
										this.toggleTab(0)
									}
								})
							})
					}
				})
			} else {
				this.orderId = i.id
				this.toggleTab(0)
			}
		},
		getShippingData() {
			if (!this.isShip || true) {
				let d = {
					page: 1,
					type: 'noget',
					// store_id: 1,
					order_type: 'delivery'
				}
				this.$get('store/order/index', d)
					.then(r => {
						let { data=[] } = r.data.result
						if (data.length) {
							this.orderId = data[0].id
							// this.mockShip()
							// this.upLoadLocation()
						}
					})
			}
		},
		getGoodsDesc(arr) {
			return arr.map(i => `${i.goods_title} * ${i.goods_num}`).join(',')
		},
		getExpTime(arr) {
			return dayjs(arr[0].ext_arr.dispatch_date).format('MM-DD hh:ss')
		},
		show(arr) {
			let newDate = dayjs().add(1, 'day')
			let str = `${newDate.year()}-${newDate.month()+1}-${newDate.date()} 00:00`
			return dayjs(arr[0].ext_arr.dispatch_date).valueOf() < dayjs(str).valueOf()
		},
		onMark(e) {
			console.log(e)
			let inx = e.detail.markerId
			// plus.nativeUI.alert(inx);
			if (inx==1) {
				this.openMap(
					this.markers[inx].latitude,
					this.markers[inx].longitude,
					'目的地'
				)
			}
		},
		openMap(latitude,longitude,name) {
			let hasBaiduMap = plus.runtime.isApplicationExist({
					pname: 'com.baidu.BaiduMap',
					action: 'baidumap://'
			});
			let hasAmap = plus.runtime.isApplicationExist({
					pname: 'com.autonavi.minimap',
					action: 'androidamap://'
			});
			let urlBaiduMap = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`
			// urlBaiduMap = encodeURI(urlBaiduMap)
			let urlAmap = `androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
			if (hasAmap && hasBaiduMap) {
					plus.nativeUI.actionSheet({
							title: "选择地图应用",
							cancel: "取消",
							buttons: [{
									title: "百度地图"
							}, {
									title: "高德地图"
							}]
					}, function(e) {
							switch (e.index) {
									case 1:
											plus.runtime.openURL(urlBaiduMap);
											break;
									case 2:
											plus.runtime.openURL(urlAmap);
											break;
							}
					})
			} else if (hasAmap) {
					plus.runtime.openURL(urlAmap);
			} else if (hasBaiduMap) {
					plus.runtime.openURL(urlBaiduMap);
			} else {
					plus.nativeUI.alert("本机未安装指定的地图应用");
			}

		}
	},
	watch: {
		orderId: {
			handler(val){
				if (val) {
					console.log('---order change---')
					this.mockShip()
					this.upLoadLocation()
				}
			}
		}
	}
}
</script>

<style>
	@import "../../colorui/main.css";
	/* @import "../../colorui/icon.css"; */
</style>
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
