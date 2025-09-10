import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './webxr-polyfill'

// Configuration
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')