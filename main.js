import Vue from 'vue'
import App from './App'
import './utils/prototype'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



