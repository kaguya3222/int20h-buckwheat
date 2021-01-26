import Vue from 'vue'

import '@/assets/scss/globals.scss'

import App from './App.vue'
import error from './plugins/error'
import eventBus from './plugins/eventBus'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  eventBus,
  error,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
