/*
 * @Description: 参数配置（工厂模式）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2020-09-27 17:59:06
 */

import { ObjVerify } from '../../../../../utils/myUtils'
import mockData from './mockData'

class Config {
  constructor(options = {}) {
    const optionsTypeObj = {
      chartData: [Object, Array], //图表数据
      title: String, //标题，可有可无
      valEnding: String, //值的结尾，比如"%"，默认为空
      xName: String, //x轴名，可有可无
      yName: String, //y轴名，可有可无
      left: String, //左边距
      top: String, //上边距
      right: String, //右边距
      bottom: String, //下边距
      barWidth: String, //柱粗
      stack: [Array, Boolean], //是否堆叠，堆叠的项目有哪些，stack为true时所有柱子都堆叠在一柱上，且不考虑堆叠的类型名
      horizontal: Boolean, //是否横向，声明即横向
      barBorderRadius: [Array, Number], //柱子是否圆角，可传数组或数字如30或[30,30,30,30]
      dataZoom: Object, //数据缩放滚动条
      markPoint: Object, //气泡标注
      markLine: Object, //标线
      markArea: Object, //标域
      colors: Array, //自定义同类柱子颜色
      seriesColors: Array, //自定义不同柱子颜色
      label: Boolean, //是否显示数据标签
      labelPosition: String, //数据标签位置,默认在柱子上方
      visualMap: Object, //视觉映射（改变某些数据区域的颜色）
      axisDegreeScope: Object, //数据轴刻度范围
      showValAxisLabel: Boolean, //显示数据轴刻度
      showValAxisLine: Boolean, //显示数据轴轴线
      showValSplitLine: Boolean, //显示数据轴刻度分隔线
      showCatAxisLine: Boolean, //显示类型轴轴线
      catLabelRowLen: Number //类型轴类型名称每行字数（多少字换行）
    }
    //默认配置
    this.defaultOptions = {
      chartData: mockData,
      title: '标准柱状图',
      valEnding: '',
      xName: '',
      yName: '',
      barWidth: '20%',
      stack: false,
      horizontal: false,
      barBorderRadius: 0,
      label: false,
      labelPosition: 'top',
      axisDegreeScope: {},
      showValAxisLabel: true,
      showValAxisLine: true,
      showValSplitLine: true,
      showCatAxisLine: true,
      catLabelRowLen: 4
    }
    //类型验证
    ObjVerify(optionsTypeObj, options)
    this.options = Object.assign(this.defaultOptions, options)
  }

  /* 获取配置项 */
  static getOptions(options) {
    return new Config(options).options
  }

  /* 获取默认配置项 */
  static getDefaultOptions() {
    return new Config().defaultOptions
  }
}

export default Config
