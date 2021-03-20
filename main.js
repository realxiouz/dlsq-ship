import Vue from 'vue'
import App from './App'
import './utils/prototype'

Vue.config.productionTip = false
import store from './store/index'

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()

 



