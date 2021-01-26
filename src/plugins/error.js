import Vue from 'vue'

import { errorEvent } from '@/constants/customEvents'

const errorPlugin = {
  install(Vue) {
    Vue.prototype.$error = error => {
      Vue.prototype.$eventBus.$emit(errorEvent, error)
    }
  }
}

Vue.use(errorPlugin)

export default errorPlugin
