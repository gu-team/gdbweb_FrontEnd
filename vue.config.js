// 修改配置完一定要 重新npm run serve !!!
module.exports = {
    devServer: {
        // vue测试运行时的主机和端口
        host: 'localhost',
        port: 8000,
        proxy: {
            '/api': {
                // 请求api的url地址，该url会被代理到 http://host:port
                target: 'http://dev3.airdb.io:8080',
                changeOrigin: true,
                ws: true
                // 这样重写会把路径中 /api 消去
                // pathRewrite: {
                //   '^/api': '/api'
                // }
            }
        }
    }
}
