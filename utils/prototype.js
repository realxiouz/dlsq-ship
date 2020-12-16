import Vue from 'vue'
import { http } from './request'
// import store from '@/store/index.js'


// Vue.prototype.$http = http
// Vue.prototype.$store = store

Vue.prototype.$get = (url, data, showErrToast = true) =>
  http(url, data, 'get', showErrToast)
Vue.prototype.$post = (url, data, showErrToast = true) =>
  http(url, data, 'post', showErrToast)
Vue.prototype.$put = (url, data, showErrToast = true) =>
  http(url, data, 'put', showErrToast)

Vue.prototype.$del = (url, data, showErrToast = true) =>
  http(url, data, 'delete', showErrToast)

Vue.prototype.$toast = (title = '', icon = 'none') =>
  uni.showToast({
    title,
    icon,
  })

// Vue.prototype.$go = (url, type = 'navigate', opt = {}) => {
//   switch (type) {
//     case 'navigate':
//       uni.navigateTo({
//         url,
//       })
//       break
//     case 'relanch':
//       uni.reLaunch({
//         url,
//       })
//       break
//     case 'redirect':
//       uni.redirectTo({
//         url,
//       })
//       break
//     case 'switch':
//       uni.switchTab({
//         url,
//       })
//       break
//     case 'back':
//       uni.navigateBack({
//         delta: url,
//       })
//       break
//     case 'single':
//       let urls = getCurrentPages().map((i) => i.route)
//       let inx = urls.findIndex((i) => i == getRoute(url))
//       if (inx >= 0) {
//         uni.navigateBack({
//           delta: urls.length - 1 - inx,
//         })
//       } else {
//         uni.navigateTo({ url })
//       }
//       break
//     case 'mp':
//       uni.navigateToMiniProgram({
//         appId: opt.appId || MP_XLS_ID,
//         path: url,
//         extraData: opt.extraData,
//         success: opt.success,
//         fail: opt.fail,
//       })
//       break
//   }
// }

// Vue.prototype.$handleAd = ({ adType, url, remark }) => {
//   console.log(adType)
//   switch (adType) {
//     case '小程序地址:产品详情':
//       uni.navigateTo({
//         url: `/pages/goods/detail?id=${url}`,
//       })
//       break
//     case '小程序地址:活动详情':
//       uni.navigateTo({
//         url: `/pages/activity/index?aId=${url}`,
//       })
//       break
//     case '网页':
//       uni.navigateTo({
//         url: `/pages/h5/index?src=${encodeURIComponent(url)}`
//       })
//       break
//     // case 'mp':
//     //   uni.navigateToMiniProgram({
//     //     appId: value,
//     //     // path: url,
//     //     // extraData: opt.extraData,
//     //     // success: opt.success,
//     //     // fail: opt.fail,
//     //   })
//     //   break
//     case '小程序地址:产品分类':
//       let inx = store.state.category.cats.findIndex(i => i.id == url)
//       if (inx == -1) {
//         inx = 0
//       }
//       store.commit('category/setCurInx', inx)
//       uni.switchTab({
//         url: `/pages/cats/index`
//       })
//       break
//     case 'none':
//       break
//     case '小程序地址':
//       let tabs = [
//         '/pages/home/index',
//         '/pages/cats/index',
//         '/pages/cart/index',
//         '/pages/profile/index',
//       ]
//       if (tabs.findIndex(i => i == url)>-1) {
//         uni.switchTab({
//           url
//         })
//       } else {
//         uni.navigateTo({
//           url
//         })
//       }
//       break
//   }
// }

// Vue.prototype.$hideShare = hideShareMenu

function getRoute(url) {
  let urlNoQuery = url.split('?')[0]
  return urlNoQuery.slice(1)
}

Vue.prototype.$showModal = ({
  title = '温馨提示',
  content,
  successCb,
  showCancel = false,
  confirmText = '确定',
}) => {
  uni.showModal({
    title,
    content,
    showCancel,
    confirmText,
    success: (r) => {
      if (r.confirm && successCb) {
        successCb()
      }
    },
  })
}

Vue.prototype.$showLoading = (_) => {
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })
}

Vue.prototype.$hideLoading = (_) => {
  uni.hideLoading()
}

Vue.prototype.$setStorage = (key, val) => {
  try {
    uni.setStorageSync(key, val)
  } catch (e) {
    uni.showModal({
      title: '缓存api出错',
      content: e.toString(),
      showCancel: false,
      confirmText: '去反馈',
    })
  }
}

Vue.prototype.$getStorage = (key, defaultVal) => {
  try {
    let val = uni.getStorageSync(key)
    return val ? val : defaultVal
  } catch (e) {
    uni.showModal({
      title: '缓存api出错',
      content: e.toString(),
      showCancel: false,
      confirmText: '去反馈',
    })
  }
}

// Vue.prototype.$setTabBadge = (text, index = 2) => {
//   if(text) {
//     wx.setTabBarBadge({
//       text: text + '',
//       index,
//       success: _ => {
//       },
//       fail: e => {
//         store.commit('cart/setNeedUpdateTabCount', true)
//       }
//     })
//   } else {
//     wx.removeTabBarBadge({
//       index,
//       success: _ => {
//       },
//       fail: e => {
//         store.commit('cart/setNeedUpdateTabCount', true)
//       }
//     })
//   }
// }