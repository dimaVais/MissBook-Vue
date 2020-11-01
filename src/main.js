import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style/main.scss'
import 'animate.css'
import store from '@/store/index.js'


Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
