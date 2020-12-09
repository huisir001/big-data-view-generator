/*
 * @Description:vue配置文件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:45:17
 * @LastEditTime: 2020-12-09 16:00:08
 */
const MYCONFIG = {
    //初始化配置
    title: '大数据视图生成器', //项目title
    screenWidth: 1920, //屏幕分辨率-宽
    screenHeight: 920, //屏幕分辨率-高
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
            args[0].screenWidth = MYCONFIG.screenWidth
            args[0].screenHeight = MYCONFIG.screenHeight
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
            'getSysTime.do': {
                target: 'http://quan.suning.com', // 接口的域名
                changeOrigin: true,
            },
        },
    },
}
