import {http} from '@/utils/request'
export default {
  namespaced: true,
  state: {
    token: '',
    info: {
      name: '还未登录',
      avatar: 'https://newsirme-fresh.oss-cn-shenzhen.aliyuncs.com/backend/spu/20201103143638.png',
    },
    tab: 0,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setInfo(state, info) {
      state.info = info
    },
    setTab(state, tab) {
      state.tab = tab
    }
  },
  actions:{
    updateInfo({commit}) {
      return new Promise((resolve, reject) => {
        http('user', null, 'get')
          .then(r => {
            commit('setInfo', r.data)
            resolve('ok')
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}