module.exports = {
  devServer: {
    watchOptions: {
      poll: 500,
      ignored: /node_modules/
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@use "@/assets/styles/variables" as *;`
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg")
    svgRule.uses.clear()
    svgRule.use("vue-svg-loader").loader("vue-svg-loader")
  }
}
