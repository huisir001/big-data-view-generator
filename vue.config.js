/*
 * @Description:vue配置文件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:45:17
 * @LastEditTime: 2020-09-03 18:53:28
 */
const MYCONFIG = {
  //初始化配置
  title: '大数据平台脚手架', //项目title
  screenWidth: 1920, //屏幕分辨率-宽
  screenHeight: 920 //屏幕分辨率-高
}

//导出配置
module.exports = {
  publicPath: '',
  assetsDir: 'assets',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      //初始化配置
      args[0].title = MYCONFIG.title
      args[0].screenWidth = MYCONFIG.screenWidth
      args[0].screenHeight = MYCONFIG.screenHeight
      return args
    })
  }
}
