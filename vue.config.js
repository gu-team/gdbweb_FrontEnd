// 修改配置需要重新npm run serve !!!
module.exports = {
  devServer: {
    // vue测试运行时的主机和端口
    host: 'localhost',
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://dev2.dounine.live:8080',
        changeOrigin: true,
        ws: true
      }
    }
  }
}
