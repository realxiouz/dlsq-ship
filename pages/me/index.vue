<template>
  <div>
    <div style="background:#5077a9;height:370rpx;position: relative">
      <div class="flex flex-direction align-center" style="padding-top:30rpx;">
        <div style="width:180rpx;height:180rpx;background:rgba(255,255,255,.4);border-radius:50%;" class="pos-r">
          <img
			@click="onPush"
            class="pos-a"
            style="width:132rpx;height:132rpx;border-radius:50%;top:50%;left:50%;margin-left:-66rpx;margin-top:-66rpx;"
            :src="info.avatar"
          />
        </div>
        <div style="margin-top:16rpx">
          <div class="font14" style="color:#fff;">{{info.nickname}}</div>
        </div>
      </div>
      <div class="water">
			<div class="water-c">
				<div class="water-1"> </div>
				<div class="water-2"> </div>
			</div>
		</div>
    </div>
		<div style="height:40rpx;"></div>
		<div style="position: sticky;top: 0;z-index: 10;" >
			<div class="flex align-center" style="background-color: #fff;padding:20rpx 30rpx 0">
				<image src="/static/img/msg.png" style="width: 24rpx;height:24rpx;margin-right:12rpx" mode=""></image>
				<div style="font-size: 12px;font-weight: bold;color: #333;">配送记录</div>
				<div class="flex-sub"></div>
				<picker mode="date" @change="onDateChange">
					<image src="/static/img/search.png" style="width:60rpx;height: 60rpx;"></image>
				</picker>
			</div>
			<div style="padding:20rpx;color:#A6A6A6;font-size:10px;background:#fff;">{{!date?'全部':date}}</div>
		</div>
		<!-- <div class="flex align-center" style="background-color: #fff;padding:20rpx 30rpx 0">
			<image src="/static/img/msg.png" style="width: 24rpx;height:24rpx;margin-right:12rpx" mode=""></image>
			<div style="font-size: 12px;font-weight: bold;color: #333;">配送记录</div>
			<div class="flex-sub"></div>
			<picker mode="date" @change="onDateChange">
				<image src="/static/img/search.png" style="width:60rpx;height: 60rpx;"></image>
			</picker>
		</div>
		<div style="padding:20rpx;color:#A6A6A6;font-size:10px;background:#fff;">{{!date?'全部':date}}</div> -->
		<div style="height:20rpx"></div>

		<div class="ship-info bg-white" v-for="(i,index) in list" :key="index">
      <div>
        <div class="line flex">
          <div class="title">配送清单</div>
          <div class="flex-sub">
            <div class="flex justify-between in-line" v-for="(j, inx) in i.item" :key="inx">
              <div>{{j.goods_title}}</div>
              <div>X {{j.goods_num}}</div>
            </div>
          </div>
        </div>
        <div class="line flex">
          <div class="title">配送状态</div>
          <div class="flex-sub"></div>
          <div>{{i.status_name}}</div>
        </div>
        <div class="line flex">
          <div class="title">配送地址</div>
          <div class="flex-sub"></div>
          <div>
            <div>{{i.address}}</div>
            <div>{{`${i.consignee} ${i.phone}`}}</div>
          </div>
        </div>
        <div class="line flex">
          <div class="title">配送单号</div>
          <div class="flex-sub"></div>
          <div>{{i.order_sn}}</div>
        </div>
				<div class="line flex">
				  <div class="title">下单时间</div>
				  <div class="flex-sub"></div>
				  <div>{{i.createtime}}</div>
				</div>
				<div class="line flex" v-if="i.status_code=='nocomment'">
				  <div class="title">完成时间</div>
				  <div class="flex-sub"></div>
				  <div>{{formatTime(i.ext_arr.send_time)}}</div>
				</div>
      </div>
    </div>
		
		<div v-if="!list.length" class="flex flex-direction align-center justify-center" style="margin-top:300rpx;">
			<image style="width:280rpx;height:280rpx;" src="/static/img/empty.png" alt="">
			<div style="margin-top:40rpx;">暂无配送订单</div>
		</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
  onLoad(opt) {
    this.info = uni.getStorageSync('userInfo') || {}
		this.getData()
  },
  data() {
    return {
      info: {},
			page: 1,
			list: [],
			isEnd: false,
			isLoading: false,

			date: '',
    }
  },
  computed: {
  },
  methods: {
		formatTime(n) {
			return dayjs(n*1000).format('YYYY-MM-DD HH:mm')
		},
    onDateChange(e) {
			this.date = e.detail.value
			this.getData(true)
		},
		getData(reset = false) {
			if (reset) {
				this.list = []
				this.page = 1
				this.isEnd = false
			}
			let d = {
				page: this.page,
				type: 'finish',
				store_id: 1,
				order_type: 'delivery'
			}
			this.date && (d.date = this.date)
			this.isLoading = true
			uni.showLoading({
				title: '加载中...'
			})
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
					uni.hideLoading()
				})
	},
	onPush() {
		this.$get(`/order/pushToSingleByCid`)
			.then(r => {
				
			}).catch(e => {
				
			})
	}
  },
	onReachBottom() {
		if (this.isLoading || this.isEnd) {
			return
		}
		this.page++
		this.getData()
	}
}
</script>

<style>
	@import "../../colorui/main.css";
</style>
<style lang="less">
	.pos-r{
		position: relative;
	}
	.pos-a{
		position: absolute;
	}
	.water {
		position: absolute;
		left: 0;
		bottom: -10upx;
		height: 30upx;
		width: 100%;
		z-index: 1;
	}

	.water-c {
		position: relative;
	}

	.water-1 {
		background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0xPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMTMzLjAwMDAwMCkiIGZpbGwtb3BhY2l0eT0iMC4zIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9IndhdGVyLTEiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMS4wMDAwMDAsIDEzMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDcuNjk4NTczOTUgTDQuNjcwNzE5NjJlLTE1LDYwIEw2MDAsNjAgTDYwMCw3LjM1MjMwNDYxIEM2MDAsNy4zNTIzMDQ2MSA0MzIuNzIxMDUyLDI0LjEwNjUxMzggMjkwLjQ4NDA0LDcuMzU2NzQxODcgQzE0OC4yNDcwMjcsLTkuMzkzMDMwMDggMCw3LjY5ODU3Mzk1IDAsNy42OTg1NzM5NSBaIiBpZD0iUGF0aC0xIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
		background-size: 600upx;
		animation: wave-animation-1 4.5s infinite linear;
	}

	.water-2 {
		top: 5upx;
		background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMjQ2LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0id2F0ZXItMiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIxLjAwMDAwMCwgMjQ2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNy42OTg1NzM5NSBMNC42NzA3MTk2MmUtMTUsNjAgTDYwMCw2MCBMNjAwLDcuMzUyMzA0NjEgQzYwMCw3LjM1MjMwNDYxIDQzMi43MjEwNTIsMjQuMTA2NTEzOCAyOTAuNDg0MDQsNy4zNTY3NDE4NyBDMTQ4LjI0NzAyNywtOS4zOTMwMzAwOCAwLDcuNjk4NTczOTUgMCw3LjY5ODU3Mzk1IFoiIGlkPSJQYXRoLTIiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwMC4wMDAwMDAsIDMwLjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMzAwLjAwMDAwMCwgLTMwLjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
		background-size: 600upx;
		animation: wave-animation-2 8s infinite linear;
	}

	.water-1,
	.water-2 {
		position: absolute;
		width: 100%;
		height: 60upx;
	}

	@keyframes wave-animation-1 {
		0% {
			background-position: 0 top;
		}

		100% {
			background-position: 600upx top;
		}
	}

	@keyframes wave-animation-2 {
		0% {
			background-position: 0 top;
		}

		100% {
			background-position: 600px top;
		}
	}

	.line{
  margin-top: 16rpx;
  color: #010101;
  font-size: 12px;
  .title{
    color: #A6A6A6;
    width: 130rpx;
	}
	&:first-child{
		margin-top: 0;
	}
}

.in-line{
  margin-bottom: 16rpx;
  &:last-child{
    margin-bottom: 0;
  }
}

.ship-info{
	padding: 40rpx 100rpx;
	border-bottom:1rpx solid #A0A0A0;
	background: #fff;
}
</style>