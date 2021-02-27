/*
 * @Description:vue配置文件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:45:17
 * @LastEditTime: 2021-02-27 19:52:17
 */
const MYCONFIG = {
    //初始化配置
    title: '大数据视图生成器', //项目title
}

//导出配置
module.exports = {
    publicPath: '',
    assetsDir: 'assets',
    productionSourceMap: true,
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            //初始化配置
            args[0].title = MYCONFIG.title
            return args
        })
        /* 配置图片文件支持 */
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp|ico|cur)(\?.*)?$/)
    },
    /* 配置代理解决跨域测试 */
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080', // 接口的域名
                changeOrigin: true,
            },
        },
    },
}
