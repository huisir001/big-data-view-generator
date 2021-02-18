/*
 * @Description: 组件注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-25 10:20:54
 * @LastEditTime: 2021-02-18 11:31:07
 */
// 导入组件
import {
    BarChart,
    LineChart,
    TwoYAxis,
    PieChart,
    RadarChart,
    GaugeChart,
    ScatterChart,
    MapChart,
    ProgressChart1,
    ProgressChart2,
    ProgressChart3,
    ProgressChart4,
    ProgressChart5,
    ProgressChart6,
} from './components/Charts'
import BorderBox from './components/BorderBox'
import Form from './components/Form'
import Table from './components/Table'
import { BasicText, TimeText } from './components/Text'

// 存储组件列表
const components = {
    BarChart,
    LineChart,
    TwoYAxis,
    PieChart,
    RadarChart,
    GaugeChart,
    ScatterChart,
    MapChart,
    ProgressChart1,
    ProgressChart2,
    ProgressChart3,
    ProgressChart4,
    ProgressChart5,
    ProgressChart6,
    BorderBox,
    Form,
    Table,
    BasicText,
    TimeText,
}

// 定义 install 方法
const install = function (Vue) {
    // 遍历注册全局组件
    Object.keys(components).forEach((key) =>
        Vue.component(components[key].name, components[key])
    )
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

//如此导出可直接全部注册所有组件，亦可单个引用
export default {
    install,
    ...components,
}
