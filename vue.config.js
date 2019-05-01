// 修改配置完一定要 重新npm run serve !!!
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8000,
        proxy: {
            '/api': {
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
