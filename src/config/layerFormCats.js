/*
 * @Description: 右侧栏图层配置面板表单分类
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-11-13 17:45:47
 * @LastEditTime: 2020-11-23 17:48:39
 */
import compList from './compList'
let allCompType = [] //所有类型
let compTypes_sjpz = [] //需要数据的类型
let compTypes_tb = [] //图表类型

//组件类型分发
compList.forEach((item) => {
    //所有组件类型
    allCompType = allCompType.concat(item.list.map((li) => li.type))

    //需要数据的组件
    item.id != 4 &&
        (compTypes_sjpz = allCompType.concat(item.list.map((li) => li.type)))

    //图表组件
    Array(1, 2).includes(item.id) &&
        (compTypes_tb = allCompType.concat(item.list.map((li) => li.type)))
})

export default [
    {
        category: '图层配置',
        optionsFilter: ['name', 'pos', 'width', 'height'],
        compTypeFilter: allCompType,
    },
    {
        category: '图表基础配置',
        optionsFilter: ['title'],
        compTypeFilter: allCompType,
    },
    {
        category: '数据配置',
        optionsFilter: [
            'useApiData',
            'chartData',
            'apiReqUrl',
            'apiMethod',
            'apiParam',
            'apiResHandle',
        ],
        compTypeFilter: compTypes_sjpz,
    },
    {
        category: '图例配置',
        optionsFilter: ['showLegend'],
        compTypeFilter: compTypes_tb,
    },
    {
        category: '坐标轴设置',
        optionsFilter: [
            'xName',
            'yName',
            'valEnding',
            'showValAxisLabel',
            'showValAxisLine',
            'showValSplitLine',
            'showCatAxisLine',
            'catLabelRowLen',
        ],
        compTypeFilter: ['BarChart', 'LineChart', 'ScatterChart', 'TwoYAxis'],
    },
    {
        category: '图表主体配置',
        optionsFilter: [
            'barWidth',
            'stack',
            'horizontal',
            'barBorderRadius',
            'label',
            'labelPosition',
        ],
        compTypeFilter: compTypes_tb,
    },
    {
        category: '视区设置',
        optionsFilter: ['left', 'top', 'bottom', 'right'],
        compTypeFilter: compTypes_tb,
    },
    {
        category: '自定义配色',
        optionsFilter: ['colorMode', 'colors'],
        compTypeFilter: compTypes_tb,
    },
]
