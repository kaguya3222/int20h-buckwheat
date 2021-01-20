const path = require('path')
module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts', '.css', '.scss'],
    root: path.resolve(__dirname),
    alias: {
      '@': path.join(__dirname, './src')
    }
  }
}
