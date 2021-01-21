module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/scss/mixins/line-clamp.scss";'
      }
    }
  }
}
