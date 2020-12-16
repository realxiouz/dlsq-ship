import {http} from '@/utils/request'
export default {
  namespaced: true,
  state: {
    token: 'af703041-7646-4b89-9593-b9cfdb4bc0d3',
    info: {
      name: '还未登录',
      avatar: 'https://newsirme-fresh.oss-cn-shenzhen.aliyuncs.com/backend/spu/20201103143638.png',
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setInfo(state, info) {
      state.info = info
    },
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