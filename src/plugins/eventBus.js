import Vue from 'vue'

const eventBusPlugin = {
  install(Vue) {
    Vue.prototype.$eventBus = new Vue()
  }
}

Vue.use(eventBusPlugin)

export default eventBusPlugin
